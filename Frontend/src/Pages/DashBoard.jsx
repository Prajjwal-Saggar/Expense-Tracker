import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-container min-h-screen flex flex-col bg-gradient-to-r from-[#000000] to-[#1D2B64]">
      {/* Navbar */}
      <nav className="flex items-center justify-between flex-wrap p-6 w-full ">
        <div className="flex items-center flex-shrink-0 text-white">
          <Link to="/">
            <span className="font-semibold text-xl tracking-wide font-airstrike cursor-pointer pr-6">
              Expense Tracker
            </span>
          </Link>
        </div>
      </nav>

      {/* Background Content */}
      <div className="w-full h-screen flex flex-col ">
       <div className="w-full h-[20%]  text-3xl flex items-center pl-4 text-white">
         Welcome to your Expense Tracker&nbsp;<span className="font-airstrike pr-2 tracking-wide">Prajjwal Saggar!</span>
       </div>
       <div className="w-full h-[25%] bg-yellow-500"></div>
       <div className="w-full h-[55%] bg-green-500"></div>
      </div>
    </div>
  );
};

export default Dashboard;
