const express = require("express");
const upload = require("../middlewares/upload.middleware");
const bannerController = require("../controllers/banner.controller");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "desktopImage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  bannerController.createBanner
);

router.get("/", bannerController.getAllBanners);

router.put(
  "/:id",
  upload.fields([
    { name: "desktopImage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  bannerController.updateBanner
);

router.delete("/:id", bannerController.deleteBanner);

module.exports = router;