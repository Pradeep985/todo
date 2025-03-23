const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');
const auth = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/todos', auth, todoController.getTodos);
router.post('/todos', auth, todoController.addTodo);
router.delete('/todos/:id', auth, todoController.deleteTodo);

module.exports = router;
