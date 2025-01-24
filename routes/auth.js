const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Sign-up route (GET and POST)
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', authController.signup);

// Sign-in route (GET and POST)
router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', authController.signin);

module.exports = router;
