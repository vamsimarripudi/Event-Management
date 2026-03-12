const router = require("express").Router();
const {getAllEvents,getEventById} = require("../controllers/eventController");
const verifyToken = require("../middleware/token");


router.get("/events",verifyToken, getAllEvents);
router.get("/events/:id", verifyToken, getEventById);


module.exports = router;
