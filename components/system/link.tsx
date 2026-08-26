import { cn } from "@/lib/utils";
import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: "primary" | "secondary" | "inline" | "cta";
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseStyles = "transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm";
    
    const variants = {
      primary: "text-foreground hover:text-foreground/70",
      secondary: "text-neutral-500 hover:text-foreground",
      inline: "underline underline-offset-4 decoration-border hover:decoration-foreground",
      cta: "inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-all border border-foreground",
    };

    return (
      <NextLink ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";
