const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String, // Email de L'utilisateur
  },
  username: {
    type: String, // Nom de L'uulisateur
  },

  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
