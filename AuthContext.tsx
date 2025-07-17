import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../supabase';
// Import the necessary types from the Supabase library
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

// --- TYPE DEFINITIONS ---
export interface AuthUser {
  id: string; // Supabase uses UUID strings for IDs
  name: string;
  email: string;
  role: 'Admin' | 'Customer' | 'Moderator';
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  authLoading: boolean;
  login: (email: string, pass: string) => Promise<AuthUser | null>;
  signup: (name: string, email: string, pass: string) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication changes from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      // FIX: Add the correct type for the '_event' parameter
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          // User is logged in, fetch their profile from our 'profiles' table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            setCurrentUser(null);
          } else if (profile) {
            setCurrentUser({
              id: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role,
            });
          }
        } else {
          // User is logged out
          setCurrentUser(null);
        }
        setAuthLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<AuthUser | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        return profile;
      }
      return null;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (name: string, email: string, pass: string): Promise<AuthUser | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password: pass,
        options: {
          data: {
            name: name,
          }
        }
      });
      if (error) throw error;
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: data.user.id, name, email, role: 'Customer' });
        
        if (profileError) throw profileError;
        return { id: data.user.id, name, email, role: 'Customer' };
      }
      return null;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate('/login');
  };

  const value = { currentUser, isLoading, authLoading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
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