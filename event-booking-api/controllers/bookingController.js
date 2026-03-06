const Booking = require("../models/bookingModel");
const Event = require("../models/eventModel");


// JOIN EVENT
exports.joinEvent = async (req, res) => {

  try {

    const userId = req.user.id;
    const eventId = req.params.eventId;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existing = await Booking.findOne({
      where: { user_id: userId, event_id: eventId, status: "going" }
    });

    if (existing) {
      return res.status(400).json({
        message: "User already joined this event"
      });
    }

    await Booking.create({
      user_id: userId,
      event_id: eventId,
      status: "going"
    });

    res.status(201).json({ message: "Successfully joined event" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// CANCEL EVENT
exports.cancelEvent = async (req, res) => {

  try {

    const userId = req.user.id;
    const eventId = req.params.eventId;

    const event = await Event.findByPk(eventId);

    const now = new Date();
    const eventStart = new Date(event.start_time);

    const diffHours = (eventStart - now) / (1000 * 60 * 60);

    if (diffHours < 8) {

      return res.status(400).json({
        message: "Cannot cancel event within 8 hours"
      });

    }

    await Booking.update(
      { status: "canceled" },
      { where: { user_id: userId, event_id: eventId } }
    );

    res.json({ message: "Booking canceled successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};