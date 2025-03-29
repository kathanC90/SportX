const db = require("../models");
const Product = db.Product;
const cloudinary = require("../config/cloudinary");

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Fetch single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Create a new product with image upload
exports.createProduct = async (req, res) => {
  try {
    console.log("Received file:", req.file); // Debugging

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    // Convert buffer to stream for Cloudinary upload
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Error:", error);
          return res.status(500).json({ error: "Cloudinary Upload Error", details: error.message });
        }

        if (!result || !result.secure_url) {
          return res.status(500).json({ error: "Cloudinary failed to provide an image URL." });
        }

        const { name, price } = req.body;
        if (!name || !price) {
          return res.status(400).json({ error: "Name and price are required" });
        }

        // Create a new product inside an async function
        (async () => {
          try {
            const product = await Product.create({
              name,
              price,
              image: result.secure_url,
            });
            res.status(201).json(product);
          } catch (dbError) {
            console.error("❌ Database Error:", dbError);
            res.status(500).json({ error: "Failed to create product", details: dbError.message });
          }
        })();
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update({ name, price, image });
    res.json(product);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
