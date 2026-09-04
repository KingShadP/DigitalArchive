'use client';

import React from 'react';
import { X, Command, Sparkles, Terminal, Keyboard } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface SpatialHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpatialHUDModal({ isOpen, onClose }: SpatialHUDModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '1 — 4', action: 'Shift Monolith View', note: 'Obsidian, Solar Glory, Rose Alloy, or Wireframe' },
    { key: 'Space', action: 'Toggle Master Audio', note: 'Initiate or pause sovereign 432 Hz track' },
    { key: 'C', action: 'Frequency Matrix', note: 'Pythagorean 432 Hz vs 440 Hz acoustic calibration' },
    { key: 'S', action: 'Sub-Binaural Hum', note: 'Toggle 28 Hz infrasound grounding drone' },
    { key: '⌘ + K', action: 'Universal Search', note: 'Instant index into tracks, visuals, shop, and archives' },
    { key: 'T', action: 'Transmission Dispatch', note: 'Direct encrypted inquiry to KingShadP Studio' },
    { key: 'Esc', action: 'Close / Surface', note: 'Dismiss active modals or collapse overlays' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spatial-hud-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#050505]/85 backdrop-blur-2xl animate-fade-in"
    >
      <div className="relative w-full max-w-xl rounded-3xl border border-[#F4F1EC]/15 bg-gradient-to-b from-[#111111] via-[#090909] to-[#040404] p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#B76E79]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F4F1EC]/10 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <Keyboard size={13} className="text-[#B76E79]" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
                SPATIAL INTERACTION MATRIX
              </span>
            </div>
            <h2 id="spatial-hud-title" className="text-xl sm:text-2xl font-serif font-light text-[#F4F1EC]">
              Keyboard Telemetry & Shortcuts
            </h2>
            <p className="text-xs font-mono text-[#F4F1EC]/45 mt-1 tracking-wider">
              Autonomous controls for fluid navigation across the Sanctum
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(800, 0.02, 0.02);
              onClose();
            }}
            aria-label="Close HUD shortcuts"
            className="p-2 rounded-full border border-[#F4F1EC]/15 text-[#F4F1EC]/70 hover:text-[#050505] hover:bg-[#F4F1EC] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-2.5 mb-6">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between p-2.5 rounded-xl border border-[#F4F1EC]/5 bg-black/40 hover:border-[#B76E79]/30 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#F4F1EC]">{sc.action}</span>
                <span className="text-[10px] font-mono text-[#F4F1EC]/40 tracking-wide">{sc.note}</span>
              </div>
              <kbd className="px-2.5 py-1 rounded-md bg-[#F4F1EC]/10 border border-[#F4F1EC]/20 text-[#F4F1EC] font-mono text-[10px] tracking-widest uppercase">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#F4F1EC]/10 flex items-center justify-between text-[9px] font-mono text-[#F4F1EC]/40 tracking-wider">
          <span>PRESS [?] AT ANY TIME TO TOGGLE THIS MATRIX</span>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(800, 0.02, 0.02);
              onClose();
            }}
            className="px-3.5 py-1 rounded-full border border-[#F4F1EC]/20 text-[#F4F1EC] hover:bg-[#F4F1EC] hover:text-[#050505] transition-colors uppercase tracking-widest text-[8px]"
          >
            DISMISS
          </button>
        </div>

      </div>
    </div>
  );
}
