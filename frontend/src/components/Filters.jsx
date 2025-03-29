import React from "react";

const Filters = ({ selectedFilters, onFilterChange }) => {
  return (
    <aside className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Filters</h2>
      
      {/* Price Range */}
      <label className="block mb-3">Price Range: ${selectedFilters.price}
        <input
          type="range"
          min="10"
          max="500"
          step="10"
          value={selectedFilters.price}
          onChange={(e) => onFilterChange("price", e.target.value)}
          className="w-full"
        />
      </label>
      
      {/* Color */}
      <label className="block mb-3">Color
        <select
          className="w-full p-2 border rounded"
          value={selectedFilters.color}
          onChange={(e) => onFilterChange("color", e.target.value)}
        >
          <option value="">All</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
          <option value="Black">Black</option>
          <option value="Green">Green</option>
        </select>
      </label>
      
      {/* Gender */}
      <label className="block mb-3">Gender
        <select
          className="w-full p-2 border rounded"
          value={selectedFilters.gender}
          onChange={(e) => onFilterChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </label>
      
      {/* Size */}
      <label className="block mb-3">Size
        <select
          className="w-full p-2 border rounded"
          value={selectedFilters.size}
          onChange={(e) => onFilterChange("size", e.target.value)}
        >
          <option value="">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>
      
      {/* Brand */}
      <label className="block mb-3">Brand
        <select
          className="w-full p-2 border rounded"
          value={selectedFilters.brand}
          onChange={(e) => onFilterChange("brand", e.target.value)}
        >
          <option value="">All</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Reebok">Reebok</option>
        </select>
      </label>
      
      {/* Material */}
      <label className="block mb-3">Material
        <select
          className="w-full p-2 border rounded"
          value={selectedFilters.material}
          onChange={(e) => onFilterChange("material", e.target.value)}
        >
          <option value="">All</option>
          <option value="Cotton">Cotton</option>
          <option value="Leather">Leather</option>
          <option value="Polyester">Polyester</option>
          <option value="Denim">Denim</option>
        </select>
      </label>
      
      {/* Category */}
      <label className="block">Category
        <select
          className="w-full p-2 border rounded"
          value={selectedFilters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">All</option>
          <option value="Shoes">Shoes</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Bags">Bags</option>
        </select>
      </label>
    </aside>
  );
};

export default Filters;
