const express = require("express");
const router = express.Router();

const { createEvent, getParticipants, getEvents,searchEventsByLocation,getNearbyEvents } = require("../controllers/eventController");


const authMiddleware = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/roleMiddleware");


// GET EVENTS (pagination)
router.get("/", getEvents);
router.get("/nearby", getNearbyEvents);

router.get("/search", searchEventsByLocation);


// GET EVENT PARTICIPANTS
router.get("/:eventId/participants", authMiddleware, authorizeAdmin, getParticipants);


// CREATE EVENT (admin only)
router.post("/", authMiddleware, authorizeAdmin, createEvent);


module.exports = router;