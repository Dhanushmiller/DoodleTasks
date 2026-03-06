const Booking = require("../models/bookingModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");


// GET USER EVENTS
exports.getMyEvents = async (req, res) => {

  try {

    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [Event]
    });

    const now = new Date();

    const past = [];
    const current = [];
    const future = [];

    bookings.forEach(b => {

      const event = b.Event;

      const start = new Date(event.start_time);
      const end = new Date(event.end_time);

      if (end < now) past.push(event);
      else if (start > now) future.push(event);
      else current.push(event);

    });

    res.json({ past, current, future });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// UPDATE PROFILE
exports.updateProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    const { name, latitude, longitude } = req.body;

    await User.update(
      { name, latitude, longitude },
      { where: { id: userId } }
    );

    res.json({ message: "Profile updated successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};