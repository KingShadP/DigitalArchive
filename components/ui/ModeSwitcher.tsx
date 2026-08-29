'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Headphones, Eye, Database, Video, ChevronRight } from 'lucide-react';
import { ExperienceMode } from '../../data/scenes';
import { MEDIA_REGISTRY } from '../../data/media';
import { soundEngine } from '../../lib/soundEngine';

interface ModeSwitcherProps {
  currentMode: ExperienceMode;
  onSelectMode: (mode: ExperienceMode) => void;
  activeMediaKey: string;
  onSelectMediaKey: (key: string) => void;
}

export function ModeSwitcher({
  currentMode,
  onSelectMode,
  activeMediaKey,
  onSelectMediaKey,
}: ModeSwitcherProps) {
  const modes: { id: ExperienceMode; label: string; icon: React.ReactNode }[] = [
    { id: 'EXPERIENCE', label: 'CINEMATIC', icon: <Sparkles size={11} /> },
    { id: 'LISTEN', label: 'LISTEN', icon: <Headphones size={11} /> },
    { id: 'VISUAL', label: 'VISUAL', icon: <Eye size={11} /> },
    { id: 'ARCHIVE', label: 'ARCHIVE', icon: <Database size={11} /> },
  ];

  const mediaFeeds = [
    { key: 'scenePrimary', label: 'CAM 01 // SANCTUM' },
    { key: 'portal', label: 'CAM 02 // PORTAL' },
    { key: 'cinematicA', label: 'CAM 03 // GIRAGON' },
    { key: 'cinematicB', label: 'CAM 04 // RESONANCE' },
    { key: 'cinematicC', label: 'CAM 05 // CODEX' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[90] hidden md:flex items-center gap-2 select-none">
      {/* Mode Switcher Liquid Glass Pill */}
      <div className="flex items-center gap-1 liquid-glass rounded-full p-1 border border-white/15 bg-black/60 backdrop-blur-xl shadow-2xl">
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                onSelectMode(m.id);
                soundEngine.playClick(isActive ? 500 : 750, 0.03);
              }}
              data-cursor="MODE"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cinematic Feed Selector Pill */}
      <div className="relative group">
        <button
          data-cursor="CAMERA"
          className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl text-white/60 hover:text-white hover:border-white/30 text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer shadow-2xl"
        >
          <Video size={11} className="text-[#B76E79]" />
          <span>{MEDIA_REGISTRY[activeMediaKey]?.title ? activeMediaKey.toUpperCase() : 'FEED'}</span>
        </button>

        {/* Hover / Dropup Menu */}
        <div className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-white/15 bg-[#080808]/95 backdrop-blur-2xl p-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all shadow-2xl flex flex-col gap-1">
          <span className="text-[8px] font-mono tracking-[0.2em] text-white/40 px-2 py-1 uppercase">
            AMBIENT BACKGROUND FEED
          </span>
          {mediaFeeds.map((feed) => (
            <button
              key={feed.key}
              onClick={() => {
                onSelectMediaKey(feed.key);
                soundEngine.playClick(650, 0.03);
              }}
              className={`text-left px-2.5 py-1.5 rounded-lg text-[9px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center justify-between ${
                activeMediaKey === feed.key
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{feed.label}</span>
              {activeMediaKey === feed.key && <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
