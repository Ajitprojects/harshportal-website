import React from "react";
import { cn } from "@/lib/utils";

interface WowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  className?: string;
}

const WowButton: React.FC<WowButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const base =
    "px-5 py-2 rounded-lg font-semibold transition-all duration-300 text-sm";

  const styles = {
    primary: "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-cyan-500/40 hover:shadow-lg hover:scale-[1.02]",
    outline: "border border-cyan-400 text-cyan-300 bg-transparent hover:bg-cyan-500/10 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-md",
  };

  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default WowButton;
