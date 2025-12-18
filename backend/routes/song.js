const express = require("express");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");

const router = express.Router();

// ✅ CONFIGURE MULTER FOR MULTIPLE FILES (Song + Thumbnail)
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      if (file.fieldname === "song") {
        cb(null, `songs/${Date.now()}-${file.originalname}`);
      } else if (file.fieldname === "thumbnail") {
        cb(null, `thumbnails/${Date.now()}-${file.originalname}`);
      }
    },
  }),
});

const multiUpload = upload.fields([
  { name: "song", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

// ✅ GET ALL ARTISTS (for dropdown)
router.get("/artists", async (req, res) => {
  try {
    const artists = await Artist.find({ isActive: true }).select(
      "_id name"
    );

    res.status(200).json({
      success: true,
      artists,
    });
  } catch (error) {
    console.error("GET ARTISTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ VERIFY ARTIST (check if ID and Name match)
router.post("/verify-artist", async (req, res) => {
  try {
    const { artistId, artistName } = req.body;

    if (!artistId || !artistName) {
      return res.status(400).json({
        success: false,
        message: "Artist ID and Name are required",
      });
    }

    const artist = await Artist.findById(artistId);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    if (artist.name.toLowerCase() !== artistName.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Artist ID and Name do not match",
      });
    }

    res.status(200).json({
      success: true,
      message: "Artist verified successfully",
      artist: {
        _id: artist._id,
        name: artist.name,
      },
    });
  } catch (error) {
    console.error("VERIFY ARTIST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADD SONG
router.post("/add", multiUpload, async (req, res) => {
  try {
    const { songName, artistId, artistName, category, likes } = req.body;

    // Validate required fields
    if (!songName || !artistId || !artistName || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.files || !req.files.song || !req.files.thumbnail) {
      return res.status(400).json({
        message: "Song and thumbnail files are required",
      });
    }

    // Verify artist exists and name matches
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    if (artist.name.toLowerCase() !== artistName.toLowerCase()) {
      return res.status(400).json({
        message: "Artist ID and Name do not match",
      });
    }

    // Get file locations from multer-s3
    const songFile = req.files.song[0];
    const thumbnailFile = req.files.thumbnail[0];

    // Create song
    const song = new Song({
      songName,
      artistId,
      artistName,
      songUrl: songFile.location,
      thumbnailUrl: thumbnailFile.location,
      category,
      likes: likes || 0,
    });

    await song.save();

    res.status(201).json({
      success: true,
      message: "Song added successfully",
      song,
    });
  } catch (error) {
    console.error("ADD SONG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET ALL SONGS
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artistId", "name imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      songs,
    });
  } catch (error) {
    console.error("GET SONGS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
