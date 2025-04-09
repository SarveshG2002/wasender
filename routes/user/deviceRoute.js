const express = require('express');
const router = express.Router();

const { startSession } = require('../../helper/VenomWhatsapp');

router.get('/add', (req, res) => {
    res.render('user/device/add',{pageTitle:"Add Device","user": req.session.user}); 
});



router.get('/add-device/:id', async (req, res) => {
    const sessionId = `user-${req.params.id}`;
    await startSession(sessionId, res);
});


module.exports = router;