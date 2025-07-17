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
      if (user.role === 'Admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from === "/login" ? "/profile" : from, { replace: true });
      }
    }
    // Error toasts are now handled inside the login function itself
  };

  const inputClass = (hasError: boolean) => `w-full bg-gray-900/50 p-3 pl-12 rounded-lg text-white border-2 transition-colors ${hasError ? 'border-red-500/50' : 'border-gray-700/50'} focus:border-cyan-500 focus:outline-none focus:ring-0`;
  const errorTextClass = "text-red-400 text-xs mt-1 px-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-cyber-grid bg-[length:50px_50px] p-4 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 space-y-6 
          bg-white/5 backdrop-blur-lg border border-cyan-500/20 
          shadow-[0_0_30px_rgba(0,255,255,0.05)] rounded-2xl
          transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.2)]"
      >
        <div className="text-center">
          <h2 className="text-3xl font-black text-white bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to access your digital universe.
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <button className="w-full flex items-center justify-center gap-2 bg-gray-700/50 p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"><Gitlab size={20}/> GitLab</button>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-700/50 p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"><Github size={20}/> GitHub</button>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 uppercase">
          <hr className="flex-1 border-gray-700"/>
          <span className="px-4">OR</span>
          <hr className="flex-1 border-gray-700"/>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
              <input id="email" type="email" placeholder="Email address" className={inputClass(!!errors.email)} {...register("email")} />
            </div>
            {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
              <input id="password" type="password" placeholder="Password" className={inputClass(!!errors.password)} {...register("password")} />
            </div>
            {errors.password && <p className={errorTextClass}>{errors.password.message}</p>}
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 transition duration-300 ease-in-out hover:from-cyan-400 hover:to-pink-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;