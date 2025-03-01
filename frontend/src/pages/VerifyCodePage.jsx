import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const VerifyCodePage = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert('Code submitted successfully.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}></div>
      <div className="absolute inset-0 flex items-center justify-start px-10 text-white bg-black bg-opacity-50">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <img src="/logo.png" alt="Sport X" className="w-10 h-10" /> SPORT X
          </h1>
          <p className="mt-2 text-lg">Welcome Back to Sport X</p>
          <p className="text-sm text-gray-300 mt-2 max-w-md">
            Your journey to greatness continues. Sign in to access top-tier sports gear, exclusive deals, and a seamless shopping experience designed for athletes like you.
          </p>
          <p className="mt-4 font-semibold">New Here?</p>
          <p className="text-sm">
            <a href="/signup" className="text-blue-400">Join Sport X</a> today and elevate your game with the best equipment, expert picks, and unbeatable offers.
          </p>
        </div>
      </div>
      <div className="w-full max-w-md z-10 bg-white p-8 md:p-12 rounded-lg shadow-2xl text-center">
        <button onClick={() => navigate('/login')} className="text-sm text-gray-500 mb-4">&lt; Back to login</button>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Verify Code</h2>
        <div className="mb-4 relative">
          <label className="block text-sm text-gray-500 mb-1">Enter Code</label>
          <input 
            type={showCode ? "text" : "password"} 
            value={code} 
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Enter verification code"
          />
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showCode ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Didn't receive a code? <button className="text-red-500">Resend</button>
        </p>
        <button 
          onClick={handleSubmit} 
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default VerifyCodePage;
