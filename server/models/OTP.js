const mongoose = require("mongoose");
const User = require("./User");

const Otp = new mongoose.Schema({
  otp: {
    type: Number,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

module.exports = mongoose.model("Otp", Otp);
