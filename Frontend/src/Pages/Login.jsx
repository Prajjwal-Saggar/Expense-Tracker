import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#000000] to-[#1D2B64] flex flex-col">
      <nav className="flex items-center justify-between flex-wrap p-6 w-full ">
        <div className="flex items-center flex-shrink-0 text-white">
          <Link to="/">
            <span className="font-semibold text-xl tracking-wide font-airstrike cursor-pointer pr-6">
              Expense Tracker
            </span>
          </Link>
        </div>
      </nav>
      <div className="flex items-center justify-center flex-1">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
          <p className="text-center mt-4">
            <a href="#" className="text-blue-500">
              Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
