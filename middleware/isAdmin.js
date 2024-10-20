require("dotenv").config();

const isAdmin = (req, res, next) => {
  try {
    // Vérifie si le token de l'utilisateur correspond au token admin
    if (req.user.token === process.env.ADMIN_TOKEN) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized: Accès réservé aux administrateurs uniquement",
      }); // Erreur "Unauthorized" qui va permettre de rediriger les clients vers la page d'accueil après une authentification
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAdmin;
