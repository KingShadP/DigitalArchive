import React from "react";
import { cn } from "@/lib/utils";

type CircularCTAProps<C extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "children" | "className">;

export function CircularCTA<C extends React.ElementType = "button">({
  children,
  className,
  size = "md",
  as: Component = "button",
  ...props
}: CircularCTAProps<C>) {
  const sizes = {
    sm: "h-12 w-12 text-[9px]",
    md: "h-24 w-24 text-[10px]",
    lg: "h-32 w-32 text-[10px]",
  };

  return (
    <Component
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full ds-border-frame font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background ds-transition",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function IconControlButton({
  children,
  className,
  active = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "h-10 w-10 rounded-full border flex items-center justify-center ds-transition",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-foreground hover:border-border-strong hover:bg-surface-elevated",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
