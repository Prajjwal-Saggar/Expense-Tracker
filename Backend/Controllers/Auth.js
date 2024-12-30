const { mailSender } = require("../Config/nodemailer");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// This is the SignUp Controller
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth } = req.body;
    if (!firstName || !lastName || !email || !password || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: "Please Enter All the Mentioned Details",
      });
    }

    //if the user already exist

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists, Please Login",
      });
    }
    //user doesnt exist now create the new user
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    await newUser.save();
    //Set the timer if user doesnt click the link in  the 10 minutes the link will expire and the user entry will be deleted

    setTimeout(async () => {
      const userInDb = await User.findOne({ email, verified: false });
      if (userInDb) {
        await User.deleteOne({ email: userInDb.email });
        console.log(`the user with email ${email}  has been deleted`);
      }
    }, 5 * 60 * 1000);
    const verificationLink = `http://localhost:4000/expenseTracker/v1/verify/${newUser.verificationToken}`;
    await mailSender(newUser.email, newUser.firstName, verificationLink);
    console.log(newUser);
    return res.status(200).json({
      success: true,
      message: "SignUp Successfull Please Verify Your Email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//This is the verification Controller

exports.verify = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or Expired Verification Token",
    });
  }
  //if user exists then verify the user and send a success message
  const response = await User.updateOne(
    { verificationToken: verificationToken },
    {
      $set: {
        verified: true,
        verificationToken: null,
      },
    }
  );

  await user.save();
  console.log(response);

  console.log(user);
  return res.status(200).json({
    success: true,
    message: "Email Verified Successfully",
  });
};

//Code for the Login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All The Fields",
      });
    }

    //find if the user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found, Please Register First",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    //login the user and create the jwt token and attach it to the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token:user.token, // Send the token back to the user
      userId:user._id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Forgot password route
