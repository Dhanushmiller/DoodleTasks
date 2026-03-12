const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  task_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  completion_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  expiry: {
    type: DataTypes.DATE
  },

  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: "todos",
  timestamps: true
});

module.exports = Todo;