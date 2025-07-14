const express = require("express");
const RESULTS = require('../Models/Results')
const isAuth = require("../Utils/Auth");
const Student = require("../Models/Student");
const nodeCacher = require('node-cache');
const node_cacher = new nodeCacher();
const router = express.Router();
const results = router
  .post("/api/v1/results", async (req, res) => {
    const { urdu, eng, phy, che, isl, science, hist, arabic, pst, math, exam } = req.body
    const TotalMarks = parseInt(urdu) +
      parseInt(eng) +
      parseInt(phy) +
      parseInt(che) +
      parseInt(isl) +
      parseInt(science) +
      parseInt(hist) +
      parseInt(arabic) +
      parseInt(pst) +
      parseInt(math);
    try {
      const student = await Student.findOne({ admissionNumber: req.body.admissionNumber });
      if (!student) {
        res.status(200).json({
          message: 'Not available!'
        });
      } else {
        const result = await RESULTS.create({
          studentId: student._id,
          admissionNumber: student.admissionNumber,
          newClass: student.newClass,
          OM: TotalMarks,
          exam: exam,
          firstTrmsubjects: {
            urdu: req.body.urdu,
            eng: req.body.eng,
            isl: req.body.isl,
            phy: req.body.phy,
            che: req.body.che,
            science: req.body.science,
            pst: req.body.pst,
            hist: req.body.hist,
            math: req.body.math,
            arabic: req.body.arabic,
          }
        });
        res.status(201).json({
          message: 'Saved',
          result
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }).get('/api/v1/results', async (req, res) => {
    const { newClass, admissionNumber } = req.query;
    try {
      const filter = {};
      if (newClass) {
        filter.newClass = newClass;
      }
      if (admissionNumber) {
        filter.admissionNumber = admissionNumber;
      }
      const data = await RESULTS.find(filter).populate({
        path: 'studentId',
        select: 'name'
      });
      res.status(200).json(data);
    } catch (error) {

    }
  }).delete('/api/v1/results/:id', async (req, res) => {
    try {
      const data = await RESULTS.findByIdAndDelete(req.params.id);
      res.status(200).json(data)
    } catch (error) {

    }
  }).patch('/api/v1/results/:id', async (req, res) => {
    const { urdu, eng, phy, che, isl, science, hist, arabic, pst, math, exam } = req.body
    const TotalMarks = parseInt(urdu) +
      parseInt(eng) +
      parseInt(phy) +
      parseInt(che) +
      parseInt(isl) +
      parseInt(science) +
      parseInt(hist) +
      parseInt(arabic) +
      parseInt(pst) +
      parseInt(math);
    try {
      await RESULTS.findByIdAndUpdate(req.params.id, {
        firstTrmsubjects: {
          urdu, eng, phy, che, isl, science, hist, arabic, pst, math,
        },
        OM: TotalMarks,
        exam: exam
      }, { new: true });
      res.status(200).json({ message: 'updated' })
    } catch (error) {
    }
  }).get('/api/v1/results/:id', async (req, res) => {
    try {
      const data = await RESULTS.findById(req.params.id).populate('studentId');
      res.status(200).json(data);
    } catch (error) {
    }
  }).get('/api/v1/resluts/position', async (req, res) => {
    try {
      const positionHolder = {};
      positionHolder.data10 = await RESULTS.find({ 'newClass': "10th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data9 = await RESULTS.find({ 'newClass': "9th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data8 = await RESULTS.find({ 'newClass': "8th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data7 = await RESULTS.find({ 'newClass': "7th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data6 = await RESULTS.find({ 'newClass': "6th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data5 = await RESULTS.find({ 'newClass': "5th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data4 = await RESULTS.find({ 'newClass': "4th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      positionHolder.data3 = await RESULTS.find({ 'newClass': "3th" }).sort({ OM: -1 }).limit(5).populate({ path: 'studentId', select: 'name' });
      res.status(200).json(positionHolder);
    } catch (error) {
    }
  })



module.exports = results