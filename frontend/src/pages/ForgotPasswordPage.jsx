import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    alert('Password reset link has been sent to your email.');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-600 opacity-70"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}></div>

      <div className="w-full max-w-md z-10 bg-white p-8 md:p-12 rounded-lg shadow-2xl text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Forgot Password?</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter your registered email, and we'll send you a password reset link.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Enter your email"
          />
        </div>

        <button 
          onClick={handleResetPassword} 
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
        >
          Send Reset Link
        </button>

        <div className="mt-6 flex justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back to Login
          </button>

          <button 
            onClick={() => navigate('/signup')} 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;