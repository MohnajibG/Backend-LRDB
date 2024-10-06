require("dotenv").config();

const isAdmin = (req, res, next) => {
  try {
    // Vérifie si le token de l'utilisateur correspond au token admin
    if (req.user.token === process.env.ADMIN_TOKEN) {
      next(); // Si oui, on continue vers la route protégée
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized: Admin access only" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur interne du serveur
  }
};

module.exports = isAdmin;
