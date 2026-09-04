'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CosmicMonolith } from './CosmicMonolith';
import { soundEngine } from '../../lib/soundEngine';

interface PortalHeroProps {
  onScrollToNodes: () => void;
  onOpenHarmonics?: () => void;
  monolithMode?: number;
  onModeChange?: (idx: number) => void;
}

export function PortalHero({
  onScrollToNodes,
  onOpenHarmonics,
  monolithMode,
  onModeChange,
}: PortalHeroProps) {
  const handleChimeAndScroll = () => {
    try {
      soundEngine.playHarmonicChime(432);
    } catch {
      // Audio fallback safe
    }
    onScrollToNodes();
  };

  return (
    <section 
      id="sanctum-hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center px-6 sm:px-12 md:px-20 pt-36 sm:pt-40 md:pt-44 pb-16 z-20 pointer-events-none select-none"
    >
      {/* 1. Top Architectural Telemetry Line */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between text-[9px] font-mono tracking-[0.3em] uppercase text-[#F4F1EC]/35 pointer-events-auto border-b border-[#F4F1EC]/5 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79] animate-pulse" />
          <span className="text-[#F4F1EC]/80">SANCTUM MMXXVI</span>
          <span className="text-[#B76E79]">{'//'}</span>
          <span>SECTOR 00 : COSMIC VOID</span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span>LAT 34.0522° N // LONG 118.2437° W</span>
          <span className="text-[#B76E79]">•</span>
          {onOpenHarmonics ? (
            <button
              type="button"
              onClick={() => {
                soundEngine.playHarmonicChime(432);
                onOpenHarmonics();
              }}
              className="text-[#B76E79] hover:text-[#F4F1EC] transition-colors cursor-pointer"
            >
              CALIBRATION: 432.08 HZ ↗
            </button>
          ) : (
            <span className="text-[#B76E79]">CALIBRATION: 432.08 HZ</span>
          )}
        </div>
      </motion.div>

      {/* 2. Expansive Central Monolith & Cosmic Horizon Composition */}
      <div className="w-full max-w-6xl mx-auto my-auto flex flex-col items-center justify-center pointer-events-auto py-8 sm:py-12">
        {/* The Cosmic Monolith: Single powerful centerpiece with subtle cosmic rotation & perspective tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative w-full flex items-center justify-center mb-6 sm:mb-8"
        >
          <CosmicMonolith 
            externalMode={monolithMode}
            onModeChange={onModeChange}
            onInteract={() => {}} 
          />
        </motion.div>

        {/* Minimal, Impactful Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          {/* Monumental Brand Titling */}
          <h1 
            className="font-serif font-light text-[#F4F1EC] uppercase leading-none tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.34em] transition-all duration-700"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 6.2rem)' }}
          >
            KINGSHADP
          </h1>

          {/* Minimalist Command Maxim */}
          <div className="flex items-center gap-4 mt-3 sm:mt-5">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B76E79]/60" />
            <p className="font-serif italic text-sm sm:text-lg md:text-xl text-[#B76E79] tracking-[0.2em] font-light">
              Everything I Make Leaves Evidence.
            </p>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B76E79]/60" />
          </div>

          {/* Quiet Sub-Aesthetic Notation */}
          <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.35em] text-[#F4F1EC]/30 mt-4 sm:mt-5 max-w-lg leading-relaxed">
            Architectural Soundscapes // Subtractive Form // Permanent Archive
          </p>
        </motion.div>
      </div>

      {/* 3. Bottom Architectural Traverse Indicator & Crosshairs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.1 }}
        className="w-full max-w-7xl mx-auto flex items-end justify-between pointer-events-auto border-t border-[#F4F1EC]/5 pt-6"
      >
        {/* Left Cardinal Corner Crosshair */}
        <div className="hidden md:flex flex-col text-[8px] font-mono tracking-[0.3em] uppercase text-[#F4F1EC]/25">
          <span>+ [COSMIC HORIZON : 00]</span>
          <span className="text-[#B76E79]/40 mt-1">PYTHAGOREAN HARMONIC TENSION</span>
        </div>

        {/* Center Minimalist Descent Prompt */}
        <button
          type="button"
          id="hero-descend-trigger"
          onClick={handleChimeAndScroll}
          className="group mx-auto flex flex-col items-center gap-3 text-[9px] font-mono tracking-[0.35em] text-[#F4F1EC]/40 hover:text-[#F4F1EC] transition-all duration-500 uppercase cursor-pointer"
        >
          <span className="group-hover:tracking-[0.45em] transition-all duration-500 text-[8px] sm:text-[9px]">
            DESCEND INTO SANCTUM
          </span>
          <div className="relative w-[1px] h-9 bg-[#F4F1EC]/15 overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#B76E79] to-transparent animate-pulse" 
            />
          </div>
        </button>

        {/* Right Cardinal Corner Crosshair */}
        <div className="hidden md:flex flex-col text-right text-[8px] font-mono tracking-[0.3em] uppercase text-[#F4F1EC]/25">
          <span>+ [VAULT INTEGRITY : LOSSLESS]</span>
          <span className="text-[#F4F1EC]/35 mt-1">LOS ANGELES // TOKYO // VOID</span>
        </div>
      </motion.div>
    </section>
  );
}
