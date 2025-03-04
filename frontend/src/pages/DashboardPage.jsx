import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const products = [
  { id: 1, name: "MRF Cricket Bat", price: "$40", image: "bat.jpg" },
  { id: 2, name: "Cricket Ball", price: "$5", image: "ball.jpg" },
  { id: 3, name: "Basketball", price: "$30", image: "basketball.jpg" },
  { id: 4, name: "Football", price: "$25", image: "football.jpg" },
  { id: 5, name: "Chess Set", price: "$20", image: "chess.jpg" },
  { id: 6, name: "Table Tennis Kit", price: "$15", image: "tt.jpg" }
];

const UserDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-yellow-400 to-orange-500 p-10 flex flex-col md:flex-row items-center text-center md:text-left rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img src="basketball.png" alt="Basketball" className="h-40 md:h-60" />
        <div className="ml-0 md:ml-10">
          <h2 className="text-lg font-semibold text-white">HOT DEALS THIS WEEK</h2>
          <h1 className="text-3xl font-bold text-white">SALE 50% OFF SPORT EQUIPMENT</h1>
          <motion.button className="bg-black text-white px-6 py-2 mt-4 rounded-lg hover:bg-gray-900 transition" whileHover={{ scale: 1.1 }}>SHOP NOW</motion.button>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 p-4">
        {products.map((product) => (
          <motion.div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" whileHover={{ scale: 1.05 }}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </Link>
            <div className="flex gap-2 mt-2">
              <button className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition">Add to Cart</button>
              <Link to={`/product/${product.id}`} className="bg-gray-700 text-white w-full py-2 rounded-md hover:bg-gray-600 transition text-center">View</Link>
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
