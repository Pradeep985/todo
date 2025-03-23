const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  const userId = req.userId;
  const todos = await Todo.getTodos(userId);
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const userId = req.userId;
  const { task } = req.body;
  const todoId = await Todo.createTodo(userId, task);
  res.json({ id: todoId, task });
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  await Todo.updateTodo(id, task);
  res.json({ message: "Task updated" });
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.deleteTodo(id);
  res.json({ message: "Task deleted" });
};
