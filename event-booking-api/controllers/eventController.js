const Event = require("../models/eventModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");


// CREATE EVENT
exports.createEvent = async (req, res) => {

  try {

    const { title, description, latitude, longitude, start_time, end_time } = req.body;

    await Event.create({
      title,
      description,
      latitude,
      longitude,
      start_time,
      end_time,
      created_by: req.user.id
    });

    res.status(201).json({ message: "Event created successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET PARTICIPANTS
exports.getParticipants = async (req, res) => {

  try {

    const eventId = req.params.eventId;

    const participants = await Booking.findAll({
      where: { event_id: eventId },
      include: [{
        model: User,
        attributes: ["id", "name", "email"]
      }]
    });

    res.json({ participants });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// PAGINATION
exports.getEvents = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const events = await Event.findAll({
      limit,
      offset,
      order: [["start_time", "DESC"]]
    });

    res.json({ page, limit, events });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};