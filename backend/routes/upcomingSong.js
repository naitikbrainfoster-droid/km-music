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

// ✅ GET SINGLE UPCOMING SONG
router.get("/:id", async (req, res) => {
  try {
    const upcomingSong = await UpcomingSong.findById(req.params.id);

    if (!upcomingSong) {
      return res.status(404).json({ message: "Upcoming song not found" });
    }

    res.status(200).json({
      success: true,
      upcomingSong,
    });
  } catch (error) {
    console.error("GET UPCOMING SONG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE UPCOMING SONG
router.put("/:id", uploadTrailer.single("trailer"), async (req, res) => {
  try {
    const { songTitle, sungBy, previewInfo, publishedDate, itemType } = req.body;

    const upcomingSong = await UpcomingSong.findById(req.params.id);

    if (!upcomingSong) {
      return res.status(404).json({ message: "Upcoming song not found" });
    }

    // Update fields
    upcomingSong.songTitle = songTitle || upcomingSong.songTitle;
    upcomingSong.sungBy = sungBy || upcomingSong.sungBy;
    upcomingSong.previewInfo = previewInfo || upcomingSong.previewInfo;
    upcomingSong.publishedDate = publishedDate || upcomingSong.publishedDate;
    upcomingSong.itemType = itemType || upcomingSong.itemType;

    // Update trailer if new one uploaded
    if (req.file) {
      upcomingSong.trailerUrl = req.file.location;
    }

    await upcomingSong.save();

    res.status(200).json({
      success: true,
      message: "Upcoming song updated successfully",
      upcomingSong,
    });
  } catch (error) {
    console.error("UPDATE UPCOMING SONG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE UPCOMING SONG
router.delete("/:id", async (req, res) => {
  try {
    const upcomingSong = await UpcomingSong.findByIdAndDelete(req.params.id);

    if (!upcomingSong) {
      return res.status(404).json({ message: "Upcoming song not found" });
    }

    res.status(200).json({
      success: true,
      message: "Upcoming song deleted successfully",
    });
  } catch (error) {
    console.error("DELETE UPCOMING SONG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
