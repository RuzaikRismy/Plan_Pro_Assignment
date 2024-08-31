const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventTitle: {
    type: String,
    required: [true, "Please provide a event title"],
  },
  eventDescription: {
    type: String,
    required: [true, "Please provide event description"],
  },
  eventDate: {
    type: Object,
    required: [true, "Please provide a event date"],
  },
  eventVenue: {
    type: Object,
    required: [true, "Please provide a event venue"],
  },
  eventType: {
    type: String,
    required: [true, "Please provide a event type"],
  },
  publicEvent:{
    type: String,
    required: [true, "Please provide a public event or not"],
  },
  eventStatus: {
    type: String,
    required: [true, "Please provide a event status"],
  },
  inviteBy: {
    type: String,
    required: [true, "Please provide a invited by"],
  },
  groupMembers: {
    type: Array,
    required: [true, "Please provide group members"],
  }
},
{
  timestamps: true // for filtering, sorting and paginating part, this is important
});

module.exports = mongoose.model("EventList", eventSchema);
