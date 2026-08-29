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
        className="relative z-10 w-full max-w-2xl bg-white border border-[#1a1a1a]/15 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#1a1a1a]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#1a1a1a]/10 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Command size={16} className="text-[#B76E79]" />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B76E79] block font-mono font-bold">
                SYSTEM CONSOLE
              </span>
              <h3 className="text-base font-serif tracking-wide text-[#1a1a1a]">
                Studio Keyboard Shortcuts
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close shortcuts modal"
            className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Shortcuts Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
          {shortcuts.map((sec, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#1a1a1a]/40 border-b border-[#1a1a1a]/5 pb-1 font-bold">
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
                    className={`flex items-center justify-between p-2.5 rounded-xl border border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.02] ${
                      item.target || item.action
                        ? 'hover:bg-[#1a1a1a]/[0.06] hover:border-[#1a1a1a]/20 cursor-pointer'
                        : ''
                    }`}
                  >
                    <span className="text-xs font-light text-[#1a1a1a]/80">{item.desc}</span>
                    <kbd className="px-2 py-1 rounded bg-[#1a1a1a]/10 border border-[#1a1a1a]/20 text-[10px] font-mono tracking-widest text-[#1a1a1a] shadow-inner font-semibold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.02] flex items-center justify-between text-[9px] font-mono text-[#1a1a1a]/50 uppercase tracking-widest">
          <span>KINGSHADP ARCHIVE SUITE</span>
          <span>PRESS [?] TO TOGGLE</span>
        </div>
      </motion.div>
    </div>
  );
}
