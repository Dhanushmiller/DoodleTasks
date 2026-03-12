const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth.middleware");


router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.put("/update-user/:id", authenticateToken, UserController.updateUser);
router.put("/update-password/:id", authenticateToken, UserController.updatePassword);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

module.exports = router;

const validate = require("../middleware/validate.middleware");
const { signupSchema, loginSchema } = require("../validators/user.validator");

router.post(
  "/signup",
  validate(signupSchema),
  UserController.signup
);

router.post(
  "/login",
  validate(loginSchema),
  UserController.login
);