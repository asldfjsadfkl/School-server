const FEE = require("../Models/Fee.js");
const express = require("express");
const Fee = express.Router();
const Student = require('../Models/Student.js')
const isAuth = require("../Utils/Auth.js");
Fee.post("/fee", async (req, res) => {
  try {
    const student = await Student.findOne({ admissionNumber: req.body.admissionNumber });
    const fee = await FEE.create({
      studentId: student._id,
      name: student.name,
      newClass: student.newClass,
      section: student.section,
      admissionNumber: student.admissionNumber,
      paidAmount: req.body.amount,
      description: req.body.description,
      paidDate: req.body.date,
      month: req.body.month,
    });
    if (fee) {
      res.status(201).json({
        success: true,
        fee,
      });
    } else {
      res.status(401).json({
        message: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})
Fee.get("/fee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fee = await FEE.findById(id);
    if (fee) {
      res.status(200).json({
        fee,
      });
    } else {
      res.status(401).json({
        message: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})
Fee.delete("/fee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fee = await FEE.findByIdAndDelete(id);
    if (fee) {
      res.status(200).json({
        message: "deleted"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})
Fee.patch("/fee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fee = await FEE.findById(id);
    if (fee) {
      fee.admissionNumber = req.body.admissionNumber,
        fee.paidAmount = req.body.paidAmount,
        fee.description = req.body.description,
        fee.month = req.body.month,
        fee.paidDate = req.body.date,
        fee.examAmount = req.body.examAmount,
        fee.newClass = req.body.newClass,
        fee.section = req.body.section,
        await fee.save();
      nodeCache.del('fee');
      res.status(201).json({
        fee,
        message: "updated"
      });
    }
    if (!fee) {
      res.status(401).json({
        message: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
})
Fee.get("/feesearch", async (req, res) => {
  const { newClass, section, status, admissionNumber, month, page, limit } = req.query;
  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limits = parseInt(limit);
    const filter = {};

    if (newClass) filter.newClass = req.query.newClass;
    if (month) filter.month = month;
    if (admissionNumber) filter.admissionNumber = req.query.admissionNumber;
    if (section) filter.section = req.query.section;
    if (status) filter.status = req.query.status;

    const totalD = await FEE.countDocuments(filter);
    const fees = await FEE.find(filter)
      .skip(skip)
      .limit(limits)
      .populate({ path: 'studentId', select: 'phone' })
    const pagination = Math.ceil(totalD / limit);
    if (fees) {
      res.status(200).json({
        success: true,
        fees,
        pagination
      });
    } else {
      res.status(401).json({
        message: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})
Fee.patch("/feepaid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await FEE.findById(id);
    if (data && data.status === 'unpaid') {
      data.paidAmount = data.totalFee,
        data.dueAmount = 0,
        data.status = 'paid'
      await data.save();
      res.status(200).json({ message: "updated" })
    } else {
      res.status(200).json({ message: 'Aleardy Paid!' });
    }
  } catch (error) {
    console.log(error)
  }
}).get('/feechart', async (req, res) => {
  try {
    const data = await FEE.find({}).select('paidAmount month');
    res.status(200).json({ data })
  } catch (error) {

  }
})

module.exports = Fee;
