const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },          // normal login ke liye
  googleId: { type: String },           // google login ke liye
});

module.exports = mongoose.model("User", UserSchema);
