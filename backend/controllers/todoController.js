const Task = require("../models/Todo");
exports.getAllTasks = (req, res) => {
  Task.getAllTasks((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// Get a single task
exports.getTaskById = (req, res) => {
  const { id } = req.params;
  Task.getTaskById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Task not found" });
    res.json(result[0]);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task is required" });

  Task.createTask(task, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, task });
  });
};

// Update a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task is required" });

  Task.updateTask(id, task, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task updated successfully" });
  });
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  Task.deleteTask(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted successfully" });
  });
};