require("dotenv").config({ path: "./config/.env" }); // ✅ ADD THIS

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const artistRoute = require("./routes/artist");
const songRoute = require("./routes/song");
const upcomingSongRoute = require("./routes/upcomingSong");

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
app.use("/api/artists", artistRoute);
app.use("/api/songs", songRoute);
app.use("/api/upcoming", upcomingSongRoute);
// =======================
// SERVE UPLOADS
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", require("./routes/admin"));


// =======================
// MONGO DB
// =======================
const MONGO_URI = process.env.MONGO_URI;


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
