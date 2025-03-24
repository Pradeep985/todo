import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Keep token updated
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login and Register Routes */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route */}
        <Route path="/" element={<ProtectedRoute token={token}><TodoList token={token} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
