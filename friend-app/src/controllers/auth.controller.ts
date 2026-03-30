import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEncrypted } from "../utils/response.util";
import crypto from "crypto";
import { sendEmail } from "../utils/mail.util";

export const register = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ message: "User exists" }); 
  }

  const hashed = await bcrypt.hash(password, 10);

  const count = await User.countDocuments();
  const userId = `user${String(count + 1).padStart(2, "0")}`;

  const user = await User.create({
    userId,
    name,
    email,
    password: hashed
  });

  return sendEncrypted(res, user); 
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" }); 
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid password" }); 
  }

  const token = jwt.sign({ id: user._id }, "secret");
  console.log("LOGIN TOKEN:", token);

  return sendEncrypted(res, { token }); 
};

export const forgotPassword = async (req: any, res: any) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" }); 
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

  await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

  return sendEncrypted(res, { message: "OTP sent to email" }); 
};

export const resetPassword = async (req: any, res: any) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() }
    });

    if (!user) {

      await sendEmail(
        email,
        "Password Reset Failed",
        "There was an issue resetting your password. Please try again."
      );

      return res.status(400).json({ message: "Password reset failed" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    await sendEmail(
      email,
      "Password Reset Successful",
      "Your password has been successfully updated."
    );

    return sendEncrypted(res, { message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);

    await sendEmail(
      email,
      "Password Reset Failed",
      "There was an issue resetting your password. Please try again."
    );

    return res.status(500).json({ message: "Password reset failed" });
  }
};