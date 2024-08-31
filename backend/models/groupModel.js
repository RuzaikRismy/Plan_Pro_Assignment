const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: [true, "Please provide a group name"],
  },
  groupCode: {
    type: String,
    required: [true, "Please provide a group code"],
  },
  groupStatus: {
    type: String,
    required: [true, "Please provide a group status"],
  },
  groupMembers: {
    type: Array,
    required: [true, "Please provide group members"],
  },
  groupType: {
    type: String,
    required: [true, "Please provide a group type"],
  }
});

module.exports = mongoose.model("GroupList", groupSchema);

