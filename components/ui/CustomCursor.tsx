'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorDot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      // Touch check guard
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (cursorAttr) {
          setCursorText(cursorAttr);
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorDot}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <motion.div
        animate={{
          scale: isHovered ? (cursorText ? 1 : 1.5) : 1,
          backgroundColor: isHovered ? 'rgba(244, 241, 236, 0.95)' : 'rgba(244, 241, 236, 0.75)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`rounded-full flex items-center justify-center text-black font-mono transition-all duration-200 ${
          cursorText
            ? 'px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase shadow-lg border border-black/20'
            : isHovered
            ? 'w-4 h-4'
            : 'w-2 h-2'
        }`}
      >
        {cursorText && (
          <span className="whitespace-nowrap select-none">{cursorText}</span>
        )}
      </motion.div>
    </div>
  );
}
