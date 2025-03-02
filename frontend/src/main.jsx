import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage';
import DashboardPage from './pages/DashboardPage';
import StoreSection from './pages/StoreSection';
import ContactPage from './pages/ContactPage'; // ✅ Added Contact Page

import './index.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-code" element={<VerifyCodePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/store" element={<StoreSection />} />
      <Route path="/contact" element={<ContactPage />} /> {/* ✅ Added Contact Page Route */}
    </Routes>
  </Router>
);
