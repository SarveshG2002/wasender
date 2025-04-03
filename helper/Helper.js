class Helper {
    constructor(req) {
      this.req = req; // Store the request object to access session data
    }
  
    // Method to clear session error and success messages
    clearErrorSuccess() {
      this.req.session.error = null; // Unset the session error
      this.req.session.success = null; // Unset the session success message
    }

    checkpageModule(module,page){
      let modulePage = this.sidebar()[module]["pages"];
      // modulePage.forEach(element => {
      //   if(element["name"]==page){
      //     return true;
      //   }
      // });
      // console.log(modulePage);
      for(let i=0;i<modulePage.length;i++){
        // console.log(modulePage[i],page)
        if(modulePage[i]["name"]==page){
          return true;
        }
      }

      return false;

    }

    sidebar(){
      let sidebar = {
        "Dashboard":{
          icon:"1233",
          pages:[
            {"name":"Dashboard","link":""}
          ],
          single:true
        },
        "Admin":{
          icon:"",
          pages:[
            {name:"Admin",link:""},{name:"Admin Logs",link:""}
          ],
          single:false
        },
        "Users":{
          icon:"",
          pages:[
            {name:"Users",link:""},{name:"User Logs",link:""}
          ],
          single:false
        },
        "Devices":{
          icon:"",
          pages:[
            {name:"Devices",link:""}
          ],
          single:true
        },
        "Messages":{
          icon:"",
          pages:[
            {name:"Messages",link:""}
          ],
          single:true
        },
        "Api":{
          icon:"",
          pages:[
            {name:"Api List",link:""},{name:"Add Api",link:""},{name:"Api Logs",link:""}
          ],
          single:false
        },
        "Package":{
          icon:"",
          pages:[
            {name:"Add Package",link:"/admin/package/add-package"}
          ],
          single:false
        },
        "Modules":{
          icon:"",
          pages:[
            {name:"Modules",link:"/admin/module/add-module"},
            {name:"Pages",link:"/admin/module/add-page"},
            {name:"Roles",link:"/admin/module/add-role"},
            {name:"Role List",link:"/admin/module/role-list"},
          ],
          single:false
        },
      };

      return sidebar;

    };

    

  }
  
  module.exports = Helper;
  