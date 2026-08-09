import { cn } from "@/lib/utils";
import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: "primary" | "secondary" | "inline" | "nav" | "cta";
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseStyles = "ds-transition focus:outline-none rounded-sm";
    
    const variants = {
      primary: "text-foreground hover:text-foreground/70",
      secondary: "text-neutral-500 hover:text-foreground",
      inline: "underline underline-offset-4 decoration-border hover:decoration-foreground",
      nav: "font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-foreground",
      cta: "inline-flex items-center justify-center border border-border px-6 py-3 font-mono text-[9px] uppercase tracking-widest hover:bg-foreground hover:text-background",
    };

    return (
      <NextLink ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";
