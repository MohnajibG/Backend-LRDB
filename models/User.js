const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
  },
  code: Number,

  token: String,
});

module.exports = User;
