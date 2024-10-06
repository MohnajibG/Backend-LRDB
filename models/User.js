const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
  },
  username: {
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
