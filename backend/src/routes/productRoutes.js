const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const productController = require("../controllers/productController");
const adminAuth = require("../middlewares/Auth");

// ✅ Product CRUD routes (Admin protected)
router.post("/createproduct", upload.single("image"), productController.createProduct);
router.put("/:id", adminAuth, productController.updateProduct);
router.delete("/:id", adminAuth, productController.deleteProduct);

// ✅ Public product routes
router.get("/fetch", productController.getProducts);
router.get("/getdetail/:id", productController.getProductById);

module.exports = router;
