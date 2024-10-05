const User = require("../models/User");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    // Recherche de l'utilisateur avec le token
    const user = await User.findOne({ token });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé : Utilisateur non trouvé" });
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
