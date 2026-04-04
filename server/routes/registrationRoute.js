const Router = require("express").Router();
const {
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
} = require("../controllers/registrationController");
const verifyToken = require("../middleware/token");

Router.post("/register", verifyToken, registerForEvent);
Router.post("/cancel", verifyToken, cancelRegistration);
Router.get("/my-events", verifyToken, getUserRegistrations);

module.exports = Router;
