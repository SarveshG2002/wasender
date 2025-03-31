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

router.get('/page-list', async (req, res) => {
    try {
        // Fetch all pages
        const pages = await PageModel.find();
        
        // Fetch all modules
        const modules = await ModuleModel.find(); 

        // Map pages and replace module ID with module name
        const pagesWithModuleNames = pages.map(page => {
            const module = modules.find(m => m._id.toString() === page.module.toString()); 
            return {
                ...page.toObject(),
                module: module ? module.name : null  // Replace ObjectId with module name
            };
        });

        return res.json({ success: true, data: pagesWithModuleNames });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Something went wrong" });
    }
});



router.get('/del-page/:id', async (req, res) => {
    const { id } = req.params; // Get the module id from the URL params

    try {
        const page = await PageModel.findByIdAndDelete(id); // Find and delete the module by ID

        if (page) {
            req.session.success = "Page deleted successfully"; // Success message in session
            
        } else {
            req.session.error = "PAge not found"; 
        }
    } catch (error) {
        // console.error('Error deleting module:', error);
        req.session.error = "Something went wrong, please try again"; // General error message
        
    }
    finally{
        return res.redirect(req.get('referer'));
    }
});


router.get('/add-role', async (req, res) => {
    try {
        const modules = await ModuleModel.find();

        // Fetch pages for each module
        const modulesWithPages = await Promise.all(
            modules.map(async (module) => {
                const pages = await PageModel.find({ module: module._id }); // Fetch pages for each module
                return { ...module.toObject(), pages }; // Convert to object and add pages
            })
        );

        res.render('admin/module/add-role', { modules: modulesWithPages }); // Pass modules with their pages
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).send("Server error");
    }
});

router.post("/add-role", async (req, res) => {
    const { role_name, desc, page } = req.body;

    if (!role_name || !desc || !Array.isArray(page)) {
        req.session.error = "Invalid input data";
        return res.redirect(req.get('referer')); // Redirect back
    }

    try {
        // Step 1: Create the role and get its ID
        const newRole = new RoleModel({ name: role_name, description: desc });
        const savedRole = await newRole.save();

        // Step 2: Insert role-pages mapping
        const rolePagesData = page.map(pageId => ({
            role: savedRole._id,
            page: pageId
        }));

        await RolePageModel.insertMany(rolePagesData);

        req.session.success = "Role added successfully!";
    } catch (error) {
        console.error(error);
        req.session.error = "Something went wrong!";
    }

    return res.redirect(req.get('referer')); // Redirect back
});



// You can add more admin-specific routes here

module.exports = router;