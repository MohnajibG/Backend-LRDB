const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // Vérifie si l'en-tête 'Authorization' est présent
    if (req.headers.authorization) {
      // Extraction du token depuis l'en-tête
      const token = req.headers.authorization.replace("Bearer ", "");

      // Recherche de l'utilisateur correspondant au token
      const user = await User.findOne({ token }).select;

      if (user) {
        req.user = user; // Ajoute l'utilisateur à l'objet `req`
        next(); // Passe au middleware suivant
      } else {
        return res.status(401).json({ message: "Unauthorized" }); // Utilisateur non trouvé
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" }); // En-tête 'Authorization' absent
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur interne du serveur
  }
};

module.exports = isAuthenticated;
