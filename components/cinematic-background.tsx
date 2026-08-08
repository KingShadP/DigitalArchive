'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';

export function CinematicBackground() {
    const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a more cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Layer 1: Deep Background (scales up slightly)
  const layer1Scale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const layer1Opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.2, 0.1]);

  // Layer 2: Mid-ground (moves up and scales more)
  const layer2Scale = useTransform(smoothProgress, [0, 1], [1.05, 1.3]);
  const layer2Y = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const layer2Opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.4, 0.1]);

  // Layer 3: Fog/Grain (moves sideways/up)
  const fogX = useTransform(smoothProgress, [0, 1], ['0%', '-10%']);
  const fogY = useTransform(smoothProgress, [0, 1], ['0%', '10%']);


  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
      {/* Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0" />

      {/* Deep Background (Marble / Vault structure) */}
      <motion.div 
        className="absolute inset-0 z-10 origin-center"
        style={{ scale: layer1Scale, opacity: layer1Opacity }}
      >
        <Image 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center mix-blend-screen"
          unoptimized
          priority
        />
        {/* Darkening overlay for depth */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Mid-ground Architectural Details (Gold/Light sweeps) */}
      <motion.div 
        className="absolute inset-0 z-20 origin-bottom"
        style={{ scale: layer2Scale, y: layer2Y, opacity: layer2Opacity }}
      >
        <Image 
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2564&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center mix-blend-color-dodge"
          unoptimized
        />
        {/* Gradient masking to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </motion.div>

      {/* Fog and Light Rays */}
      <motion.div 
        className="absolute inset-[-20%] z-30 opacity-30 mix-blend-overlay"
        style={{ x: fogX, y: fogY }}
      >
        {/* Using a noise texture or abstract fog */}
        <div 
          className="absolute inset-0 bg-repeat bg-[length:256px_256px]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=512&auto=format&fit=crop")' }}
        />
      </motion.div>

      {/* Vignette & Color Grading Overlay */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Light sweep effect */}
      <div className="absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-[#ffd700]/5 to-transparent mix-blend-screen opacity-50" />
      
      {/* Global Grain */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.03] mix-blend-difference pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
