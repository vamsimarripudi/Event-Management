const { Worker } = require("bullmq");
const WebsiteFeedback = require("../models/websiteFeedbackForm");
const { analyzeFeedback, buildAdminReport } = require("../services/aiService");
const { sendEmail } = require("../mailer");

const worker = new Worker(
  "feedback-queue",
  async (job) => {
    const { feedbackId } = job.data;

    console.log("🚀 Worker started for:", feedbackId);

    const feedback = await WebsiteFeedback.findById(feedbackId);
    if (!feedback) return;

    let analysis;

    try {
      analysis = await analyzeFeedback(feedback.message);
    } catch (err) {
      console.error("AI ERROR:", err.message);
      analysis = {};
    }

    // ✅ NORMALIZATION (prevents undefined forever)
    analysis = {
      sentiment: analysis?.sentiment ?? "unknown",
      summary: analysis?.summary ?? "No summary available",
      issues: Array.isArray(analysis?.issues) ? analysis.issues : [],
      suggestions: Array.isArray(analysis?.suggestions) ? analysis.suggestions : [],
    };

    const updated = await WebsiteFeedback.findByIdAndUpdate(
      feedbackId,
      analysis,
      { new: true }
    );

    console.log("✅ AI analysis saved:", updated._id);

    // ✅ send admin email AFTER AI
    const html = buildAdminReport({ feedback: updated });

    sendEmail({
      to: "enquiry.portfolio@vamsimarripudi.tech",
      subject: `New Feedback • ${updated.rating}/5 • ${updated.category}`,
      html
    });

    console.log("📩 Admin email sent");
  },
  {
    connection: { host: "127.0.0.1", port: 6379 },
  }
);

console.log("🧠 Worker is running...");