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
});

module.exports = mongoose.model("User", UserSchema);
