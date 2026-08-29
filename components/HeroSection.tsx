'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { GiragonSculpture } from './GiragonSculpture';
import { X, Sparkles, Shield, Info } from 'lucide-react';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const [activeCenterpiece, setActiveCenterpiece] = useState<'both' | 'sculpture' | 'portrait'>('both');
  const [showSpecModal, setShowSpecModal] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* NAVBAR */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <header className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('services')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Price
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => {
              if (onContactClick) {
                onContactClick();
              } else {
                const btn = document.getElementById('hero-contact-button');
                btn?.click();
              }
            }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Contact
          </button>
        </header>
      </FadeIn>

      {/* HERO HEADING */}
      <div className="w-full overflow-hidden text-center z-0 my-auto sm:my-0 select-none">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5"
          >
            Hi, i&apos;m KingShadP
          </h1>
        </FadeIn>
      </div>

      {/* CENTERPIECE CONTROL PILL (Non-intrusive brand mode toggle) */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <FadeIn delay={0.25} y={-10}>
          <div className="flex items-center gap-1.5 p-1 bg-[#141414]/80 backdrop-blur-md rounded-full border border-[#D7E2EA]/10 shadow-xl">
            <button
              type="button"
              onClick={() => setActiveCenterpiece('both')}
              className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCenterpiece === 'both'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#8A0F19] text-white font-medium shadow'
                  : 'text-[#D7E2EA]/70 hover:text-white'
              }`}
            >
              Unified
            </button>
            <button
              type="button"
              onClick={() => setActiveCenterpiece('sculpture')}
              className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCenterpiece === 'sculpture'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#8A0F19] text-white font-medium shadow'
                  : 'text-[#D7E2EA]/70 hover:text-white'
              }`}
            >
              Giragon Monolith
            </button>
            <button
              type="button"
              onClick={() => setActiveCenterpiece('portrait')}
              className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCenterpiece === 'portrait'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#8A0F19] text-white font-medium shadow'
                  : 'text-[#D7E2EA]/70 hover:text-white'
              }`}
            >
              Creator
            </button>
            <button
              type="button"
              onClick={() => setShowSpecModal(true)}
              title="Giragon Brand Specification"
              className="px-2 py-1 text-xs text-[#D7E2EA]/70 hover:text-[#B76E79] transition-colors rounded-full"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </FadeIn>
      </div>

      {/* GIRAGON SCULPTURAL CENTERPIECE LAYER (Z-INDEX 5 / 15) */}
      <AnimatePresence>
        {(activeCenterpiece === 'both' || activeCenterpiece === 'sculpture') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: activeCenterpiece === 'both' ? 0.75 : 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className={`absolute left-1/2 -translate-x-1/2 pointer-events-auto flex items-center justify-center ${
              activeCenterpiece === 'sculpture'
                ? 'top-1/2 -translate-y-1/2 z-15'
                : 'top-1/2 -translate-y-[52%] sm:-translate-y-[48%] z-5 scale-90 sm:scale-100'
            }`}
          >
            <GiragonSculpture
              size={activeCenterpiece === 'sculpture' ? 'hero' : 'hero'}
              showHalo={true}
              interactive={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO PORTRAIT WITH MAGNET (Z-INDEX 10) */}
      <AnimatePresence>
        {(activeCenterpiece === 'both' || activeCenterpiece === 'portrait') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
          >
            <FadeIn delay={0.4} y={30}>
              <Magnet
                padding={150}
                strength={3}
                activeTransition="transform 0.3s ease-out"
                inactiveTransition="transform 0.6s ease-in-out"
              >
                <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] pointer-events-auto select-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                    alt="KingShadP -- 3D Creator Portrait"
                    className="w-full h-auto object-contain pointer-events-none drop-shadow-2xl"
                    draggable={false}
                  />
                </div>
              </Magnet>
            </FadeIn>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM BAR */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        {/* Left text */}
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col gap-1 max-w-[180px] sm:max-w-[240px] md:max-w-[280px]">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#B76E79] uppercase">
              KingShadP Atelier
            </span>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
              style={{
                fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)',
              }}
            >
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </div>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>

      {/* GIRAGON BRAND SPECIFICATION MODAL */}
      <AnimatePresence>
        {showSpecModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSpecModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#121212] border border-[#B76E79]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A0F19]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-[#D7E2EA]/10">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-[#B76E79]" />
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      THE GIRAGON SPECIFICATION
                    </h3>
                    <p className="text-xs text-[#B76E79] font-medium tracking-wider uppercase">
                      Official KingShadP Brand Symbol
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSpecModal(false)}
                  className="p-1 text-[#D7E2EA]/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6 flex justify-center">
                <div className="w-48 h-48 bg-[#0C0C0C] rounded-xl border border-[#D7E2EA]/10 p-2 flex items-center justify-center">
                  <GiragonSculpture size="md" interactive={false} />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                <div>
                  <h4 className="text-white font-medium mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B76E79]" />
                    Anatomical Rules
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-[#D7E2EA]/70">
                    <li>Elegant giraffe head with refined twin ossicones</li>
                    <li>Elongated, graceful neck with architectural ribbing</li>
                    <li>Exactly two regal wings (one left wing, one right wing)</li>
                    <li>Serpentine curved tail with tapered sculptural finial</li>
                    <li>Restrained halo-crown orbiting behind the head (no excess crowns)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-1">Material & Palette Execution</h4>
                  <p className="text-[#D7E2EA]/70">
                    Fabricated in brushed Rose Gold (<span className="text-[#B76E79] font-mono">#B76E79</span>), Platinum, Oxblood (<span className="text-[#8A0F19] font-mono">#8A0F19</span>), Deep Crimson (<span className="text-[#5E0008] font-mono">#5E0008</span>), and Champagne Metallic accents with zero artificial neon glow.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D7E2EA]/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSpecModal(false)}
                  className="px-5 py-2 text-xs uppercase tracking-wider bg-[#B76E79] hover:bg-[#8A0F19] text-white font-medium rounded-lg transition-colors"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default HeroSection;

