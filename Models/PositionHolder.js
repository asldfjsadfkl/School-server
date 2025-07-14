const mongoose = require("mongoose");
const schemaPosition = new mongoose.Schema({
  name: { type: String, required: [true, "Invalid name!"] },
  semester: { type: String, required: [true, "Invalid name!"] },
  totalMark: { type: Number, required: [true, "Invalid name!"] },
  obtainMark: { type: Date, required: [true, "Invalid name!"] },
  class: { type: String, required: [true, "Invalid name!"] },
  positioninClass: { type: String, required: [true, "Invalid name!"] },
  positionInSchool: { type: String, required: [true, "Invalid name!"] },
});

module.exports = mongoose.model("pHolder", schemaPosition);
