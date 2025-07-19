import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';


import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';

// User pages
import HomePage from './pages/HomePage';
import OTTAccounts from './pages/OTTAccounts';
import ProductKeys from './pages/ProductKeys';
import IPTVSubscription from './pages/IPTVSubscription';
import Downloads from './pages/Downloads';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import UserProfilePage from './pages/UserProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SearchResults from './pages/SearchResults';
import WishlistPage from './pages/WishlistPage';
import UserOrdersPage from './pages/UserOrdersPage'; // Make sure this is imported
import NotFoundPage from './pages/NotFoundPage';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsPage from './pages/admin/ProductsPage';
import OrdersPage from './pages/admin/OrdersPage';
import UsersPage from './pages/admin/UsersPage';


// Animated route wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* --- Public Routes --- */}
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/ott-accounts" element={<PageWrapper><OTTAccounts /></PageWrapper>} />
        <Route path="/product-keys" element={<PageWrapper><ProductKeys /></PageWrapper>} />
        <Route path="/iptv-subscription" element={<PageWrapper><IPTVSubscription /></PageWrapper>} />
        <Route path="/downloads" element={<PageWrapper><Downloads /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
        <Route path="/support" element={<PageWrapper><Support /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><SearchResults /></PageWrapper>} />
        <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />

        {/* --- Protected User Routes --- */}
        <Route element={<ProtectedRoute allowAdmin={false} />}>
          <Route path="/profile" element={<PageWrapper><UserProfilePage /></PageWrapper>} />
          <Route path="/my-orders" element={<PageWrapper><UserOrdersPage /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
          <Route path="/order-confirmation" element={<PageWrapper><OrderConfirmationPage /></PageWrapper>} />
        </Route>


        {/* --- Protected Admin Routes --- */}
        <Route element={<ProtectedRoute allowAdmin={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CustomCursor />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1f1f2e',
                  color: '#fff',
                  border: '1px solid #7c3aed',
                },
              }}
            />
            <div className="min-h-screen bg-black text-white">
              <Header />
              <main className="pt-28">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;