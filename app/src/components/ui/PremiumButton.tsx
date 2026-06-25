import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils'; // Assuming clsx/tailwind-merge is available, or I'll implement a basic one

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: PremiumButtonProps) {
  
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center gap-2 font-poppins uppercase tracking-[0.15em] transition-all duration-300";
  
  const variants = {
    primary: "bg-salon-black text-salon-white hover:bg-salon-gray",
    secondary: "bg-salon-white text-salon-black hover:bg-gray-100",
    outline: "border border-salon-black text-salon-black hover:bg-salon-black hover:text-white",
    ghost: "text-salon-black hover:opacity-70"
  };

  const sizes = {
    sm: "px-6 py-3 text-[10px]",
    md: "px-8 py-4 text-xs",
    lg: "px-10 py-5 text-sm"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
