// src/pages/UserProfilePage.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, LogOut, ShoppingBag, Heart } from 'lucide-react';

const UserProfilePage = () => {
  const { user, logout } = useAuth();

  // If user is not logged in, this page won't be rendered anyway due to ProtectedRoute.
  // But as a fallback, we can show a loading or empty state.
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-gray-800/50 rounded-2xl p-8 border border-primary-700"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-cyan-400 mt-1">{user.email}</p>

            <div className="border-t border-gray-700 w-full my-8"></div>

            <div className="w-full text-left space-y-6">
              <h2 className="text-xl font-semibold text-white">Your Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary-900/50 p-4 rounded-lg flex items-center gap-4">
                    <ShoppingBag className="w-8 h-8 text-cyan-400"/>
                    <div>
                        <p className="text-gray-400 text-sm">Orders</p>
                        <p className="text-white font-bold text-lg">5 Orders Placed</p>
                    </div>
                </div>
                <div className="bg-primary-900/50 p-4 rounded-lg flex items-center gap-4">
                    <Heart className="w-8 h-8 text-red-400"/>
                    <div>
                        <p className="text-gray-400 text-sm">Wishlist</p>
                        <p className="text-white font-bold text-lg">3 Items Saved</p>
                    </div>
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              className="mt-10 w-full max-w-xs bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5"/>
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfilePage;