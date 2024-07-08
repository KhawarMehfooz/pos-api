const express = require('express');
const router = express.Router();

const {
    getAllCustomers,
    createNewCustomer,
    getSingleCustomer,
    editCustomer,
    deleteCustomer
} = require('../controllers/customer');

// routes
router.get('/customers',getAllCustomers)
router.post('/customers',createNewCustomer)
router.get('/customer/:id',getSingleCustomer)
router.put('/customer/:id',editCustomer)
router.delete('/customer/:id',deleteCustomer)

module.exports = router