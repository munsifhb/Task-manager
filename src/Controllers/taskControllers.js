

const tasks = []

// Get Task

const getTask = (req, res) => {
    res.json(tasks)

}

// Add Task 

const addTask = (req, res) => {
    const title = req.body.title;
    const priority = req.body.priority;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
        alert("Title dey neccessary")
    }
    const newTask = 
        {
            id : Date.now(),
            title : title,
            priority : priority || "Low",
            completed : false,
            createdAt : new Date().toLocaleDateString('en-US'),
        }
        
    

    tasks.push(newTask);

    res.status(201).json(newTask)
}

const deleteTask = (req, res) => {
    const taskId = Number(req.params.id);

    const existedTask = tasks.findIndex(task => task.id === taskId);

    if (existedTask === -1) {
        return res.status(404).json({message : "Task not found."})
    }

    tasks.splice(existedTask, 1);

  res.status(200).json({ message: "Task deleted successfully" });

}


const toggleTask = (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;

  res.status(200).json({ message: 'Toggled', task: tasks[taskIndex] });
};


const updateTask = (req, res) => {
    const taskId = Number(req.params.id);

    const { title, priority } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId)

    if (taskIndex === -1) {
        return res.status(404).json({message : "Task not found"})
    }

    tasks[taskIndex] = { ...tasks[taskIndex], title, priority  }

    res.status(200).json({ message: "Task updated successfully", task: tasks[taskIndex] });
}



module.exports = {getTask, addTask, deleteTask, updateTask, toggleTask}



