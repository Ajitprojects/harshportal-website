// src/context/CartContext.tsx (Updated for Quantity)

import React, { createContext, useState, useContext, ReactNode } from 'react';

// The value of each item in the cart will now be an object with an id and quantity
export interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getCartCount: () => number;
  isItemInCart: (id: number) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (id: number) => {
    const existingItem = cartItems.find(item => item.id === id);
    let newCart: CartItem[];
    if (existingItem) {
      // If item exists, increase quantity
      newCart = cartItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If item doesn't exist, add it with quantity 1
      newCart = [...cartItems, { id, quantity: 1 }];
    }
    updateCart(newCart);
  };

  const decreaseQuantity = (id: number) => {
    const existingItem = cartItems.find(item => item.id === id);
    let newCart: CartItem[];
    if (existingItem && existingItem.quantity > 1) {
      // If quantity is more than 1, decrease it
      newCart = cartItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      // If quantity is 1, remove the item completely
      newCart = cartItems.filter(item => item.id !== id);
    }
    updateCart(newCart);
  };
  
  const removeFromCart = (id: number) => {
    const newCart = cartItems.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getCartCount = () => {
    // Calculate total number of items by summing quantities
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isItemInCart = (id: number) => {
    return cartItems.some(item => item.id === id);
  };

  const value = { cartItems, addToCart, removeFromCart, decreaseQuantity, getCartCount, isItemInCart, clearCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};