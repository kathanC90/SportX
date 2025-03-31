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
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto text-center py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800">Our Mission & Vision</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          At SportX, our mission is to inspire athletes, provide high-quality sports equipment, and promote a culture of fitness. We aim to be the leading platform for sports enthusiasts, offering innovative and top-tier products that elevate performance.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 pb-12 text-center">
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg" 
          whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-semibold text-gray-800">🏆 High-Quality Gear</h3>
          <p className="text-gray-600 mt-2">We offer the best sports equipment with durability and performance in mind.</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg" 
          whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-semibold text-gray-800">🚀 Fast & Secure Delivery</h3>
          <p className="text-gray-600 mt-2">Get your orders quickly with our efficient and secure shipping service.</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-white shadow-lg rounded-lg" 
          whileHover={{ scale: 1.05 }}>
          <h3 className="text-xl font-semibold text-gray-800">💬 24/7 Customer Support</h3>
          <p className="text-gray-600 mt-2">Our team is always available to assist you with any inquiries.</p>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="p-6 bg-white shadow-lg rounded-lg" whileHover={{ scale: 1.02 }}>
            <p className="text-gray-600 italic">"SportX has been a game-changer for my training. Their quality is top-notch!"</p>
            <h4 className="mt-4 font-semibold text-gray-800">- Alex Johnson</h4>
          </motion.div>
          <motion.div className="p-6 bg-white shadow-lg rounded-lg" whileHover={{ scale: 1.02 }}>
            <p className="text-gray-600 italic">"Fast delivery and excellent customer service. Highly recommended!"</p>
            <h4 className="mt-4 font-semibold text-gray-800">- Sarah Lee</h4>
          </motion.div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
        <div className="mt-6 max-w-3xl mx-auto">
          <motion.details className="mb-4 p-4 bg-white shadow-lg rounded-lg cursor-pointer" whileHover={{ scale: 1.02 }}>
            <summary className="font-semibold text-gray-800">Do you offer international shipping?</summary>
            <p className="text-gray-600 mt-2">Yes! We ship worldwide with competitive delivery rates.</p>
          </motion.details>
          <motion.details className="mb-4 p-4 bg-white shadow-lg rounded-lg cursor-pointer" whileHover={{ scale: 1.02 }}>
            <summary className="font-semibold text-gray-800">What payment methods do you accept?</summary>
            <p className="text-gray-600 mt-2">We accept credit/debit cards, PayPal, and UPI payments.</p>
          </motion.details>
          <motion.details className="p-4 bg-white shadow-lg rounded-lg cursor-pointer" whileHover={{ scale: 1.02 }}>
            <summary className="font-semibold text-gray-800">How can I track my order?</summary>
            <p className="text-gray-600 mt-2">You will receive a tracking link via email after your order is shipped.</p>
          </motion.details>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
