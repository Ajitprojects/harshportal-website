// src/context/WishlistContext.tsx (Updated with localStorage)

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WishlistContextType {
  wishlistItemIds: Set<number>;
  toggleWishlist: (id: number) => void;
  isItemInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  // 1. Initialize wishlist state from localStorage
  const [wishlistItemIds, setWishlistItemIds] = useState<Set<number>>(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? new Set(JSON.parse(storedWishlist)) : new Set();
    } catch (error) {
      console.error("Could not parse wishlist from localStorage", error);
      return new Set();
    }
  });

  // Helper function to update both state and localStorage
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

  const value = { wishlistItemIds, toggleWishlist, isItemInWishlist };

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