'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onLoaded?: () => void;
}

export function Loader({ onLoaded }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING AUDIO');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const steps = [
      { p: 25, text: 'LOADING AUDIO' },
      { p: 55, text: 'INDEXING VISUALS' },
      { p: 85, text: 'OPENING ARCHIVE' },
      { p: 100, text: 'READY' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setProgress(steps[current].p);
        setStatusText(steps[current].text);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onLoaded?.();
        }, 300);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] bg-[#050505] text-[#F4F1EC] flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center gap-6 max-w-xs w-full px-6">
            {/* Monogram / Title */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl sm:text-2xl font-light tracking-[0.35em] uppercase text-white">
                KINGSHADP
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40">
                AUTHORING EXPERIENCE
              </span>
            </div>

            {/* Thin Precision Progress Line */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[#F4F1EC]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>

            {/* Telemetry Status */}
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/50">
              {statusText} {'//'} {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
