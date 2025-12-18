const express = require("express");
const UpcomingSong = require("../models/UpcomingSong");
const uploadTrailer = require("../config/uploadTrailer");

const router = express.Router();

// ✅ ADD UPCOMING SONG
router.post("/add", uploadTrailer.single("trailer"), async (req, res) => {
  try {
    const { songTitle, sungBy, previewInfo, publishedDate, itemType } = req.body;

    // Validate required fields
    if (!songTitle || !sungBy || !publishedDate) {
      return res.status(400).json({
        message: "Song title, sung by, and published date are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Trailer file is required",
      });
    }

    // Create upcoming song
    const upcomingSong = new UpcomingSong({
      songTitle,
      sungBy,
      previewInfo,
      publishedDate,
      itemType: itemType || "MP3",
      trailerUrl: req.file.location,
    });

    await upcomingSong.save();

    res.status(201).json({
      success: true,
      message: "Upcoming song added successfully",
      upcomingSong,
    });
  } catch (error) {
    console.error("ADD UPCOMING SONG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET ALL UPCOMING SONGS
router.get("/", async (req, res) => {
  try {
    const upcomingSongs = await UpcomingSong.find()
      .sort({ publishedDate: -1 });

    res.status(200).json({
      success: true,
      upcomingSongs,
    });
  } catch (error) {
    console.error("GET UPCOMING SONGS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
