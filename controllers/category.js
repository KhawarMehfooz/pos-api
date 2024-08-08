const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({userId: req.user.id}).select(['_id','userId','name']);
    return res.json({categories: categories});
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ message: 'An error occurred while fetching categories.' });
  }
};


const createNewCategory = async (req, res) => {
  const category = new Category({
    userId: req.user.id,
    name: req.body.categoryName
  });

  try {
    const newCategory = await category.save();
    return res.status(201).json({category: {
      _id: newCategory._id,
      userId: newCategory.userId,
      name: newCategory.name
    }});
  } catch (err) {
    console.error(err.message)
    return res.status(400).json({ message: 'An error occurred while creating the category.' });
  }
};

const getSingleCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).select(['_id','userId','name']);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json({category});
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ message: 'An error occurred while fetching the category.' });
  }
};


const editCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!category) {
      return res.status(404).json({ message: 'Category Not Found!' });
    }

    category.name = req.body.categoryName || category.name;

    const updatedCategory = await category.save();
    return res.json({category: {
      _id: updatedCategory._id,
      userId: updatedCategory.userId,
      name: updatedCategory.name
    }});

  } catch (err) {
    console.error(err.message)
    return res.status(400).json({ message: 'An error occurred while updating the category' });
  }
};


const deleteCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const categoryId = req.params.id;

    const products = await Product.find({ 
      categoryId: categoryId,
      userId: req.params.id
     });

    if (products?.length > 0) {
      const productDeleteResult = await Product.deleteMany({ 
        category: categoryId, 
        userId: req.user.id 
      });
    }

    const categoryDeleteResult = await Category.deleteOne({ 
      _id: categoryId,
      userId: req.user.id 
    });
    if (categoryDeleteResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json({
      message: 'Category and associated products deleted',
      deletedProductsCount: products.length,
    });
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ message: 'An error occurred while deleting the category.' });
  }
};

module.exports = {
    getAllCategories,
    createNewCategory,
    getSingleCategory,
    editCategory,
    deleteCategory
}