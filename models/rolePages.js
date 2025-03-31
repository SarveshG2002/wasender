const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // If you want to make the field mandatory
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // If you want to make the field mandatory
    }
});

const RolePages = mongoose.model("rolePages", RoleSchema);
module.exports = RolePages;
