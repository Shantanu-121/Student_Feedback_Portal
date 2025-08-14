import React from "react";
import { Navbar } from "../components/common/Navbar";
import HBTU_Logo from "../assets/HBTU_Logo.png";
import { ReviewCard } from "./ReviewCard";
import ReviewChart from "./ReviewChart";

export const Home = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full pt-24 pb-16 bg-gray-50">
        <section className="bg-gradient-to-r from-blue-600 to-blue-100 text-blue-950 font-mono py-16 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
            <img
              src={HBTU_Logo}
              alt="HBTU Logo"
              className="w-40 h-40 object-contain drop-shadow-lg"
            />
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-bold text-4xl mb-4 tracking-wide">
                YOUR FEEDBACK MATTERS
              </h2>
              <p className="text-lg leading-relaxed max-w-2xl">
                Welcome to the Student Feedback Portal – your platform to share
                ideas, suggestions, and constructive feedback with ease. Whether
                it’s about courses, faculty, facilities, or campus activities,
                your voice matters. Together, we can create a better learning
                experience for everyone.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 my-16">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <ReviewCard />
          </div>
        </section>

        <section className="container mx-auto px-4 my-16">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <ReviewChart />
          </div>
        </section>
      </main>
    </>
  );
};
