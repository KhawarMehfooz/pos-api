const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllProducts,
  createNewProduct,
  getProductById,
  getProductsByCategory,
  editProduct,
  deleteProduct,
} = require("../controllers/inventory");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product-images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/products", getAllProducts);
router.post("/products", upload.single("image"), createNewProduct);
router.get("/product/:id", getProductById);
router.get("/products/category/:id", getProductsByCategory);
router.put("/product/:id",upload.single('image'), editProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
