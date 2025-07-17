import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Package, Hash, Calendar, CircleDot } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

// --- MOCK ORDER DATABASE ---
const allOrders = [
  { 
    id: "ORD-2025-07A1", 
    userId: 1, // Belongs to Harsh Admin (id: 1)
    date: "2025-07-15",
    status: "Delivered",
    total: "$34.98",
    items: [{ name: "Netflix Premium" }, { name: "Windows 11 Pro Key" }] 
  },
  { 
    id: "ORD-2025-07B2", 
    userId: 2, // Belongs to Sonal Customer (id: 2)
    date: "2025-07-16",
    status: "Shipped",
    total: "$4.99",
    items: [{ name: "Spotify Duo" }]
  },
];

const UserOrdersPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userOrders = allOrders.filter(order => order.userId === currentUser.id);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'text-green-400';
      case 'Shipped': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            My Orders
          </h1>
          <p className="mt-2 text-lg text-gray-400">View your complete order history.</p>
        </div>

        <div className="space-y-6">
          {userOrders.length > 0 ? (
            userOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-700 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Hash className="w-5 h-5 text-gray-500" />
                      <h2 className="text-lg font-bold text-white">Order ID: {order.id}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 text-lg font-semibold ${getStatusColor(order.status)}`}>
                      <CircleDot className="w-5 h-5"/>
                      {order.status}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 mb-1">Items:</p>
                        <ul className="list-disc list-inside">
                            {order.items.map(item => <li key={item.name}>{item.name}</li>)}
                        </ul>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-cyan-400">{order.total}</p>
                    </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <Package size={64} className="mx-auto text-gray-700 mb-4" />
              <h2 className="text-2xl font-bold text-gray-400">You haven't placed any orders yet.</h2>
              <Link to="/">
                <button className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserOrdersPage;