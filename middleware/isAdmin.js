const dotenv = require("dotenv");
dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

const isAdmin = (req, res, next) => {
  const adminToken = process.env.ADMIN_TOKEN; // Récupérer le token admin du fichier .env
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token de l'en-tête

  if (token === adminToken) {
    req.isAdmin = true; // Ajoute une propriété isAdmin à la requête
    next(); // L'utilisateur est administrateur, passer à l'étape suivante
  } else {
    req.isAdmin = false; // Ajoute une propriété isAdmin à la requête
    next(); // L'utilisateur n'est pas administrateur, passer à l'étape suivante
  }
};

module.exports = isAdmin;
