const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // L'utilisateur est administrateur, passer à l'étape suivante
  } else {
    return res
      .status(403)
      .json({ message: "Accès refusé : administrateur seulement" });
  }
};
