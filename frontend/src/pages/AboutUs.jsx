import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/images/chess-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white" 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            About Us
          </motion.h1>
          <motion.p 
            className="text-white text-lg md:text-xl mt-4 max-w-2xl" 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}>
            From preschool to pre-tertiary, our students enjoy fun, teamwork, active sports, and a commitment to think beyond the classroom.
          </motion.p>
          <motion.button 
            className="mt-6 bg-white text-black px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
            whileHover={{ scale: 1.1 }}>
            See More
          </motion.button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Preparing Students to Achieve Success</h2>
      </div>
      
      {/* Sports Sections */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-12">
        {/* Basketball */}
        <motion.div 
          className="flex flex-col items-center text-center" 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <img src="/images/basketball.jpg" alt="Basketball" className="rounded-lg shadow-lg w-80" />
          <h3 className="text-xl font-semibold mt-4">Basketball</h3>
          <p className="text-gray-600 mt-2 px-4">
            Take your game to the next level with our premium basketball coaching and training programs.
          </p>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            View More
          </button>
        </motion.div>

        {/* Football */}
        <motion.div 
          className="flex flex-col items-center text-center" 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <img src="/images/football.jpg" alt="Football" className="rounded-lg shadow-lg w-80" />
          <h3 className="text-xl font-semibold mt-4">Football</h3>
          <p className="text-gray-600 mt-2 px-4">
            Unleash your skills with our premium football training and competitive events.
          </p>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            View More
          </button>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
