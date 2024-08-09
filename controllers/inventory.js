const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({userId: req.user.id}).select(['_id','userId','name','category','barcode','image','quantity','stockCheck']);
    return res.json({products});
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'An error occurred while fetching the products.' });
  }
};

const createNewProduct = async (req, res) => {
  const stockCheck = req.body.stockCheck === "on" ? 1 : 0;

  const product = new Product({
    userId: req.user.id,
    name: req.body.productName,
    price: req.body.productPrice,
    barcode: Math.floor(Date.now() / 1000),
    category: req.body.productCategory,
    image: req.file ? req.file.path : "uploads/default.jpg",
    quantity: req.body.productQuantity,
    stockCheck: stockCheck,
  });

  try {
    const newProduct = await product.save();
    return res.status(201).json({product: {
      _id: newProduct._id,
      userId: newProduct.userId,
      name: newProduct.name,
      category: newProduct.category,
      barcode: newProduct.barcode,
      quantity: newProduct.quantity,
      price: newProduct.price,
      stockCheck: newProduct.stockCheck,
      image: newProduct.image,
    }});
  } catch (err) {
    console.error(err.message)
    return res.status(400).json({ message: 'An error occurred while create the product.' });
  }
};

const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'An error occurred while fetching the product.' });
  }
};

const getProductsByCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const products = await Product.find({ 
      category: req.params.id,
      userId: req.user.id,
     }).select(['_id','userId','name','category','barcode','price','image','quantity','stockCheck']);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({products});
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'An error occurred while fetching the products.' });
  }
};

const editProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = req.body.productName !== undefined ? req.body.productName : product.name;
    product.price = req.body.productPrice !== undefined ? req.body.productPrice : product.price;
    product.category = req.body.productCategory !== undefined ? req.body.productCategory : product.category;
    product.image = req.file ? req.file.path : product.image;
    product.quantity = req.body.productQuantity !== undefined ? req.body.productQuantity : product.quantity;
    product.stockCheck = req.body.stockCheck !== undefined ? (req.body.stockCheck === "on" ? 1 : 0) : product.stockCheck;

    const updatedProduct = await product.save();
    return res.json({
      product: {
        _id: updatedProduct._id,
      userId: updatedProduct.userId,
      name: updatedProduct.name,
      category: updatedProduct.category,
      barcode: updatedProduct.barcode,
      price: updatedProduct.price,
      image: updatedProduct.image,
      quantity: updatedProduct.quantity,
      stockCheck: updatedProduct.stockCheck
      }
    });
  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: 'An error occurred while updating the product.' });
  }
};


const deleteProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const result = await product.deleteOne({ 
      _id: req.params.id,
      userId: req.user.id,
     });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'An error occurred while deleting the product.' });
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
  getProductsByCategory,
  editProduct,
  deleteProduct,
};
