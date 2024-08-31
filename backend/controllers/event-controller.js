const EventList = require("../models/eventModel");


const createEvent = async (req, res, next) => {
  const { eventTitle, eventDescription, eventDate, eventVenue, eventType, publicEvent,eventStatus, inviteBy, groupMembers} = req.body;

const event = new EventList({
    eventTitle,
    eventDescription,
    eventDate,
    eventVenue,
    eventType,
    publicEvent,
    eventStatus,
    inviteBy,
    groupMembers
  });
    try {
      await event.save();
    } catch (error) {
      console.log(error,"Event Creation Fail");
    }
    return res.status(201).json({ message: event });
  }
const updateEvent = async (req, res, next) => {
  try {
    const {
        eventTitle,
        eventDescription,
        eventDate,
        eventVenue,
        eventType,
        publicEvent,
        eventStatus,
        inviteBy,
        groupMembers
    } = req.body;

    console.log(req.body,"Update Payload")


    await EventList.findOneAndUpdate(
      { _id: req.params.id },
      {
        eventTitle,
        eventDescription,
        eventDate,
        eventVenue,
        eventType,
        publicEvent,
        eventStatus,
        inviteBy,
        groupMembers
      }
    );
    return res.status(200).json({ message: "Event Updated Successfully..!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    await EventList.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Event Deleted Successfully...!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneEvent = async (req, res, next) => {
  try {
    const singleEvent = await EventList.findById(req.params.id);
    return res.json(singleEvent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllEvents =async(req,res,next)=> {
    try {
      const allEvents = await EventList.find({});
      res.json(allEvents);
      // console.log(allEvents.length)
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

const getAllEventsss = async (req, res, next) => {
    const { pageNo = 1, pageSize = 8, search = '' } = req.body;
    // console.log(req.body,"reqBody")

    try {
        const skip = (pageNo - 1) * pageSize;

        // Search query for eventTitle or eventDescription
        const query = {
            $or: [
                { eventTitle: { $regex: search, $options: 'i' } }, 
                { eventDescription: { $regex: search, $options: 'i' } }
            ]
        };

        const allEvents = await EventList.find(query)
                                         .skip(skip)
                                         .limit(pageSize);

        const totalEvents = (await EventList.find({})).length;

        res.json({
            totalPages: Math.ceil(totalEvents / pageSize),
            currentPage: pageNo,
            events: allEvents,
            totalElements: totalEvents
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getEventCounts = async (req, res, next) => {
  try {
    const allEvents = await EventList.find({});
    
    let seminarCount = allEvents.filter(event => event.eventType === "Seminar").length;
    let workshopCount = allEvents.filter(event => event.eventType === "Workshop").length;
    let conferenceCount = allEvents.filter(event => event.eventType === "Conference").length;
    let otherCount = allEvents - (seminarCount + workshopCount + conferenceCount);

    res.json({ 
      totalEvents: allEvents.length,
      workshopCount: workshopCount, 
      conferenceCount: conferenceCount,
      seminarCount: seminarCount,
      otherCount:otherCount
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getEventCountsCurrentMonth = async (req, res, next) => {
  try {
    // Get the current date and determine the first and last dates of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
    const lastDayOfMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0, 23, 59, 59));

    // Query the events created within the current month
    const allEvents = await EventList.find({
      createdAt: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      }
    });

    // Calculate counts based on eventType
    let seminarCount = allEvents.filter(event => event.eventType === "Seminar").length;
    let workshopCount = allEvents.filter(event => event.eventType === "Workshop").length;
    let conferenceCount = allEvents.filter(event => event.eventType === "Conference").length;
    let otherCount = allEvents.length - (seminarCount + workshopCount + conferenceCount);

    res.json({ 
      totalEvents: allEvents.length,
      seminarCount: seminarCount,
      workshopCount: workshopCount, 
      conferenceCount: conferenceCount,
      otherCount: otherCount
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}




exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.getOneEvent = getOneEvent;
exports.getAllEvents = getAllEvents;
exports.getAllEventsss = getAllEventsss;
exports.getEventCounts = getEventCounts;
exports.getEventCountsCurrentMonth = getEventCountsCurrentMonth;
