const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PasswordReset = sequelize.define("PasswordReset", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  otp: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  expiry: {
    type: DataTypes.DATE,
    allowNull: false
  }

}, {
  tableName: "password_resets",
  timestamps: false,
  underscored: true
});

module.exports = PasswordReset;