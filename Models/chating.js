const mongoose = require("mongoose");

const chatingSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  message: { required: true, type: String },
  userId: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("CHAT", chatingSchema);
