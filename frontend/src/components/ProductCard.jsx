import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      key={product.id}
      className="p-4 transition bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
      onClick={handleViewProduct} // Redirect when clicking the card
    >
      <img src={product.image} alt={product.name} className="object-cover w-full h-40" />
      <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <div className="flex gap-2 mt-2">
        <button className="w-full py-2 text-white transition bg-black rounded-md hover:bg-gray-800">
          Add to Cart
        </button>
        <button
          className="w-full py-2 text-white transition bg-gray-700 rounded-md hover:bg-gray-600"
          onClick={(e) => {
            e.stopPropagation(); // Prevents parent div click event
            handleViewProduct();
          }}
        >
          View
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
