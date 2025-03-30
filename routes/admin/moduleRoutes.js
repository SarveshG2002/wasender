const express = require('express');
const moduleModel = require("../../models/module")
const router = express.Router();


router.get('/add-module', (req, res) => {
    res.render('admin/add-module'); // Render an admin dashboard page
});

router.get('/module-list', async(req, res) => {
    // res.render('admin/add-module'); // Render an admin dashboard page
    try{
        const modules = await moduleModel.find();
        return res.json({success:true,data:modules})
    }catch{
        return res.json({success:false})

    }
});

router.post('/add-module', async (req, res) => {
    const { name } = req.body
    if(name && name!=""){
        let module = new moduleModel({
            name
        });

        try{
            let r = await module.save();
            req.session.success = "Module Added Successfully"
        }catch{
            req.session.error = "Something Went Wrong"
        }
    }else{
        req.session.error = "Please Enter Propper Name"
    }

    return res.redirect(req.get('referer'));

});

router.get('/del-module/:id', async (req, res) => {
    const { id } = req.params; // Get the module id from the URL params

    try {
        const module = await moduleModel.findByIdAndDelete(id); // Find and delete the module by ID

        if (module) {
            req.session.success = "Module deleted successfully"; // Success message in session
            
        } else {
            req.session.error = "Module not found"; 
        }
    } catch (error) {
        // console.error('Error deleting module:', error);
        req.session.error = "Something went wrong, please try again"; // General error message
        
    }
    finally{
        return res.redirect(req.get('referer'));
    }
});

// You can add more admin-specific routes here

module.exports = router;
