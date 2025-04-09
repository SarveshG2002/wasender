const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package", // refers to your Package model
        required: false // Optional, because you allow "Custom"
    },
    subPackage: {
        type: String, // Can be '1M', '3M', '6M', '1Y' or anything else
        required: false
    },

    datetime: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("users", UserSchema);
