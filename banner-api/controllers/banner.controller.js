const Banner = require("../models/banner.model");
const { createBannerValidation } = require("../validations/banner.validation");
const { getPagination } = require("../helpers/pagination.helper");

// =============================
// CREATE
// =============================
exports.createBanner = async (req, res) => {
  try {
    const { error } = createBannerValidation(req.body);

    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }

    if (!req.files?.desktopImage || !req.files?.mobileImage) {
      return res.status(400).json({
        status: 400,
        message: "Both images are required",
      });
    }

    const banner = new Banner({
      name: req.body.name,
      link: req.body.link,
      status:
        req.body.status?.toString().trim() === "true",
      desktopImage: req.files.desktopImage[0].path,
      mobileImage: req.files.mobileImage[0].path,
    });

    await banner.save();

    return res.status(201).json({
      status: 201,
      message: "Banner created successfully",
      data: banner,
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


// =============================
// GET ALL
// =============================
exports.getAllBanners = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const banners = await Banner.find()
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Banner.countDocuments();

    return res.status(200).json({
      status: 200,
      message: "Banners fetched successfully",
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: banners,
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


// =============================
// UPDATE
// =============================
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        status: 404,
        message: "Banner not found",
      });
    }

    if (req.body.name) banner.name = req.body.name;
    if (req.body.link) banner.link = req.body.link;
    if (req.body.status !== undefined) {
      banner.status = req.body.status.toString().trim() === "true";
    }

    if (req.files?.desktopImage) {
      banner.desktopImage = req.files.desktopImage[0].path;
    }

    if (req.files?.mobileImage) {
      banner.mobileImage = req.files.mobileImage[0].path;
    }

    await banner.save();

    return res.status(200).json({
      status: 200,
      message: "Banner updated successfully",
      data: banner,
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


// =============================
// DELETE
// =============================
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        status: 404,
        message: "Banner not found",
      });
    }

    await Banner.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      status: 200,
      message: "Banner deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};