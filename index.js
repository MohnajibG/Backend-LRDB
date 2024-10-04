const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const app = express();

const corsOptions = {
  origin: "https://lrdb.netlify.app", // Frontend autorisé
  methods: "GET,POST,PUT,DELETE", // Méthodes autorisées
  allowedHeaders: "Content-Type,Authorization", // En-têtes autorisés
};

app.use(express.json(corsOptions));
app.use(cors());
app.options("*", cors(corsOptions));

app.use(orderRoutes);
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED 🍟🍔🥤`);
});
