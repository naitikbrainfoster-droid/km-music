const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "1063920408034-bp4irutj5pgd3eodbmolubs75vmkqmv6.apps.googleusercontent.com"
);

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already registered" });
    }

    await new User({ fullName, email, password }).save();
    res.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.json({ success: false, message: "Registration failed" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.password !== password)
      return res.json({ success: false, message: "Wrong password" });

    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.json({ success: false, message: "Login failed" });
  }
});

// ================= GOOGLE LOGIN =================
router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "1063920408034-bp4irutj5pgd3eodbmolubs75vmkqmv6.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        googleId: sub,
      });
    }

    res.json({
      success: true,
      message: "Google login successful",
      user,
    });
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.json({ success: false, message: "Google login failed" });
  }
});

module.exports = router;
