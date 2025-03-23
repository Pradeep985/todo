import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        {/* Protected Route: Show TodoList if authenticated, otherwise redirect to login */}
        <Route path="/" element={token ? <TodoList token={token} /> : <Navigate to="/login" />} />
        
        {/* Login and Register Routes */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
};

export default App;
