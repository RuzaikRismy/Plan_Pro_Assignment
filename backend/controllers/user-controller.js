const UsersList = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// var jwt = require("jsonwebtoken");
// const Jwt_Secret_Key = "secretKey";
// const sendEmail = require("./../utils/sendemail");
// const crypto = require("crypto");
// const { json } = require("express");
// const Payments = require("../models/paymentModel");
// const { allowedNodeEnvironmentFlags } = require('process');


// Get user section
const saveUser = async (req, res, next) => {
    try {
      res.status(200).json({ message: "Grop data fetched successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch group data" });
    }
  };

  const registerUser = async (req, res, next) => {
    const { userName, email, role, status } = req.body;
  
    let existinghUser;
  
    if (!userName || !email || !role || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      existinghUser = await UsersList.findOne({ email: email });
    } catch (error) {
      console.log(error, "errorrrrr");
    }
    if (existinghUser) {
      return res.status("400").json({ message: "user already exists" });
    } else {
      const users = new UsersList({
        userName,
        email,
        role,
        status,
      });
      try {
        await users.save();
      } catch (error) {
        console.log(error);
      }
      return res.status(201).json({ message: users });
    }
  };
  
// to get all registerd users details
const getAllusers =async(req,res,next)=> {
  try {
    const allUsers = await UsersList.find({});
    res.json(allUsers);
    console.log(allUsers.length)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}

exports.saveUser = saveUser;
exports.registerUser = registerUser;
exports.getAllusers = getAllusers;

