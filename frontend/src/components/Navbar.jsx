import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react"; // ✅ Correct Hook for Logout

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth(); // ✅ Correctly Getting signOut Function
  const navigate = useNavigate();

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      await signOut(); // 🔄 Log the User Out
      navigate("/login"); // 🔄 Redirect to Login Page
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <motion.header 
      className="bg-white shadow-md py-4 px-6 fixed w-full z-50 top-0 left-0 flex justify-between items-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="logo.png" alt="SportX Logo" className="h-10" />
        <h1 className="text-xl font-bold text-black">SPORT X</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <input type="text" placeholder="Search products..." className="border rounded-lg p-2 pl-8 w-64" />
          <FaSearch className="absolute left-2 text-gray-500" />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-black">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <Link to="/store" className="hover:text-blue-500">Store</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/about-us" className="hover:text-blue-500">About Us</Link>
        </nav>

        {/* Icons */}
        <FaHeart className="text-xl cursor-pointer text-red-500 hover:scale-110 transition-transform" />
        <FaShoppingCart className="text-xl cursor-pointer text-blue-500 hover:scale-110 transition-transform" />
        <FaUser className="text-xl cursor-pointer text-gray-700 hover:scale-110 transition-transform" />

        {/* Logout Button */}
        <FaSignOutAlt 
          className="text-xl cursor-pointer text-red-600 hover:scale-110 transition-transform" 
          onClick={handleLogout}
        />
      </div>

      {/* Mobile Menu Button */}
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
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <Link to="/store" className="hover:text-blue-500">Store</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/about-us" className="hover:text-blue-500">About Us</Link>

          {/* Logout Button in Mobile Menu */}
          <button 
            className="mt-4 text-red-600 hover:text-red-800 text-lg font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
