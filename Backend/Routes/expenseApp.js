const express = require("express");
const router = express.Router();
const { register, verify, login } = require("../Controllers/Auth");
const { isLoggedIn } = require("../Middlewares/loggedIn");
const { summary } = require("../Controllers/Dashboard");
const {
  addExpense,
  deleteExpense,
  expense,
  updateExpense
} = require("../Controllers/ExpenseHandling");
//Authentication

//1) Register
router.post("/register", register);
//Verification Route
router.get("/verify/:verificationToken", verify);
//2)Login
router.post("/login", login);
//3)forgot-password

//DashBoard

//1)Summary
router.get("/dashboard", isLoggedIn, summary);
//2)Profile

//Expenses

//1)POST Expenses
router.post("/addExpenses", isLoggedIn, addExpense);
//2)Update Expenses
router.put("/updateExpense/:id" , isLoggedIn , updateExpense);
//3)Get Expenses
router.get("/expenses", isLoggedIn, expense);
//4)Delete Expenses
router.delete("/deleteExpense/:id", isLoggedIn, deleteExpense);
//Income

//1)POST INCOME

//2)GET INCOME

//3)UPDATE INCOME

//4)DELETE INCOME

//BUDGET

//1)POST BUDGET

//2)GET BUDGET

//3)UPDATE BUDGET

//4)DELETE BUDGET

//REPORTS

//1)GET The Chart for the spending summary

module.exports = router;
