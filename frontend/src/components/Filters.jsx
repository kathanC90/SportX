import React from "react";

const Filters = ({ selectedFilters, onFilterChange }) => {
  return (
    <aside className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <label className="block">Price Range: ${selectedFilters.price}
        <input
          type="range"
          min="10"
          max="50"
          value={selectedFilters.price}
          onChange={(e) => onFilterChange("price", e.target.value)}
          className="w-full"
        />
      </label>
      <label className="block">Color
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => onFilterChange("color", e.target.value)}
        >
          <option value="">All</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
        </select>
      </label>
      <label className="block">Gender
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => onFilterChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </label>
      <label className="block">Size
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => onFilterChange("size", e.target.value)}
        >
          <option value="">All</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </label>
    </aside>
  );
};

export default Filters;
