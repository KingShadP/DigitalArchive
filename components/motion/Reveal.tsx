'use client';

import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
  blur?: boolean;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  blur = true,
}: RevealProps) {
  const yOffset = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: blur ? 'blur(12px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
