const express = require("express");
const Artist = require("../models/Artist");
const uploadArtistImage = require("../config/uploadArtist");

const router = express.Router();

// ✅ ADD ARTIST
router.post(
  "/add",
  uploadArtistImage.single("image"),
  async (req, res) => {
    try {
      const { name, bio, instagram, youtube, facebook } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Artist image required" });
      }

      const artist = new Artist({
        name,
        bio,
        imageUrl: req.file.location, // ✅ MATCHES SCHEMA
        socialLinks: {
          instagram,
          youtube,
          facebook,
        },
      });

      await artist.save();

      res.status(201).json({
        success: true,
        message: "Artist added successfully",
        artist,
      });
    } catch (error) {
      console.error("ADD ARTIST ERROR:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
