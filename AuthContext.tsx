import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../supabase';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // This listener correctly fetches the full user profile from the database
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error("Error fetching profile: ", error);
            await supabase.auth.signOut(); // Log out if profile is inaccessible
            setCurrentUser(null);
          } else if (profile) {
            setCurrentUser(profile as AuthUser);
          }
        } else {
          setCurrentUser(null);
        }
        setAuthLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<AuthUser | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        return profile as AuthUser | null;
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
        options: { data: { name: name } }
      });
      if (error) throw error;
      if (data.user) {
        const newUserProfile = { id: data.user.id, name, email, role: 'Customer' as const };
        const { error: profileError } = await supabase.from('profiles').insert(newUserProfile);
        if (profileError) throw profileError;
        return newUserProfile;
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