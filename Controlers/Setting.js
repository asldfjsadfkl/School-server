// schemas 
const NOTIFICATION = require("../Models/Setting.js");
const TOTALFEE = require("../Models/Setting.js");
const nodecache = require('node-cache');
const express = require("express");
// const isAuth = require("../Utils/Auth.js");
const nodeCache = new nodecache();
const notification = express.Router();


notification.post("/notification", async (req, res) => {
    try {
        const student = await NOTIFICATION.create({ textnotify: req.body.notification });
        if (student) {
            nodeCache.del('notify');
        }
        res.status(201).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
})

notification.delete("/notification/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await NOTIFICATION.findByIdAndDelete(id);
        if (data) {
            res.status(200).json({
                message: "deleted"
            });
            nodeCache.del('notify');
        } else {
            res.status(404).json({
                message: "Not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
})
notification.get("/notification", async (req, res) => {
    try {
        let data;
        if (nodeCache.has('notify')) {
            data = nodeCache.get('notify');
            console.log('cache');
        } else {
            data = await NOTIFICATION.find();
            nodeCache.set('notify', data)
            console.log('db');
        }
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
})

module.exports = notification