const express = require("express");
const router = express.Router();

const { getAllCourses, addCourse } = require("../controllers/courses");

router.get("/getAllCourses", getAllCourses);
router.post("/addCourse", addCourse);

module.exports = router;
