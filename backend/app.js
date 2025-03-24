require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct Route Mounting
app.use("/api/auth", authRoutes);
app.use("/tasks", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
