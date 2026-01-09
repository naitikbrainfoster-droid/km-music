require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://kundramusic.com", "https://www.kundramusic.com"],
  credentials: true
}));

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/favorites", require("./routes/favorites"));
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/adminAuth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/enquiry", require("./routes/enquiry"));
app.use("/api/artists", require("./routes/artist"));
app.use("/api/songs", require("./routes/song"));
app.use("/api/upcoming", require("./routes/upcomingSong"));

//=====================
//HEALTH CHECK 
app.get("/api/health", (req, res) => {
     res.json({ status: "ok" });
});

// =======================
// STATIC
// =======================

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// START SERVER
// =======================
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(5000, "0.0.0.0", () => {
      console.log("🚀 API running on port 5000");
    });
  } catch (err) {
    console.error("❌ Mongo error:", err);
  }
}

start();
