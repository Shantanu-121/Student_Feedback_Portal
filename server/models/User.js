const mongoose = require("mongoose");

const User = new mongoose.Schema({
  //schema is just a class
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", User); //model is object of the class
