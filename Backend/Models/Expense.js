const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expenseType: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model("Expense", expenseSchema);
