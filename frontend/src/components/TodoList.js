import React, { useState, useEffect } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../Api";

const TodoList = ({ token }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos(token);
      setTasks(res.data);
    } catch {
      alert("Error fetching todos");
    }
  };

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await addTodo(task, token);
      setTasks([...tasks, { id: res.data.id, task }]);
      setTask("");
    } catch {
      alert("Error adding task");
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await updateTodo(id, updatedTask, token);
      setTasks(tasks.map(t => (t.id === id ? { ...t, task: updatedTask } : t)));
    } catch {
      alert("Error updating task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id, token);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      alert("Error deleting task");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>To-Do List</Typography>
          <TextField fullWidth label="New Task" value={task} onChange={(e) => setTask(e.target.value)} margin="normal" />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddTask} sx={{ mt: 2 }}>Add Task</Button>
          <List sx={{ mt: 2 }}>
            {tasks.map((t) => (
              <ListItem key={t.id} secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteTask(t.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={t.task} onClick={() => {
                  const newTask = prompt("Update Task:", t.task);
                  if (newTask) handleUpdateTask(t.id, newTask);
                }} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TodoList;
