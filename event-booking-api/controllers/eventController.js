const Event = require("../models/eventModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const eventSchema = require("../validators/eventValidator");
const { Op } = require("sequelize");
const { errorHandler } = require("../utils/errorHandler");

// CREATE EVENT
exports.createEvent = async (req, res) => {

  try {

    const { title, description, location, latitude, longitude, start_time, end_time } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      latitude,
      longitude,
      start_time,
      end_time,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });

  } catch (error) {

    errorHandler(res, error);

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

exports.searchEventsByLocation = async (req, res) => {

  try {

    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        message: "Location is required"
      });
    }

    const events = await Event.findAll({
      where: {
        location: {
          [Op.like]: `%${location}%`
        }
      }
    });

    res.status(200).json({
      message: "Events fetched successfully",
      data: events
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

exports.getNearbyEvents = async (req, res) => {

  try {

    const { lat, lng, distance } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Latitude and longitude are required"
      });
    }

    const radius = distance || 30; // default 30km

    const events = await Event.findAll();

    const nearbyEvents = events.filter(event => {

      const R = 6371;

      const dLat = (event.latitude - lat) * Math.PI / 180;
      const dLon = (event.longitude - lng) * Math.PI / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat * Math.PI / 180) *
        Math.cos(event.latitude * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const dist = R * c;

      return dist <= radius;

    });

    res.status(200).json({
      message: "Nearby events fetched successfully",
      data: nearbyEvents
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};