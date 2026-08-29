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
      tag: 'Sanctum Codex Vol 01',
      era: '2026 ARCHIVE',
      headline: 'Everything I Make',
      headlineAccent: 'Leaves Evidence.',
      description:
        'Music, imagery, memory and creation assembled into one evolving body of work. Enter the current KingShadP universe.',
      primaryLabel: 'LISTEN NOW',
      secondaryLabel: 'ENTER THE ARCHIVE →',
      videoKey: 'scenePrimary',
    },
    NEW_RELEASE: {
      tag: 'Current Master // Opus 01',
      era: '432 HZ MASTER',
      headline: 'Behold the',
      headlineAccent: 'Twisted Beast.',
      description:
        'Constructed around a deep 28Hz fundamental drone overlaid with staccato brass harmonics and vacuum decay intervals.',
      primaryLabel: 'PLAY MASTER TRACK',
      secondaryLabel: 'SCORE NOTES →',
      videoKey: 'cinematicB',
    },
    PREMIERE: {
      tag: 'Spatial Monolith // Sculpture',
      era: 'VISUAL KEYFRAME',
      headline: 'The Giragon',
      headlineAccent: 'Sovereign Form.',
      description:
        'A spatial maquette exploration engineered with matte obsidian and rose gold trim, capturing sovereign cadence.',
      primaryLabel: 'VIEW MONOLITH',
      secondaryLabel: 'EXPLORE VISUALS →',
      videoKey: 'cinematicA',
    },
    CAMPAIGN: {
      tag: 'Archival Dossier // MMXXVI',
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
      className="relative w-full h-[100dvh] min-h-[640px] max-h-[1400px] select-none flex flex-col justify-between overflow-hidden"
    >
      {/* Warm Gradient Atmosphere Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#f8f7f4]/20 via-[#f8f7f4]/60 to-[#f8f7f4]" />

      {/* Top Space Reservation for Fixed Nav */}
      <div className="relative z-20 w-full pt-20 sm:pt-24" />

      {/* Main Lower-Left Architectural Composition */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-14 sm:pb-20 flex flex-col justify-end">
        <div className="max-w-3xl flex flex-col gap-5 sm:gap-6">
          
          {/* Micro Brand Signal & Monogram + Hero State Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#1a1a1a]/70 font-semibold">
              {currentConfig.tag}
            </span>
            <div className="w-6 h-[1px] bg-[#1a1a1a]/20 hidden sm:block" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#B76E79] font-bold uppercase">
              {currentConfig.era}
            </span>

            {/* Quick Hero State Selectors */}
            <div className="hidden lg:flex items-center gap-1 ml-auto bg-white/80 backdrop-blur-md p-1 rounded-full border border-[#1a1a1a]/10 shadow-sm">
              {(['DEFAULT', 'NEW_RELEASE', 'PREMIERE', 'CAMPAIGN'] as HeroModeState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStateChange(st)}
                  className={`px-2.5 py-0.5 rounded-full text-[8px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                    heroState === st
                      ? 'bg-[#1a1a1a] text-[#f8f7f4] font-bold'
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
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
                className="text-[#1a1a1a] font-light tracking-[-0.04em] leading-[0.9] select-none"
                style={{ fontSize: 'clamp(3.5rem, 7.5vw, 8rem)' }}
              >
                <span>{currentConfig.headline}</span>
                {currentConfig.headlineAccent && (
                  <span className="block font-editorial italic text-[#1a1a1a] mt-1 font-light">
                    {currentConfig.headlineAccent}
                  </span>
                )}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Supporting Statement */}
          <p
            className="text-sm sm:text-base md:text-lg font-light tracking-wide text-[#1a1a1a]/80 max-w-xl leading-relaxed"
          >
            {currentConfig.description}
          </p>

          {/* Primary Solid Pill Action + Secondary Ghost Treatment */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3"
          >
            {/* Primary Solid Pill */}
            <button
              onClick={onListenNow}
              data-cursor="PLAY"
              className="btn-pill btn-pill-primary text-[10px] tracking-[0.2em] shadow-lg cursor-pointer"
            >
              <Play size={12} className="fill-current" />
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
              className="btn-pill text-[10px] tracking-[0.2em] border-[#1a1a1a]/30 hover:border-[#1a1a1a] cursor-pointer"
            >
              <span>{currentConfig.secondaryLabel}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Downward Scroll Cue */}
      <div
        onClick={onListenNow}
        className="relative z-20 pb-4 mx-auto flex flex-col items-center gap-1 text-[8px] font-mono tracking-[0.3em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors cursor-pointer"
      >
        <span>DESCEND</span>
        <ChevronDown size={12} className="animate-bounce" />
      </div>
    </section>
  );

}
