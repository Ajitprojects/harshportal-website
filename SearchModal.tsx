// src/components/SearchModal.tsx (Updated with Advanced Features)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { allProducts } from '../data/products';
import { useDebounce } from '../hooks/useDebounce'; // Import the custom debounce hook

interface SearchModalProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchModal = ({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, handleSearch }: SearchModalProps) => {
  const [suggestions, setSuggestions] = useState<typeof allProducts>([]);
  
  // Use the debounced value for searching to improve performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay

  useEffect(() => {
    if (debouncedSearchQuery.trim().length > 1) {
      const filteredSuggestions = allProducts.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery]); // This effect now depends on the debounced value

  const handleSuggestionClick = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }

  // Helper function to highlight the matched text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={index} className="text-cyan-400">{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          onClick={() => setIsSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="w-full max-w-2xl mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              {/* ... The input form remains the same ... */}
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-cyber-cyan" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for Netflix, Windows, IPTV..." className="w-full pl-16 pr-16 py-6 bg-primary-800/95 backdrop-blur-cyber border border-primary-600 rounded-xl text-white placeholder-cyber-green text-lg focus:outline-none focus:border-cyber-cyan transition-all duration-300 shadow-cyber" autoFocus autoComplete="off" />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
              </div>
            </form>

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 bg-primary-800/95 backdrop-blur-cyber border border-primary-600 rounded-xl overflow-hidden shadow-cyber"
                >
                  <ul>
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <Link to={`/search?q=${product.name}`} onClick={handleSuggestionClick} className="flex items-center p-4 space-x-4 hover:bg-primary-700/50 transition-colors">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                          <div>
                            <p className="font-semibold text-white">
                              {highlightMatch(product.name, searchQuery)}
                            </p>
                            <p className="text-sm text-gray-400">in {product.category}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-2 text-center"><span className="text-cyber-blue text-sm font-mono">Press ESC to close • Enter to search</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;