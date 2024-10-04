const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

const app = express();
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
