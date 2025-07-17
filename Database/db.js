const mongoose = require("mongoose");
const Database = () => {
  try {
    const DB_URL = process.env.DB_URL;
    mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = Database;
