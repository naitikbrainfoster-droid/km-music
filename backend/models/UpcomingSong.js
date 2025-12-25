const mongoose = require("mongoose");

const upcomingSongSchema = new mongoose.Schema(
  {
    songTitle: {
      type: String,
      required: true,
      trim: true,
    },

    sungBy: {
      type: String,
      required: true,
      trim: true,
    },

    previewInfo: {
      type: String,
      default: "",
    },

    publishedDate: {
      type: Date,
      required: true,
    },

    itemType: {
      type: String,
      enum: ["MP3", "Video"],
      default: "MP3",
    },

    trailerUrl: {
      type: String,
      required: true,
    },

    // ✅ ADD THIS
    thumbnailUrl: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpcomingSong", upcomingSongSchema);
