import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/products/getdetail/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert("Added to cart!");
    }
  };

  if (loading) return <p className="text-lg text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <Navbar />
      <div className="max-w-4xl p-6 mx-auto bg-white shadow-lg">
        <img src={product.image || "/placeholder.jpg"} alt={product.name} className="object-cover w-full rounded-md h-80" />
        <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-xl">${product.price}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-2 text-gray-700">Category: {product.category}</p>
        <p className="mt-1 text-gray-700">Brand: {product.brand}</p>
        <p className="mt-1 text-gray-700">Color: {product.color}</p>
        <p className="mt-1 text-gray-700">Size: {product.size}</p>
        <p className="mt-1 text-gray-700">Material: {product.material}</p>
        <p className="mt-2 text-yellow-500">Rating: {product.rating} ⭐</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Reviews:</h3>
          <ul className="mt-2 space-y-2">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md">
                  {review}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </ul>
        </div>
        <button className="w-full py-3 mt-6 text-white bg-black rounded-md" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;