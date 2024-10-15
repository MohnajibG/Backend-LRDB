const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  orderNumber: {
    type: Number, // Numéro de la commande
  },
  etat: {
    type: Boolean,
    default: false, // Valeur par défaut
  },
  items: [
    {
      name: { type: String }, // Nom de l'article
      quantity: { type: Number }, // Quantité
      price: { type: Number }, // Prix
    },
  ],
  totalPrice: { type: Number }, // Prix total
  createdAt: {
    type: Date,
    default: Date.now, // Date de création
  },
});

module.exports = Order;
