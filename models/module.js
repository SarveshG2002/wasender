const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // If you want to make the field mandatory
    }
});

const Module = mongoose.model("modules", ModuleSchema);
module.exports = Module;
