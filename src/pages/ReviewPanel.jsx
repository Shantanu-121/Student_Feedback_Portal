import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ReviewPanel = ({
  setFlag,
  courseId,
  ratingId,
  userId,
  setRatings,
}) => {
  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    const loading = toast.loading();
    if (ratingId) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/ratings/editRating`, {
          rating: data.rating,
          review: data.review,
          courseId: courseId,
          userId: userId,
          ratingId: ratingId,
        })
        .then((res) => {
          toast.success("Rating updated successfully.");
          setRatings(res.data.ratings);
          setFlag(false);
          toast.dismiss(loading);
        })
        .catch((err) => {
          toast.error("User not authorized for rating updation.");
          console.log(err);
          toast.dismiss(loading);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/ratings/addRating`, {
          rating: data.rating,
          review: data.review,
          id: courseId,
          userId: userId,
        })
        .then((response) => {
          if (response.data.success === true) {
            toast.success("Rating added successfully.");
          }
          setFlag(false);
          toast.dismiss(loading);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          toast.dismiss(loading);
        });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="mb-4 font-bold text-lg">
          Please add rating and review of the course
        </h3>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <select {...register("rating")} className="border p-2 rounded w-full">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            {...register("review")}
            type="text"
            placeholder="Write your review"
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={() => setFlag(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-5"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
