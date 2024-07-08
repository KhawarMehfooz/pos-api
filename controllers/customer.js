const mongoose = require('mongoose')
const Customer = require('../models/Customer')

// Get all Customers
const getAllCustomers = async(req,res)=>{
    try{
        const customers = await Customer.find();
        return res.json(customers);
    }catch(err){
       return res.status(500).json({message: err.message})
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
        return res.status(201).json(newCustomer)

    }catch(err){
       return res.status(400).json({message: err.message})
    }
}

const getSingleCustomer = async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: 'Invalid id format'})
    }
    try{
        const customer = await Customer.findById(req.params.id)
        if(!customer){
            return res.status(404).json({message: "Customer not found"})
        }
        return res.json(customer)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const editCustomer = async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid id format"})
    }
    try{
        const customer = await Customer.findById(req.params.id)
        if(!customer){
            return res.status(404).json({message: "Customer not found"})
        }
        customer.name = req.body.customerName || customer.name
        customer.phone = req.body.customerPhone || customer.phone
        customer.address = req.body.customerAddress || customer.address

        const updatedCustomer = await customer.save()
        return res.json(updatedCustomer)
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}

const deleteCustomer = async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid id format"})
    }
    try{
        const customer = await Customer.findById(req.params.id)
        if(!customer){
            return res.status(404).json({message: "Customer not found"})
        }
        const result = await customer.deleteOne({_id: req.params.id})
        if(result.deletedCount === 0){
            return res.status(404).json({message: "Customer not found"})
        }
        return res.json({message: "Customer deleted successfully"})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    getAllCustomers,
    createNewCustomer,
    getSingleCustomer,
    editCustomer,
    deleteCustomer
}