const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use(orderRoutes);
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "vous etes sur la route app.all du Roi" });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED 🍟🍔🥤`);
});
