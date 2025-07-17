// models/Setting.js
const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
    textnotify: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("NOTIFICATION", notificationSchema);

