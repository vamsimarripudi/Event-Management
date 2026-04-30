const WebsiteFeedback = require("../models/websiteFeedbackForm");
const User = require("../models/User");
const sendEmail = require("../mailer");

const ALLOWED_CATEGORIES = ["bug", "suggestion", "general"];


const sanitize = (str = "") =>
  str.replace(/<[^>]*>/g, "").trim();

// POST /api/feedback
const submitFeedback = async (req, res) => {
  try {
    let { rating, category = "general", message, page } = req.body;

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

    message = sanitize(message).slice(0, 1000);
    page = sanitize(page || "").slice(0, 200);

    const userId = req.user?._id || null;

    const feedback = await WebsiteFeedback.create({
      userId,
      rating,
      category,
      message,
      page,
    });

    let user = null;
    if (userId) {
      user = await User.findById(userId);
    }

    if (user && user.email) {
      sendEmail({
        to: user.email,
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