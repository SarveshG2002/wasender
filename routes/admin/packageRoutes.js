const express = require('express');
const router = express.Router();
const PackageModel = require('../../models/package'); // Import Package model

// Render Add Package Form
router.get('/add-package', (req, res) => {
    res.render('admin/package/add-package', { pageTitle: "Add Package" });
});

router.get('/package-list', async (req, res) => {
  const packages = await PackageModel.find();
  res.render('admin/package/package-list', { pageTitle: "Package List",packages });
});

// Handle Form Submission
router.post('/add-package', async (req, res) => {
    try {
        console.log(req.body);

        const {
            name,

            // Prices
            pricePerMonth,
            pricePer3Month,
            pricePer6Month,
            pricePerYear,

            // Total Requests
            totalRequestsPerMonth,
            totalRequestsPer3Month,
            totalRequestsPer6Month,
            totalRequestsPerYear,

            // Requests Per Period
            requestPerPeriodMonth,
            requestPerPeriod3Month,
            requestPerPeriod6Month,
            requestPerPeriodYear,

            // Time Delays
            delayPerMonth,
            delayPer3Month,
            delayPer6Month,
            delayPerYear,

            // Descriptions
            descriptionPerMonth,
            descriptionPer3Month,
            descriptionPer6Month,
            descriptionPerYear
        } = req.body;

        const datetime = await res.locals.helper.getDateTime("Y-m-d H:i:s");

        const newPackage = new PackageModel({
            name,

            // Prices
            pricePerMonth,
            pricePer3Month,
            pricePer6Month,
            pricePerYear,

            // Total Requests
            totalRequestsPerMonth,
            totalRequestsPer3Month,
            totalRequestsPer6Month,
            totalRequestsPerYear,

            // Requests Per Period
            requestPerMonth:requestPerPeriodMonth,
            requestPer3Month:requestPerPeriod3Month,
            requestPer6Month:requestPerPeriod6Month,
            requestPerYear:requestPerPeriodYear,

            // Time Delays
            delayPerMonth,
            delayPer3Month,
            delayPer6Month,
            delayPerYear,

            // Descriptions
            descriptionPerMonth,
            descriptionPer3Month,
            descriptionPer6Month,
            descriptionPerYear,

            datetime
        });

        await newPackage.save();

        req.session.success = "Package added successfully!";
    } catch (error) {
        console.error(error);
        req.session.error = "Something went wrong!";
    }

    return res.redirect(req.get('referer'));
});

router.get('/del-package/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await PackageModel.findByIdAndDelete(id);

        req.session.success = "Package deleted successfully!";
    } catch (error) {
        console.error(error);
        req.session.error = "Something went wrong while deleting!";
    }

    return res.redirect(req.get('referer'));
});

module.exports = router;
