const sequelize = require("../config/db");

const User = require("./userModel");
const Event = require("./eventModel");
const Booking = require("./bookingModel");


// RELATIONSHIPS

User.hasMany(Booking, { foreignKey: "user_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Booking, { foreignKey: "event_id" });
Booking.belongsTo(Event, { foreignKey: "event_id" });


// EXPORT
module.exports = {
  sequelize,
  User,
  Event,
  Booking
};