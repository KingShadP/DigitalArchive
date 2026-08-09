import React from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "./typography";
import { Beacon } from "./telemetry";

export function AppFrame({ className }: { className?: string }) {
  return <div className={cn("fixed top-5 bottom-5 left-5 right-5 ds-border-frame pointer-events-none z-30 hidden md:block", className)} />;
}

export function TelemetryRail({
  className,
  signal = "SIGNAL STRENGTH: MAXIMUM",
  coordinates = "LAT: 34.0522° N // LONG: 118.2437° W",
}: {
  className?: string;
  signal?: string;
  coordinates?: string;
}) {
  return (
    <ul className={cn("fixed bottom-0 left-0 p-6 md:p-12 z-40 space-y-2 hidden md:block pointer-events-none mix-blend-difference", className)}>
      <li className="flex items-center gap-2">
        <Beacon />
        <MonoLabel>{signal}</MonoLabel>
      </li>
      <li><MonoLabel>{coordinates}</MonoLabel></li>
    </ul>
  );
}
