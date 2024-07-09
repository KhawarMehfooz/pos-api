const express = require('express')
const router = express.Router()

const { 
    createNewTransaction,
    getAllTransactions,
    getTransationById,
    getTransactionsByCustomerId,
    deleteTransaction 
} = require('../controllers/transaction')

router.post('/transactions',createNewTransaction)
router.get('/transactions',getAllTransactions)
router.get('/transaction/:id',getTransationById)
router.get('/transaction/customer/:customerId', getTransactionsByCustomerId)
router.delete('/transaction/:id',deleteTransaction)

module.exports = router;