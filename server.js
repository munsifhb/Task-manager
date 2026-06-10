const express = require("express");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./src/Routes/taskRouters");

const app = express();

app.use(cors());
app.use(express.json());

// API routes first
app.use("/api/tasks", taskRoutes);

// Serve frontend files
app.use(express.static(__dirname));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ❌ REMOVE app.listen()

module.exports = app;