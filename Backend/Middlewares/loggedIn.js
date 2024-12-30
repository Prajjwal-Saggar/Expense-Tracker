const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(" ")[1] || req.cookies.token; // Get token from headers

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, please log in.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please log in again.",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in isLoggedIn middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Session Expired , Please login again",
    });
  }
};