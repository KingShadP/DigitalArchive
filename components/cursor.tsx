'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none hidden md:block"
    >
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-[3px] h-[3px] bg-[#E5E5E5] rounded-full z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 1.5,
          y: mousePosition.y - 1.5,
          scale: isHovering ? 0 : 1.5,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 28, mass: 0.1 }}
      />
      {/* Outer Orbit / Lens */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-[99] border flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 0.8,
          backgroundColor: isHovering ? 'rgba(229, 229, 229, 0.03)' : 'transparent',
          borderColor: isHovering ? 'rgba(229, 229, 229, 0.2)' : 'rgba(68, 68, 68, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.4 }}
      />
    </motion.div>
  );
}
