const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // If you want to make the field mandatory
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // If you want to make the field mandatory
    }
});

const Page = mongoose.model("pages", PageSchema);
module.exports = Page;
