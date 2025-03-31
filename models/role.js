const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // If you want to make the field mandatory
    },
    description: {
        type: String,
        required: true,  // If you want to make the field mandatory
    }
});

const Role = mongoose.model("roles", RoleSchema);
module.exports = Role;
