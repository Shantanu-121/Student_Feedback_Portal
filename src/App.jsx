import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { VerifyOTP } from "./pages/VerifyOTP";
import { Dashboard } from "./pages/Dashboard";
import { ShowRating } from "./pages/ShowRating";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verify-otp" element={<VerifyOTP />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/showRatings/:id" element={<ShowRating />}></Route>
      </Routes>
    </>
  );
}

export default App;
