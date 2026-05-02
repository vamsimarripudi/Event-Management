const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const {getUserProfile} = require("../controllers/profileController");

router.get('/profile',verifyToken,getUserProfile);

module.exports = router;

