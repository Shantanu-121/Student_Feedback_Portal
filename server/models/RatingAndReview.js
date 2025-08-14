const mongoose = require("mongoose");

const Rating = new mongoose.Schema({
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Rating", Rating);
