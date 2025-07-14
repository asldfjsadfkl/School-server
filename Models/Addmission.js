const mongoose = require("mongoose");
const schemaAddmission = new mongoose.Schema({
    name: { type: String, required: [true, "Invalid!"] },
    father: { type: String, required: [true, "Invalid!"] },
    gender: { type: String, required: [true, "Invalid!"] },
    dateofbirth: { type: String, required: [true, "Invalid!"] },
    religion: { type: String, required: [true, "Invalid!"] },
    nationality: { type: String, required: [true, "Invalid!"] },
    cnic: { type: String, required: [true, "Invalid!"] },
    phone: { type: String, required: [true, "Invalid!"] },
    address: { type: String, required: [true, "Invalid!"] },
    city: { type: String, required: [true, "Invalid!"] },
    lastshool: { type: String, required: [true, "Invalid!"] },
    lastclass: { type: String, required: [true, "Invalid!"] },
    status: { type: String, required: [true, "Invalid!"], default: 'pending' },
    date: {
        type: Date, default: Date.now()
    },
    // profileimg: {
    //     public_id: { type: String },
    //     uri: { type: String, required: [true, "Invalid!"] },
    // },
    // docimg: {
    //     public_id: { type: String },
    //     uri: { type: String, required: [true, "Invalid!"] },
    // },
});

module.exports = mongoose.model("ADDMISSION", schemaAddmission);