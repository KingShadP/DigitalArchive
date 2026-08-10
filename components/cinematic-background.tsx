'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';

export function CinematicBackground() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a more cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Layer 1: The Initial Portal (Black Marble)
  // Starts at normal size, pushes forward massively, and fades out as we "pass through"
  const layer1Scale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [1, 2.5, 4.5, 5]);
  const layer1Opacity = useTransform(smoothProgress, [0, 0.3, 0.5], [0.5, 0.8, 0]);
  const layer1Blur = useTransform(smoothProgress, [0, 0.3, 0.5], ['blur(0px)', 'blur(4px)', 'blur(12px)']);

  // Layer 2: The Inner Gallery (Gold Architectural Details)
  // Starts small in the distance, comes into focus, then pushes forward
  const layer2Scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.6, 1, 2.5, 3.5]);
  const layer2Opacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.7, 1], [0, 0, 0.6, 0.2, 0]);
  const layer2Blur = useTransform(smoothProgress, [0.2, 0.4, 0.6, 1], ['blur(10px)', 'blur(0px)', 'blur(4px)', 'blur(16px)']);

  // Layer 3: The Deep Vault (Geometric Core)
  // Extremely small initially, slowly becomes the primary environment at the bottom of the page
  const layer3Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.7, 1.1]);
  const layer3Opacity = useTransform(smoothProgress, [0, 0.5, 0.8, 1], [0, 0, 0.3, 0.7]);
  const layer3Y = useTransform(smoothProgress, [0, 1], ['10%', '0%']);

  // Atmospheric Fog & Particles
  // Moves independently and scales to give a sense of volume
  const fogScale = useTransform(smoothProgress, [0, 1], [1, 3]);
  const fogOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.25, 0.15]);
  const fogY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-background perspective-[1000px]">
      {/* Base Void Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background z-0" />

      {/* Layer 3: The Deep Vault */}
      <motion.div 
        className="absolute inset-0 z-10 origin-center"
        style={{ scale: layer3Scale, opacity: layer3Opacity, y: layer3Y }}
      >
        <Image 
          src="/girgonglory.png"
          alt="Deep Vault"
          fill
          className="object-cover object-center mix-blend-luminosity opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </motion.div>

      {/* Layer 2: The Inner Gallery (Gold) */}
      <motion.div 
        className="absolute inset-0 z-20 origin-center"
        style={{ scale: layer2Scale, opacity: layer2Opacity, filter: layer2Blur }}
      >
        <Image 
          src="/girgonglory.png"
          alt="Inner Gallery"
          fill
          className="object-cover object-center mix-blend-color-dodge brightness-75"
        />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      {/* Layer 1: The Initial Portal (Black Marble) */}
      <motion.div 
        className="absolute inset-0 z-30 origin-center"
        style={{ scale: layer1Scale, opacity: layer1Opacity, filter: layer1Blur }}
      >
        <Image 
          src="/girgonglory.png"
          alt="Initial Portal"
          fill
          className="object-cover object-center mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
      </motion.div>

      {/* Volumetric Fog & Texture */}
      <motion.div 
        className="absolute inset-[-50%] z-40 mix-blend-multiply pointer-events-none"
        style={{ scale: fogScale, opacity: fogOpacity, y: fogY }}
      >
        {/* We use a repeating noise texture that scales up to feel like dust/fog */}
        <div 
          className="absolute inset-0 bg-repeat bg-[length:512px_512px]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=512&auto=format&fit=crop")' }}
        />
      </motion.div>

      {/* Light Sweeps & Atmosphere */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,var(--color-background)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-accent/5 to-transparent mix-blend-multiply opacity-70 pointer-events-none" />
      
      {/* Global Cinematic Grain */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.035] mix-blend-difference pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
