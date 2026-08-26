'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
          <h2 className="text-xl font-light tracking-wide uppercase">Critical Error</h2>
          <p className="text-xs text-white/60">{error.message || 'System fault'}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 border border-white/30 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
            Restart
          </button>
        </div>
      </body>
    </html>
  );
}
