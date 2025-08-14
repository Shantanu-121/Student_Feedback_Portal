import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcBusinessman } from "react-icons/fc";
import { setSignupData, logout } from "../../slices/auth";
import { setCourses } from "../../slices/courses";
import { ConfirmationPanel } from "../../pages/ConfirmationPanel";

export const Navbar = () => {
  const signupData = useSelector((state) => state.auth.signupData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);

  return (
    <nav className="relative top-0 left-0 w-full bg-gradient-to-r from-blue-900 to-indigo-300 shadow-lg z-50 py-2">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / Title */}
        <h1
          className="text-white text-2xl md:text-3xl font-bold font-serif cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          Student Feedback Portal
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {!signupData ? (
            <>
              <button
                className="px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow hover:bg-blue-500 transition-colors hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded-full bg-yellow-900 text-white font-medium shadow hover:bg-yellow-500 transition-colors hover:cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <FcBusinessman
                className="h-10 w-10 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => navigate("/dashboard")}
              />
              <button
                className="px-4 py-2 rounded-full bg-red-900 text-white font-medium shadow hover:bg-red-600 transition-colors"
                onClick={() => {
                  // dispatch(logout());
                  // dispatch(setCourses([]));
                  // navigate("/");
                  setFlag(true);
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
        {flag ? <ConfirmationPanel setFlag={setFlag} /> : null}
      </div>
    </nav>
  );
};
