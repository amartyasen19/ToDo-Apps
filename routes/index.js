const express = require('express');
const router = express.Router();
const homeController = require('../controller/homecontroller');
const { isAuthenticated } = require('../middleware/isAuthenticated'); 

// Define routes
router.get('/',isAuthenticated, homeController.home);
router.post('/create_todo',isAuthenticated, homeController.createTodo);
router.post('/delete_todo',isAuthenticated, homeController.deleteTodo);
router.get('/editdata',isAuthenticated, homeController.EditPage);
router.post('/edit-todolist',isAuthenticated, homeController.editDetails);

module.exports = router;
