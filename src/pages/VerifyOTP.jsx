import React, { useState } from "react";
import Student from "../assets/Student.jpeg";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/auth";

export const VerifyOTP = () => {
  const signupData = useSelector((state) => state.auth.signupData);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function submitHandler() {
    if (otp != signupData.otp) {
      return toast.error("Otp is invalid");
    }
    const loading = toast.loading();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        confirmPassword: signupData.confirmPassword,
        otp: signupData.otp,
      })
      .then((res) => {
        toast.success("Account created successfully");
        dispatch(setSignupData(null));
        navigate("/login");
        toast.dismiss(loading);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(loading);
      });
  }
  return (
    <div>
      <div className="flex flex-col gap-5 m-20 bg-blue-300 p-10 rounded-md justify-center items-center">
        <h1 className="text-center font-black text-5xl">OTP</h1>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input {...props} className="bg-white rounded-md" />
          )}
        />
        <button
          className="px-2 rounded-md h-fit font-medium text-xl bg-white hover:scale-110 hover:cursor-pointer"
          onClick={() => submitHandler()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
