const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },

    // Prices
    pricePerMonth: { type: Number, required: true },
    pricePer3Month: { type: Number, required: true },
    pricePer6Month: { type: Number, required: true },
    pricePerYear: { type: Number, required: true },

    // Total Requests
    totalRequestsPerMonth: { type: Number, required: true },
    totalRequestsPer3Month: { type: Number, required: true },
    totalRequestsPer6Month: { type: Number, required: true },
    totalRequestsPerYear: { type: Number, required: true },

    // Request per Period
    requestPerMonth: { type: String, required: true },
    requestPer3Month: { type: String, required: true },
    requestPer6Month: { type: String, required: true },
    requestPerYear: { type: String, required: true },

    // Delays
    delayPerMonth: { type: Number, required: true },
    delayPer3Month: { type: Number, required: true },
    delayPer6Month: { type: Number, required: true },
    delayPerYear: { type: Number, required: true },

    // Descriptions
    descriptionPerMonth: { type: String },
    descriptionPer3Month: { type: String },
    descriptionPer6Month: { type: String },
    descriptionPerYear: { type: String },

    datetime: { type: String },
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
