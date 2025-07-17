import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast'; // <--- DELETE THIS LINE
import { LayoutDashboard, Box, ShoppingCart, Users, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/products", icon: Box, label: "Products" },
    { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/admin/users", icon: Users, label: "Users" },
  ];

  const SidebarContent = () => (
    <>
      <div className="text-3xl font-extrabold p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-center tracking-widest">
        Admin
      </div>
      <nav className="flex-1 flex flex-col p-4 gap-2">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-purple-600 text-white font-bold shadow-lg' : 'hover:bg-purple-800/30 text-gray-300'
              }`
            }
          >
            <link.icon className="w-5 h-5" /> {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="text-center text-xs text-gray-500 p-4 border-t border-purple-600/20">
        &copy; {new Date().getFullYear()} HarshPortal Admin
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* The Toaster component was here. It has been removed. */}

      {/* --- Desktop Sidebar --- */}
      <aside className="w-64 hidden md:flex flex-col bg-black/30 backdrop-blur-lg border-r border-purple-600/20 shadow-xl">
        <SidebarContent />
      </aside>

      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 flex flex-col bg-gradient-to-b from-[#1e1c47] to-[#120f2f] z-50 md:hidden border-r border-purple-500/30 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm sticky top-0 z-10 border-b border-purple-900/50">
          <span className="text-xl font-bold text-cyan-300">Admin Panel</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            <Menu size={24} />
          </button>
        </header>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;