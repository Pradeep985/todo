import React, { useState } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>To-Do List</Typography>
          <TextField
            fullWidth
            label="New Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth onClick={addTask} sx={{ mt: 2 }}>
            Add Task
          </Button>
          <List sx={{ mt: 2 }}>
            {tasks.map((t, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => removeTask(index)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={t} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TodoList;
