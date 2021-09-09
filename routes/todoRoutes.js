const express = require('express');
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');
const {requireAuth} = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/',todoController.todo_helloPage)
router.get('/todos',requireAuth,todoController.todo_mainPage);
router.post('/createTodo',requireAuth,todoController.todo_createTodo)
router.delete('/deleteTodo/:id',requireAuth,todoController.todo_deleteTodo);
router.get('/signup',userController.signup_get)
router.post('/signup',userController.signup_post);
router.get('/login',userController.login_get)
router.post('/login',userController.login_post);
router.get('/logout',userController.logout_get);
module.exports = router;