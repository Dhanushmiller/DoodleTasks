const express = require("express");
const router = express.Router();

const { createEvent, getParticipants, getEvents } = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/roleMiddleware");


// GET EVENTS (pagination)
router.get("/", getEvents);


// GET EVENT PARTICIPANTS
router.get("/:eventId/participants", authMiddleware, authorizeAdmin, getParticipants);


// CREATE EVENT (admin only)
router.post("/", authMiddleware, authorizeAdmin, createEvent);


module.exports = router;