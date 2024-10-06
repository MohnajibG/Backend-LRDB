const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
