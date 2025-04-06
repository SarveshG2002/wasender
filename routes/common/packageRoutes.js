const express = require('express');
const router = express.Router();
const PackageModel = require('../../models/package'); // Import Package model


router.get('/package-list', async (req, res) => {
    const packages = await PackageModel.find();
    return res.json({success:true,data:packages})
});

router.get('/package/:id', async (req, res) => {
    const { id } = req.params; // Get the id parameter from the URL
    try {
        const package = await PackageModel.findById(id); // Find the package by its _id
        if (!package) {
            return res.json({ success: false, message: 'Package not found' });
        }
        return res.json({ success: true, data: package });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});
  
module.exports = router;
