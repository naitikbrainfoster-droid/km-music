const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// =======================
// IMPORT ROUTES
// =======================
const favoritesRoute = require("./routes/favorites");
const authRoute = require("./routes/auth");

// =======================
// USE ROUTES
// =======================
// auth.js handles:
// POST /register
// POST /login
// POST /google-login
app.use("/", authRoute);

// favorites routes
app.use("/favorites", favoritesRoute);

// =======================
// MONGO URI
// =======================
const MONGO_URI =
  "mongodb+srv://km_db_user:Km0126@km.0g6ehcw.mongodb.net/km_music_app?retryWrites=true&w=majority&appName=KM";

// =======================
// START SERVER + CONNECT MONGO
// =======================
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    app.listen(5000, () =>
      console.log("🚀 Server running on http://localhost:5000")
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

start();

// =======================
// HEALTH CHECK
// =======================
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
