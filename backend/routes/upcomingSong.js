const express = require("express");
const UpcomingSong = require("../models/UpcomingSong");
const uploadTrailer = require("../config/uploadTrailer");

const router = express.Router();

/**
 * ===============================
 * ✅ ADD UPCOMING SONG
 * ===============================
 */
router.post(
  "/add",
  uploadTrailer.fields([
    { name: "trailer", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { songTitle, sungBy, previewInfo, publishedDate, itemType } =
        req.body;

      // ✅ Validate fields
      if (!songTitle || !sungBy || !publishedDate) {
        return res.status(400).json({
          message: "Song title, sung by, and published date are required",
        });
      }

      // ✅ Validate files
      if (!req.files?.trailer || !req.files?.thumbnail) {
        return res.status(400).json({
          message: "Trailer and thumbnail files are required",
        });
      }

      // ✅ Create upcoming song
      const upcomingSong = new UpcomingSong({
        songTitle,
        sungBy,
        previewInfo,
        publishedDate,
        itemType: itemType || "MP3",
        trailerUrl: req.files.trailer[0].location,
        thumbnailUrl: req.files.thumbnail[0].location,
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
  }
);

/**
 * ===============================
 * ✅ GET ALL UPCOMING SONGS
 * ===============================
 */
router.get("/", async (req, res) => {
  try {
    const upcomingSongs = await UpcomingSong.find().sort({
      publishedDate: -1,
    });

    res.status(200).json({
      success: true,
      upcomingSongs,
    });
  } catch (error) {
    console.error("GET UPCOMING SONGS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ===============================
 * ✅ GET SINGLE UPCOMING SONG
 * ===============================
 */
router.get("/:id", async (req, res) => {
  try {
    const upcoming = await UpcomingSong.findById(req.params.id);

    if (!upcoming) {
      return res.status(404).json({ message: "Upcoming song not found" });
    }

    // 🔥 IMPORTANT: return DIRECT OBJECT
    res.status(200).json(upcoming);
  } catch (error) {
    console.error("GET UPCOMING ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ===============================
 * ✅ UPDATE UPCOMING SONG
 * ===============================
 */
router.put(
  "/:id",
  uploadTrailer.fields([
    { name: "trailer", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { songTitle, sungBy, previewInfo, publishedDate, itemType } =
        req.body;

      const upcomingSong = await UpcomingSong.findById(req.params.id);

      if (!upcomingSong) {
        return res.status(404).json({ message: "Upcoming song not found" });
      }

      // ✅ Update text fields
      // ✅ Update text fields safely
if (songTitle) upcomingSong.songTitle = songTitle;
if (sungBy) upcomingSong.sungBy = sungBy;
if (previewInfo) upcomingSong.previewInfo = previewInfo;
if (itemType) upcomingSong.itemType = itemType;

// 🔥 IMPORTANT FIX: Date only update if value exists
if (publishedDate && publishedDate.trim() !== "") {
  upcomingSong.publishedDate = publishedDate;
}


      // ✅ Update files ONLY if uploaded
      if (req.files?.trailer) {
        upcomingSong.trailerUrl = req.files.trailer[0].location;
      }

      if (req.files?.thumbnail) {
        upcomingSong.thumbnailUrl = req.files.thumbnail[0].location;
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
  }
);

/**
 * ===============================
 * ✅ DELETE UPCOMING SONG
 * ===============================
 */
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
