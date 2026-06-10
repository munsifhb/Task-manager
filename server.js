// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const taskRoutes = require('./src/Routes/taskRouters');

const path = require('path');

// ✅ serve frontend files from the main folder
app.use(express.static(path.join(__dirname)));

// ✅ catch-all route — loads index.html when visiting your Render URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(cors());           // allow frontend access
app.use(express.json());   // read JSON body

// Mount the routes
app.use('/api/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Server dey on port 3000. is that so?');
});
