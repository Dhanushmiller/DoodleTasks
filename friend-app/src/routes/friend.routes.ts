import express from "express";
import {
  sendRequest,
  respondRequest,
  getFriends,
  getUsers,
  getFriendRequests
} from "../controllers/friend.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/users", authMiddleware, getUsers);
router.post("/send", authMiddleware, sendRequest);
router.post("/respond", authMiddleware, respondRequest);
router.get("/friends", authMiddleware, getFriends);
router.get("/requests", authMiddleware, getFriendRequests);

export default router;