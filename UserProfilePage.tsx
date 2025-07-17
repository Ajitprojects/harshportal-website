import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut, ShoppingCart, Heart } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    // The context will handle navigation to the login page
  };

  // If for some reason the user is not logged in, redirect them.
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

 const menuItems = [
    { name: 'My Orders', icon: ShoppingCart, href: '/my-orders' }, // <-- Change this from '/orders' to '/my-orders'
    { name: 'Wishlist', icon: Heart, href: '/wishlist' },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            User Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-400">Manage your profile and settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: User Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1 bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-black">{currentUser.name.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{currentUser.name}</h2>
              <p className="text-sm text-gray-400">{currentUser.email}</p>
              <span className="mt-3 px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300">
                {currentUser.role}
              </span>
            </div>
          </motion.div>

          {/* Right Panel: Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2 bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <Link to={item.href} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-gray-900/50 p-4 rounded-lg flex items-center gap-4 transition-colors hover:bg-gray-700/50"
                  >
                    <item.icon className="w-6 h-6 text-cyan-400" />
                    <span className="font-semibold">{item.name}</span>
                  </motion.div>
                </Link>
              ))}
                <Link to={currentUser.role === 'Admin' ? "/admin/dashboard" : "/"} >
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-gray-900/50 p-4 rounded-lg flex items-center gap-4 transition-colors hover:bg-gray-700/50"
                  >
                    <Shield className="w-6 h-6 text-purple-400" />
                    <span className="font-semibold">{currentUser.role === 'Admin' ? "Admin Panel" : "Go to Home"}</span>
                  </motion.div>
                </Link>
                <button onClick={handleLogout}>
                   <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-red-900/50 p-4 rounded-lg flex items-center gap-4 transition-colors hover:bg-red-700/50 w-full"
                  >
                    <LogOut className="w-6 h-6 text-red-400" />
                    <span className="font-semibold">Logout</span>
                  </motion.div>
                </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfilePage;