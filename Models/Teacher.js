const mongoose = require("mongoose");

const tSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "invalid"],
  },
  fName: {
    type: String,
    required: [true, "invalid"],
  },
  status: {
    type: String,
    required: [true, "invalid"]
  },
  distract: {
    type: String,
    required: [true, "invalid"],
  },
  address: {
    type: String,
    required: [true, "invalid"],
  },
  phone: {
    type: Number,
    required: [true, "invalid"],
  },
  email: {
    type: String,
    required: [true, "invalid"],
  },
  subject: {
    type: String,
  }
});

module.exports = mongoose.model("TEACHER", tSchema);
