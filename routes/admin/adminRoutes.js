const express = require('express');
const router = express.Router();
const moduleRoutes = require('./moduleRoutes');
const packageRoutes = require('./packageRoutes');


// Define an admin route



router.get('/login', (req, res) => {
  res.render('admin/login'); // Render an admin dashboard page
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials match
  if (username === 'admin@gmail.com' && password === '1234') {
    req.session.username = username;
    req.session.role = 1; // Assigning role '1' for admin
    req.session.success = "Login successFull"
    res.redirect('/admin/dashboard'); // If correct, redirect to the dashboard
  } else {
    // If incorrect, render the login page again with an error message
    req.session.error = "Username or password is incorrect"
    res.redirect('/admin/login');
  }
});


router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard',{pageTitle:"Dashboard"}); // Render an admin dashboard page
});

router.use('/module', moduleRoutes);
router.use('/package', packageRoutes);


// You can add more admin-specific routes here

module.exports = router;
