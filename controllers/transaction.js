const mongoose = require('mongoose')
const Product = require('../models/Product')
const Category = require('../models/Category')
const Transaction = require('../models/Transaction')
const Customer = require('../models/Customer')

const createNewTransaction = async (req, res) => {
    const { orderNumber, customer, discount, subtotal, tax, items, total, paid, change } = req.body;
    try {
        const existingCustomer = await Customer.findById(customer);
        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const productIds = items.map(item => item.product);
        const existingProducts = await Product.find({ '_id': { $in: productIds } });
        if (existingProducts.length !== items.length) {
            return res.status(404).json({ message: 'One or more items not found' });
        }

        for (let item of items) {
            const product = existingProducts.find(p => p._id.toString() === item.product);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.product} not found` });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient quantity for product ${product.name}` });
            }

            product.quantity -= item.quantity;
            await product.save();
        }

        const newTransaction = new Transaction({
            orderNumber,
            customer,
            discount,
            subtotal,
            tax,
            items,
            total,
            paid,
            change
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllTransactions = async(req,res)=>{
    try{
        const transactions = await Transaction.find()
        return res.json(transactions)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}


const getTransationById = async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid id format"})
    }
    try{
        const transaction = await Transaction.findById(req.params.id)
        if(!transaction){
            return res.status(404).json({message: "Transaction not found"})
        }
        return res.json(transaction)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getTransactionsByCustomerId = async(req, res) => {
    const { customerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({ message: "Invalid customer ID format" });
    }

    try {
        const transactions = await Transaction.find({ customer: customerId });
        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this customer" });
        }
        return res.json(transactions);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteTransaction = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.json({ message: "Transaction deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createNewTransaction,
    getAllTransactions,
    getTransationById,
    getTransactionsByCustomerId,
    deleteTransaction
};