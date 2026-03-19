const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

const User = require("../models/user.model");
const PasswordReset = require("../models/passwordReset.model");

class UserController {

  static async signup(req, res) {

    try {

      const { email, password, name } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        name
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Database error"
      });

    }

  }

  static async login(req, res) {

    try {

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });

    } catch (error) {

  console.log(error);   // VERY IMPORTANT

  res.status(500).json({
    message: "Database error",
    error: error.message
  });

}

  }

  static async updateUser(req, res) {

    try {

      const { name } = req.body;
      const userId = req.params.id;

      await User.update(
        { name },
        { where: { id: userId } }
      );

      res.json({ message: "User updated successfully" });

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

  static async updatePassword(req, res) {

    try {

      const { password } = req.body;
      const userId = req.params.id;

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.update(
        { password: hashedPassword },
        { where: { id: userId } }
      );

      res.json({ message: "Password updated successfully" });

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

  static async forgotPassword(req, res) {

    try {

      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);

      const expiry = new Date(Date.now() + 300000);

      await PasswordReset.create({
        user_id: user.id,
        otp,
        expiry
      });

      const message = `Your OTP for password reset is: ${otp}`;

      await sendEmail(email, "Password Reset OTP", message);

      res.json({ message: "OTP sent to email" });

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

  static async resetPassword(req, res) {

    try {

      const { email, otp, newPassword } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const reset = await PasswordReset.findOne({
        where: {
          user_id: user.id,
          otp
        }
      });

      if (!reset || reset.expiry < new Date()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.update(
        { password: hashedPassword },
        { where: { id: user.id } }
      );

      res.json({ message: "Password reset successful" });

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

}

module.exports = UserController;