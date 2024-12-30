const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
  budget: {
    type: Number,
    default: 0,
  },
  expense: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  savings: {
    type: Number,
    default: 0,
  },

  verificationToken: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String, 
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew && !this.verificationToken) {
    this.verificationToken = crypto.randomBytes(20).toString("hex");
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
