// src/context/AuthContext.tsx (Updated with localStorage)

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = { id: 'user-123', name: 'Harsh', email: 'harsh@example.com' };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Initialize user state from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const navigate = useNavigate();

  const login = (email: string, pass: string) => {
    if (email === 'harsh@example.com' && pass === '123456') {
      // 2. On successful login, save user to localStorage
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      setUser(MOCK_USER);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, pass: string) => {
    console.log("New user signed up:", { name, email, pass });
    const newUser: User = { id: `user-${Date.now()}`, name, email };
    
    // 3. On successful signup, save new user to localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    // 4. On logout, remove user from localStorage
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isAuthenticated = !!user;

  const value = { isAuthenticated, user, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};