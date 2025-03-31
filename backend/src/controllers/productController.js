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
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

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

        const { name, description, category, brand, color, size, material, price, rating, reviews } = req.body;
        if (!name || !price) {
          return res.status(400).json({ error: "Name and price are required" });
        }

        try {
          const product = await Product.create({
            name,
            description,
            category,
            brand,
            color,
            size,
            material,
            price,
            image: result.secure_url,
            rating: rating || 0,
            reviews: reviews ? JSON.parse(reviews) : [],
          });
          res.status(201).json(product);
        } catch (dbError) {
          console.error("❌ Database Error:", dbError);
          res.status(500).json({ error: "Failed to create product", details: dbError.message });
        }
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
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const { name, description, category, brand, color, size, material, price, rating, reviews } = req.body;

    await product.update({
      name,
      description,
      category,
      brand,
      color,
      size,
      material,
      price,
      rating,
      reviews: reviews ? JSON.parse(reviews) : product.reviews,
    });

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
