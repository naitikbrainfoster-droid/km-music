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

// ✅ GET ALL ARTISTS
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      artists,
    });
  } catch (error) {
    console.error("GET ARTISTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET SINGLE ARTIST
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json({
      success: true,
      artist,
    });
  } catch (error) {
    console.error("GET ARTIST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE ARTIST
router.put(
  "/:id",
  uploadArtistImage.single("image"),
  async (req, res) => {
    try {
      const { name, bio, instagram, youtube, facebook, isActive } = req.body;

      const artist = await Artist.findById(req.params.id);

      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }

      // Update fields
      artist.name = name || artist.name;
      artist.bio = bio || artist.bio;
      artist.socialLinks = {
        instagram: instagram || artist.socialLinks.instagram,
        youtube: youtube || artist.socialLinks.youtube,
        facebook: facebook || artist.socialLinks.facebook,
      };
      
      if (isActive !== undefined) {
        artist.isActive = isActive === "true" || isActive === true;
      }

      // Update image if new one uploaded
      if (req.file) {
        artist.imageUrl = req.file.location;
      }

      await artist.save();

      res.status(200).json({
        success: true,
        message: "Artist updated successfully",
        artist,
      });
    } catch (error) {
      console.error("UPDATE ARTIST ERROR:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ✅ DELETE ARTIST
router.delete("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json({
      success: true,
      message: "Artist deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ARTIST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
