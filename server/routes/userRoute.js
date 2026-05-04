const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
} = require("../controllers/profileController");


const upload = require("../services/fileFilter"); // multer

router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);
router.post("/profile/avatar",verifyToken, upload.single("avatar"), uploadAvatar);
router.delete("/profile/avatar", verifyToken, deleteAvatar);

module.exports = router;



