require("dotenv").config();

const isAdmin = (req, res, next) => {
  try {
    // Récupérer le token de l'utilisateur depuis la requête (via headers ou params)
    const adminToken = req.headers.authorization.replace("Bearer ", "");

    // Comparer le token avec celui dans .env
    if (adminToken && adminToken === process.env.ADMIN_TOKEN) {
      // Si le token est valide (autorisation réussie)
      next();
    } else {
      // Si non renvoie de message Accés refusé
      return res.status(403).json({ message: "Accès refusé." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAdmin;
