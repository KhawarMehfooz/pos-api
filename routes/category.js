const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  createNewCategory,
  getSingleCategory,
  editCategory,
  deleteCategory
} = require('../controllers/category');

// Define routes
router.get('/categories', getAllCategories);
router.post('/categories', createNewCategory);
router.get('/category/:id',getSingleCategory);
router.put('/category/:id', editCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;
