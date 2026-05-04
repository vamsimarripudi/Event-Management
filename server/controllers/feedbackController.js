const WebsiteFeedback = require("../models/websiteFeedbackForm");
const User = require("../models/User");
const { sendEmail } = require("../mailer");
const feedbackQueue = require("../services/queue");

const ALLOWED_CATEGORIES = ["bug", "suggestion", "general"];

const sanitize = (str = "") =>
  str.replace(/<[^>]*>/g, "").trim();

// ✅ Styled Email Template
const getUserFeedbackEmail = ({ name, rating, category, message, page }) => {
  return `
  <div style="margin:0; padding:0; background:#f4f6f9; font-family: Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9; padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

            <!-- HEADER -->
            <tr>
              <td style="background:#111827; color:#ffffff; padding:20px;">
                <h2 style="margin:0; font-size:20px;">Feedback Received</h2>
                <p style="margin:5px 0 0; font-size:13px; color:#d1d5db;">
                  Event Management Platform
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:24px; color:#111827;">

                <p style="margin:0 0 12px;">Hi ${name || "there"},</p>

                <p style="margin:0 0 16px; color:#4b5563;">
                  Thank you for sharing your feedback. Your input helps us improve the platform experience continuously.
                </p>

                <!-- SUMMARY -->
                <div style="background:#f9fafb; border-radius:8px; padding:16px; margin-bottom:20px;">
                  <p style="margin:0 0 8px;"><strong>Rating:</strong> ${"⭐".repeat(rating)} (${rating}/5)</p>
                  <p style="margin:0 0 8px;"><strong>Category:</strong> ${category}</p>
                  <p style="margin:0;"><strong>Page:</strong> ${page || "-"}</p>
                </div>

                <!-- MESSAGE -->
                <div style="margin-bottom:20px;">
                  <p style="margin:0 0 6px;"><strong>Your Feedback:</strong></p>
                  <div style="background:#f3f4f6; padding:12px; border-radius:6px; color:#374151;">
                    ${message}
                  </div>
                </div>

                <p style="margin:0; color:#6b7280; font-size:14px;">
                  We appreciate your time and effort in helping us improve.
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f9fafb; text-align:center; padding:16px; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} Event Management Platform
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;
};

const submitFeedback = async (req, res) => {
  try {
    let { rating, category = "general", message, page, userId } = req.body;

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

    // sanitize inputs
    message = sanitize(message).slice(0, 1000);
    page = sanitize(page || "").slice(0, 200);

    const feedback = await WebsiteFeedback.create({
      userId: userId || null,
      rating,
      category,
      message,
      page,
    });

    

    // ✅ Send styled email to user
    if (userId) {
      const user = await User.findById(userId);

      if (user?.email) {
        const html = getUserFeedbackEmail({
          name: user.name,
          rating,
          category,
          message,
          page
        });

        sendEmail({
          to: user.email,
          subject: "Thanks for your feedback",
          html
        }).catch(err =>
          console.error("User email error:", err.message)
        );
      }
    }

    // ✅ Push to queue (AI handled in worker)
    await feedbackQueue.add("analyze-feedback", {
      feedbackId: feedback._id
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
      id: feedback._id,
    });

  } catch (err) {
    
    return res.status(500).json({ message: err.message });
  }
};


const getAllFeedback = async(req,res)=>{
  const data = await WebsiteFeedback.find().sort({createdAt: -1})
  res.json(data)
}

module.exports = { submitFeedback, getAllFeedback };