const express = require("express")
const router = express.Router()
const submitFeedback = require("../controllers/feedbackController");
const rateLimit = require("express-rate-limit");

const feedbackLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // max 20 submissions per IP
});

router.post("/feedback",feedbackLimiter,submitFeedback)

module.exports = router;