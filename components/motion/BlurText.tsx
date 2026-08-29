'use client';

import React from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function BlurText({
  text,
  className = '',
  delay = 0,
  as: Component = 'div',
}: BlurTextProps) {
  const words = text.split(' ');

  return (
    <Component className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            filter: ['blur(10px)', 'blur(4px)', 'blur(0px)'],
            opacity: [0, 0.6, 1],
            y: [35, -3, 0],
          }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.7,
            delay: delay + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
