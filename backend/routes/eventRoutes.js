const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getOneEvent,
  getAllEvents,
  getAllEventsss,
  getEventCounts,
  getEventCountsCurrentMonth
} = require("../controllers/event-controller");

const router = express.Router();  

router.post("/event-creation", createEvent);
router.put("/event-update/:id", updateEvent);
router.delete("/event-delete/:id", deleteEvent);
router.get("/event-details/:id", getOneEvent);
router.post("/event-allEvetnts", getAllEventsss);
router.get("/event-counts", getEventCounts);
router.get("/month-event-counts", getEventCountsCurrentMonth);




module.exports = router;
