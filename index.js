const router = require("./Controlers/User.js");
const student = require("./Controlers/Student.js");
const teacher = require("./Controlers/Teacher.js");
const articles = require("./Controlers/Article.js");
const results = require('./Controlers/Results.js')
const database = require("./Database/db.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Fee = require("./Controlers/Fee.js");
const dashboard = require("./Controlers/DashBoardData.js");
const contact = require("./Controlers/ContactForm.js");
const chating = require("./Controlers/Chating.js");
const course = require("./Controlers/course.js");
const Addmission = require("./Controlers/Addmission.js");
const SearchApi = require("./Controlers/SearchApi.js");
const pdffileRoute = require('./Controlers/pdfFile.js');
const notification = require('./Controlers/Setting.js');
const generateMonthlyFees = require('./Utils/cronJobFee.js')
const cloudinary = require("cloudinary");
const cors = require("cors");
const express = require("express");
const fileupload = require("express-fileupload");
const { connectGoogleAuth } = require('./Utils/GoogleOtp.js');
const redisClient = require("./Utils/Redis.js");
require("dotenv").config();
const app = express();
const port = process.env.port || 4000;



(async () => {
  await redisClient.connect();
  console.log('✅ Redis connected');
})();

database();
app.use(cookieParser());
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));




app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/v1", pdffileRoute);
app.use(fileupload());
app.use("/", router);
app.use("/student", student);
app.use("/teacher", teacher);
app.use("/articles", articles);
app.use("/api/v1", Fee);
app.use("/dash", dashboard);
app.use("/contact", contact);
app.use("/chat", chating);
app.use("/course", course);
app.use("/api/v1", Addmission);
app.use("/searching", SearchApi);
app.use("/", results);
app.use("/api/v1", notification);
generateMonthlyFees();
connectGoogleAuth();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

////////////server
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
