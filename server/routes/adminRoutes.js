// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const { sendNewsletter } = require("../controllers/adminController");

router.post("/newsletter", adminAuth, sendNewsletter);

module.exports = router;