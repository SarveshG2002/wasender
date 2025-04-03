const express = require('express');
const router = express.Router();
// const moduleRoutes = require('./moduleRoutes');


router.get('/add-package', (req, res) => {
    res.render('admin/package/add-package',{pageTitle:"Add Package"}); // Render an admin dashboard page
  });

// You can add more admin-specific routes here

module.exports = router;
