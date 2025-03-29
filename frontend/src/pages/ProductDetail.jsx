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
      alert("Added to cart!"); // ✅ Notify user instead of redirecting
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
        <button className="w-full py-3 mt-6 text-white bg-black rounded-md" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
