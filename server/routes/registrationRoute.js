const Router = require("express").Router();
const {
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
  upcomingRegistrations,
  pastRegistrations,
  getRegistrationStatus
} = require("../controllers/registrationController");
const verifyToken = require("../middleware/token");

Router.post("/register", verifyToken, registerForEvent);
Router.post("/cancel", verifyToken, cancelRegistration);
Router.get("/status",verifyToken,getRegistrationStatus)
Router.get("/my-events", verifyToken, getUserRegistrations);


module.exports = Router;
