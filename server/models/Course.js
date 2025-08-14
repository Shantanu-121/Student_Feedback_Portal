const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Course", Course);
