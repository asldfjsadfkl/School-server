const mongoose = require("mongoose");

const questoinSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "inValid"],
    },
    email: { type: String, required: [true, "inValid"] },
    phone: { type: Number, required: [true, "inValid"] },
    question: { type: String, required: [true, "inValid"] },
    date: {
        type: Date,
        default: new Date(Date.now()).toLocaleDateString(),
    }
});

module.exports = mongoose.model("QUESTION", questoinSchema);
