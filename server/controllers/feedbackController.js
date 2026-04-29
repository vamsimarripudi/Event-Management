const WebsiteFeedback = require("../models/WebsiteFeedback");


const sendEmail = require("../utils/sendEmail");

const ALLOWED_CATEGORIES = ["bug", "suggestion", "general"];


const sanitize = (str = "") =>
  str.replace(/<[^>]*>/g, "").trim();

// POST /api/feedback
const submitFeedback = async (req, res) => {
  try {
    let { rating, category = "general", message, page } = req.body;

    // --- validation ---
    rating = Number(rating);

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1–5" });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ message: "Message must be at least 5 characters" });
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      category = "general";
    }

    // optional: cap message length
    message = sanitize(message).slice(0, 1000);
    page = sanitize(page || "").slice(0, 200);

    // --- create ---
    const feedback = await WebsiteFeedback.create({
      userId: req.user?.id || null, // works with or without auth
      rating,
      category,
      message,
      page,
    });

    // --- async notify (don’t block response) ---
    if (process.env.FEEDBACK_NOTIFY_EMAIL) {
      sendEmail({
        to: process.env.FEEDBACK_NOTIFY_EMAIL,
        subject: "New Website Feedback",
        html: `
          <h3>New Feedback</h3>
          <p><b>Rating:</b> ${rating}</p>
          <p><b>Category:</b> ${category}</p>
          <p><b>Page:</b> ${page || "-"}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      }).catch(err => console.error("Feedback email error:", err.message));
    }

    return res.status(201).json({
      message: "Feedback submitted successfully",
      id: feedback._id,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  submitFeedback,
};