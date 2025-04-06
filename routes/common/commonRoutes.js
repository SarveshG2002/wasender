const express = require('express');
const router = express.Router();
const packageRoutes = require('./packageRoutes');

router.use('/package', packageRoutes);


// You can add more admin-specific routes here

module.exports = router;