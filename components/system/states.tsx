import { cn } from "@/lib/utils";
import React from "react";
import { MonoLabel } from "./typography";

export function LoadingState({ message = "LOADING", className }: { message?: string, className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 space-y-4", className)}>
      <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-ping" />
      <MonoLabel>{message}</MonoLabel>
    </div>
  );
}

export function ErrorState({ 
  message = "SYSTEM ERROR", 
  details, 
  className 
}: { 
  message?: string;
  details?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 space-y-4 border border-oxblood bg-oxblood/10 rounded-sm", className)}>
      <div className="text-crimson font-mono text-sm tracking-widest uppercase">{message}</div>
      {details && <MonoLabel className="text-oxblood/70">{details}</MonoLabel>}
    </div>
  );
}
