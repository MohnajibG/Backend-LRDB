const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

const app = express();
// Configurer CORS pour autoriser les requêtes depuis Netlify
app.use(
  cors({
    origin: "https://lrdb.netlify.app", // Remplace par l'URL de ton frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);

app.use(orderRoutes);
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED 🍟🍔🥤`);
});
