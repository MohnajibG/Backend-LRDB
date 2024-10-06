const User = require("../models/User"); // Modèle User pour accéder aux données utilisateur

// Middleware d'authentification
const isAuthenticated = async (req, res, next) => {
  // Récupérer le token d'authentification de l'en-tête de la requête
  const token = req.headers.authorization?.split(" ")[1];

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    // Rechercher l'utilisateur dans la base de données par son token
    const user = await User.findOne({ token });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Attacher l'utilisateur à l'objet requête pour un accès ultérieur
    req.user = user;
    next(); // Passer au middleware suivant
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = isAuthenticated;
