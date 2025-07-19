import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { supabase } from "../supabase";
import { useAuth } from '../context/AuthContext';


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = React.useState(false);


const onSubmit = async (data: LoginFormValues) => {
  setLoading(true);
  const { login } = useAuth();

  const user = await login(data.email, data.password);

  if (user) {
    toast.success("Login successful!");
    navigate("/profile");
  } else {
    toast.error("Invalid email or password.");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 pt-28">
      <motion.div
        className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-lg border border-cyan-500/20 rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to continue.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-gray-900/50 p-3 pl-12 rounded-lg text-white border-2 border-gray-700/50"
              {...register("email")}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-900/50 p-3 pl-12 rounded-lg text-white border-2 border-gray-700/50"
              {...register("password")}
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
