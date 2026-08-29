'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ArrowRight, Search, Compass, Disc } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (sectionId: string) => void;
  onOpenSearch: () => void;
  onListenNow: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  onNavigateTo,
  onOpenSearch,
  onListenNow,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const navLinks = [
    { label: 'MUSIC', target: 'now-playing', num: '01' },
    { label: 'VISUALS', target: 'the-work', num: '02' },
    { label: 'ARCHIVE', target: 'archive-index', num: '03' },
    { label: 'STORY', target: 'manifesto', num: '04' },
    { label: 'SHOP', target: 'selected-objects', num: '05' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] bg-[#f8f7f4]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 select-none text-[#1a1a1a]"
          style={{
            paddingTop: 'max(2rem, env(safe-area-inset-top))',
            paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
                NAVIGATION
              </span>
              <span className="text-[9px] font-mono text-[#1a1a1a]/40">{'//'} KINGSHADP</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/80 hover:text-[#1a1a1a]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Staggered Navigation Items */}
          <nav className="flex flex-col gap-5 my-auto py-8">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + idx * 0.06, duration: 0.4 }}
              >
                <button
                  onClick={() => {
                    onNavigateTo(link.target);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between group py-2 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-[#1a1a1a]/30 tracking-widest font-bold">
                      {link.num}
                    </span>
                    <span className="text-3xl sm:text-4xl font-serif tracking-wide text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-[#1a1a1a]/30 group-hover:text-[#1a1a1a] group-hover:translate-x-1 transition-all" />
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 pt-6 border-t border-[#1a1a1a]/10">
            <button
              onClick={() => {
                onListenNow();
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#1a1a1a] text-white text-xs font-mono font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-md hover:bg-[#B76E79] transition-colors"
            >
              <Play size={13} className="fill-current" />
              <span>LISTEN NOW</span>
            </button>

            <button
              onClick={() => {
                onOpenSearch();
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-white border border-[#1a1a1a]/20 text-xs font-mono tracking-[0.2em] uppercase text-[#1a1a1a] flex items-center justify-center gap-2 hover:border-[#1a1a1a]/50 transition-colors"
            >
              <Search size={13} />
              <span>SEARCH KINGSHADP</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
