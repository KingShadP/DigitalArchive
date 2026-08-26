'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-6 space-y-4">
      <h2 className="text-xl font-light tracking-wide uppercase">An unexpected error occurred</h2>
      <p className="text-xs text-white/60">{error.message || 'Unknown error'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 border border-white/30 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
