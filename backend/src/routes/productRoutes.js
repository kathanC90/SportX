const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const productController = require("../controllers/productController");

// ✅ Product CRUD routes (Admin protected)
router.post("/createproduct", upload.single("image"), productController.createProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// ✅ Public product routes
router.get("/fetch", productController.getProducts);
router.get("/getdetail/:id", productController.getProductById);

module.exports = router;
