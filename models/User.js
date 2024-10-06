const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    unique: true, // Doit être unique
    type: String,
  },
  username: {
    type: String,
  },
  token: String, // Token d'authentification
  hash: String, // Hash du mot de passe
  salt: String, // Sel pour le hachage
});

module.exports = mongoose.model("User", UserSchema);
