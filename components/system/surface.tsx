import { cn } from "@/lib/utils";
import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "bordered" | "translucent";
  interactive?: boolean;
}

export function Surface({
  children,
  className,
  variant = "primary",
  interactive = false,
  ...props
}: SurfaceProps) {
  const baseStyles = "rounded-sm overflow-hidden relative";
  
  const variants = {
    primary: "bg-surface text-foreground",
    secondary: "bg-surface-dim text-foreground",
    bordered: "bg-transparent border border-border",
    translucent: "bg-surface/80 backdrop-blur-md border border-border/50",
  };

  const interactiveStyles = interactive 
    ? "transition-colors duration-300 hover:border-border-strong hover:bg-surface-dim" 
    : "";

  return (
    <div className={cn(baseStyles, variants[variant], interactiveStyles, className)} {...props}>
      {children}
    </div>
  );
}

export function MotionSurface({
  children,
  className,
  variant = "primary",
  interactive = false,
  ...props
}: HTMLMotionProps<"div"> & { variant?: "primary" | "secondary" | "bordered" | "translucent", interactive?: boolean }) {
  const baseStyles = "rounded-sm overflow-hidden relative";
  
  const variants = {
    primary: "bg-surface text-foreground",
    secondary: "bg-surface-dim text-foreground",
    bordered: "bg-transparent border border-border",
    translucent: "bg-surface/80 backdrop-blur-md border border-border/50",
  };

  const interactiveStyles = interactive 
    ? "transition-colors duration-300 hover:border-border-strong hover:bg-surface-dim" 
    : "";

  return (
    <motion.div className={cn(baseStyles, variants[variant], interactiveStyles, className)} {...props}>
      {children}
    </motion.div>
  );
}

// A structural divider used for editorial layouts
export function Divider({ className, orientation = "horizontal" }: { className?: string, orientation?: "horizontal" | "vertical" }) {
  return (
    <div 
      className={cn(
        "bg-border", 
        orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]",
        className
      )} 
    />
  );
}
