import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getProducts } from "../api/api";

const StoreSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    price: 50,
    color: "",
    gender: "",
    size: "",
  });

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleFilterChange = (key, value) => {
    setSelectedFilters({ ...selectedFilters, [key]: value });
  };

  const filteredProducts = products.filter((product) =>
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
      <Footer />
    </div>
  );
};

export default StoreSection;
