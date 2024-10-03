const express = require("express");
const Order = require("../models/Order");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// Route pour créer une nouvelle commande
router.post("/order", async (req, res) => {
  try {
    const { items, totalPrice, etat } = req.body;

    // Récupérer la dernière commande pour déterminer le dernier numéro de commande
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });

    // Créer la nouvelle commande avec le numéro de commande incrémenté
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    // Créer une nouvelle commande
    const newOrder = new Order({
      orderNumber: newOrderNumber,
      etat,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Commande enregistrée 🫡",
      orderNumber: newOrder.orderNumber,
      id: newOrder._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer toutes les commandes
router.get("/orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/order/:id", isAuthenticated, async (req, res) => {
  try {
    const statusOrder = await Order.findByIdAndUpdate(
      req.params._id,
      { etat: true },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Statue de commande modifier", statusOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/order/:id", isAuthenticated, async (req, res) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params._id);

    res
      .status(200)
      .json({ message: "Commande supprimée avec succès", deleteOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
