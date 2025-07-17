// models/Setting.js
const mongoose = require("mongoose");



const totalFeeSchema = new mongoose.Schema({
    class1th: {
        type: Number,
        required: true,
    },
    class2th: {
        type: Number,
        required: true,
    },
    class3th: {
        type: Number,
        required: true,
    },
    class4th: {
        type: Number,
        required: true,
    },
    class5th: {
        type: Number,
        required: true,
    },
    class6th: {
        type: Number,
        required: true,
    },
    class7th: {
        type: Number,
        required: true,
    },
    class8th: {
        type: Number,
        required: true,
    },
    class9th: {
        type: Number,
        required: true,
    },
    class10th: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model("TOTALFEE", totalFeeSchema);



