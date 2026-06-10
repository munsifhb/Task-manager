// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const taskRoutes = require('./src/Routes/taskRouters');

app.use(cors());           // allow frontend access
app.use(express.json());   // read JSON body

// Mount the routes
app.use('/api/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Server dey on port 3000. is that so?');
});
