const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
      trim: true,
    },

    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    artistName: {
      type: String,
      required: true,
    },

    songUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
