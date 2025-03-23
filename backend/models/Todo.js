const db = require("../config/db");

class Todo {
  static getTodos(userId) {
    return db.query("SELECT * FROM todos WHERE user_id = ?", [userId])
      .then(([result]) => result)
      .catch((err) => {
        console.error("Error fetching todos:", err);
        return [];
      });
  }

  static createTodo(userId, task) {
    return db.query("INSERT INTO todos (user_id, task) VALUES (?, ?)", [userId, task])
      .then(([result]) => result.insertId)
      .catch((err) => {
        console.error("Error creating todo:", err);
        return null;
      });
  }

  static updateTodo(id, task) {
    return db.query("UPDATE todos SET task = ? WHERE id = ?", [task, id])
      .then(() => true)
      .catch((err) => {
        console.error("Error updating todo:", err);
        return false;
      });
  }

  static deleteTodo(id) {
    return db.query("DELETE FROM todos WHERE id = ?", [id])
      .then(() => true)
      .catch((err) => {
        console.error("Error deleting todo:", err);
        return false;
      });
  }
}

module.exports = Todo;
