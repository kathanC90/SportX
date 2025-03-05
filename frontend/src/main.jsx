import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage';
import DashboardPage from './pages/DashboardPage';
import StoreSection from './pages/StoreSection';
import ContactPage from './pages/ContactPage';
import AboutUs from './pages/AboutUs';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsPage from './pages/admin/ProductsPage';
import OrdersPage from './pages/admin/OrdersPage';  // Added Orders Page
import StockPage from './pages/admin/StockPage';    // Added Stock Page
import InvoicePage from './pages/admin/InvoicePage';  // Added Invoice Page
import './index.css';
import EditProfile from './pages/admin/EditProfile';
import EditProduct from './pages/admin/EditProduct';
import AddProduct from './pages/admin/AddProduct';
import TeamPage from './pages/admin/Team';
import AvailabilityPage from './pages/admin/AvailabilityPage';
createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-code" element={<VerifyCodePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/store" element={<StoreSection />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      
      {/* Admin Routes */}
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/admin/products' element={<ProductsPage />} />
      <Route path='/admin/edit-product/:id' element={<EditProduct />} />
      <Route path='/admin/orders' element={<OrdersPage />} />
      <Route path='/admin/stock' element={<StockPage />} />
      <Route path='/admin/invoice' element={<InvoicePage />} />
      <Route path='/admin/edit-profile' element={<EditProfile />} />
      <Route path='/admin/add-product' element={<AddProduct />} />
      <Route path='/admin/team' element={<TeamPage />} />
      <Route path='/admin/availability' element={<AvailabilityPage />} />
    </Routes>
  </Router>
);
