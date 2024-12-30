const Expense = require("../Models/Expense");
const User = require("../Models/User");

//Create a Expense
exports.addExpense = async (req, res) => {
  try {
    const user = req.user; // Assuming the user is stored in the request object by middleware or authentication
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { expenseType, amount } = req.body;
    if (!expenseType || !amount) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newExpense = new Expense({
      expenseType,
      amount,
      user: user._id,
    });
    await newExpense.save();
    user.expense.push(newExpense._id);
    await user.save();
    const populatedUser = await User.findById(user._id).populate("expense");
    return res.status(201).json({
      message: "Expense added successfully",
      populatedUser,
      newExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Update the Expense
exports.updateExpense = async (req, res) => {
  try {
    const { expenseType, amount } = req.body;
    const expenseId = req.params.id;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    expense.expenseType = expenseType;
    expense.amount = amount;
    await expense.save();
    return res
      .status(200)
      .json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.error("Error updating expense:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete the Expense
exports.deleteExpense = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const user = req.user;
    const response = await Expense.findByIdAndDelete(deleteId);
    if (!response) {
      return res.status(404).json({ message: "Expense not found" });
    }
    user.expense = user.expense.filter(
      (expense) => expense.toString() !== deleteId.toString()
    );
    await user.save();
    return res
      .status(200)
      .json({ message: "Expense deleted successfully", response });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

///get expenses

exports.expense = async (req, res) => {
  try {
    const user = req.user;
    const populatedUser = await User.findById(user._id).populate("expense");
    const expenses = populatedUser.expense;
    //we will also return the total expense therefore  we will use map function to calculate the total expense
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    return res
      .status(200)
      .json({
        message: "Expenses fetched successfully",
        expenses,
        totalExpense,
      });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
