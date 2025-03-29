import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserDashboard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "John Doe" });

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn && window.location.pathname === "/dashboard") {
      navigate("/login", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="h-20"></div>

      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center p-10 mx-4 text-center rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 md:flex-row md:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="ml-0 md:ml-10">
          <h2 className="text-lg font-semibold text-white">Welcome to the Ultimate Sports Gear Store!</h2>
          <h1 className="mt-4 text-3xl font-bold text-white">Your One-Stop Shop for Premium Sports Equipment</h1>
          <p className="mt-4 text-lg text-white">
            Explore the latest, high-quality gear for every sport. Whether you're a professional or just starting, we have the perfect equipment for you!
          </p>
        </div>
      </motion.div>

      {/* Quote Section */}
      <div className="px-6 mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">What Our Customers Say</h2>
        <div className="flex justify-center gap-8 mt-6">
          <div className="w-1/3 p-6 mx-2 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <p className="italic text-gray-600">"Best sports gear I’ve ever bought! High quality and great customer service."</p>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Jane D.</h3>
          </div>
          <div className="w-1/3 p-6 mx-2 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <p className="italic text-gray-600">"Amazing products! My performance has improved thanks to this gear."</p>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Mark T.</h3>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="px-6 mt-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Explore Our Products</h2>
        <p className="mt-2 text-lg text-gray-600">Browse through our wide range of sports equipment for all your needs. Click below to explore!</p>
        <div className="flex justify-center mt-4">
          <Link
            to="/products"
            className="px-8 py-3 text-lg font-semibold text-white transition duration-300 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
          >
            Explore Products
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="px-6 mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Featured Sports Equipment</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
          <motion.div
            className="p-4 transition duration-300 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/earbuds.jpg"
              alt="Wireless Earbuds"
              className="object-cover w-full h-40 rounded-md"
            />
            <h3 className="mt-2 text-lg font-bold text-gray-800">Wireless Earbuds</h3>
            <p className="text-gray-600">$49</p>
            <button className="w-full py-2 mt-2 text-white transition bg-black rounded-md hover:bg-gray-800">
              Buy Now
            </button>
          </motion.div>

          <motion.div
            className="p-4 transition duration-300 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/smartwatch.jpg"
              alt="Smartwatch"
              className="object-cover w-full h-40 rounded-md"
            />
            <h3 className="mt-2 text-lg font-bold text-gray-800">Smartwatch</h3>
            <p className="text-gray-600">$99</p>
            <button className="w-full py-2 mt-2 text-white transition bg-black rounded-md hover:bg-gray-800">
              Buy Now
            </button>
          </motion.div>

          <motion.div
            className="p-4 transition duration-300 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/mouse.jpg"
              alt="Gaming Mouse"
              className="object-cover w-full h-40 rounded-md"
            />
            <h3 className="mt-2 text-lg font-bold text-gray-800">Gaming Mouse</h3>
            <p className="text-gray-600">$39</p>
            <button className="w-full py-2 mt-2 text-white transition bg-black rounded-md hover:bg-gray-800">
              Buy Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="px-6 py-10 mt-12 text-center bg-gradient-to-r from-green-400 to-blue-500">
        <h2 className="text-3xl font-bold text-white">Get Your Gear Today!</h2>
        <p className="mt-4 text-lg text-white">Don’t miss out on our exclusive offers. Browse now and get the best deals on top-rated sports equipment!</p>
        
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
