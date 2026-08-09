'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MonoLabel } from '@/components/system';

interface ReadinessState {
  fonts: boolean;
  dom: boolean;
  minTime: boolean;
  mounted: boolean;
}

export function Bootloader({ onComplete }: { onComplete: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState<ReadinessState>({
    fonts: false,
    dom: false,
    minTime: false,
    mounted: false,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Minimum cinematic time
    const minTimer = setTimeout(() => {
      setReady((prev) => ({ ...prev, minTime: true }));
    }, 1200);

    // 2. Component mounted
    const mountTimer = setTimeout(() => {
      setReady((prev) => ({ ...prev, mounted: true }));
    }, 0);

    // 3. Fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setReady((prev) => ({ ...prev, fonts: true }));
      });
    } else {
      setTimeout(() => setReady((prev) => ({ ...prev, fonts: true })), 0);
    }

    // 4. DOM ready
    if (document.readyState === 'complete') {
      setTimeout(() => setReady((prev) => ({ ...prev, dom: true })), 0);
    } else {
      window.addEventListener('load', () => {
        setReady((prev) => ({ ...prev, dom: true }));
      });
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(mountTimer);
    };
  }, []);

  const allReady = ready.fonts && ready.dom && ready.minTime && ready.mounted;

  useEffect(() => {
    if (allReady) {
      const finishTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 1200); // Wait for exit animation
      }, 400); // small delay after all ready before sliding out
      return () => clearTimeout(finishTimer);
    }
  }, [allReady, onComplete]);

  // Calculate a mock percentage based on real readiness
  const completedSteps = [ready.mounted, ready.fonts, ready.dom, ready.minTime].filter(Boolean).length;
  const progressPercent = (completedSteps / 4) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[9999] bg-[#E5E5E5] text-[#050505] flex flex-col justify-between p-8 md:p-12"
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '-10%', filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="flex justify-between items-start text-[#050505]/50 font-mono text-[9px] uppercase tracking-widest">
            <div>KINGSHADP // ORBITAL MANIFEST</div>
            <div>VER 4.1.9</div>
          </div>

          {/* Core Visual */}
          <div className="max-w-xl mx-auto w-full text-center space-y-12">
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl font-light text-[#050505] tracking-tight">
                KingShadP
              </h1>
            </motion.div>

            <div className="space-y-4">
              <div className="h-[1px] w-full bg-[#050505]/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#050505]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              
              <div className="flex justify-between font-mono text-[9px] text-[#050505]/50 uppercase tracking-widest">
                <div className="flex flex-col text-left gap-1">
                  <span className={ready.mounted ? "text-[#050505]" : ""}>[ {ready.mounted ? 'OK' : '..'} ] MOUNT SEQUENCE</span>
                  <span className={ready.fonts ? "text-[#050505]" : ""}>[ {ready.fonts ? 'OK' : '..'} ] TYPOGRAPHY LOADED</span>
                  <span className={ready.dom ? "text-[#050505]" : ""}>[ {ready.dom ? 'OK' : '..'} ] DOM HYDRATION</span>
                </div>
                <div className="text-right">
                  <span className="animate-pulse">{allReady ? 'READY' : 'STABILIZING...'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end text-[#050505]/50 font-mono text-[9px] uppercase tracking-widest">
            <div>{allReady ? 'CONNECTION STABLE' : 'ESTABLISHING VECTOR'}</div>
            <div>{Math.round(progressPercent)}% RESOLVED</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
