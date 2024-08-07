const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createNewProduct = async (req, res) => {
  const stockCheck = req.body.stockCheck === "on" ? 1 : 0;

  const product = new Product({
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
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const products = await Product.find({ category: req.params.id });
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const editProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const product = await Product.findById(req.params.id);
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
    return res.json(updatedProduct);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


const deleteProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const result = await product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
