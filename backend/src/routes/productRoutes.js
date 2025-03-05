const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const cloudinary = require('../utils/cloudinary');
const productController = require("../controllers/productController");
const adminAuth = require("../middlewares/Auth"); // Middleware for admin authentication

// Upload product with image (Admin only)
router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Save product in database
    const product = await productController.createProduct(req, res, result.secure_url);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product CRUD routes (Admin protected)
router.post("/", adminAuth, productController.createProduct);
router.put("/:id", adminAuth, productController.updateProduct);
router.delete("/:id", adminAuth, productController.deleteProduct);

// Public product routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;
