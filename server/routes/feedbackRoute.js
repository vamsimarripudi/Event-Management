const express = require("express")
const router = express.Router()
const {submitFeedback,getAllFeedback, getFeedbackAnalytics} = require("../controllers/feedbackController");
const rateLimit = require("express-rate-limit");
const verifyToken = require("../middleware/token");
const adminAuth = require("../middleware/adminAuth");

const feedbackLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // max 20 submissions per IP
});

router.post("/feed",feedbackLimiter,submitFeedback)
router.get("/api/feedback",verifyToken, getAllFeedback)
router.get("/analytics", verifyToken, getFeedbackAnalytics);
module.exports = router;