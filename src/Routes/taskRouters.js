// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Import the controller
const {getTask,
    addTask,
    deleteTask,
    updateTask,
    toggleTask
}
 = require('../Controllers/taskControllers');

// Define a route and link it to the controller function
router.get('/', getTask);

router.post('/', addTask);

router.delete('/:id', deleteTask);

router.put('/:id', updateTask);

router.patch('/:id/toggle', toggleTask);

module.exports = router;
