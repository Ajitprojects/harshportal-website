import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { Session, AuthChangeEvent, User } from "@supabase/supabase-js";

// --- TYPE DEFINITIONS ---
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Customer";
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  authLoading: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
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
    const fetchProfile = async (session: Session | null) => {
      if (!session?.user?.id) {
        setCurrentUser(null);
        setAuthLoading(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setCurrentUser(profile as AuthUser);
      } else {
        setCurrentUser({
          id: session.user.id,
          name: session.user.email || "Unknown",
          email: session.user.email || "unknown@example.com",
          role: "Customer",
        });
      }

      setAuthLoading(false);
    };

    // Initial session load
    supabase.auth.getSession().then(({ data }) => fetchProfile(data.session));

    // On auth state change
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        fetchProfile(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (error) throw error;
      return data.user;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    pass: string
  ): Promise<AuthUser | null> => {
    // Signup logic here
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    isLoading,
    authLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading ? children : <div className="text-cyan-400 p-10">Looding...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
