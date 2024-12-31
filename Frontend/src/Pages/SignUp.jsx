import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const [passwordError, setPasswordError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null); // Changed from resposeMessage to responseMessage for consistency
  const [errorMessage, setErrorMessage] = useState(null); // Added to handle error messages
  const [isLoading, setIsLoading] = useState(false); // Added to handle loading state
  const [showPassword, setShowPassword] = useState(false); // Added to handle show/hide password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPasswordError(null); // Clear error on input change
    setErrorMessage(null); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkPassword();
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:4000/expenseTracker/v1/register",
        formData
      );
      console.log(response.data);
      setResponseMessage(response.data.message); // Set response message
      // Handle successful sign up logic here
    } catch (error) {
      console.error(error.response.data);
      setResponseMessage(null);
      setErrorMessage(error.response.data.message); // Set error message
      // Handle error logic here
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const checkPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password and Confirm Password are not the same");
      return;
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#000000] to-[#1D2B64] ">
      <nav className="flex items-center justify-between flex-wrap p-6 w-full">
        <div className="flex items-center flex-shrink-0 text-white">
          <Link to="/">
            <span className="font-semibold text-xl tracking-wide font-airstrike cursor-pointer pr-6">
              Expense Tracker
            </span>
          </Link>
        </div>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
          autoComplete="given-name" // Added auto fill attribute
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
          autoComplete="family-name" // Added auto fill attribute
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          autoComplete="email" // Added auto fill attribute
          className="mb-4 p-2 w-full border rounded"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="new-password" // Added auto fill attribute
            className="p-2 w-full border rounded"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-0 top-0 m-4"
          >
            {showPassword?<FaEye/>:<FaEyeSlash/>}
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            autoComplete="new-password" // Added auto fill attribute
            className="p-2 w-full border rounded"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-0 top-0 m-4"
          >
             {showPassword?<FaEye/>:<FaEyeSlash/>}
          </button>
        </div>
        {passwordError && (
          <div className="text-red-500 mb-4">{passwordError}</div>
        )}

        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          required
          autoComplete="bday" // Added auto fill attribute
          className="mb-4 p-2 w-full border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? <ScaleLoader color="white" /> : "Sign Up"}
        </button>
        {responseMessage && (
          <div className="text-green-500 mt-4">{responseMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        <p className="text-center mt-4">
          <Link to="/Login" className="text-blue-500">
            Already have an account? Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
