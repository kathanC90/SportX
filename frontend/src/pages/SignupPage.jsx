import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-600 opacity-70"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}></div>
      
      <div className="w-full max-w-6xl z-10 flex flex-col md:flex-row items-stretch shadow-2xl">
        
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
          <div className="flex items-center mb-12 md:mb-16">
            <div className="w-12 h-12 md:w-14 md:h-14 mr-4">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <circle cx="50" cy="50" r="40"></circle>
                <rect x="30" y="30" width="10" height="40" fill="white"></rect>
                <rect x="45" y="30" width="10" height="40" fill="white"></rect>
                <rect x="60" y="30" width="10" height="40" fill="white"></rect>
              </svg>
            </div>
            <span className="text-3xl md:text-4xl font-bold tracking-wide">SPORT X</span>
          </div>
          
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-white/30 pb-2">Welcome to Sport X</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              <span className="text-blue-300">Join</span> Sport X today and elevate your game with the best equipment, expert picks, and unbeatable offers.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Already Have an Account?</h2>
            <p className="text-sm mb-2 opacity-90 leading-relaxed">
              <span 
                onClick={() => navigate('/')} 
                className="text-blue-300 underline cursor-pointer hover:text-blue-200 transition-colors"
              >
                Sign in
              </span> now and get back to exploring the best sports gear and exclusive deals.
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="bg-white p-8 md:p-12 h-full flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-10 text-gray-800">Create an Account</h2>
            
            <div className="mb-4 md:mb-6">
              <label className="block text-sm text-gray-500 mb-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            
            <div className="mb-4 md:mb-6">
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            
            <div className="mb-6 md:mb-8 relative">
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
            
            <button className="w-full bg-black text-white py-3 rounded mb-4 font-semibold hover:bg-gray-800 transition-colors">
              GET STARTED
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Already have an account?</p>
              <Link 
                to="/" 
                className="text-sm font-bold hover:text-gray-600 transition-colors"
              >
                LOGIN HERE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;