const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");

// ================== CRUD OPERATIONS ==================

// CREATE
router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================== DOWNLOAD CSV (RAW) ==================

router.get("/download-csv", async (req, res) => {
  try {
    const users = await User.find();

    let csv = "_id,name,email,age\n";

    users.forEach(user => {
      csv += `${user._id},${user.name},${user.email},${user.age}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================== UPLOAD CSV (RAW – NO MULTER) ==================

router.post("/upload-csv", async (req, res) => {
  try {
    let rawData = "";

    req.on("data", chunk => {
      rawData += chunk.toString();
    });

    req.on("end", async () => {

      const lines = rawData.split("\n");

      let updatedCount = 0;

      for (let i = 1; i < lines.length; i++) {

        if (!lines[i]) continue;

        const [id, name, email, age] = lines[i].split(",");

        if (!mongoose.Types.ObjectId.isValid(id)) continue;

        const result = await User.findByIdAndUpdate(
          id.trim(),
          {
            name: name?.trim(),
            email: email?.trim(),
            age: Number(age)
          }
        );

        if (result) updatedCount++;
      }

      res.json({
        message: "CSV processed successfully (RAW)",
        totalUpdated: updatedCount
      });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;