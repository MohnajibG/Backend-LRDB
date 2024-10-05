const mongoose = require("mongoose");

// Définir le schéma User
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

// Exporter le modèle User
module.exports = mongoose.model("User", UserSchema);
