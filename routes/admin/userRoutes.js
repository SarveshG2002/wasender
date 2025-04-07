const express = require('express');
const router = express.Router();
// const packageRoutes = require('./packageRoutes');

// router.use('/package', packageRoutes);

// You can add more admin-specific routes here

router.get('/add', (req, res) => {
    
    res.render('admin/user/add-user',{pageTitle:"Add User"}); // Render an admin dashboard page
});

module.exports = router;