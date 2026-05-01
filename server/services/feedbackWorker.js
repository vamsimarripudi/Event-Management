const { Worker } = require("bullmq");
const WebsiteFeedback = require("../models/websiteFeedbackForm");
const { analyzeFeedback } = require("../services/aiService");
const { sendEmail } = require("../mailer");

const worker = new Worker(
  "feedback-queue",
  async job => {
    const { feedbackId } = job.data;

    const feedback = await WebsiteFeedback.findById(feedbackId);
    if (!feedback) return;

    let analysis;
    try {
      analysis = await analyzeFeedback(feedback);
    } catch {
      analysis = {};
    }

    const updated = await WebsiteFeedback.findByIdAndUpdate(
      feedbackId,
      {
        sentiment: analysis?.sentiment || "unknown",
        summary: analysis?.summary || "No summary",
        issues: analysis?.issues || [],
        suggestions: analysis?.suggestions || [],
      },
      { new: true }
    );

    // send admin email AFTER AI
    sendEmail({
      to: "enquiry.portfolio@vamsimarripudi.tech",
      subject: `New Feedback • ${updated.rating}/5 • ${updated.category}`,
      html: `<pre>${JSON.stringify(updated, null, 2)}</pre>`
    });

    console.log("Worker processed feedback:", feedbackId);
  },
  {
    connection: { host: "127.0.0.1", port: 6379 },
  }
);