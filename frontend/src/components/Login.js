import React, { useState } from "react";
import { Container, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { login } from "../Api";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(credentials.email, credentials.password);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/"); // Redirect to to-do list after successful login
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" name="email" margin="normal" onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })} required />
            <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })} required />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>Login</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <a href="/register">Register here</a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
