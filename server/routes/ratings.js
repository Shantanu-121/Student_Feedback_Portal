const express = require("express");
const router = express.Router();

const {
  addRating,
  getCourseRating,
  deleteRating,
  editRating,
  getRatings,
} = require("../controllers/ratings");

router.post("/addRating", addRating);
router.post("/showRating", getCourseRating);
router.post("/deleteRating", deleteRating);
router.post("/editRating", editRating);
router.get("/getRatings", getRatings);

module.exports = router;
