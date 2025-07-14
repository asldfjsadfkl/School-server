const mongoose = require("mongoose");
const Database = () => {
  try {
    // const DB_URL = "mongodb://127.0.0.1:27017/jamia"
    const DB_URL = "mongodb+srv://root:root@cluster0.iarf5hy.mongodb.net/schoolmanagement"
    mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = Database;
