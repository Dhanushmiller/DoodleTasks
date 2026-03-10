const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/mailer");
const { getCoordinates } = require("../utils/geocode");
const {registerSchema, loginSchema } = require("./../validators/authvalidator");
const { errorHandler } = require("../utils/errorHandler");

// REGISTER
exports.register = async (req, res) => {

  try {

    const { name, email, password, role, location } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    // Convert location to latitude & longitude
    const coords = await getCoordinates(location);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      location: location,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({
      otp,
      otp_expiry: expiry
    });

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP for password reset is: ${otp}`
    );

    res.json({ message: "OTP sent to email" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({
      where: { email, otp }
    });

    if (!user || new Date(user.otp_expiry) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {

    const { email, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hashedPassword,
      otp: null,
      otp_expiry: null
    });

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};