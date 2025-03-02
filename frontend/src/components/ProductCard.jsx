import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <div className="flex gap-2 mt-2">
        <button className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition">
          Add to Cart
        </button>
        <button className="bg-gray-700 text-white w-full py-2 rounded-md hover:bg-gray-600 transition">
          View
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
