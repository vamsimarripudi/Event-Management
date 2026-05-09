// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const { sendNewsletter } = require("../controllers/adminController");


router.post("/newsletter", verifyToken, sendNewsletter);

module.exports = router;