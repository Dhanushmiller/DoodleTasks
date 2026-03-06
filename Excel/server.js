const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/excelDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Connection Error:", err));

// Routes
app.use("/users", userRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});