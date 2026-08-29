'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

function Character({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="opacity-0">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0 text-[#D7E2EA]"
      >
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const elementRef = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const totalChars = characters.length;

  return (
    <p
      ref={elementRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] ${className}`}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
      }}
    >
      {characters.map((char, index) => {
        const start = index / totalChars;
        const end = start + 1 / totalChars;
        return (
          <Character
            key={`${char}-${index}`}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

export default AnimatedText;
