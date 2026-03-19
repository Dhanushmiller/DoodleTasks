const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

// test connection
sequelize.authenticate()
  .then(() => {
    console.log("Sequelize connected to MySQL");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = { sequelize };