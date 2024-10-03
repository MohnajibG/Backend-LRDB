const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
  },
  etat: {
    type: Boolean,
    default: false,
  },
  items: [
    {
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
  totalPrice: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
