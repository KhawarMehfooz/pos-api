const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    storeName: {
        type: String,
        required: true,
    },
    storeLocation: {
        type: String,
        required: true,
    },
    storeContactNumber: {
        type: String,
        required: true,
    },
    currencySymbol: {
        type: String,
        required: true
    },
    storeLogo: {
        type: String
    },
    chargeVat: {
        type: String,
        required: true,
        enum: ['0', '1'] // Corrected to string enum values
    },
    vatPercentage: {
        type: Number,
    }
});

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings