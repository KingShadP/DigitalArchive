'use client';

import { ErrorState, Button } from "@/components/system";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-background text-foreground font-mono">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
          <ErrorState message="CRITICAL KERNEL FAILURE" details={error.message} />
          <Button variant="outline" onClick={() => reset()}>
            HARD RESTART
          </Button>
        </div>
      </body>
    </html>
  );
}
