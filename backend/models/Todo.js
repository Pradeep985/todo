const db = require("../config/db");

// Get all tasks
exports.getAllTasks = (callback) => {
  db.query("SELECT * FROM tasks", callback);
};

// Get a single task
exports.getTaskById = (id, callback) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [id], callback);
};

// Add a new task
exports.createTask = (task, callback) => {
  db.query("INSERT INTO tasks (task) VALUES (?)", [task], callback);
};

// Update a task
exports.updateTask = (id, task, callback) => {
  db.query("UPDATE tasks SET task = ? WHERE id = ?", [task, id], callback);
};

// Delete a task
exports.deleteTask = (id, callback) => {
  db.query("DELETE FROM tasks WHERE id = ?", [id], callback);
};
