'use client';

import { ErrorState, Button } from "@/components/system";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message, error.stack);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background space-y-6">
      <ErrorState message="SYSTEM FAULT DETECTED" details={error.message || "Unknown anomaly"} />
      <Button variant="outline" onClick={() => reset()}>
        REBOOT SEQUENCE
      </Button>
    </div>
  );
}
