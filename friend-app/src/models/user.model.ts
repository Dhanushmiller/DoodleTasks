import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, 

  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },

  otp: { type: String },
  otpExpiry: { type: Date },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);