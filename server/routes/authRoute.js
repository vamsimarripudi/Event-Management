const router = require("express").Router();
const authController = require("../controllers/authController");
const {register,login,getUserById,forgotPassword,resetPassword} = authController;


router.post("/register", register);
router.post("/login", login);
router.get("/users/:id",getUserById);
router.post("/forgot-password",forgotPassword);
router.post("reset-password/:token",resetPassword);

module.exports = router;
