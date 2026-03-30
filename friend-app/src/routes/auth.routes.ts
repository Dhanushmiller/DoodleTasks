import express from "express";
import { register, login,forgotPassword,
  resetPassword } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;