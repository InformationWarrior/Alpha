const mongoose = require("mongoose");
const database = "bezkoder_db";
const url = `mongodb://0.0.0.0:27017/${database}`;
const log = console.log;

const dbConnect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("Connected to the database.");
  } catch (error) {
    log("Cannot connect to the database - ", error);
    process.exit();
  }
};

module.exports = dbConnect;