const WebsiteFeedback = require("../models/websiteFeedbackForm");

const User = require("../models/User");
const {sendEmail} = require("../mailer");
const {analyzeFeedback,buildAdminReport} = require("../services/aiService");

const ALLOWED_CATEGORIES = ["bug", "suggestion", "general"];


const sanitize = (str = "") =>
  str.replace(/<[^>]*>/g, "").trim();

// POST /api/feedback
const submitFeedback = async (req, res) => {
  try {
    let { rating, category = "general", message, page,userId } = req.body;

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

    const id = userId || null;

    const feedback = await WebsiteFeedback.create({
      userId: id,
      rating,
      category,
      message,
      page,
    });

    let user = null;
    if (id) {
      user = await User.findById(id);
    }



    if (user && user.email) {
      sendEmail({
        to: user.email,
        subject: "Website Feedback",
        html: `
              <div style="font-family: Arial, sans-serif; background: #f5f7fa; padding: 20px;">
                
                <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden;">
                  
                  <!-- Header -->
                  <div style="background: #111; color: #fff; padding: 16px 20px;">
                    <h2 style="margin: 0;">Thank You for Your Feedback</h2>
                  </div>

                  <!-- Body -->
                  <div style="padding: 20px;">
                    
                    <p style="margin-bottom: 12px;">
                      Hi ${user?.name || name || "there"},
                    </p>

                    <p style="margin-bottom: 16px;">
                      Thank you for taking the time to share your feedback. We truly appreciate your visit and your input.
                    </p>

                    <p style="margin-bottom: 16px; color:#555;">
                      Your feedback helps us understand user experience better and continuously improve the platform.
                    </p>

                    <!-- Feedback Summary -->
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                      <p><b>Your Rating:</b> ${"⭐".repeat(rating)} (${rating}/5)</p>
                      <p><b>Category:</b> ${category}</p>
                      <p><b>Page:</b> ${page || "-"}</p>
                    </div>

                    <!-- Message -->
                    <div>
                      <p><b>Your Message:</b></p>
                      <p style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
                        ${message}
                      </p>
                    </div>

                    <!-- Closing -->
                    <p style="margin-top: 20px;">
                      We’re glad to have you on our platform.
                    </p>

                    <p style="margin-top: 10px;">
                      Regards,<br/>
                      <b>Event Management Team</b>
                    </p>

                  </div>

                  <!-- Footer -->
                  <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #555;">
                    © ${new Date().getFullYear()} Event Management Platform
                  </div>

                </div>

              </div>
             `

          
      }
    )

    
    .catch(err => console.error("Feedback email error:", err.message));
    }

    const esc = (s = "") =>
      String(s).replace(/[&<>"']/g, c =>
        ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])
      );

      let analysis;
      try{
        analysis = await analyzeFeedback(feedback)
      }catch{
        analysis={
          sentiment:"unknown",
          summary:feedback.slice(0,80),
          issues:[],
          suggestions:[]
        };

      }

      const saved = await WebsiteFeedback.create({
        feedback,
        sentiment: analysis.sentiment,
        summary: analysis.summary,
        issues: analysis.issues,
        suggestions: analysis.suggestions,

      })

    const html = buildAdminReport({feedback,saved});
    sendEmail({
      to: "enquiry.portfolio@vamsimarripudi.tech",
      subject: `New Feedback • ${rating}/5 • ${category}`,
      replyTo: user?.email || undefined,
      html
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
      id: feedback._id,
    });
    console.log(req.user)

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const getAllFeedback = async(req,res)=>{
  const data = await Feedback.find().sort({createdAt:-1});
  res.json(data);
}

module.exports = {
  submitFeedback, getAllFeedback
};