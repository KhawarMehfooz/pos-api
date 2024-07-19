const mongoose = require('mongoose')
const Settings = require('../models/Settings')

const createSettings = async(req,res)=>{
    const { storeName, storeLocation, storeContactNumber, currencySymbol, storeLogo, chargeVat, vatPercentage } = req.body;

    try {
        const settings = await Settings.findOneAndUpdate(
            {},
            { storeName, storeLocation, storeContactNumber, currencySymbol, storeLogo, chargeVat, vatPercentage },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.json(settings);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
const getSettings = async(req,res)=>{
    try {
        const settings = await Settings.findOne();
        return res.json(settings);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createSettings,
    getSettings,
}