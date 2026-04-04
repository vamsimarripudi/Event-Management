const router = require("express").Router();
const {getAllEvents,getEventById,searchEvents} = require("../controllers/eventController");
const verifyToken = require("../middleware/token");


router.get("/events",verifyToken, getAllEvents);
router.get("/events/:id", verifyToken, getEventById);
router.get("/search", verifyToken, searchEvents);



module.exports = router;
