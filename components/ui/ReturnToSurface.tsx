'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface ReturnToSurfaceProps {
  thresholdVh?: number; // Fraction of viewport height before appearing (default: 0.5 = 50vh)
  className?: string;
}

export function ReturnToSurface({
  thresholdVh = 0.5,
  className = '',
}: ReturnToSurfaceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const vhThreshold = window.innerHeight * thresholdVh;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalDocHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((scrollY / totalDocHeight) * 100)));
        setScrollProgress(progress);
      }

      if (scrollY > vhThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [thresholdVh]);

  const handleReturnToSurface = () => {
    try {
      soundEngine.playHarmonicChime(648);
    } catch {
      // Audio fallback safe
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
      } ${className}`}
    >
      <button
        type="button"
        id="return-to-surface-btn"
        onClick={handleReturnToSurface}
        aria-label="Return to Surface"
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#F4F1EC]/15 bg-[#050505]/85 hover:bg-[#0d0d0d] hover:border-[#B76E79]/60 text-[#F4F1EC]/70 hover:text-[#F4F1EC] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
      >
        {/* Subtle glowing ring indicator matching scroll progress */}
        <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#B76E79]/50 transition-colors">
          <ArrowUp
            size={12}
            className="text-[#B76E79] group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
            RETURN TO SURFACE
          </span>
          {scrollProgress > 0 && (
            <span className="text-[8px] font-mono text-[#F4F1EC]/40 group-hover:text-[#B76E79] transition-colors border-l border-[#F4F1EC]/10 pl-2">
              {scrollProgress}%
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

export default ReturnToSurface;
