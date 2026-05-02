require("dotenv").config();

const { Worker } = require("bullmq");
const WebsiteFeedback = require("../models/websiteFeedbackForm");
const { analyzeFeedback, buildAdminReport, initAI } = require("../services/aiService");
const { sendEmail, initMailer } = require("../mailer");
const { getSecret } = require("../services/ec2Services");
const mongoose = require("mongoose");

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

const startWorker = async () => {
  try {
    // 1. DB
    const MONGO_URI = await getSecret("/event-api/MONGO_URL");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Worker DB Connected");

    // 2. AI
    await initAI();
    console.log("✅ AI Initialized");

    // 3. Mail
    await initMailer();
    console.log("✅ Mail Transporter Ready");

    // 4. Start Worker
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

          // ---- AI ----
          let analysis = {};
          try {
            console.log("🧠 Running AI...");
            analysis = await analyzeFeedback(feedback.message);
          } catch (err) {
            console.error("❌ AI ERROR:", err.message);
          }

          // ---- SAFE NORMALIZATION ----
          analysis = {
            sentiment: analysis?.sentiment ?? "unknown",
            summary: analysis?.summary ?? "No summary available",
            issues: Array.isArray(analysis?.issues) ? analysis.issues : [],
            suggestions: Array.isArray(analysis?.suggestions) ? analysis.suggestions : [],
          };

          // ---- UPDATE ----
          const updated = await WebsiteFeedback.findByIdAndUpdate(
            feedbackId,
            analysis,
            { new: true }
          );

          console.log("💾 DB updated:", updated._id);

          // ---- EMAIL ----
          try {
            const html = buildAdminReport({ feedback: updated });

            await sendEmail({
              to: "enquiry.portfolio@vamsimarripudi.tech",
              subject: `New Feedback • ${updated.rating}/5 • ${updated.category}`,
              html,
            });

            console.log("📩 ADMIN EMAIL SENT");
          } catch (err) {
            console.error("❌ EMAIL ERROR:", err.message);
          }

        } catch (err) {
          console.error("❌ WORKER CRASH:", err);
          throw err;
        }
      },
      { connection }
    );

    worker.on("completed", (job) => {
      console.log("✅ Job completed:", job.id);
    });

    worker.on("failed", (job, err) => {
      console.error("❌ Job failed:", err.message);
    });

    console.log("🧠 Worker is running...");

  } catch (err) {
    console.error("❌ Worker startup failed:", err);
    process.exit(1);
  }
};

startWorker();