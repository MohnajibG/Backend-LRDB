const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

const app = express();
app.use(cors());
app.use(express.json());
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(
  "mongodb+srv://MohNajibG:0pz6JhbVy0kOedp0@cluster0.r39lk.mongodb.net/"
);

app.use(orderRoutes);
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED on port ${PORT} 🍟🍔🥤`);
});
