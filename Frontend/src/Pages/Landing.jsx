import React from "react";
import { Link } from "react-router-dom";

import Spline from "@splinetool/react-spline";

const Landing = () => {
  return (
    <div className="w-full min-h-screen  bg-gradient-to-r from-[#000000] to-[#1D2B64]">
      <nav className="flex items-center justify-between flex-wrap  p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-wide font-airstrike pr-1">
            Expense Tracker
          </span>
        </div>
      </nav>
      <div className="w-full h-screen flex">
        <div className="w-full md:w-1/2 h-screen flex justify-center items-center flex-col">
          <h1 className="text-4xl text-white font-bold text-center mb-4  pr-4">
            Welcome to{" "}
            <span className="text-5xl font-bold text-purple-500 font-airstrike">
              Expense <br />
              Tracker
            </span>
          </h1>

          <p className="text-lg text-gray-300 text-center mb-8">
            Track your expenses effortlessly and stay on top of your financial
            goals.
          </p>

          <div className="flex  space-x-4">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all">
              Login
            </button>
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all">
              Sign Up
            </button>
          </div>
        </div>
        <div className="hidden md:w-1/2 md:h-screen md:flex md:justify-center md:items-center">
          <Spline
            className="mb-12"
            scene="https://prod.spline.design/FStmUGCh4BHEjEmr/scene.splinecode"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
