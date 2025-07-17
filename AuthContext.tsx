import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// --- TYPE DEFINITIONS ---
export interface AuthUser {
  id: number;
  uid: string;
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

// Using a mock map for roles during login for this example
const mockUserRoles: { [key: string]: { id: number, role: 'Admin' | 'Customer' } } = {
  "admin@example.com": { id: 1, role: "Admin" },
  "customer@example.com": { id: 2, role: "Customer" }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const customData = userDoc.data();
          setCurrentUser({
            id: customData.id,
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || customData.name,
            role: customData.role,
          });
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<AuthUser | null> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const fullUser: AuthUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          ...userDoc.data()
        } as AuthUser;
        setCurrentUser(fullUser);
        return fullUser;
      }
      throw new Error("User data not found in Firestore.");
    } catch (error: any) {
      toast.error(error.code?.includes('auth/invalid-credential') ? 'Invalid email or password.' : 'An error occurred during login.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

 const signup = async (name: string, email: string, pass: string): Promise<AuthUser | null> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const newUser: AuthUser = {
        id: Math.floor(Math.random() * 10000),
        uid: user.uid,
        name: name,
        email: email,
        role: "Customer",
      };
      
      await setDoc(doc(db, "users", user.uid), newUser);
      setCurrentUser(newUser);
      return newUser;
    } catch (error: any) {
      // Improved error handling: Show the specific message from Firebase
      let errorMessage = "Failed to create account.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
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