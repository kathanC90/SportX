const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const cloudinary = require("../config/cloudinary");
const productController = require("../controllers/productController");
const adminAuth = require("../middlewares/Auth"); // Middleware for admin authentication

// ✅ Upload product with image (Admin only)
router.post("/upload", adminAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    // ✅ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // ✅ Attach uploaded image URL to request body
    req.body.imageUrl = result.secure_url;

    // ✅ Save product in database
    return productController.createProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Product CRUD routes (Admin protected)
router.post("/", adminAuth, productController.createProduct);
router.put("/:id", adminAuth, productController.updateProduct);
router.delete("/:id", adminAuth, productController.deleteProduct);

// ✅ Public product routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;
