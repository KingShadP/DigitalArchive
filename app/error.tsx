'use client';

import { ErrorState, Button } from "@/components/system";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background space-y-6 p-6" role="alert">
      <ErrorState message="SYSTEM FAULT DETECTED" details={error.message || "Unknown anomaly"} />
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => reset()}>
          REBOOT SEQUENCE
        </Button>
        <Link href="/" className="font-mono text-[10px] uppercase tracking-widest border border-border px-4 py-2 hover:border-foreground/50 transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
