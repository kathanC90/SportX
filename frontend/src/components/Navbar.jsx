import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header 
      className="bg-white shadow-md py-4 px-6 fixed w-full z-50 top-0 left-0 flex justify-between items-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <img src="logo.png" alt="SportX Logo" className="h-10" />
        <h1 className="text-xl font-bold">SPORT X</h1>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <div className="relative flex items-center">
          <input type="text" placeholder="Search products..." className="border rounded-lg p-2 pl-8 w-64" />
          <FaSearch className="absolute left-2 text-gray-500" />
        </div>
        <nav className="flex gap-6">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <Link to="/store" className="hover:text-blue-500">Store</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/shop" className="hover:text-blue-500">About Us</Link>
        </nav>
        <FaHeart className="text-xl cursor-pointer text-red-500 hover:scale-110 transition-transform" />
        <FaShoppingCart className="text-xl cursor-pointer text-blue-500 hover:scale-110 transition-transform" />
        <FaUser className="text-xl cursor-pointer text-gray-700 hover:scale-110 transition-transform" />
        <FaSignOutAlt className="text-xl cursor-pointer text-red-600 hover:scale-110 transition-transform" />
      </div>
      <div className="md:hidden">
        <FaBars className="text-xl cursor-pointer" onClick={() => setMenuOpen(true)} />
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col p-6 gap-6" 
          initial={{ x: -200 }} 
          animate={{ x: 0 }}
        >
          <FaTimes className="text-xl cursor-pointer self-end" onClick={() => setMenuOpen(false)} />
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/shop" className="hover:text-blue-500">Shop</Link>
          <Link to="/store" className="hover:text-blue-500">Store</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;