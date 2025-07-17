import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, User, Menu, X, Heart,
  Home, Zap, Shield, Wifi, Package, CreditCard, HelpCircle
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import PromoBar from './PromoBar';
import SearchModal from './SearchModal';
import TypewriterText from './TypewriterText';

const FuturisticLogo = () => (
  <Link to="/" className="flex items-center space-x-2 sm:space-x-4 group cursor-pointer">
    <motion.div
      className="w-12 h-12 sm:w-16 sm:h-16 relative flex items-center justify-center"
      whileHover={{ rotate: 12, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute w-full h-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 rounded-[18px] blur-[2px] animate-pulse" />
      <motion.div
        className="absolute w-5/6 h-5/6 bg-black rounded-xl border-2 border-cyan-400/60 z-10 shadow-neon-cyan"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="text-white font-black text-2xl sm:text-4xl font-display relative z-20 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
        H
      </span>
    </motion.div>
    <div className="block text-center">
      <h1 className="text-base sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink animate-gradient bg-[length:200%_200%] drop-shadow-neon-cyan">
        HARSHPORTAL
      </h1>
      <TypewriterText />
    </div>
  </Link>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const { wishlistItemIds } = useWishlist();
  // Updated to use currentUser from the new AuthContext
  const { currentUser, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = getCartCount();
  const wishlistCount = wishlistItemIds.size;

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'OTT Accounts', href: '/ott-accounts', icon: Zap },
    { name: 'Product Keys', href: '/product-keys', icon: Shield },
    { name: 'IPTV', href: '/iptv-subscription', icon: Wifi },
    { name: 'Downloads', href: '/downloads', icon: Package },
    { name: 'Pricing', href: '/pricing', icon: CreditCard },
    { name: 'Support', href: '/support', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
      logout();
      // The context now redirects, so no navigate() call is needed here.
      // We just ensure the mobile menu closes if it's open.
      setIsMenuOpen(false); 
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <PromoBar />
      <header className={`fixed left-0 right-0 z-40 w-full max-w-full transition-all duration-300
        top-[68px] sm:top-[64px] lg:top-[76px]
        ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-lg border-b border-cyan-500/20' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <FuturisticLogo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-3">
             {navigationItems.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  to={href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all duration-300
                    ${location.pathname === href
                      ? 'bg-cyan-500/20 text-white shadow-md shadow-cyan-400 animate-glow-tab'
                      : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </Link>
              ))}
            </nav>

            {/* Icons and Buttons */}
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-300 hover:text-cyan-400">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/wishlist" className="relative hidden sm:inline-flex p-2 text-slate-300 hover:text-pink-400">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs border-2 border-[#0f172a] rounded-full w-5 h-5 flex items-center justify-center bg-pink-500 text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 text-slate-300 hover:text-green-400">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs border-2 border-[#0f172a] rounded-full w-5 h-5 flex items-center justify-center bg-green-500 text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Section */}
              <div className="hidden lg:flex items-center space-x-3">
                {currentUser ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-2 text-white hover:text-cyan-400">
                      <User className="w-5 h-5" />
                      <span className="text-sm font-semibold">{currentUser?.name}</span>
                    </Link>
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ scale: 1.05 }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md"
                    >
                      Login
                    </motion.button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-300">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 lg:hidden bg-[#0f172a]/95 backdrop-blur-lg border-t border-purple-700/50"
            >
              <div className="flex flex-col space-y-1 p-4">
                {navigationItems.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    to={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-5 py-3 rounded-xl text-base font-semibold flex items-center space-x-3 transition-all duration-300
                      ${location.pathname === href
                        ? 'bg-cyan-500/10 text-white shadow shadow-cyan-500'
                        : 'text-slate-300 hover:text-white hover:bg-cyan-400/10'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </Link>
                ))}
                <div className="border-t border-purple-700/50 pt-4 mt-2">
                  {currentUser ? (
                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-left bg-purple-800/50 text-white px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 hover:bg-cyan-600/20 transition-all"
                      >
                        <User /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left bg-red-500/80 text-white px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 hover:bg-red-600 transition-all"
                      >
                        <User /> Logout
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default Header;