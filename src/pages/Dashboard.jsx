import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../slices/courses";
import { Navbar } from "../components/common/Navbar";
import { ReviewPanel } from "./ReviewPanel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [flag, setFlag] = useState(false);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState(null);
  const signupData = useSelector((state) => state.auth.signupData);

  const toggleReviewPanel = (id) => {
    setCourseId(id);
    console.log(signupData._id);
    setFlag(true);
  };
  useEffect(() => {
    if (!signupData) {
      navigate("/login");
    }
    const loading = toast.loading();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/courses/getAllCourses`)
      .then((res) => {
        dispatch(setCourses(res.data.courses));
        toast.dismiss(loading);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loading);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        {courses.length === 0 ? (
          <div className="flex justify-center items-center h-[70vh]">
            <h3 className="font-bold text-3xl text-gray-700">
              No Courses Found
            </h3>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
              My Courses
            </h2>
            <ul className="space-y-6">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white shadow-sm hover:shadow-md transition-all rounded-lg border border-gray-200"
                >
                  <span className="font-semibold text-xl text-gray-800">
                    {course.name}
                  </span>

                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all"
                      onClick={() => toggleReviewPanel(course._id)}
                    >
                      Add Rating & Review
                    </button>
                    <button
                      className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all"
                      onClick={() => navigate(`/showRatings/${course._id}`)}
                    >
                      Show All Reviews
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
          courseId={courseId}
          userId={signupData._id}
        />
      )}
    </>
  );
};
