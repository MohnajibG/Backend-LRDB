const isAdmin = (req, res, next) => {
  // Vérifier si l'utilisateur est connecté et s'il a le statut d'administrateur
  if (req.user && req.user.isAdmin) {
    next(); // L'utilisateur est administrateur, passer à l'étape suivante
  } else {
    // Si ce n'est pas le cas, renvoyer une erreur d'accès refusé
    return res
      .status(403)
      .json({ message: "Accès refusé : administrateur seulement" });
  }
};

// Exporter le middleware isAdmin pour l'utiliser dans d'autres fichiers
module.exports = isAdmin;
