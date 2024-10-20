const express = require("express");
const Order = require("../models/Order");
const isAuthenticated = require("../middleware/isAuthenticated"); // Middleware pour vérifier l'authentification
const isAdmin = require("../middleware/isAdmin"); // Middleware pour vérifier les droits d'administration

const router = express.Router();

// Route pour créer une nouvelle commande
router.post("/order", async (req, res) => {
  try {
    const { items, totalPrice, etat } = req.body;

    // Récupérer la dernière commande pour déterminer le dernier numéro de commande
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });

    // Créer la nouvelle commande avec le numéro de commande incrémenté
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    // Créer une nouvelle commande avec les données fournies
    const newOrder = new Order({
      orderNumber: newOrderNumber, // Numéro de la commande
      etat, // État de la commande
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    });

    // Enregistrer la nouvelle commande dans la base de données
    await newOrder.save();

    // Retourner une réponse indiquant que la commande a été enregistrée avec succès
    res.status(201).json({
      message: "Commande enregistrée 🫡",
      orderNumber: newOrder.orderNumber, // Numéro de la commande enregistrée, à afficher sur le récapitulatif de commande
      id: newOrder.id, // ID de la commande enregistrée, utilisé pour modifier ou consulter la commande plus tard
    });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
});

// Route pour obtenir une commande par son ID
router.get("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId); // Trouver la commande par son ID

    res.status(200).json(order); // Retourner la commande trouvée
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Récupère toutes les commandes dans la base de données
    const orders = await Order.find();
    // Renvoie les commandes en format(succès)
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour mettre à jour le statut d'une commande (admin uniquement)
router.put("/order/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Mettre à jour l'état de la commande en fonction de l'ID fourni
    const statusOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { etat: true }, // Changer l'état à true
      { new: true } // Retourner la commande mise à jour
    );

    res
      .status(200)
      .json({ message: "Statut de commande modifié", statusOrder }); // Retourner la commande mise à jour
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer une commande (admin uniquement)
router.delete("/order/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Supprimer la commande par son ID
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Commande supprimée avec succès", deleteOrder }); // Retourner une confirmation de suppression
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
