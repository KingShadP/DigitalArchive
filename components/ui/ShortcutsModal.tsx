'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Command, Music, Compass, Terminal } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (sectionId: string) => void;
  onTogglePlay?: () => void;
}

interface ShortcutItem {
  key: string;
  desc: string;
  action?: () => void;
  target?: string;
}

interface ShortcutGroup {
  group: string;
  items: ShortcutItem[];
}

export function ShortcutsModal({
  isOpen,
  onClose,
  onNavigateTo,
  onTogglePlay,
}: ShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts: ShortcutGroup[] = [
    {
      group: 'PLAYBACK CONTROLS',
      items: [
        { key: 'SPACE', desc: 'Toggle Play / Pause Master Audio', action: onTogglePlay },
        { key: 'M', desc: 'Mute / Unmute Audio Feed' },
        { key: '← / →', desc: 'Seek Backward / Forward 5s' },
        { key: 'J / L', desc: 'Previous / Next Track in Release' },
      ],
    },
    {
      group: 'NAVIGATION & CHAPTERS',
      items: [
        { key: '1', desc: 'Chapter 00 // Entry Hero Stage', target: 'hero' },
        { key: '2', desc: 'Chapter 01 // Now Playing Orchestration', target: 'now-playing' },
        { key: '3', desc: 'Chapter 02 // The Work Taxonomy', target: 'the-work' },
        { key: '4', desc: 'Chapter 03 // Visual Monoliths', target: 'visual-archive' },
        { key: '5', desc: 'Chapter 04 // The Manifesto', target: 'manifesto' },
        { key: '6', desc: 'Chapter 05 // Archive Index', target: 'archive-index' },
        { key: '7', desc: 'Chapter 06 // Selected Physical Objects', target: 'selected-objects' },
      ],
    },
    {
      group: 'SYSTEM & DISPATCH',
      items: [
        { key: '/', desc: 'Open Master Search Overlay' },
        { key: '?', desc: 'Toggle Shortcuts & Command Guide' },
        { key: 'ESC', desc: 'Close Active Modals or Viewers' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-[#080808] border border-white/15 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#EAEAEA]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#080808]/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Command size={16} className="text-[#B76E79]" />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B76E79] block font-mono">
                SYSTEM CONSOLE
              </span>
              <h3 className="text-sm sm:text-base font-light tracking-[0.2em] uppercase text-white">
                STUDIO KEYBOARD SHORTCUTS
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close shortcuts modal"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Shortcuts Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
          {shortcuts.map((sec, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40 border-b border-white/5 pb-1">
                {sec.group}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sec.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (item.target) {
                        onNavigateTo(item.target);
                        onClose();
                      } else if (item.action) {
                        item.action();
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02] ${
                      item.target || item.action
                        ? 'hover:bg-white/[0.06] hover:border-white/20 cursor-pointer'
                        : ''
                    }`}
                  >
                    <span className="text-xs font-light text-white/80">{item.desc}</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-[10px] font-mono tracking-widest text-white shadow-inner font-semibold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[9px] font-mono text-white/40 uppercase tracking-widest">
          <span>KINGSHADP OPERATING SYSTEM</span>
          <span>PRESS [?] ANYTIME TO TOGGLE</span>
        </div>
      </motion.div>
    </div>
  );
}
