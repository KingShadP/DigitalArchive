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
    <div className={cn("w-full max-w-[1800px] mx-auto ds-gutter lg:px-24", className)}>
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
  spacing = "md",
}: {
  children: React.ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}) {
  const spacings = {
    sm: "ds-section-sm",
    md: "ds-section-md",
    lg: "ds-section-lg",
    xl: "py-48 md:py-64",
  };

  return (
    <section className={cn("w-full", spacings[spacing], className)}>
      {children}
    </section>
  );
}

export function Stack({
  children,
  className,
  gap = "md",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
}) {
  const gaps = {
    sm: "space-y-4",
    md: "space-y-8",
    lg: "space-y-12",
  };

  return <div className={cn(gaps[gap], className)}>{children}</div>;
}

export function EditorialSplit({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <Grid columns={12} gap="lg" className={cn("items-start", className)}>
      <div className="col-span-12 lg:col-span-7">{left}</div>
      <div className="col-span-12 lg:col-span-4 lg:col-start-9">{right}</div>
    </Grid>
  );
}
