const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user'); // Adjust path if needed

// Login GET
router.get('/login', (req, res) => {
    res.render('user/login'); 
});

// Login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    try {
        const user = await UserModel.findOne({ email:username });
        // console.log(user)
        if (!user) {
            req.session.error = 'Invalid email or password';
            return res.redirect('/user/login');
        }

        if (user.password != password) {
            req.session.error = 'Invalid email or password';
            return res.redirect('/user/login');
        }

        // Save user session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            package: user.package,
            subPackage: user.subPackage
        };

        req.session.usertype = "customer"

        req.session.success = 'Logged in successfully!';
        return res.redirect('/user/dashboard');

    } catch (err) {
        console.error('Login Error:', err);
        req.session.error = 'Something went wrong!';
        return res.redirect('/user/login');
    }
});

// Dashboard GET (After Login)
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        req.session.error = "Please login first!";
        return res.redirect('/user/login');
    }

    res.render('user/dashboard', {
        pageTitle: "Dashboard",
        user: req.session.user
    });
});

module.exports = router;
