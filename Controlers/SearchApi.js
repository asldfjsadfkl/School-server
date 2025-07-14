const ARTICLE = require("../Models/Articles");
const COURSE = require("../Models/course");
const STUDENT = require("../Models/Student.js");
const TEACHER = require("../Models/Teacher.js");
const FEE = require("../Models/Fee.js");
const express = require("express");
const isAuth = require("../Utils/Auth");
const router = express.Router();

const SearchApi = router.get("/search", isAuth, async (req, res) => {
  const search = decodeURIComponent(req.query.searching);
  try {
    if (search !== "") {
      const data = {};
      data.masayals = await FEE.find({
        header: { $regex: search, $options: "i" },
      });
      data.lessons = await ARTICLE.find({
        name: { $regex: search, $options: "i" },
      });
      data.courses = await COURSE.find({
        name: { $regex: search, $options: "i" },
      });
      res.status(200).json({ message: "Searched data!", data });
    }
    res.status(200).json({ message: "Searched data!", data: {} });
  } catch (error) {}
});

module.exports = SearchApi;
