// routes/mediaRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");

const {
  getUploadUrl,
  deleteMedia,
} = require("../controllers/mediaController");

router.get("/upload-url", verifyToken, getUploadUrl);
router.delete("/delete", verifyToken, deleteMedia);

module.exports = router;