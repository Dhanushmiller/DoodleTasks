const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    status: { type: Boolean, default: true },
    desktopImage: { type: String, required: true },
    mobileImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);