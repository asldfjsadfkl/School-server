const STUDENT = require("../Models/Student.js");
// const isAuth = require("../Utils/Auth.js");
const express = require("express");
const router = express.Router();

const student = router
  .post("/studentcreate", async (req, res) => {
    try {
      const student = await STUDENT.create({
        admissionNumber: req.body.admissionNumber,
        name: req.body.name,
        cnicNumber: req.body.cnicNumber,
        guiderName: req.body.guiderName,
        gCnic: req.body.gCnic,
        address: req.body.address,
        newClass: req.body.newClass,
        section: req.body.section,
        phone: req.body.phone,
        resultgrade: req.body.resultgrade,
      });
      if (student) {
        res.status(201).json({
          success: true,
          student,
        });
      } else {
        res.status(401).json({
          success: false,
          message: res.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const student = await STUDENT.findById(req.params.id);
      if (student) {
        res.status(200).json({
          success: true,
          student,
        });
      } else {
        res.status(401).json({
          success: false,
          message: res.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const student = await STUDENT.findByIdAndDelete(req.params.id);
      if (student) {
        res.status(200).json({
          success: true,
          message: "Student deleted",
        });
      } else {
        res.status(401).json({
          success: false,
          message: res.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .patch("/:id", async (req, res) => {
    try {
      const sUpdate = await STUDENT.findByIdAndUpdate(req.params.id, {
        admissionNumber: req.body.admissionNumber,
        name: req.body.name,
        cnicNumber: req.body.cnicNumber,
        guiderName: req.body.guiderName,
        gCnic: req.body.gCnic,
        address: req.body.address,
        newClass: req.body.newClass,
        section: req.body.section,
        phone: req.body.phone,
        resultgrade: req.body.resultgrade,
      });
      res.status(200).json({
        success: true,
        sUpdate,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .get("/all/search", async (req, res) => {
    const { search, page, limit } = req.query;
    try {
      const encoded = decodeURIComponent(search);
      const skip = (page - 1) * limit;
      const countDoc = await STUDENT.countDocuments();
      const allStudents = await STUDENT.find({
        $or: [
          { name: { $regex: encoded, $options: "u" } },
          { newClass: { $regex: encoded, $options: "u" } },
          { resultgrade: { $regex: encoded, $options: "u" } },
        ],
      })
        .skip(skip)
        .limit(parseInt(limit));
      const pagination = {};
      pagination.totalPages = Math.ceil(countDoc / limit);
      if (allStudents) {
        res.status(200).json({
          success: true,
          allStudents,
          pagination,
        });
      } else {
        res.status(401).json({
          success: false,
          message: res.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

module.exports = student;
