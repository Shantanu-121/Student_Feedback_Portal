import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/common/Navbar";
import Student from "../assets/Student.jpeg";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/auth";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const submitHandler = (data) => {
    const loading = toast.loading();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        toast.success("Logged in successfully.");
        dispatch(setSignupData(res.data.user));
        navigate("/dashboard");
        toast.dismiss(loading);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loading);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
      <Navbar />
      <div className="flex justify-center items-center py-20">
        <div className="bg-white rounded-2xl shadow-xl p-10 flex gap-10 items-center hover:shadow-2xl transition-all duration-300 w-[800px]">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-6 w-1/2"
          >
            <h2 className="text-3xl font-bold text-blue-950 font-serif text-center mb-4">
              Welcome Back 👋
            </h2>

            <label className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">Email</span>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">Password</span>
              <div className="flex gap-2 items-center">
                <input
                  type={!showPass ? "password" : "text"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Enter your password"
                />
                {!showPass ? (
                  <IoEyeSharp onClick={() => setShowPass(true)} />
                ) : (
                  <IoEyeOff onClick={() => setShowPass(false)} />
                )}
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </label>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:scale-105 transition w-full"
            >
              Login
            </button>

            <p className="text-center text-gray-600 text-sm mt-2">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>

          <div className="w-1/2 flex justify-center">
            <img
              src={Student}
              alt="Student"
              className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
