// src/App.tsx (Corrected with all imports)

import React from 'react';
// useLocation ko yahan import kiya gaya hai
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// AnimatePresence ko yahan import kiya gaya hai
import { AnimatePresence } from 'framer-motion'; 

// Baaki sabhi zaroori imports
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';
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


// This component handles the animated routes
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/ott-accounts" element={<PageWrapper><OTTAccounts /></PageWrapper>} />
        <Route path="/product-keys" element={<PageWrapper><ProductKeys /></PageWrapper>} />
        <Route path="/iptv-subscription" element={<PageWrapper><IPTVSubscription /></PageWrapper>} />
        <Route path="/downloads" element={<PageWrapper><Downloads /></PageWrapper>} />
        <Route path="/pricing"element={<PageWrapper><Pricing /></PageWrapper>} />
        <Route path="/support" element={<PageWrapper><Support /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><SearchResults /></PageWrapper>} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute />}><Route index element={<PageWrapper><UserProfilePage /></PageWrapper>} /></Route>
        <Route path="/checkout" element={<ProtectedRoute />}><Route index element={<PageWrapper><CheckoutPage /></PageWrapper>} /></Route>
        <Route path="/order-confirmation" element={<ProtectedRoute />}><Route index element={<PageWrapper><OrderConfirmationPage /></PageWrapper>} /></Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CustomCursor />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#18181b',
                  color: '#fff',
                  border: '1px solid #3f3f46',
                },
              }}
            />
            <div className="min-h-screen bg-black text-white">
              <Header />
              <main className="pt-[148px]">
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