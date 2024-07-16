const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const createNewCategory = async (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName
  });

  try {
    const newCategory = await category.save();
    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getSingleCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const editCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'Category Not Found!' });
    }

    cat.categoryName = req.body.categoryName || cat.categoryName;

    const updatedCat = await cat.save();
    return res.json(updatedCat);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


const deleteCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const categoryId = req.params.id;

    const products = await Product.find({ category: categoryId });

    if (products.length > 0) {
      const productDeleteResult = await Product.deleteMany({ category: categoryId });
      console.log(`Deleted ${productDeleteResult.deletedCount} products associated with the category.`);
    }

    const categoryDeleteResult = await Category.deleteOne({ _id: categoryId });
    if (categoryDeleteResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json({
      message: 'Category and associated products deleted',
      deletedProductsCount: products.length,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAllCategories,
    createNewCategory,
    getSingleCategory,
    editCategory,
    deleteCategory
}