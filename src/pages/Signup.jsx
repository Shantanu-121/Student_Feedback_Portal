import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/common/Navbar";
import Student from "../assets/Student.jpeg";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { setSignupData } from "../slices/auth";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const submitHandler = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }
    const loading = toast.loading();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/sendotp`, {
        email: data.email,
      })
      .then((response) => {
        console.log("Form data -> ", data);
        console.log("OTP -> ", response.data.otp);
        dispatch(setSignupData({ ...data, otp: response.data.otp }));
        navigate("/verify-otp");
        toast.dismiss(loading);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(loading);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
      <Navbar />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl flex gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-5 flex-1"
          >
            <h2 className="text-3xl font-semibold font-serif text-center mb-4 text-gray-800">
              Sign Up
            </h2>

            {/* First Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-900">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="w-full border  bg-gray-100 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-900">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                className="w-full border bg-gray-100 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border bg-gray-100 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-900">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3">
                <input
                  type={!showPass ? "password" : "text"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="flex-1  bg-gray-100 py-2 focus:outline-none mr-2"
                />
                {!showPass ? (
                  <IoEyeSharp
                    className="text-gray-900 cursor-pointer"
                    onClick={() => setShowPass(true)}
                  />
                ) : (
                  <IoEyeOff
                    className="text-gray-900 cursor-pointer"
                    onClick={() => setShowPass(false)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3">
                <input
                  type={!showConfirmPass ? "password" : "text"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  className="flex-1 bg-gray-100 py-2 focus:outline-none mr-2"
                />
                {!showConfirmPass ? (
                  <IoEyeSharp
                    className="text-gray-900 cursor-pointer"
                    onClick={() => setShowConfirmPass(true)}
                  />
                ) : (
                  <IoEyeOff
                    className="text-gray-900 cursor-pointer"
                    onClick={() => setShowConfirmPass(false)}
                  />
                )}
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
            >
              Sign Up
            </button>
          </form>

          {/* Image */}
          <div className="flex justify-center items-center">
            <img
              src={Student}
              alt="Student"
              className="h-[250px] w-[250px] rounded-md object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
