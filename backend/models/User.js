const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String, // normal login ke liye
    },

    googleId: {
      type: String, // google login ke liye
    },

    avatar: {
      type: String,
      default: "", // ✅ important (no image case)
    },
  },
  {
    timestamps: true, // ✅ createdAt, updatedAt
  }
);

module.exports = mongoose.model("User", UserSchema);
