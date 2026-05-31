'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Active zone radius
  strength?: number; // Strength coefficient for translational pull
  scaleStrength?: number; // Maximum scale multiplication on maximum proximity
}

export default function Magnetic({ 
  children, 
  range = 100, 
  strength = 0.4, 
  scaleStrength = 0.06 
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Spring configurations for high-end cinematic physical weight (stiff but heavily damped)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 120, damping: 18, mass: 0.3 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  
  // Spring config for scaling behavior to keep it smooth
  const scale = useMotionValue(1);
  const smoothScale = useSpring(scale, { stiffness: 180, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Relative center coordinates of the target
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < range) {
      // Calculate proximity factor (1 at center, 0 at the range boundary)
      const proximity = 1 - distance / range;
      
      // Gravitational force: pull towards cursor with physical easing
      x.set(deltaX * proximity * strength);
      y.set(deltaY * proximity * strength);
      
      // Proximity-based scaling
      scale.set(1 + proximity * scaleStrength);
    } else {
      // Gravity fade out / system reset
      x.set(0);
      y.set(0);
      scale.set(1);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        x: smoothX, 
        y: smoothY, 
        scale: smoothScale 
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
