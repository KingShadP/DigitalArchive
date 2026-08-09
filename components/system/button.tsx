import { cn } from "@/lib/utils";
import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "metal" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-mono uppercase tracking-widest ds-transition disabled:opacity-50 disabled:pointer-events-none rounded-sm focus-visible:outline-none";
    
    const variants = {
      primary: "bg-foreground text-background hover:bg-foreground/90",
      secondary: "bg-surface-dim text-foreground hover:bg-surface-dim/80",
      outline: "border border-border text-foreground hover:border-border-strong hover:bg-surface-dim",
      ghost: "text-foreground/70 hover:text-foreground hover:bg-surface-dim",
      metal: "border border-vintage-metal/35 text-rose-gold hover:border-rose-gold/55 hover:bg-rose-gold/10",
      icon: "p-0 bg-transparent text-foreground/70 hover:text-foreground",
    };

    const sizes = {
      sm: "h-8 px-3 text-[9px]",
      md: "h-10 px-6 text-[10px]",
      lg: "h-12 px-8 text-[11px]",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export function MotionButton({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}: HTMLMotionProps<"button"> & { variant?: "primary" | "secondary" | "outline" | "ghost" | "metal" | "icon", size?: "sm" | "md" | "lg" | "icon" }) {
    const baseStyles = "inline-flex items-center justify-center font-mono uppercase tracking-widest ds-transition disabled:opacity-50 disabled:pointer-events-none rounded-sm focus-visible:outline-none";
    
    const variants = {
      primary: "bg-foreground text-background hover:bg-foreground/90",
      secondary: "bg-surface-dim text-foreground hover:bg-surface-dim/80",
      outline: "border border-border text-foreground hover:border-border-strong hover:bg-surface-dim",
      ghost: "text-foreground/70 hover:text-foreground hover:bg-surface-dim",
      metal: "border border-vintage-metal/35 text-rose-gold hover:border-rose-gold/55 hover:bg-rose-gold/10",
      icon: "p-0 bg-transparent text-foreground/70 hover:text-foreground",
    };

    const sizes = {
      sm: "h-8 px-3 text-[9px]",
      md: "h-10 px-6 text-[10px]",
      lg: "h-12 px-8 text-[11px]",
      icon: "h-10 w-10",
    };

    return (
      <motion.button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
}
