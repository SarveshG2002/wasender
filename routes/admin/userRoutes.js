const express = require('express');
const router = express.Router();
const UserModel = require('../../models/User'); // Adjust path as needed

// GET: Render the add-user page
router.get('/add', (req, res) => {
    res.render('admin/user/add-user', { pageTitle: "Add User" });
});

// POST: Store user
router.post('/add', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            package: selectedPackage,
            subPackage
        } = req.body;

        // Get datetime
        const datetime = await res.locals.helper.getDateTime("Y-m-d H:i:s");
        console.log(datetime)
        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password,
            phone,
            package: selectedPackage,
            subPackage,
            datetime
        });

        // Save to DB
        await newUser.save();

        req.session.success = "User added successfully!";
    } catch (err) {
        console.error(err);
        req.session.error = "Something went wrong!";
    }

    return res.redirect(req.get('referer'));
});

router.get('/list', async (req, res) => {
    try {
        const users = await UserModel.find().sort({ datetime: -1 });
        res.render('admin/user/list-user', {
            pageTitle: 'User List',
            users
        });
    } catch (err) {
        console.error(err);
        req.session.error = "Unable to fetch user list.";
        res.redirect('/admin/user/add');
    }
});

// GET: Delete user
router.get('/delete/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        req.session.success = "User deleted successfully!";
    } catch (err) {
        console.error(err);
        req.session.error = "Unable to delete user.";
    }

    res.redirect('/admin/user/list');
});


module.exports = router;
