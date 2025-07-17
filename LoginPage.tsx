import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Lock, Mail, Github, Gitlab } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    const user = await login(data.email, data.password);

    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      // The onAuthStateChanged listener will update the global state.
      // We just need to navigate.
      if (user.role === 'Admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from === "/login" ? "/profile" : from, { replace: true });
      }
    }
    // Error toasts are handled inside the login function itself
  };
  
  // ... (Your JSX for LoginPage remains the same)
  return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4 pt-28">
        {/* ... The rest of your beautiful login page JSX ... */}
      </div>
  );
};

export default LoginPage;