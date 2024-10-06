const User = require("../models/User"); // Ton modèle User

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Token envoyé depuis le frontend
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    // Rechercher l'utilisateur dans la base de données par son token
    const user = await User.findOne({ token }); // Si tu stockes un token simple
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Attacher l'utilisateur à l'objet requête
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = isAuthenticated;
