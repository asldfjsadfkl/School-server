const express = require("express");
const ADDMISSION = require("../Models/Addmission.js");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const addmission = router
    .post("/addmission", async (req, res) => {
        try {
            const std = await ADDMISSION.create({
                name: req.body.name,
                father: req.body.father,
                cnic: req.body.cnic,
                phone: req.body.phone,
                lastshool: req.body.lastschool,
                lastclass: req.body.lastclass,
                city: req.body.city,
                address: req.body.address,
                nationality: req.body.nationallity,
                religion: req.body.religion,
                dateofbirth: req.body.dateofbirth,
                gender: req.body.gender,
            });
            res.status(201).json({
                message: "course saved", std
            });
        } catch (error) {
            console.log(error);
        }
    })
    .get("/addmission", async (req, res) => {
        const { name, status, page, limit } = req.query;
        const skip = (page - 1) * limit;
        try {
            const count = await ADDMISSION.countDocuments();
            const totalPages = Math.ceil(count / limit);
            
            const filter = {};
            if (name) filter.name = { $regex: name, $options: 'i' }
            if (status) filter.status = { $regex: status, $options: 'i' }

            const data = await ADDMISSION.find(filter).skip(skip).limit(limit);
            if (data) {
                res.status(200).json({
                    message: "Success",
                    data,
                    totalPages,
                });
            }
            res.status(404).json({
                message: "not Found",
            });
        } catch (error) { }
    })
    .get("/:id", async (req, res) => {
        try {
            const data = await ADDMISSION.findById(req.params.id);
            if (data) {
                res.status(200).json({
                    data,
                });
            }
            res.status(404).json({
                message: "not Found",
            });
        } catch (error) { }
    }).patch("/addmission/:id", async (req, res) => {
        try {
            const rejected = await ADDMISSION.findByIdAndUpdate(req.params.id, {
                $set: { status: "rejected" }
            });


            if (rejected) {
                res.status(200).json({
                    message: "rejected",
                });
            }
            res.status(404).json({
                message: "not Found",
            });
        } catch (error) { }
    }).patch("/addmission/approved/:id", async (req, res) => {
        try {
            const rejected = await ADDMISSION.findByIdAndUpdate(req.params.id, {
                $set: { status: "approved" }
            });


            if (rejected) {
                res.status(200).json({
                    message: "rejected",
                });
            }
            res.status(404).json({
                message: "not Found",
            });
        } catch (error) { }
    }).delete("/addmission/:id", async (req, res) => {
        const { pimg, docimg } = req.query;
        try {
            const deleted = await ADDMISSION.findByIdAndDelete(req.params.id);
            if (deleted) {
                res.status(200).json({
                    message: "Deleted",
                });
            }
            res.status(404).json({
                message: "not Found",
            });
        } catch (error) { }
    });

module.exports = addmission
