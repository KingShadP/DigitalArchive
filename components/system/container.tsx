import { cn } from "@/lib/utils";
import React from "react";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24", className)}>
      {children}
    </div>
  );
}

export function Grid({
  children,
  className,
  columns = 12,
  gap = "md",
}: {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4 | 12;
  gap?: "sm" | "md" | "lg" | "none";
}) {
  const cols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
  };
  
  const gaps = {
    none: "gap-0",
    sm: "gap-4",
    md: "gap-8 lg:gap-12",
    lg: "gap-12 lg:gap-24",
  };

  return (
    <div className={cn("grid", cols[columns], gaps[gap], className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  spacing = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}) {
  const spacings = {
    sm: "py-12",
    md: "py-24",
    lg: "py-32 md:py-48",
    xl: "py-48 md:py-64",
  };

  return (
    <section className={cn("w-full", spacings[spacing], className)}>
      {children}
    </section>
  );
}
