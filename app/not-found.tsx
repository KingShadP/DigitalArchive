import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#050505] text-[#F4F1EC] font-sans p-6 select-none">
      <div className="flex flex-col items-center gap-6 max-w-lg text-center relative">
        <div className="absolute inset-0 bg-[#B76E79]/10 blur-[90px] pointer-events-none rounded-full" />

        <h1 className="text-[100px] sm:text-[140px] font-extralight leading-none tracking-tighter opacity-20 font-serif text-white">
          404
        </h1>

        <div className="space-y-2 z-10 -mt-8">
          <p className="text-[10px] font-mono tracking-[0.35em] text-[#B76E79] uppercase">
            Signal Lost // Coordinate Void
          </p>
          <h2 className="text-xl sm:text-2xl font-extralight tracking-wide text-white uppercase">
            Artifact Not Located
          </h2>
        </div>

        <p className="text-xs font-light text-white/60 max-w-sm leading-relaxed z-10">
          The requested coordinate or asset does not exist within the active KingShadP archive timeline.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 z-10 pt-4">
          <Link
            href="/"
            className="text-[10px] font-mono uppercase tracking-[0.25em] bg-white text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#B76E79] hover:text-white transition-all shadow-md"
          >
            RETURN TO CORE
          </Link>
          <Link
            href="/music"
            className="text-[10px] font-mono uppercase tracking-[0.25em] border border-white/20 px-4 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
          >
            MUSIC
          </Link>
          <Link
            href="/archive"
            className="text-[10px] font-mono uppercase tracking-[0.25em] border border-white/20 px-4 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
          >
            ARCHIVE
          </Link>
          <Link
            href="/visuals"
            className="text-[10px] font-mono uppercase tracking-[0.25em] border border-white/20 px-4 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
          >
            VISUALS
          </Link>
        </div>
      </div>
    </div>
  );
}
