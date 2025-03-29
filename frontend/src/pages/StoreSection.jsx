import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import Footer from "../components/Footer";

const StoreSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    price: 100,
    color: "",
    gender: "",
    size: "",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/fetch");
        setProducts(response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err.response ? err.response.data : err.message);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle filter updates
  const handleFilterChange = (key, value) => {
    setSelectedFilters({ ...selectedFilters, [key]: value });
  };

  // Filter products dynamically
  const filteredProducts = products.filter(
    (product) =>
      product.price <= selectedFilters.price &&
      (selectedFilters.color === "" || product.color === selectedFilters.color) &&
      (selectedFilters.gender === "" || product.gender === selectedFilters.gender) &&
      (selectedFilters.size === "" || product.size === selectedFilters.size)
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col flex-grow p-6 mt-16 md:flex-row">
        <Filters selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />

        <div className="grid flex-grow w-full grid-cols-2 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4 md:w-3/4">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-600 col-span-full">{error}</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
  key={product.id}
  className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
  whileHover={{ scale: 1.05 }}
>
  <Link to={`/productdetail/${product.id}`} className="flex flex-col flex-grow">
    <img
      src={product.image || "/placeholder.jpg"}
      alt={product.name}
      className="object-cover w-full h-40 rounded-md"
    />
    <div className="flex-grow">
      <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
    </div>
  </Link>
  <div className="flex gap-2 mt-2">
    <button className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800">
      Add to Cart
    </button>
    <Link
      to={`/productdetail/${product.id}`}
      className="w-full py-2 text-center text-white bg-gray-700 rounded-md hover:bg-gray-600"
    >
      View
    </Link>
  </div>
</motion.div>

            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found. Try adjusting your filters.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreSection;
