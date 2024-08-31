require("dotenv").config();
const mongoose = require("mongoose");
const { application } = require("express");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://RuzaikRismy:Rismy123@cluster0.iioce.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        // useUnifiedToplogy: true
      }
    );
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection Fail !!!");
    process.exit(1); //This used to exit server, when mongoDb connection fail.
  }
};
module.exports = connectDB;
