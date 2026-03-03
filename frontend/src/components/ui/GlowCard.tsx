import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GlowCard = ({ children, className = "", delay = 0 }: GlowCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      <div className="relative bg-card border border-border rounded-xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
