'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Bootloader } from '@/components/bootloader';
import { OrbitingSymbol } from '@/components/orbiting-symbol';
import Magnetic from '@/components/magnetic';
import Link from 'next/link';

const CelestialReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function EntryExperience() {
  const [bootSequenceActive, setBootSequenceActive] = useState(true);
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('kingshadp_booted');
    if (hasBooted) {
      const timeout = setTimeout(() => setBootSequenceActive(false), 0);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('kingshadp_booted', 'true');
    setBootSequenceActive(false);
  };

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    if (bootSequenceActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden'; // Keep body hidden so we only scroll the main container
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [bootSequenceActive]);

  return (
    <>
      {bootSequenceActive && (
        <Bootloader onComplete={handleBootComplete} />
      )}

      <main 
        ref={containerRef}
        className="relative bg-background h-[100svh] w-full overflow-y-auto snap-y snap-mandatory text-foreground font-sans scroll-smooth"
      >
        
        {/* 1. THE SANCTUM (HERO) */}
        <section className="relative snap-start h-[100svh] flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="flex flex-col items-center text-center px-4 w-full"
          >
            <OrbitingSymbol className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-12 md:mt-24">
              <h1 className="font-serif italic font-light text-5xl md:text-8xl tracking-tight mb-6">
                KingShadP
              </h1>
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-foreground/40">
                The Sanctum // Digital Archive
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. THE THRESHOLD */}
        <section className="relative snap-start h-[100svh] flex flex-col items-center justify-center z-20 px-6 bg-background">
          <CelestialReveal delay={0.2} className="text-center flex flex-col items-center w-full max-w-2xl mx-auto">
            
            <div className="w-px h-24 md:h-32 bg-gradient-to-b from-transparent to-foreground/20 mb-12 md:mb-16" />
            
            <h2 className="font-serif italic font-light text-3xl md:text-5xl leading-snug mb-12 md:mb-16 text-foreground/90">
              Emptiness is not a void. <br/> It is a structural force.
            </h2>
            
            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-foreground/40 mb-16 md:mb-24 max-w-sm leading-relaxed">
              Explore the sonic landscapes, future visions, and identity artifacts within the archive.
            </div>
            
            <Magnetic range={100} strength={0.4} scaleStrength={0.02}>
              <Link 
                href="/catalogue" 
                className="inline-flex h-28 w-28 md:h-32 md:w-32 rounded-full border border-foreground/20 items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-700 font-mono text-[9px] tracking-[0.3em] uppercase group relative overflow-hidden"
              >
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-105">ENTER</span>
              </Link>
            </Magnetic>

          </CelestialReveal>
        </section>

      </main>
    </>
  );
}
