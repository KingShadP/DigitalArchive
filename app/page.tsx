'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Play, Volume2, ArrowRight } from 'lucide-react';
import { useAudio } from '@/components/audio-provider';
import { Bootloader } from '@/components/bootloader';
import ArtDirectionShowcase from '@/components/art-direction-showcase';
import Magnetic from '@/components/magnetic';
import { ARTIFACTS } from '@/lib/data';
import { 
  PageContainer, Grid, Surface, 
  Heading, Text, MonoLabel, SystemImage, Link
} from '@/components/system';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const featuredBrandObjects = ARTIFACTS.filter((artifact) => artifact.id !== 'behold-what-wouldnt-fit').slice(0, 3);

  // Lock scroll during boot
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

      <main className="relative min-h-screen">
        
        {/* 1. IDENTITY SIGNAL (HERO) */}
        <section id="identity" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Subtle noise/grid background overlay */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1.5px)] [background-size:64px_64px]" />
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] [background-size:100%_4px]" />

          <motion.div 
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="text-center z-10 px-6 max-w-4xl mx-auto flex flex-col items-center"
          >
            <MonoLabel className="mb-6 block animate-pulse text-accent">{"// SIGNAL DETECTED"}</MonoLabel>
            <Heading variant="display" className="text-5xl md:text-8xl lg:text-9xl mb-8 tracking-tighter">
              KingShadP
            </Heading>
            <Text variant="lead" className="max-w-2xl mx-auto mb-12 mix-blend-difference">
              The creative universe, archive, and brand identity of an architectural cosmism.
            </Text>
            
            <Magnetic range={120} strength={0.4} scaleStrength={0.08}>
              <button 
                onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-mono text-[9px] tracking-widest uppercase text-foreground border border-border px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500 rounded-full flex items-center gap-3"
              >
                Initiate Sequence <ArrowRight size={12} />
              </button>
            </Magnetic>
          </motion.div>

          <div className="absolute bottom-12 left-12 hidden md:block">
            <MonoLabel>ARCHIVE_VER: 4.1.9</MonoLabel>
          </div>
          <div className="absolute bottom-12 right-12 hidden md:block text-right">
            <MonoLabel>LAT: 34.0522° N</MonoLabel>
            <MonoLabel>LONG: 118.2437° W</MonoLabel>
          </div>
        </section>

        {/* 2. AUDIO HUB / FEATURED MUSIC */}
        <section id="music" className="py-32 md:py-48 px-6 md:px-12 relative border-t border-border bg-surface-dim">
          <PageContainer>
            <Grid columns={12} gap="lg" className="items-center">
              <div className="col-span-12 md:col-span-6 lg:col-span-5 order-2 md:order-1">
                <FadeIn>
                  <MonoLabel className="text-accent mb-6 block">01 / SONIC FREQUENCY</MonoLabel>
                  <Heading className="mb-6">Sound as Architecture</Heading>
                  <Text className="mb-10 max-w-md text-neutral-400">
                    Sound acts as an invisible landscape. In the world of KingShadP, apparel artifacts are paired directly with custom frequencies. Activate the sub-harmonic frequency channel to hear the planetary loop tracker.
                  </Text>
                  
                  <Magnetic range={100} strength={0.5} scaleStrength={0.1}>
                    <button 
                      onClick={toggleAudio}
                      className={`h-24 w-24 rounded-full border flex items-center justify-center transition-all duration-700 pointer-events-auto cursor-pointer ${
                        audioActive 
                          ? 'border-foreground bg-foreground text-background shadow-[0_0_40px_rgba(255,255,255,0.15)] font-bold' 
                          : 'border-border text-foreground hover:border-foreground/50 hover:bg-surface-hover'
                      }`}
                    >
                      {audioActive ? (
                        <Volume2 className="w-8 h-8 animate-pulse text-background" />
                      ) : (
                        <Play className="w-8 h-8 ml-1 text-foreground" />
                      )}
                    </button>
                  </Magnetic>
                  <MonoLabel className="mt-6 block opacity-60">
                    {audioActive ? 'FREQUENCY LOCK: ACTIVE (48Hz)' : 'STATUS: INERT'}
                  </MonoLabel>
                  <div className="mt-12">
                    <a href="/music" className="inline-flex items-center gap-4 font-mono text-[9px] tracking-widest uppercase text-foreground border border-border px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500 rounded-full">
                      ENTER SONIC VAULT
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </FadeIn>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-7 order-1 md:order-2 mb-12 md:mb-0">
                <FadeIn delay={0.2} className="relative aspect-square md:aspect-video w-full rounded-sm overflow-hidden group">
                  <SystemImage 
                    src="https://picsum.photos/seed/soundscape/1200/800?grayscale"
                    alt="Acoustic landscape"
                    fill
                    className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-1000 mix-blend-luminosity"
                  />
                  {audioActive && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-[1px] bg-accent/30 absolute top-1/2 left-0" />
                      <motion.div 
                        animate={{ 
                          scaleY: [0.1, 1.2, 0.1, 1.5, 0.2],
                          opacity: [0.2, 0.8, 0.3, 0.9, 0.2]
                        }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                        className="w-full h-12 bg-gradient-to-r from-transparent via-accent/20 to-transparent absolute top-[calc(50%-24px)]"
                      />
                    </div>
                  )}
                </FadeIn>
              </div>
            </Grid>
          </PageContainer>
        </section>

        {/* 3. VISUAL WORK / BRAND IDENTITY */}
        <section id="visual" className="py-32 md:py-48 px-6 md:px-12 relative border-t border-border">
          <PageContainer>
            <div className="max-w-3xl mb-24">
              <FadeIn>
                <MonoLabel className="text-accent mb-6 block">02 / STRUCTURAL VISION</MonoLabel>
                <Heading variant="display" className="mb-6">Reconstructing Identity</Heading>
                <Text variant="lead">
                  KingShadP is more than garments. It is an exploration of space, deep-space distance, and structural command.
                </Text>
              </FadeIn>
            </div>

            <Grid columns={12} gap="lg" className="items-stretch">
              <div className="col-span-12 md:col-span-7">
                <FadeIn delay={0.1} className="h-full">
                  <Surface variant="primary" className="h-full flex flex-col justify-end p-8 md:p-12 min-h-[500px] relative group overflow-hidden border-border/50">
                    <SystemImage 
                      src="https://picsum.photos/seed/structure2/1000/1000?grayscale"
                      alt="Structural aesthetic"
                      fill
                      className="object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-40 transition-all duration-[2000ms]"
                    />
                    <div className="relative z-10">
                      <MonoLabel className="mb-4">RULE_01 // NEGATIVE SPACE</MonoLabel>
                      <Heading className="text-2xl mb-4">Architectural Cosmism</Heading>
                      <Text className="max-w-md">
                        Instead of obvious galaxy photos, we rely on shadows, micro-grid coordinates, and heavy-contrast visual frames reminiscent of spacecraft cockpits and structural vaults.
                      </Text>
                    </div>
                  </Surface>
                </FadeIn>
              </div>

              <div className="col-span-12 md:col-span-5 flex flex-col gap-6 lg:gap-8">
                <FadeIn delay={0.2} className="flex-1">
                  <Surface variant="secondary" className="h-full p-8 md:p-12 flex flex-col justify-between">
                    <MonoLabel className="opacity-50">RULE_02 // MATERIALS</MonoLabel>
                    <div className="mt-12">
                      <Heading className="text-xl mb-3">Artifact Finishes</Heading>
                      <Text variant="muted">
                        Colors are strictly restricted to space black, lunar grey, and stellar white. Heavy cottons and raw carbon filaments.
                      </Text>
                    </div>
                  </Surface>
                </FadeIn>
                <FadeIn delay={0.3} className="flex-1">
                  <Surface variant="secondary" className="h-full p-8 md:p-12 flex flex-col justify-between">
                    <MonoLabel className="opacity-50">RULE_03 // SCALE</MonoLabel>
                    <div className="mt-12">
                      <Heading className="text-xl mb-3">Void Engineering</Heading>
                      <Text variant="muted">
                        Weight is created where we choose not to construct. Empty space must occupy 60% of all visual matrices.
                      </Text>
                    </div>
                  </Surface>
                </FadeIn>
              </div>
            </Grid>
          </PageContainer>
        </section>

        {/* 4. DIGITAL EXPERIMENTS (Art Showcase) */}
        <section id="digital" className="py-32 md:py-48 px-6 md:px-12 relative border-t border-border bg-surface-dim">
          <PageContainer className="max-w-[1400px]">
            <FadeIn>
              <MonoLabel className="text-accent mb-6 block">03 / DIGITAL EXPERIMENTS</MonoLabel>
              <Heading className="mb-16">Interface Art Direction</Heading>
            </FadeIn>
            <FadeIn delay={0.2}>
              <ArtDirectionShowcase />
            </FadeIn>
          </PageContainer>
        </section>

        {/* 5. ARCHIVE GATEWAY */}
        <section id="archive" className="py-32 md:py-48 px-6 md:px-12 relative border-t border-border overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#111111_0%,_transparent_50%)] opacity-40 pointer-events-none" />
          
          <PageContainer>
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <MonoLabel className="text-accent mb-6 block">04 / THE VAULT</MonoLabel>
                <Heading variant="display" className="mb-8">Access The Archive</Heading>
                <Text variant="lead" className="max-w-2xl mx-auto mb-16">
                  A comprehensive record of the digital and physical manifestations of the KingShadP universe.
                </Text>
                
                <Magnetic range={150} strength={0.4} scaleStrength={0.05}>
                  <Link 
                    href="/archive" 
                    className="inline-flex h-32 w-32 rounded-full border border-border items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-500 font-mono text-[10px] tracking-widest uppercase group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex flex-col items-center gap-2">
                      Enter
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Magnetic>
              </FadeIn>
            </div>
          </PageContainer>
        </section>

        {/* 6. BRAND / OBJECTS */}
        <section id="brand" className="py-32 md:py-40 px-6 md:px-12 border-t border-border bg-surface-dim">
          <PageContainer>
            <FadeIn>
              <MonoLabel className="text-accent mb-6 block">05 / BRAND OBJECTS</MonoLabel>
              <Heading className="mb-6">Physical Systems in Orbit</Heading>
              <Text className="max-w-2xl mb-14">
                Select archive artifacts where apparel, telemetry, and identity meet in public space.
              </Text>
            </FadeIn>

            <Grid columns={3} gap="md" className="items-stretch">
              {featuredBrandObjects.map((artifact, index) => (
                <FadeIn key={artifact.id} delay={0.1 + (index * 0.08)} className="h-full">
                  <Link href={`/archive/${artifact.id}`} className="block h-full">
                    <Surface variant="secondary" interactive className="h-full p-6 md:p-8 flex flex-col">
                      <MonoLabel className="text-accent mb-5">{artifact.entry}</MonoLabel>
                      <Heading variant="serif-italic" className="text-2xl mb-4">{artifact.title}</Heading>
                      <Text variant="muted" className="mb-8">{artifact.description}</Text>
                      <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                        <MonoLabel>{artifact.status}</MonoLabel>
                        <MonoLabel className="text-foreground">ACCESS</MonoLabel>
                      </div>
                    </Surface>
                  </Link>
                </FadeIn>
              ))}
            </Grid>
          </PageContainer>
        </section>

      </main>
    </>
  );
}
