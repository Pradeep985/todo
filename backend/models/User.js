const db = require("../config/db");

const User = {
  createUser: (username, email, password, callback) => {
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserSql, [email], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) return callback(new Error("User already exists"), null);

      const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(sql, [username, email, password], callback);
    });
  },

  getUserByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.length > 0 ? results[0] : null);
    });
  },
};

module.exports = User;
