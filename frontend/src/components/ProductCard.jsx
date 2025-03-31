import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = (e) => {
    e.stopPropagation(); // Prevents card click from triggering navigation
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      key={product.id}
      className="p-4 transition bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/product/${product.id}`)} // Redirect on click
    >
      {/* Product Image */}
      <img
        src={product.image || "/placeholder.jpg"} // ✅ Fallback image
        alt={product.name}
        className="object-cover w-full h-40 rounded-md"
      />

      {/* Product Name & Price */}
      <h3 className="mt-2 text-lg font-bold truncate">{product.name}</h3>
      <p className="text-gray-600 font-semibold">${product.price.toFixed(2)}</p>

      {/* Brand & Rating */}
      <p className="text-sm text-gray-500">{product.brand}</p>
      {product.rating && (
        <p className="text-sm text-yellow-500">⭐ {product.rating.toFixed(1)} / 5</p>
      )}

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800"
          onClick={(e) => e.stopPropagation()} // ✅ Prevents navigation
        >
          Add to Cart
        </button>
        <button
          className="w-full py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600"
          onClick={handleViewProduct} // ✅ Directly navigates
        >
          View
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
