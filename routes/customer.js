const express = require('express');
const router = express.Router();

const {
    getAllCustomers,
    createNewCustomer
} = require('../controllers/customer')

// routes
router.get('/customers',getAllCustomers)
router.post('/customers',createNewCustomer)

module.exports = router