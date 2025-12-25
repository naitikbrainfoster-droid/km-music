const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

/**
 * ===============================
 * ✅ REGISTER ADMIN
 * ===============================
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashed,
      status: "active",
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (err) {
    console.error("REGISTER ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ===============================
 * ✅ GET ALL ADMINS (AS USERS)
 * ===============================
 */
router.get("/users", async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users: admins, // frontend expects "users"
    });
  } catch (error) {
    console.error("GET ADMINS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ===============================
 * ✅ GET SINGLE ADMIN (EDIT PAGE)
 * ===============================
 */
router.get("/users/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: admin,
    });
  } catch (error) {
    console.error("GET ADMIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ===============================
 * ✅ UPDATE ADMIN (EDIT USER)
 * ===============================
 */
router.put("/users/:id", async (req, res) => {
  try {
    const { name, status } = req.body;

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) admin.name = name;
    if (status) admin.status = status;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: admin,
    });
  } catch (error) {
    console.error("UPDATE ADMIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ===============================
 * ✅ DELETE ADMIN
 * ===============================
 */
router.delete("/users/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ADMIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
