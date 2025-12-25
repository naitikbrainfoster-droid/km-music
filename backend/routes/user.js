const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user"); // ✅ correct folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});

/* =========================
   UPDATE PROFILE
========================= */
router.put("/update", upload.single("avatar"), async (req, res) => {
  try {
    const { userId, fullName, email, password } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing",
      });
    }

    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (req.file) {
      updateData.avatar = `/uploads/user/${req.file.filename}`; // ✅ store RELATIVE path
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
