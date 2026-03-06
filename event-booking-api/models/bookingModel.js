const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  user_id: {
    type: DataTypes.INTEGER
  },

  event_id: {
    type: DataTypes.INTEGER
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "going"
  }

}, {
  tableName: "bookings",
  timestamps: false
});

module.exports = Booking;