const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'inValid']
    },
    text: {
        type: String,
        required: [true, 'inValid']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model("ARTICLE", articleSchema);