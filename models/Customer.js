const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
},{
    timestamps: true
})
const Customer = mongoose.Model("Customer",CustomerSchema);
module.exports = Customer;