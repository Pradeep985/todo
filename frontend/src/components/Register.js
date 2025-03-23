import React, { useState } from "react";
import { Container, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { register } from "../Api";

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(credentials.username, credentials.email, credentials.password);
      alert("Registration successful! Please login.");
      window.location.href = "/login";  // Redirect to login page
    } catch {
      alert("Error registering user");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Username" name="username" margin="normal" onChange={handleChange} required />
            <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} required />
            <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} required />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>Register</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <a href="/login">Login here</a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
