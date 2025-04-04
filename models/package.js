const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalRequests: { type: Number, required: true },
    requestPerPeriod: { type: String, required: true },
    timeDelay: { type: Number, required: true },
    pricePerMonth: { type: Number, required: true },
    pricePer3Month: { type: Number, required: true },
    pricePer6Month: { type: Number, required: true },
    pricePerYear: { type: Number, required: true },
    description: { type: String },
    datetime: {type:String},
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
