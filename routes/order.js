const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Route pour créer une nouvelle commande
router.post("/order", async (req, res) => {
  try {
    const { orderNumber, items, totalPrice } = req.body;

    // Création d'une nouvelle commande
    const newOrder = new Order({
      orderNumber,
      items,
      totalPrice,
    });

    // Sauvegarde de la commande
    await newOrder.save();

    return res.status(201).json(newOrder); // Retourne la commande créée
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Gestion des erreurs
  }
});

// Route pour obtenir toutes les commandes
router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find(); // Récupération de toutes les commandes
    return res.status(200).json(orders); // Retourne les commandes
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Gestion des erreurs
  }
});

// Route pour obtenir une commande par ID
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id); // Recherche de la commande par ID

    if (!order) {
      return res.status(404).json({ message: "Order not found" }); // Gestion de la commande non trouvée
    }

    return res.status(200).json(order); // Retourne la commande trouvée
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Gestion des erreurs
  }
});

// Route pour mettre à jour une commande
router.put("/order/:id", async (req, res) => {
  try {
    const { items, totalPrice, etat } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { items, totalPrice, etat },
      { new: true } // Retourne le document mis à jour
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" }); // Gestion de la commande non trouvée
    }

    return res.status(200).json(updatedOrder); // Retourne la commande mise à jour
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Gestion des erreurs
  }
});

// Route pour supprimer une commande
router.delete("/order/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id); // Suppression de la commande

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" }); // Gestion de la commande non trouvée
    }

    return res.status(204).send(); // Retourne 204 No Content
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Gestion des erreurs
  }
});

module.exports = router;
