const mongoose = require("mongoose");

connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/videly");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Failed with Error: ", error);
    process.exit(1);
  }
};

module.exports = connectDb;