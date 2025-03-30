const express = require('express');
const moduleModel = require("../../models/module")
const router = express.Router();


router.get('/add-module', (req, res) => {
    res.render('admin/add-module'); // Render an admin dashboard page
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

// You can add more admin-specific routes here

module.exports = router;
