const express = require("express");
const router = express.Router();
const STUDENT = require("../Models/Student.js");
const isAuth = require("../Utils/Auth.js");
const FEE = require("../Models/Fee.js");
const COURSE = require("../Models/course.js");
const ARTICLE = require("../Models/Articles");
const TEACHER = require('../Models/Teacher.js');
const redisClient = require('../Utils/Redis.js')

const dashboard = router.get("/dashboarddata", isAuth, async (req, res) => {
  try {

    const dashboard = await redisClient.get('dashboard');
    if (dashboard) {
      return res.status(200).json({ data: JSON.parse(dashboard) });
    }

    const [fee, articles, course, totalTeacher, std] =
      await Promise.all([
        FEE.find().select("dueAmount paidAmount month"),
        ARTICLE.find().select('name'),
        COURSE.find(),
        TEACHER.countDocuments(),
        STUDENT.find().select('newClass')
      ]);
    const data = { articles, course, fee, totalTeacher, std }
    redisClient.set('dashboard', JSON.stringify(data), { EX: 3600, }); //cached for one hour
    res.status(200).json({
      message: "Dashboard",
      data,
    });
  } catch (error) { }
}).get('/counter', async (req, res) => {
  try {
    const [std, tcr] =
      await Promise.all([
        STUDENT.countDocuments(),
        TEACHER.countDocuments(),
      ]);
    res.status(200).json({ std, tcr });
  } catch (error) {

  }
})



  .get('/clearcache', async (req, res) => {
    try {
      redisClient.del('dashboard');
      redisClient.del('positionh');
      res.status(200).json({ message: 'cached cleard' });
    } catch (error) {
    }

  })
module.exports = dashboard;
