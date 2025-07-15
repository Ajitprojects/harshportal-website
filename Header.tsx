// src/components/Header.tsx (Updated with cursor-hover-target)

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import {
  Search, ShoppingBag, User, Menu, X, Heart, Home, Zap, Shield, Wifi, Package, CreditCard, HelpCircle
} from 'lucide-react';
import PromoBar from './PromoBar';
import SearchModal from './SearchModal';

const FuturisticLogo = () => (
    <Link to="/" className="flex items-center space-x-4 cursor-hover-target">
        <motion.div className="w-16 h-16 relative flex items-center justify-center" whileHover={{ scale: 1.1, rotate: -15 }} transition={{ type: 'spring', stiffness: 300 }}>
            <motion.div className="absolute w-full h-full bg-cyan-500 rounded-lg transform -rotate-45" animate={{ scale: [1, 1.1, 1], rotate: [-45, -35, -45]}} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}/>
            <motion.div className="absolute w-5/6 h-5/6 bg-purple-600 rounded-lg" animate={{ scale: [1, 0.9, 1], rotate: [0, 10, 0]}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}/>
            <div className="absolute w-full h-full bg-primary-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400/50"/>
            <span className="text-white font-black text-4xl font-display relative z-10">H</span>
        </motion.div>
        <div><h1 className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-cyan-400">HARSHPORTAL</h1><p className="text-sm font-cyber text-purple-400 uppercase tracking-[0.2em]">Digital Store</p></div>
    </Link>
);

const Header = () => {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { wishlistItemIds } = useWishlist();
    const { isAuthenticated, user, logout } = useAuth();

    const cartCount = getCartCount();
    const wishlistCount = wishlistItemIds.size;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    const navigationItems = [ { name: 'Home', href: '/', icon: Home }, { name: 'OTT Accounts', href: '/ott-accounts', icon: Zap }, { name: 'Product Keys', href: '/product-keys', icon: Shield }, { name: 'IPTV', href: '/iptv-subscription', icon: Wifi }, { name: 'Downloads', href: '/downloads', icon: Package }, { name: 'Pricing', href: '/pricing', icon: CreditCard }, { name: 'Support', href: '/support', icon: HelpCircle }];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleKeyDown = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsSearchOpen(true); } if (e.key === 'Escape') { setIsSearchOpen(false); setIsMenuOpen(false); } };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('keydown', handleKeyDown); };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            navigate(`/search?q=${searchQuery}`);
            setSearchQuery('');
        }
    };
    
    const iconButtonVariants = { hover: { scale: 1.2, backgroundColor: "rgba(14, 165, 233, 0.1)", color: "#00ffff", transition: { type: 'spring', stiffness: 400, damping: 10 } }, tap: { scale: 0.9 } };

    return (
        <>
            <PromoBar />
            <header className={`fixed top-[52px] left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-primary-900/80 backdrop-blur-lg border-b border-primary-700/50' : 'bg-transparent border-b border-transparent'}`}>
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="flex items-center justify-between h-24">
                        <FuturisticLogo />
                        <nav className="hidden lg:flex items-center space-x-2">
                            {navigationItems.map((item) => (
                                <motion.div key={item.name} className="cursor-hover-target" whileHover={{ y: -2 }} whileTap={{ y: 1, scale: 0.95 }}>
                                    <Link to={item.href} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-colors ${location.pathname === item.href ? 'bg-primary-700 text-white' : 'text-slate-300 hover:text-white'}`}>
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <div className="flex items-center space-x-3">
                            <motion.button variants={iconButtonVariants} whileHover="hover" whileTap="tap" onClick={() => setIsSearchOpen(true)} className="p-3 rounded-full text-slate-300 cursor-hover-target"><Search className="w-5 h-5" /></motion.button>
                            <motion.button variants={iconButtonVariants} whileHover="hover" whileTap="tap" className="p-3 rounded-full text-slate-300 relative cursor-hover-target"><Heart className="w-5 h-5" />{wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-primary-900">{wishlistCount}</span>}</motion.button>
                            <Link to="/cart" className="cursor-hover-target">
                                <motion.button variants={iconButtonVariants} whileHover="hover" whileTap="tap" className="p-3 rounded-full text-slate-300 relative">
                                    <ShoppingBag className="w-5 h-5" />
                                    {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-cyan text-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-primary-900">{cartCount}</span>}
                                </motion.button>
                            </Link>
                            <div className="hidden lg:block h-8 w-px bg-primary-700 mx-2"></div>
                            
                            <div className="hidden lg:flex items-center">
                                {isAuthenticated ? (
                                    <div className="flex items-center space-x-4">
                                        <Link to="/profile" className="flex items-center space-x-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors cursor-hover-target">
                                            <User className="w-5 h-5" />
                                            <span>{user?.name}</span>
                                        </Link>
                                        <motion.button onClick={logout} whileHover={{ scale: 1.05 }} className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-hover-target">Logout</motion.button>
                                    </div>
                                ) : (
                                    <Link to="/login" className="cursor-hover-target">
                                        <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)" }} className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold">Login</motion.button>
                                    </Link>
                                )}
                            </div>
                            
                            <div className="lg:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-300 cursor-hover-target">{isMenuOpen ? <X/> : <Menu/>}</button></div>
                        </div>
                    </div>
                </div>
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