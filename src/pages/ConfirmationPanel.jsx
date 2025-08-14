import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/auth";
import { setCourses } from "../slices/courses";

export const ConfirmationPanel = ({ setFlag }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Confirm Logout
        </h3>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              dispatch(logout());
              dispatch(setCourses([]));
              setFlag(false);
              navigate("/");
            }}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setFlag(false)}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
