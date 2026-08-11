'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Volume2, ArrowRight } from 'lucide-react';
import { useAudio } from '@/components/audio-provider';
import { Bootloader } from '@/components/bootloader';
import { OrbitingSymbol } from '@/components/orbiting-symbol';
import { SymbolAlignment, SymbolLens, SymbolSignal, SymbolVoid, SymbolHorizon } from '@/components/sanctum-symbols';
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
  const { audioActive, toggleAudio } = useAudio();
  const { scrollYProgress } = useScroll();

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

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    if (bootSequenceActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [bootSequenceActive]);

  return (
    <>
      {bootSequenceActive && (
        <Bootloader onComplete={handleBootComplete} />
      )}

      <main className="relative bg-background min-h-[500vh] text-foreground font-sans">
        
        {/* Deep Space Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,_black_20%,_transparent_70%)]" />
        </div>

        {/* 1. THE SANCTUM (HERO) */}
        <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="flex flex-col items-center justify-center w-full pointer-events-auto"
          >
            <OrbitingSymbol />
            
            <div className="mt-20 text-center flex flex-col items-center space-y-6">
              <h1 className="font-serif italic font-light text-5xl md:text-7xl tracking-widest text-foreground">
                KingShadP
              </h1>
              <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40">
                The Sanctum // A Cosmic Archive
              </div>
            </div>
          </motion.div>
        </section>

        {/* SPATIAL SEPARATOR */}
        <div className="h-screen" />

        {/* 2. SYMBOLIC LEXICON */}
        <section className="relative min-h-[120vh] flex items-center justify-center z-20 px-6 py-32 bg-background border-t border-border">
          <div className="max-w-6xl w-full mx-auto">
            <CelestialReveal className="text-center mb-24 flex flex-col items-center">
              <div className="w-px h-24 bg-gradient-to-b from-transparent to-foreground/20 mb-12" />
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-8">
                01 // The Symbolic System
              </div>
              <h2 className="font-serif font-light text-3xl md:text-5xl leading-relaxed text-foreground/90 max-w-2xl">
                A language of abstract, cosmic phenomena rather than literal artifacts.
              </h2>
            </CelestialReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 lg:gap-8">
              {[
                { 
                  Icon: SymbolAlignment, 
                  title: "Celestial Alignment", 
                  desc: "The rare convergence of sound and form, creating momentary perfection." 
                },
                { 
                  Icon: SymbolLens, 
                  title: "Gravitational Lens", 
                  desc: "Distortion of perception. How reality bends around intense creativity." 
                },
                { 
                  Icon: SymbolSignal, 
                  title: "Silent Signal", 
                  desc: "The invisible frequencies of ambient architecture. What is felt, not seen." 
                },
                { 
                  Icon: SymbolVoid, 
                  title: "Void Gate", 
                  desc: "The threshold between the physical world and the digital cosmic archive." 
                },
                { 
                  Icon: SymbolHorizon, 
                  title: "Event Horizon", 
                  desc: "The boundary of the known narrative. The point of no return in art." 
                }
              ].map((item, idx) => (
                <CelestialReveal key={idx} delay={0.1 * idx} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 mb-8 text-foreground/30 group-hover:text-foreground/80 transition-colors duration-1000">
                    <item.Icon className="w-full h-full" />
                  </div>
                  <h3 className="font-serif italic text-lg text-foreground mb-4">{item.title}</h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 leading-relaxed">
                    {item.desc}
                  </p>
                </CelestialReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. STORYTELLING RULES */}
        <section className="relative min-h-[100vh] flex flex-col justify-center z-20 px-6 py-32 bg-surface">
          <div className="max-w-4xl mx-auto w-full">
            <CelestialReveal>
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-12">
                02 // Storytelling Guidelines
              </div>
              <h2 className="font-serif italic font-light text-4xl md:text-5xl leading-snug mb-16 text-foreground">
                The Architecture of the Unknown
              </h2>
            </CelestialReveal>

            <div className="space-y-12">
              <CelestialReveal delay={0.1} className="border-t border-border pt-8">
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    Rule // 01
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl text-foreground mb-4">The Weight of Absence</h3>
                    <p className="font-sans text-sm leading-relaxed text-foreground/60">
                      Negative space dictates meaning. Emptiness, silence, and absence in design are not voids—they are gravitational forces. We speak volumes through what we choose not to construct.
                    </p>
                  </div>
                </div>
              </CelestialReveal>

              <CelestialReveal delay={0.2} className="border-t border-border pt-8">
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    Rule // 02
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl text-foreground mb-4">Suggestion Over Declaration</h3>
                    <p className="font-sans text-sm leading-relaxed text-foreground/60">
                      Never overtly explain the lore. Encourage interpretation and hint at a larger mythology. The cosmic archive exists to be explored, not summarized.
                    </p>
                  </div>
                </div>
              </CelestialReveal>

              <CelestialReveal delay={0.3} className="border-t border-border pt-8">
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    Rule // 03
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl text-foreground mb-4">Gravitational Pacing</h3>
                    <p className="font-sans text-sm leading-relaxed text-foreground/60">
                      Visual movement must feel heavy, deliberate, and vast. No rapid animations or jittery effects. Interactions should mirror the slow orbit of celestial bodies.
                    </p>
                  </div>
                </div>
              </CelestialReveal>
            </div>
          </div>
        </section>

        {/* 4. ATMOSPHERIC FREQUENCY */}
        <section className="relative min-h-[120vh] flex items-center justify-center z-20 px-6 bg-background border-t border-border">
          <CelestialReveal className="max-w-2xl text-center flex flex-col items-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-12">
              03 // Sonic Frequency
            </div>
            
            <h2 className="font-serif font-light text-3xl md:text-4xl leading-relaxed mb-12 text-foreground/90">
              Sound acting as an invisible landscape within the archive.
            </h2>
            
            <Magnetic range={100} strength={0.5} scaleStrength={0.1}>
              <button 
                onClick={toggleAudio}
                className={`h-20 w-20 md:h-24 md:w-24 rounded-full border flex items-center justify-center transition-all duration-1000 ${
                  audioActive 
                    ? 'border-foreground bg-foreground text-background shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                    : 'border-foreground/20 text-foreground hover:border-foreground/50'
                }`}
              >
                {audioActive ? (
                  <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
                ) : (
                  <Play className="w-6 h-6 md:w-8 md:h-8 ml-1" />
                )}
              </button>
            </Magnetic>
            
            <div className="font-mono text-[8px] uppercase tracking-widest mt-8 text-foreground/40">
              {audioActive ? 'FREQUENCY LOCK: ACTIVE' : 'STATUS: INERT'}
            </div>
          </CelestialReveal>
        </section>

        {/* 5. THE VERIFIED CHRONICLE (CATALOGUE) */}
        <section className="relative min-h-[120vh] flex flex-col items-center justify-center z-20 px-6 bg-surface border-t border-border">
          <CelestialReveal className="text-center flex flex-col items-center">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-foreground/20 mb-12" />
            
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-8">
              04 // The Verified Chronicle
            </div>
            
            <h2 className="font-serif font-light text-2xl md:text-4xl leading-relaxed mb-16 text-foreground/80 max-w-2xl">
              A record of sonic landscapes, future visions, and identity artifacts.
            </h2>
            
            <Link 
              href="/catalogue" 
              className="group flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-500"
            >
              <span className="w-12 h-px bg-foreground/20 group-hover:w-24 group-hover:bg-foreground transition-all duration-700" />
              <span>Explore Dossier</span>
              <span className="w-12 h-px bg-foreground/20 group-hover:w-24 group-hover:bg-foreground transition-all duration-700" />
            </Link>
          </CelestialReveal>
        </section>

        {/* 6. THE VAULT */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center z-20 px-6 pb-32 bg-background border-t border-border">
          <CelestialReveal delay={0.2} className="text-center flex flex-col items-center">
            <div className="w-16 h-16 border border-foreground/10 rotate-45 mb-16 flex items-center justify-center">
              <div className="w-2 h-2 bg-foreground/30 rounded-full" />
            </div>
            
            <h2 className="font-serif italic font-light text-5xl md:text-7xl mb-16 text-foreground">
              Enter The Sanctum
            </h2>
            
            <Magnetic range={120} strength={0.3} scaleStrength={0.02}>
              <Link 
                href="/archive" 
                className="inline-flex h-32 w-32 rounded-full border border-foreground/20 items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-700 font-mono text-[9px] tracking-[0.3em] uppercase group relative overflow-hidden"
              >
                <span className="relative z-10">Access</span>
              </Link>
            </Magnetic>
          </CelestialReveal>
        </section>

      </main>
    </>
  );
}

