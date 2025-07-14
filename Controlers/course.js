const express = require("express");
const COURSE = require("../Models/course");
const cloudinary = require("cloudinary");
const router = express.Router();
const course = router
  .post("/createcourse", async (req, res) => {

    try {
      const imgURI = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "course_images",
        width: 600,
      });
      await COURSE.create({
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        fee: req.body.fee,
        subject: req.body.subject,
        teacher: req.body.teacher,
        maxStudents: req.body.maxStudents,
        startDate: req.body.startDate,
        image: { public_id: imgURI.public_id, uri: imgURI.secure_url },
      });
      res.status(201).json({
        message: "course saved",
        imgURI,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .get("/getallcourses", async (req, res) => {
    try {
      const data = await COURSE.find({});
      // }
      if (data) {
        res.status(200).json({
          message: "deleted",
          data,
        });
      }
      res.status(404).json({
        message: "not Found",
      });
    } catch (error) {}
  })
  .get("/:id", async (req, res) => {
    try {
      const data = await COURSE.findById(req.params.id);
      if (data) {
        res.status(200).json({
          data,
        });
      }
      res.status(404).json({
        message: "not Found",
      });
    } catch (error) {}
  })
  .delete("/:id", async (req, res) => {
    try {
      const course = await COURSE.findById(req.params.id);
      await cloudinary.v2.uploader.destroy(course.image.public_id);
      const data = await COURSE.findByIdAndDelete(course._id);
      if (course && data) {
        res.status(200).json({
          message: "deleted",
        });
      }
      res.status(404).json({
        message: "not Found",
      });
    } catch (error) {}
  });

module.exports = course;
