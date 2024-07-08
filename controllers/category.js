const mongoose = require('mongoose');
const Category = require('../models/Category');


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
    const result = await Category.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.json({ message: 'Category deleted' });
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