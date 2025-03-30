const express = require('express');
const router = express.Router();

// Define an admin route
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard'); // Render an admin dashboard page
});


router.get('/login', (req, res) => {
  res.render('admin/login'); // Render an admin dashboard page
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials match
  if (username === 'admin@gmail.com' && password === '1234') {
    res.redirect('/admin/dashboard'); // If correct, redirect to the dashboard
  } else {
    // If incorrect, render the login page again with an error message
    res.redirect('/admin/login');
  }
});

// You can add more admin-specific routes here

module.exports = router;
