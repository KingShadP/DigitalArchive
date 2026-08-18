import { cn } from "@/lib/utils";
import React from "react";

// For large, structural, or editorial headings
export function Heading({
  children,
  className,
  as: Component = "h2",
  variant = "display",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: "display" | "serif-italic" | "sans-bold";
}) {
  const baseStyles = "tracking-tight text-foreground";
  
  const variants = {
    "display": "font-display font-medium text-4xl md:text-6xl uppercase tracking-tighter",
    "serif-italic": "font-serif italic text-3xl md:text-5xl font-light",
    "sans-bold": "font-sans font-bold text-2xl md:text-4xl",
  };

  return (
    <Component className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Component>
  );
}

// For telemetry, metadata, and structural labels
export function MonoLabel({
  children,
  className,
  as: Component = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component className={cn("font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-neutral-500", className)}>
      {children}
    </Component>
  );
}

// For body copy, lore, and descriptions
export function Text({
  children,
  className,
  as: Component = "p",
  variant = "body",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: "body" | "muted" | "lead";
}) {
  const baseStyles = "font-sans leading-relaxed";
  
  const variants = {
    body: "text-sm text-foreground/80",
    muted: "text-xs text-foreground/50",
    lead: "text-base md:text-lg text-foreground/90 font-light",
  };

  return (
    <Component className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Component>
  );
}
