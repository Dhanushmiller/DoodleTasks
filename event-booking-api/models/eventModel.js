const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define("Event", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: DataTypes.STRING
  },

  description: {
    type: DataTypes.TEXT
  },
  
  location: {
  type: DataTypes.STRING,
  allowNull: true
},

  latitude: {
    type: DataTypes.FLOAT
  },

  longitude: {
    type: DataTypes.FLOAT
  },

  start_time: {
    type: DataTypes.DATE
  },

  end_time: {
    type: DataTypes.DATE
  },

  created_by: {
    type: DataTypes.INTEGER
  }

}, {
  tableName: "events",
  timestamps: false
});

module.exports = Event;