const TodoLists = require('../models/todo_list');

// Home route to fetch all todos
module.exports.home = async function(req, res) {
  try {
    const todos = await TodoLists.findAll();  // Fetch all todos
    return res.render('homePage', {
      title: "Home",
      todoList: todos
    });
  } catch (err) {
    console.log('Error in fetching data', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Create Todo
module.exports.createTodo = async function(req, res) {
  try {
    const { desc, category, dueDate } = req.body;

    // Check if dueDate is valid and not empty
    if (!dueDate) {
      return res.status(400).send('Due date is required');
    }

    // Create the todo
    await TodoLists.create({ desc, category, dueDate });
    return res.redirect('/');
  } catch (err) {
    console.log('Error creating todo', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Delete Todo
module.exports.deleteTodo = async function(req, res) {
  try {
    const ids = req.query.id.split(',');
    await TodoLists.destroy({
      where: {
        id: ids
      }
    });
    return res.redirect('/');
  } catch (err) {
    console.log('Error deleting todo', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Edit Page
module.exports.EditPage = async function(req, res) {
  try {
    const todo = await TodoLists.findByPk(req.query.id);  // Fetch todo by ID
    return res.render('editPage', {
      title: 'Edit Todo',
      todolist: todo
    });
  } catch (err) {
    console.log('Error fetching todo for editing', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Update Todo
module.exports.editDetails = async function(req, res) {
  try {
    const { desc, category, dueDate } = req.body;

    // Ensure dueDate is not empty
    if (!dueDate) {
      return res.status(400).send('Due date is required');
    }

    // Update the todo
    await TodoLists.update({ desc, category, dueDate }, {
      where: {
        id: req.query.id
      }
    });
    return res.redirect('/');
  } catch (err) {
    console.log('Error updating todo', err);
    return res.status(500).send('Internal Server Error');
  }
};