const mongoose = require("mongoose");
const schemaCourse = new mongoose.Schema({
  name: { type: String, required: [true, "Invalid!"] },
  description: { type: String, required: [true, "Invalid!"] },
  duration: { type: String, required: [true, "Invalid!"] },
  fee: { type: Number, required: [true, "Invalid!"] },
  subject: { type: String, required: [true, "Invalid!"] },
  teacher: { type: String, required: [true, "Invalid!"] },
  maxStudents: { type: String, required: [true, "Invalid!"] },
  startDate: { type: String, required: [true, "Invalid!"] },
  image: {
    public_id: { type: String, required: [true, "Invalid!"] },
    uri: { type: String, required: [true, "Invalid!"] },
  },
});

module.exports = mongoose.model("COURSE", schemaCourse);
