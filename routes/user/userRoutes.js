const express = require('express');
const router = express.Router();
// const packageRoutes = require('../common/packageRoutes');

// router.use('/package', packageRoutes);


// You can add more admin-specific routes here


router.get('/login', (req, res) => {
    res.render('user/login'); // Render an admin dashboard page
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

module.exports = router;