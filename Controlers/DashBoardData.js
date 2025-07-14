const express = require("express");
const router = express.Router();
const STUDENT = require("../Models/Student.js");
const isAuth = require("../Utils/Auth.js");
const FEE = require("../Models/Fee.js");
const COURSE = require("../Models/course.js");
const ARTICLE = require("../Models/Articles");
const TEACHER = require('../Models/Teacher.js');

const dashboard = router.get("/dashboarddata", isAuth, async (req, res) => {
  try {
    const [fee, articles, course, totalTeacher, std] =
      await Promise.all([
        FEE.find().select("dueAmount paidAmount month"),
        ARTICLE.find().select('name'),
        COURSE.find(),
        TEACHER.countDocuments(),
        STUDENT.find().select('newClass')
      ]);
    const data = { articles, course, fee, totalTeacher, std }

    res.status(200).json({
      message: "Dashboard",
      data,
    });
  } catch (error) { }
});
module.exports = dashboard;
