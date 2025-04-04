const express = require('express');
const router = express.Router();
const Package = require('../../models/package'); // Import Package model

// Render Add Package Form
router.get('/add-package', (req, res) => {
    res.render('admin/package/add-package', { pageTitle: "Add Package" });
});

// Handle Form Submission
router.post('/add-package', async (req, res) => {
    try {
      console.log(req.body)
        const { name, ruqests, requestPerPeriod, delay, pricePerMonth, pricePer3Month, pricePer6Month, pricePerYear, description } = req.body;
        let datetime = await res.locals.helper.getDateTime("Y-m-d H:i:s")
        // Create new package
        const newPackage = new Package({
            name,
            totalRequests: ruqests,
            requestPerPeriod,
            timeDelay: delay,
            pricePerMonth,
            pricePer3Month,
            pricePer6Month,
            pricePerYear,
            description,
            datetime
        });

        await newPackage.save(); // Save to DB

        req.session.success = "Package added successfully!";
        // res.redirect('/admin/add-package'); // Redirect to same page
    } catch (error) {
        console.error(error);
        req.session.error = "Something went wrong!";
        // return res.redirect(req.get('referer'));
    }

    return res.redirect(req.get('referer'));
});

module.exports = router;
