'use client';

import React from 'react';
import { motion } from 'motion/react';

export function OrbitingSymbol() {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 border-[0.5px] border-foreground/10 rounded-full"
      >
        <div className="absolute top-1/2 -left-1 w-2 h-2 bg-foreground/30 rounded-full" />
      </motion.div>
      
      {/* Middle Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 border-[0.5px] border-foreground/15 rounded-full"
      >
        <div className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-foreground rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </motion.div>
      
      {/* Inner Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-16 border-[0.5px] border-foreground/20 rounded-full"
      >
        <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]" />
      </motion.div>

      {/* Core / Nucleus */}
      <motion.div 
        animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center"
      >
        <div className="absolute inset-0 border border-foreground/30 rotate-45 transition-transform duration-1000" />
        <div className="absolute inset-2 border border-foreground/20 -rotate-45" />
        <div className="w-1.5 h-1.5 bg-foreground rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      </motion.div>
    </div>
  );
}
