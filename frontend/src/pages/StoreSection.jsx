import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer"; // Import Footer

const products = [
  { id: 1, name: "Cricket Gloves", price: 39, category: "Cricket", color: "Red", gender: "Unisex", size: "M", image: "gloves.jpg" },
  { id: 2, name: "Cricket Helmet", price: 14, category: "Cricket", color: "Blue", gender: "Men", size: "L", image: "helmet.jpg" },
  { id: 3, name: "Cricket Bat", price: 25, category: "Cricket", color: "Brown", gender: "Unisex", size: "M", image: "bat.jpg" },
  { id: 4, name: "Cricket Ball", price: 34, category: "Cricket", color: "Red", gender: "Unisex", size: "S", image: "ball.jpg" },
  { id: 5, name: "Cricket Jersey", price: 22, category: "Apparel", color: "White", gender: "Women", size: "M", image: "jersey.jpg" },
  { id: 6, name: "Cricket Pads", price: 44, category: "Cricket", color: "White", gender: "Men", size: "L", image: "pads.jpg" }
];

const StoreSection = () => {
  const [selectedFilters, setSelectedFilters] = useState({ price: 50, color: "", gender: "", size: "" });

  const handleFilterChange = (key, value) => {
    setSelectedFilters({ ...selectedFilters, [key]: value });
  };

  const filteredProducts = products.filter(product => 
    product.price <= selectedFilters.price &&
    (selectedFilters.color === "" || product.color === selectedFilters.color) &&
    (selectedFilters.gender === "" || product.gender === selectedFilters.gender) &&
    (selectedFilters.size === "" || product.size === selectedFilters.size)
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex p-6 mt-16">
        <Filters selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-3/4 p-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default StoreSection;
