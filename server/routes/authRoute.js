const router = require("express").Router();
const authController = require("../controllers/authController");
const {register,login} = authController;

router.post("/register", register);
router.post("/login", login);

module.exports = router;
