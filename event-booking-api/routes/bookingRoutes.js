const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { joinEvent, cancelEvent } = require("../controllers/bookingController");
const { authorizeUser } = require("../middleware/roleMiddleware");

router.post("/:eventId", authMiddleware, authorizeUser,joinEvent);

router.put("/:eventId/cancel", authMiddleware, authorizeUser,cancelEvent);

module.exports = router;