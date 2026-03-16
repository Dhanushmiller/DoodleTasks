require("dotenv").config();
const express = require("express");
require("./jobs/reminder.job");

const db = require("./config/db");
const userRoutes = require("./routes/user.routes");

const app = express();

const todoRoutes = require("./routes/todo.routes");
app.use(express.json());
app.use("/api/todos",todoRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Todo Memo API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});