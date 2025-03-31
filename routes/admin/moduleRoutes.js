const express = require('express');
const ModuleModel = require("../../models/module")
const PageModel = require("../../models/page")
const RoleModel = require("../../models/role")
const RolePageModel = require("../../models/rolePages")


const router = express.Router();


router.get('/add-module', (req, res) => {
    res.render('admin/module/add-module'); // Render an admin dashboard page
});

router.get('/module-list', async(req, res) => {
    // res.render('admin/add-module'); // Render an admin dashboard page
    try{
        const modules = await ModuleModel.find();
        return res.json({success:true,data:modules})
    }catch{
        return res.json({success:false})
    }
});

router.post('/add-module', async (req, res) => {
    const { name } = req.body
    if(name && name!=""){
        let module = new ModuleModel({
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
        const module = await ModuleModel.findByIdAndDelete(id); // Find and delete the module by ID

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



router.get('/add-page', async (req, res) => {
    // const modules = await moduleModel.find();
    res.render('admin//module/add-page'); // Render an admin dashboard page
});

router.post('/add-page', async (req, res) => {
    const { name,module } = req.body
    if(name && module){
        let page = new PageModel({
            name,
            module
        });

        try{
            let r = await page.save();
            req.session.success = "Page Added Successfully"
        }catch{
            req.session.error = "Something Went Wrong"
        }
    }else{
        req.session.error = "Please Fill All Fields"
    }

    return res.redirect(req.get('referer'));

});



// You can add more admin-specific routes here

module.exports = router;