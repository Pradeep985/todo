import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust if needed

// Register user with username, email, and password
export const register = (username, email, password) => 
  axios.post(`${API_URL}/auth/register`, { username, email, password });

// Login user with email and password
export const login = (email, password) => 
  axios.post(`${API_URL}/auth/login`, { email, password });

// Get all todos (requires authentication)
export const getTodos = (token) => 
  axios.get(`${API_URL}/todos`, { headers: { Authorization: `Bearer ${token}` } });

// Add a new todo (requires authentication)
export const addTodo = (task, token) => 
  axios.post(`${API_URL}/todos`, { task }, { headers: { Authorization: `Bearer ${token}` } });

// Update an existing todo (requires authentication)
export const updateTodo = (id, task, token) => 
  axios.put(`${API_URL}/todos/${id}`, { task }, { headers: { Authorization: `Bearer ${token}` } });

// Delete a todo (requires authentication)
export const deleteTodo = (id, token) => 
  axios.delete(`${API_URL}/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
