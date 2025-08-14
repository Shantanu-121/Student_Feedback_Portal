const Rating = require("../models/RatingAndReview");

exports.addRating = async (req, res) => {
  try {
    const { rating, review, id, userId } = req.body;

    const existing_rating = await Rating.findOne({
      course: id,
      user: userId,
    });

    if (existing_rating) {
      return res.status(401).json({
        message: "You have already rated the course, please edit it.",
        success: false,
      });
    }

    const new_rating = await Rating.create({
      rating: rating,
      review: review,
      course: id,
      user: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Review added successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
      message: "Error in adding rating",
    });
  }
};

exports.getCourseRating = async (req, res) => {
  try {
    const { id } = req.body;
    const ratings = await Rating.find({
      course: id,
    });

    return res.status(200).json({
      ratings: ratings,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
      message: "Error in getting course rating",
    });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const { courseId, userId, ratingId } = req.body;
    const del_rating = await Rating.findById(ratingId);

    if (String(del_rating.user) !== String(userId)) {
      return res.status(401).json({
        success: false,
        message: "User not authorized for rating deletion.",
      });
    }

    await Rating.findByIdAndDelete(ratingId);

    const ratings = await Rating.find();

    return res.status(200).json({
      message: "Rating deleted.",
      ratings: ratings,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in deleting rating",
      error: error,
    });
  }
};

exports.editRating = async (req, res) => {
  try {
    const { courseId, userId, rating, review, ratingId } = req.body;

    const edit_rating = await Rating.findById(ratingId);

    if (String(edit_rating.user) !== String(userId)) {
      return res.status(401).json({
        success: false,
        message: "User ain't authorized to edit the rating",
      });
    }

    await Rating.findByIdAndUpdate(ratingId, {
      rating: rating,
      review: review,
      course: courseId,
      user: userId,
    });

    const ratings = await Rating.find();

    return res.status(200).json({
      message: "Rating Updated.",
      ratings: ratings,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in editing rating",
      error: error,
    });
  }
};

exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate("user")
      .populate("course")
      .exec();

    return res.status(200).json({
      ratings: ratings,
      message: "All ratings fetched successfully.",
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: "Error while fetching all Ratings",
    });
  }
};
