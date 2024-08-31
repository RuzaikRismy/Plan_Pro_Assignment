const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please provide a user name"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    required: [true, "Please provide a role"],
  },
  status: {
    type: String,
    required: [true, "Please provide a status"],
  }
});

module.exports = mongoose.model("UsersList", userSchema);

