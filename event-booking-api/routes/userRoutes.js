const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/roleMiddleware");
const { getMyEvents, updateProfile } = require("../controllers/userController");
const { bulkRegisterUsers } = require("../controllers/userController");
const { getUsersWithEvents } = require("../controllers/userController");

router.get("/my-events", authMiddleware, getMyEvents);
router.post("/bulk-register", bulkRegisterUsers);
router.get("/admin/users-events", authMiddleware, authorizeAdmin,getUsersWithEvents);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;