const express = require("express");
const User = require("../models/User");
const uid2 = require("uid2");

const router = express.Router();

// Route de signup
router.post("/user/signup", async (req, res) => {
  try {
    const { username, code } = req.body;

    // Vérification des paramètres
    if (!username || !code) {
      return res.status(400).json({ message: "Paramètres manquants" });
    }

    // Vérification si le code existe déjà
    const userCode = await User.findOne({ code });
    if (userCode) {
      return res.status(409).json({ message: "Ce compte est déjà activé" });
    }

    // Vérification que le code est un nombre de 6 chiffres
    if (code.length !== 6 || isNaN(code)) {
      return res
        .status(400)
        .json({ message: "Votre code doit être un nombre de 6 chiffres" });
    }

    // Génération d'un token
    const token = uid2(16);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      code,
      token,
    });

    console.log(newUser);

    // Sauvegarde de l'utilisateur
    await newUser.save();

    // Réponse avec les informations de l'utilisateur
    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      username: newUser.username,
      token: newUser.token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE DE LOGIN
router.post("/user/login", async (req, res) => {
  try {
    const { username, code } = req.body;

    // Vérification des paramètres
    if (!username || !code) {
      return res.status(400).json({ message: "Paramètres manquants" });
    }

    // Recherche de l'utilisateur par username et code
    const user = await User.findOne({ username, code });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Utilisateur non trouvé ou code incorrect" });
    }

    // Réponse avec le token et le nom d'utilisateur
    return res.status(200).json({
      message: "Connexion réussie",
      token: user.token,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
