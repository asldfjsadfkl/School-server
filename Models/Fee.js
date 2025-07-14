const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({

  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'STUDENT', required: true },

  name: { type: String, required: true },
  newClass: { type: String, required: true },
  section: { type: String, required: true },
  admissionNumber: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  dueAmount: { type: Number },
  totalFee: { type: Number, default: 3300 },
  examAmount: { type: Number, default: 0 },
  status: { type: String, enum: ["paid", "unpaid"] },
  description: { type: String, },
  month: { type: String, required: true },
  year: { type: String},
  paidDate: { type: Date, default: Date.now }
});

FeeSchema.pre('save', function (next) {
  if (this.newClass === '10th') this.totalFee = 3300;
  if (this.newClass === '9th') this.totalFee = 3100;
  if (this.newClass === '8th') this.totalFee = 2900;
  if (this.newClass === '7th') this.totalFee = 2700;
  if (this.newClass === '6th') this.totalFee = 2500;
  if (this.newClass === '5th') this.totalFee = 2300;
  if (this.newClass === '4th') this.totalFee = 2100;
  if (this.newClass === '3th') this.totalFee = 1900;
  if (this.newClass === '2th') this.totalFee = 1700;
  if (this.newClass === '1th') this.totalFee = 1600;
  this.dueAmount = this.totalFee - this.paidAmount;
  this.status = this.dueAmount === 0 ? 'paid' : 'unpaid';
  next();
});


module.exports = new mongoose.model("FEE", FeeSchema);
