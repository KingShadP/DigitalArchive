'use client';

import { motion, useReducedMotion } from 'motion/react';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: prefersReducedMotion ? 0.2 : 0.65 }}
    >
      {children}
    </motion.div>
  );
}
