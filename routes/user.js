const express = require("express");
const User = require("../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Route de signup
router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérification des paramètres
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    // Vérification si l'email existe déjà
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(409).json({ message: "Email already in database" });
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Génération du salt et du hash
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    // Génération du token
    const token = uid2(16);

    // Création du nouvel utilisateur
    const newUser = new User({
      username,
      email,
      token,
      hash,
      salt,
    });

    // Sauvegarde de l'utilisateur
    await newUser.save();

    // Réponse avec les informations de l'utilisateur, excluant le hash et le salt
    return res.status(201).json({
      id: newUser._id, // ID de l'utilisateur
      username: newUser.username,
      email: newUser.email,
      token: newUser.token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Recréer le hash du mot de passe en combinant le mot de passe avec le salt de l'utilisateur
    const hash = SHA256(password + user.salt).toString(encBase64);

    // Vérifier si le hash recréé correspond au hash stocké
    if (hash !== user.hash) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Vérification si l'utilisateur est admin
    const adminToken = process.env.ADMIN_TOKEN;
    const isAdmin = user.token === adminToken;

    // Réponse avec le token et l'information si l'utilisateur est admin
    return res.status(200).json({
      token: user.token,
      isAdmin, // Renvoie true ou false
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
