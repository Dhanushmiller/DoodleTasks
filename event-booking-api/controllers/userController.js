const { User, Booking, Event } = require("../models");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/errorHandler");


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

    errorHandler(res, error);

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

exports.bulkRegisterUsers = async (req, res) => {

  try {

    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({
        message: "Users array is required"
      });
    }

    const createdUsers = [];

    for (const user of users) {

      const existingUser = await User.findOne({
        where: { email: user.email }
      });

      if (existingUser) {
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role || "user",
        location: user.location,
        latitude: user.latitude,
        longitude: user.longitude
      });

      createdUsers.push(newUser);

    }

    res.status(201).json({
      message: "Bulk users registered successfully",
      totalCreated: createdUsers.length,
      users: createdUsers
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

exports.getUsersWithEvents = async (req, res) => {

  try {
    
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],

      include: [
        {
          model: Booking,
          attributes: ["status"],

          include: [
            {
              model: Event,
              attributes: ["id", "title", "location", "start_time"]
            }
          ]
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: "Users with their events fetched successfully",
      data: users
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};