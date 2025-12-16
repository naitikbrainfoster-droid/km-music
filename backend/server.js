const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// =======================
// ROUTES
// =======================
const authRoute = require("./routes/auth");
const favoritesRoute = require("./routes/favorites");
const userRoute = require("./routes/user");
const adminAuthRoute = require("./routes/adminAuth"); // ✅ VERY IMPORTANT
const enquiryRoute = require("./routes/enquiry");

// =======================
// USE ROUTES
// =======================
app.use("/", authRoute);
app.use("/favorites", favoritesRoute);
app.use("/user", userRoute);
app.use("/api/admin", adminAuthRoute); // ✅ VERY IMPORTANT
app.use("/api/enquiry", enquiryRoute);
// =======================
// SERVE UPLOADS
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// MONGO DB
// =======================
const MONGO_URI =
  "mongodb+srv://km_db_user:Km0126@km.0g6ehcw.mongodb.net/km_music_app";

// =======================
// START SERVER
// =======================
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  } catch (err) {
    console.error("❌ Mongo error:", err);
  }
}

start();

// =======================
// HEALTH CHECK
// =======================
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
