const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getMyEvents, updateProfile } = require("../controllers/userController");

router.get("/my-events", authMiddleware, getMyEvents);

router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;