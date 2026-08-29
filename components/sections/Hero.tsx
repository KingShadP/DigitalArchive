'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, ChevronDown, Sparkles, Disc, Film } from 'lucide-react';
import { heroScenes, HeroScene } from '../../data/heroScenes';
import { MEDIA } from '../../data/media';

interface HeroProps {
  onListenNow: () => void;
  onEnterArchive: () => void;
  onExploreWork: () => void;
  onSwitchSceneVideo?: (videoKey: string) => void;
}

type HeroModeState = 'DEFAULT' | 'NEW_RELEASE' | 'PREMIERE' | 'CAMPAIGN';

export function Hero({
  onListenNow,
  onEnterArchive,
  onExploreWork,
  onSwitchSceneVideo,
}: HeroProps) {
  const [heroState, setHeroState] = useState<HeroModeState>('DEFAULT');

  const heroConfigs = {
    DEFAULT: {
      tag: 'KINGSHADP // SANCTUM COMPOSITION',
      era: '2026 CODEX',
      headline: 'Everything I Make',
      headlineAccent: 'Leaves Evidence.',
      description:
        'Music, imagery, memory and creation assembled into one evolving body of work. Enter the current KingShadP universe.',
      primaryLabel: 'LISTEN NOW',
      secondaryLabel: 'ENTER THE ARCHIVE →',
      videoKey: 'scenePrimary',
    },
    NEW_RELEASE: {
      tag: 'CURRENT RELEASE // OPUS 01',
      era: '432 HZ MASTER',
      headline: 'Behold the',
      headlineAccent: 'Twisted Beast.',
      description:
        'Constructed around a deep 28Hz fundamental drone overlaid with staccato brass harmonics and vacuum decay intervals.',
      primaryLabel: 'PLAY MASTER TRACK',
      secondaryLabel: 'VIEW SCORE NOTES →',
      videoKey: 'cinematicB',
    },
    PREMIERE: {
      tag: 'CINEMATIC STILL // RAYTRACED',
      era: 'OBSIDIAN SPATIAL',
      headline: 'Giragon Sculpture',
      headlineAccent: 'Spatial Monolith.',
      description:
        'A spatial maquette exploration engineered with matte obsidian and rose gold trim, capturing sovereign cadence.',
      primaryLabel: 'VIEW MONOLITH',
      secondaryLabel: 'EXPLORE VISUALS →',
      videoKey: 'cinematicA',
    },
    CAMPAIGN: {
      tag: 'ARCHIVAL DOSSIER // MMXXVI',
      era: 'PERMANENT RECORD',
      headline: 'Subtractive Architecture',
      headlineAccent: 'And Negative Space.',
      description:
        'Investigating the threshold where physical structure dissolves into acoustic frequencies and infinite vacuum.',
      primaryLabel: 'OPEN DOSSIER',
      secondaryLabel: 'ACCESS CODEX →',
      videoKey: 'portal',
    },
  };

  const currentConfig = heroConfigs[heroState];

  const handleStateChange = (state: HeroModeState) => {
    setHeroState(state);
    onSwitchSceneVideo?.(heroConfigs[state].videoKey);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[640px] max-h-[1400px] select-none flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Top Space Reservation for Fixed Nav */}
      <div className="relative z-20 w-full pt-20 sm:pt-24" />

      {/* Main Lower-Left Architectural Composition */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-14 sm:pb-18 flex flex-col justify-end">
        <div className="max-w-3xl flex flex-col gap-5 sm:gap-6">
          
          {/* Micro Brand Signal & Monogram + Hero State Pills */}
          <div className="flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: '150ms' }}>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/60">
              {currentConfig.tag}
            </span>
            <div className="w-6 h-[1px] bg-white/20 hidden sm:block" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#B76E79] uppercase">
              {currentConfig.era}
            </span>

            {/* Quick Hero State Selectors */}
            <div className="hidden lg:flex items-center gap-1 ml-auto bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/10">
              {(['DEFAULT', 'NEW_RELEASE', 'PREMIERE', 'CAMPAIGN'] as HeroModeState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStateChange(st)}
                  className={`px-2.5 py-0.5 rounded-full text-[8px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                    heroState === st
                      ? 'bg-white text-black font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Master Headline (Display Scale + Editorial Italic Accent) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={heroState}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              <h1
                className="text-[#F4F1EC] font-light tracking-[-0.045em] leading-[0.88] select-none"
                style={{ fontSize: 'clamp(3rem, 6.8vw, 7.2rem)' }}
              >
                <span>{currentConfig.headline}</span>
                {currentConfig.headlineAccent && (
                  <span className="block font-editorial italic text-white/95 mt-1 font-normal">
                    {currentConfig.headlineAccent}
                  </span>
                )}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Supporting Statement (Restrained under 2 lines) */}
          <p
            className="text-xs sm:text-sm md:text-base font-light tracking-wide text-white/70 max-w-xl leading-relaxed animate-rise"
            style={{ animationDelay: '320ms' }}
          >
            {currentConfig.description}
          </p>

          {/* Primary Solid Pill Action + Secondary Ghost Treatment */}
          <div
            className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2 animate-rise"
            style={{ animationDelay: '400ms' }}
          >
            {/* Primary Solid Pill */}
            <button
              onClick={onListenNow}
              data-cursor="PLAY"
              className="px-7 py-3.5 rounded-full bg-[#F4F1EC] text-[#050505] text-[11px] font-mono font-bold tracking-[0.22em] uppercase hover:bg-white hover:scale-[1.02] transition-all flex items-center gap-2 shadow-2xl cursor-pointer"
            >
              <Play size={13} className="fill-current" />
              <span>{currentConfig.primaryLabel}</span>
            </button>

            {/* Secondary Quiet Ghost Link */}
            <button
              onClick={() => {
                if (heroState === 'PREMIERE') {
                  onExploreWork();
                } else {
                  onEnterArchive();
                }
              }}
              data-cursor="ARCHIVE"
              className="text-[11px] font-mono tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer group"
            >
              <span>{currentConfig.secondaryLabel}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Downward Scroll Cue */}
      <div
        onClick={onListenNow}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[8px] font-mono tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors cursor-pointer"
      >
        <span>DESCEND</span>
        <ChevronDown size={12} className="animate-bounce" />
      </div>
    </section>
  );
}
