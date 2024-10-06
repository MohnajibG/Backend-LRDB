// middleware/isAuthenticated.js
const User = require("../models/User"); // Ton modèle User

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token de l'en-tête
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    // Rechercher l'utilisateur dans la base de données par son token
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Attacher l'utilisateur à l'objet requête
    req.user = user; // L'utilisateur est maintenant accessible dans req.user
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = isAuthenticated;
