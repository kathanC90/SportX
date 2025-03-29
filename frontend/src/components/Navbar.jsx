import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setUserDropdown(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src="/src/assets/images/logo.jpg" alt="SportX Logo" className="h-10" />
        <h1 className="text-xl font-bold text-black"></h1>
      </div>

      {/* Desktop Menu */}
      <div className="items-center hidden gap-6 md:flex">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <nav className="flex gap-6 text-black">
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/dashboard")}>Home</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/store")}>Store</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/orders")}>Orders</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/contact")}>Contact</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/about-us")}>About Us</button>
        </nav>

        {/* Icons */}
        <FaShoppingCart className="text-xl text-blue-500 transition-transform cursor-pointer hover:scale-110" onClick={() => handleNavigation("/cart")} />
        
        {/* User Profile Dropdown */}
        <div className="relative">
          <FaUser 
            className="text-2xl text-gray-700 transition-transform cursor-pointer hover:scale-110" 
            onClick={() => setUserDropdown(!userDropdown)}
          />
          {userDropdown && (
            <div className="absolute right-0 w-64 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img src={user?.imageUrl} alt="Profile" className="w-16 h-16 border-2 border-gray-300 rounded-full" />
                <h2 className="mt-2 text-lg font-semibold text-gray-900">{user?.fullName}</h2>
                <p className="text-sm text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
                <button 
                  onClick={handleLogout} 
                  className="w-full px-4 py-2 mt-4 text-center text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <FaBars className="text-xl cursor-pointer" onClick={() => setMenuOpen(true)} />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="fixed top-0 left-0 z-50 flex flex-col w-full h-full gap-6 p-6 bg-white"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
        >
          <FaTimes className="self-end text-xl cursor-pointer" onClick={() => setMenuOpen(false)} />
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/dashboard")}>Home</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/store")}>Store</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/orders")}>Orders</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/contact")}>Contact</button>
          <button className="hover:text-blue-500" onClick={() => handleNavigation("/about-us")}>About Us</button>
          <FaShoppingCart className="text-xl text-blue-500 transition-transform cursor-pointer hover:scale-110" onClick={() => handleNavigation("/cart")} />
          <button className="mt-4 text-lg font-bold text-red-600 hover:text-red-800" onClick={handleLogout}>Logout</button>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
