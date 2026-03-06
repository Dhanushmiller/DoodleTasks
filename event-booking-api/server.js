require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);


// DATABASE CONNECTION
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully with Sequelize");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


// SYNC MODELS
sequelize.sync()
  .then(() => {
    console.log("All models synced with database");
  })
  .catch((err) => {
    console.error("Sync error:", err);
  });


// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});