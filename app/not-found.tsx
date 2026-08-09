import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#020202] text-[#E5E5E5] font-mono p-6">
      <div className="flex flex-col items-center gap-6 max-w-lg text-center relative">
        <div className="absolute inset-0 bg-orange-500/10 blur-[80px] pointer-events-none rounded-full" />
        
        <h2 className="text-[120px] font-bold leading-none tracking-tighter opacity-10 font-serif">404</h2>
        
        <div className="space-y-2 z-10">
          <p className="text-[10px] tracking-[0.3em] text-orange-500 uppercase">Signal Lost // Matrix Void</p>
          <h3 className="text-xl font-light tracking-wide text-neutral-300">Artifact Not Found</h3>
        </div>
        
        <p className="text-xs text-neutral-500 max-w-sm leading-relaxed z-10">
          The coordinate you requested does not exist within the current archive iteration. 
          Return to the active telemetry grid.
        </p>

        <Link 
          href="/"
          className="mt-8 z-10 text-[9px] uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Return to Core
        </Link>
      </div>
    </div>
  );
}