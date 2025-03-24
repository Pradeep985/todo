const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    User.createUser(username, email, hashedPassword, (error) => {
      if (error) {
        if (error.message === "User already exists") {
          return res.status(400).json({ error: "User already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, (error, user) => {
    if (error) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(404).json({ error: "User not found" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    });
  });
};
