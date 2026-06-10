const express = require("express");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./src/Routes/taskRouters");

const app = express();

app.use(cors({
  origin: 'https://task-manager-xi-two-56.vercel.app/' // ✅ update with your Vercel URL
}));
app.use(express.json());

// API routes first
app.use("/api/tasks", taskRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;