const express = require("express");
const router = express.Router();
const sendMail = require("../Utils/sendMailer");

const contact = router.post("/contactform", (req, res) => {
  const { email, subject, message } = req.body;
  try {
    sendMail(email, subject, message);
    res.status(201).json({ message: "Email sended" });
  } catch (error) {}
});
module.exports = contact;
