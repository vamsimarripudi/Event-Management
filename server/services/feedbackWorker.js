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
    

    // 2. AI
    await initAI();
    

    // 3. Mail
    await initMailer();
    

    const worker = new Worker(
      "feedback-queue",
      async (job) => {
        const { feedbackId } = job.data;

        

        try {
          const feedback = await WebsiteFeedback.findById(feedbackId);

          if (!feedback) {
            
            return;
          }

          console.log("📄 Feedback loaded:", feedback._id);

          // ---- AI ----
          let analysis = {};
          try {
            
            analysis = await analyzeFeedback(feedback.message);
          } catch (err) {
            console.error("❌ AI ERROR:", err.message);
          }

          // ---- NORMALIZATION ----
          analysis = {
            sentiment: analysis?.sentiment ?? "unknown",
            summary: analysis?.summary ?? "No summary available",
            issues: Array.isArray(analysis?.issues) ? analysis.issues : [],
            suggestions: Array.isArray(analysis?.suggestions) ? analysis.suggestions : [],
          };

          // ---- UPDATE (FIXED) ----
          const updated = await WebsiteFeedback.findByIdAndUpdate(
            feedbackId,
            {
              sentiment: analysis.sentiment,
              summary: analysis.summary,
              issues: analysis.issues,
              suggestions: analysis.suggestions,
            },
            { returnDocument: "after" }
          );

          if (!updated) {
            throw new Error("Update failed");
          }

          

          // ---- EMAIL ----
          try {
            const html = buildAdminReport({ feedback: updated });

            await sendEmail({
              to: "enquiry.portfolio@vamsimarripudi.tech",
              subject: `New Feedback • ${updated.rating || "N/A"}/5 • ${updated.category || "General"}`,
              html,
            });

            
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

    
  } catch (err) {
    console.error("❌ Worker startup failed:", err);
    process.exit(1);
  }
};

startWorker();