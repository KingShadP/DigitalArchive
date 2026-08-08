import { cn } from "@/lib/utils";
import React from "react";
import Image, { ImageProps } from "next/image";

export function SystemImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image 
      className={cn("object-cover", className)} 
      alt={alt || "Media asset"}
      referrerPolicy="no-referrer"
      {...props} 
    />
  );
}

export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full bg-surface-dim border border-border flex items-center justify-center", className)}>
      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Media Pending</span>
    </div>
  );
}
