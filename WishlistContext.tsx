// src/context/WishlistContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast'; // ✅ Required for toast

interface WishlistContextType {
  wishlistItemIds: Set<number>;
  toggleWishlist: (id: number) => void;
  isItemInWishlist: (id: number) => boolean;
  clearWishlist: () => void; // ✅ Add to context type
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItemIds, setWishlistItemIds] = useState<Set<number>>(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? new Set(JSON.parse(storedWishlist)) : new Set();
    } catch (error) {
      console.error("Could not parse wishlist from localStorage", error);
      return new Set();
    }
  });

  const updateWishlist = (newWishlist: Set<number>) => {
    setWishlistItemIds(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(Array.from(newWishlist)));
  };

  const toggleWishlist = (id: number) => {
    const newIds = new Set(wishlistItemIds);
    if (newIds.has(id)) {
      newIds.delete(id);
    } else {
      newIds.add(id);
    }
    updateWishlist(newIds);
  };

  const isItemInWishlist = (id: number) => {
    return wishlistItemIds.has(id);
  };

  // ✅ New function to clear all wishlist items
  const clearWishlist = () => {
    updateWishlist(new Set());
    toast('Wishlist cleared.', { icon: '🗑️' });
  };

  // ✅ Add clearWishlist to value
  const value = {
    wishlistItemIds,
    toggleWishlist,
    isItemInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
