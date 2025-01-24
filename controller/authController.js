const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.signup = async function(req, res) {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).send('Please fill in all fields');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create new user with hashed password
     
    await User.create({ username, email, password });

    return res.redirect('/signin');
  } catch (err) {
    console.log('Error during sign-up:', err);
    return res.status(500).send('Error creating user');
  }
};

module.exports.signin = async function(req, res) {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).send('Please fill in all fields');
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Store user session
    req.session.userId = user.id;
    return res.redirect('/');
  } catch (err) {
    console.log('Error during sign-in:', err);
    return res.status(500).send('Error signing in');
  }
};