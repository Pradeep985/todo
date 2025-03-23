const db = require("../config/db");

class User {
  static findByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = ?", [email])
      .then(([result]) => result[0])
      .catch((err) => {
        console.error("Error fetching user:", err);
        return null;
      });
  }

  static createUser(username, email, hashedPassword) {
    return db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
      [username, email, hashedPassword]
    )
    .then(([result]) => result.insertId)
    .catch((err) => {
      console.error("Error inserting user:", err);
      return null;
    });
  }
}

module.exports = User;
