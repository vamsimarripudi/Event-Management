require("dotenv").config();

const { Worker } = require("bullmq");
const WebsiteFeedback = require("../models/websiteFeedbackForm");
const { analyzeFeedback, buildAdminReport } = require("../services/aiService");
const { sendEmail } = require("../mailer");
const {getSecret}  = require("../services/ec2Services");
const mongoose = require("mongoose");

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

const connectDB = async() => {
    try{
        const MONGO_URI = await getSecret("/event-api/MONGO_URL")
        await mongoose.connect(MONGO_URI);
        
        console.log("Database Connected")

    }catch(error){
        console.error(error.message);
        process.exit(1)
    }
}

connectDB()
console.log("Worker DB connected")

const worker = new Worker(
  "feedback-queue",
  async (job) => {
    const { feedbackId } = job.data;

    console.log("🚀 Worker started for:", feedbackId);

    try {
      const feedback = await WebsiteFeedback.findById(feedbackId);

      if (!feedback) {
        console.log("❌ Feedback not found");
        return;
      }

      console.log("📄 Feedback loaded:", feedback._id);

      // ---- AI PROCESS ----
      let analysis;
      try {
        console.log("🧠 Running AI...");
        analysis = await analyzeFeedback(feedback.message);
        console.log("✅ AI response:", analysis);
      } catch (err) {
        console.error("❌ AI ERROR:", err.message);
        analysis = {};
      }

      // ---- NORMALIZE OUTPUT ----
      analysis = {
        sentiment: analysis?.sentiment ?? "unknown",
        summary: analysis?.summary ?? "No summary available",
        issues: Array.isArray(analysis?.issues) ? analysis.issues : [],
        suggestions: Array.isArray(analysis?.suggestions) ? analysis.suggestions : [],
      };

      // ---- UPDATE DB ----
      const updated = await WebsiteFeedback.findByIdAndUpdate(
        feedbackId,
        analysis,
        { new: true }
      );

      console.log("💾 DB updated:", updated._id);

      // ---- BUILD EMAIL ----
      let html;
      try {
        html = buildAdminReport({ feedback: updated });
      } catch (err) {
        console.error("❌ HTML BUILD ERROR:", err);
        html = "<h3>Feedback received (fallback)</h3>";
      }

      // ---- SEND EMAIL ----
      try {
        await sendEmail({
          to: "enquiry.portfolio@vamsimarripudi.tech",
          subject: `New Feedback • ${updated.rating}/5 • ${updated.category}`,
          html,
        });

        console.log("📩 ADMIN EMAIL SENT");
      } catch (err) {
        console.error("❌ EMAIL ERROR:", err);
      }

    } catch (err) {
      console.error("❌ WORKER CRASH:", err);
      throw err; // important for retry
    }
  },
  { connection }
);

// ---- EVENT LISTENERS ----
worker.on("completed", (job) => {
  console.log("✅ Job completed:", job.id);
});

worker.on("failed", (job, err) => {
  console.error("❌ Job failed:", err.message);
});

console.log("🧠 Worker is running...");