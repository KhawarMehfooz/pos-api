const mongoose = require('mongoose')
const Customer = require('../models/Customer')

// Get all Customers
const getAllCustomers = async(req,res)=>{
    try{
        const customers = await Customer.find();
        res.json(customers);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// Create a new customer
const createNewCustomer = async(req,res)=>{
    const customer = new Customer({
        name: req.body.customerName,
        phone: req.body.customerPhone ||'not specified',
        address: req.body.customerAddress || 'not specified'
    });
    
    try{
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer)

    }catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllCustomers,
    createNewCustomer
}