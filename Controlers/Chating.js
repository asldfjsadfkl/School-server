const express = require("express");
const router = express.Router();
const isAuth = require("../Utils/Auth");
const User = require("../Models/User");
const CHAT = require("../Models/chating");

const chat = router
  .post("/post", isAuth, async (req, res) => {

    try {
      const user = await User.findById(req.user);
      await CHAT.create({
        name: user?.name,
        message: req.body.message,
        userId: user?._id,
      });
      res.status(201).json({
        message: "save",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .get("/get", isAuth, async (req, res) => {
    try {
      const userChat = await CHAT.find({});
      res.status(201).json({
        message: "data recieved from cache",
        userId: await req.user._id,
        userChat,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  })
  .delete("/delete/:id", async (req, res) => {
    try {
      await CHAT.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "deleted" });
    } catch (error) {}
  });

module.exports = chat;
