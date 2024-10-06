const User = require("../Models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // Vérifie si l'en-tête 'Authorization' est présent
    if (req.headers.authorization) {
      // Extraction du token depuis l'en-tête
      const token = req.headers.authorization.replace("Bearer ", "");

      // Recherche de l'utilisateur correspondant au token
      const user = await User.findOne({ token }).select("account _id");

      if (user) {
        // Ajoute l'utilisateur à l'objet `req` pour le middleware suivant
        req.user = user;
        next(); // Passe au middleware suivant
      } else {
        return res.status(401).json({ message: "Unauthorized" }); // Si l'utilisateur n'est pas trouvé
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" }); // Si l'en-tête 'Authorization' est absent
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur interne du serveur
  }
};

module.exports = isAuthenticated;
