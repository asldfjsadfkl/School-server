const nodemailer = require("nodemailer");
const sendMail = async (useremail, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: "mn45994445@gmail.com",
      pass: "qzzm gjjt ayrw flfx",
    },
  });

  await transporter.sendMail({
    from: "mn45994445@gmail.com",
    to: useremail,
    subject: subject,
    text: message,
  });
};
module.exports = sendMail;
