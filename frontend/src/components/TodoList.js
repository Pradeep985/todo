import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Card, CardContent } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post("http://localhost:5000/tasks", { task: newTask })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      })
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch((err) => console.error(err));
  };

  const updateTask = (id) => {
    if (!editedTask.trim()) return;
    axios.put(`http://localhost:5000/tasks/${id}`, { task: editedTask })
      .then(() => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, task: editedTask } : task)));
        setEditingId(null);
        setEditedTask("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Card style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>To-Do List</h2>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={addTask}>
          Add Task
        </Button>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider>
              {editingId === task.id ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <ListItemText primary={task.task} />
              )}
              {editingId === task.id ? (
                <IconButton color="primary" onClick={() => updateTask(task.id)}>
                  <Save />
                </IconButton>
              ) : (
                <>
                  <IconButton color="secondary" onClick={() => { setEditingId(task.id); setEditedTask(task.task); }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default TodoList;
