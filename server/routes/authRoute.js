const router = require("express").Router();
const authController = require("../controllers/authController");
const {register,login,getUserById} = authController;


router.post("/register", register);
router.post("/login", login);
router.get("/users/:id",getUserById);

module.exports = router;
