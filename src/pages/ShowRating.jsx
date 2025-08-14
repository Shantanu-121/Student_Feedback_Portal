import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ReviewPanel } from "./ReviewPanel";
import { setRatings } from "../slices/ratings";

export const ShowRating = () => {
  const { id } = useParams();
  const signupData = useSelector((state) => state.auth.signupData);
  const ratings = useSelector((state) => state.ratings.ratings);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [ratingId, setRatingId] = useState(null);
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/ratings/showRating`, {
        id: id,
      })
      .then((res) => {
        dispatch(setRatings(res.data.ratings));
        toast.dismiss(loading);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loading);
      });
  }, [ratings]);

  const ratingEdit = (ratingId) => {
    setRatingId(ratingId);
    setFlag(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        {ratings.length === 0 ? (
          <div className="text-center text-gray-600 text-xl font-medium">
            No ratings till now 📭
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Course Ratings & Reviews
            </h2>
            <ul className="flex flex-col gap-6">
              {ratings.map((rating) => (
                <li
                  key={rating._id}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Rating and Review */}
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-yellow-500">
                      {rating.rating} ⭐
                    </span>
                    <p className="text-gray-700 text-lg mt-1 italic">
                      “{rating.review}”
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={() => ratingEdit(rating._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => {
                        console.log(signupData);
                        const loading = toast.dismiss();
                        axios
                          .post(
                            `${
                              import.meta.env.VITE_BACKEND_URL
                            }/ratings/deleteRating`,
                            {
                              courseId: id,
                              ratingId: rating._id,
                              userId: signupData._id,
                            }
                          )
                          .then((res) => {
                            toast.success("Rating Deleted successfully.");
                            dispatch(setRatings(res.data.ratings));
                            toast.dismiss(loading);
                          })
                          .catch((err) => {
                            toast.error(
                              "User not authorized for rating deletion."
                            );
                            console.log(err);
                            toast.dismiss(loading);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {flag && (
        <ReviewPanel
          setFlag={setFlag}
          courseId={id}
          ratingId={ratingId}
          userId={signupData._id}
          setRatings={setRatings}
        />
      )}
    </>
  );
};
