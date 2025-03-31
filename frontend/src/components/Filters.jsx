import React from "react";
import { motion } from "framer-motion";

const Filters = ({ selectedFilters, onFilterChange }) => {
  return (
    <aside className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Filters</h2>

      {/* Price Range */}
      <motion.label
        className="block mb-3"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Price Range: 
        <motion.span 
          className="ml-2 font-semibold text-blue-600"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
        >
          ${selectedFilters.price}
        </motion.span>
        <motion.input
          type="range"
          min="10"
          max="500"
          step="10"
          value={selectedFilters.price}
          onChange={(e) => onFilterChange("price", e.target.value)}
          className="w-full mt-1 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      </motion.label>

      {/* Dropdowns */}
      {[
        { label: "Color", key: "color", options: ["Red", "Blue", "White", "Brown", "Black", "Green"] },
        { label: "Gender", key: "gender", options: ["Men", "Women", "Unisex"] },
        { label: "Size", key: "size", options: ["XS", "S", "M", "L", "XL"] },
        { label: "Brand", key: "brand", options: ["Nike", "Adidas", "Puma", "Reebok"] },
        { label: "Material", key: "material", options: ["Cotton", "Leather", "Polyester", "Denim"] },
        { label: "Category", key: "category", options: ["Shoes", "Clothing", "Accessories", "Bags"] },
      ].map(({ label, key, options }) => (
        <motion.label
          key={key}
          className="block mb-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {label}
          <motion.select
            className="w-full p-2 mt-1 border rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
            value={selectedFilters[key]}
            onChange={(e) => onFilterChange(key, e.target.value)}
            whileFocus={{ borderColor: "#2563eb", scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </motion.select>
        </motion.label>
      ))}
    </aside>
  );
};

export default Filters;
