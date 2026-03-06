const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { joinEvent, cancelEvent } = require("../controllers/bookingController");

router.post("/:eventId", authMiddleware, joinEvent);

router.put("/:eventId/cancel", authMiddleware, cancelEvent);

module.exports = router;