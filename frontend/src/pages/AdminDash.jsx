import React from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaChartLine, FaBox, FaCog } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 hidden md:block">
        <h1 className="text-2xl font-bold">SportX Admin</h1>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
              <FaChartLine /> Dashboard
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
              <FaBox /> Products
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
              <FaShoppingCart /> Orders
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
              <FaUser /> Customers
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button className="md:hidden text-2xl">
            <FaBars />
          </button>
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="border px-4 py-2 rounded-md focus:outline-none" />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
            <FaShoppingCart className="text-2xl cursor-pointer" />
            <FaUser className="text-2xl cursor-pointer" />
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaChartLine className="text-3xl text-blue-600" />
            <h3 className="text-xl font-bold mt-2">Revenue</h3>
            <p className="text-gray-600">$50,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaBox className="text-3xl text-green-600" />
            <h3 className="text-xl font-bold mt-2">Products</h3>
            <p className="text-gray-600">120 Items</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShoppingCart className="text-3xl text-red-600" />
            <h3 className="text-xl font-bold mt-2">Orders</h3>
            <p className="text-gray-600">340 Orders</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaUser className="text-3xl text-yellow-600" />
            <h3 className="text-xl font-bold mt-2">Customers</h3>
            <p className="text-gray-600">1,500 Users</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
          <p>© 2025 SportX. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
