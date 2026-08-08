import { cn } from "@/lib/utils";
import React from "react";

export function Beacon({ 
  status = "active", 
  className 
}: { 
  status?: "active" | "standby" | "alert" | "offline", 
  className?: string 
}) {
  const colors = {
    active: "bg-accent",
    standby: "bg-platinum",
    alert: "bg-oxblood",
    offline: "bg-neutral-800",
  };

  return (
    <div className={cn("relative flex items-center justify-center w-1.5 h-1.5", className)}>
      <span className={cn("absolute inset-0 rounded-full animate-ping opacity-75", colors[status])} />
      <span className={cn("relative inline-flex rounded-full w-1.5 h-1.5", colors[status])} />
    </div>
  );
}

export function TelemetryBadge({
  label,
  value,
  className,
}: {
  label: string;
  value?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-between items-baseline font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-neutral-500 border-b border-border pb-2", className)}>
      <span>{label}</span>
      {value && <span className="text-foreground">{value}</span>}
    </div>
  );
}

export function FrameBorder({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("relative border border-border bg-surface p-1", className)}>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/30 -translate-x-[1px] -translate-y-[1px]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/30 translate-x-[1px] -translate-y-[1px]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/30 -translate-x-[1px] translate-y-[1px]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/30 translate-x-[1px] translate-y-[1px]" />
      {children}
    </div>
  );
}
