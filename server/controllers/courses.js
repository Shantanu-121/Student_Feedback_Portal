const Course = require("../models/Course");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json({
      message: "Courses fetched successfully.",
      courses: courses,
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: "Error while fetching courses",
    });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const new_course = await Course.create({
      name: name,
    });

    return res.status(200).json({
      message: "Course added successfully",
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: "Error in adding course",
    });
  }
};
