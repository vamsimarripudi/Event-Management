const router = require("express").Router();
const authController = require("../controllers/authController");
const {register,login,getUserById} = authController;
const verifyToken = require("../middleware")

router.post("/register", register);
router.post("/login", login);
router.get("/users/:id",verifyToken,getUserById);

module.exports = router;
