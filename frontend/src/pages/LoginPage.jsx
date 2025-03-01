import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const SportXLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("stheba835@rku.ac.in");
  const [password, setPassword] = useState("************");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add authentication logic here
    console.log("Logging in...");
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-600 opacity-70"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/images.jpg')" }}></div>
      
      <div className="w-full max-w-6xl z-10 flex items-stretch shadow-2xl">
        <div className="w-1/2 p-12 text-white">
          <div className="flex items-center mb-16">
            <span className="text-4xl font-bold tracking-wide">SPORT X</span>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/30 pb-2">Welcome Back to Sport X</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Your journey to greatness continues. Sign in to access top-tier sports gear, exclusive deals, and a seamless shopping experience designed for athletes like you.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">New Here?</h2>
            <p className="text-sm mb-2 opacity-90 leading-relaxed">
              <Link to="/signup" className="text-blue-300 underline hover:text-blue-200 transition-colors">Join</Link> Sport X today!
            </p>
          </div>
        </div>
        
        <div className="w-1/2">
          <div className="bg-white p-8 md:p-12 h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Log In to your Account</h2>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            
            <div className="mb-8 relative">
              <label className="block text-sm text-gray-500 mb-1">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button 
                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            
            <button 
              className="w-full bg-black text-white py-3 rounded mb-4 font-semibold hover:bg-gray-800 transition-colors"
              onClick={handleLogin}
            >
              Login
            </button>
            
            <div className="text-center mb-6">
              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Forgot Password?</Link>
            </div>
            
            <div className="border border-gray-300 rounded p-3 flex items-center justify-center mb-8 hover:bg-gray-50 cursor-pointer transition-colors">
              <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm text-gray-600">Sign up with Google</span>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">New User?</p>
              <Link to="/signup" className="text-sm font-bold hover:text-gray-600 transition-colors">SIGN UP HERE</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportXLoginPage;