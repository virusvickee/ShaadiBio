import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const ShimmerButton = ({ children, className = "", onClick, type = "button", disabled }: ShimmerButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-lg bg-primary text-primary-foreground font-body font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full animate-shimmer" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default ShimmerButton;
