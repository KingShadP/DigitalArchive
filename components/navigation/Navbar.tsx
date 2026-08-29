'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Play, Menu, X, Command, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onListenNow: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onNavigateTo: (sectionId: string) => void;
  onOpenShortcuts?: () => void;
}

export function Navbar({
  onOpenSearch,
  onListenNow,
  onOpenMobileMenu,
  isMobileMenuOpen,
  onNavigateTo,
  onOpenShortcuts,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] px-6 sm:px-12 py-5 sm:py-6 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-[#f8f7f4]/90 backdrop-blur-xl border-b border-[#1a1a1a]/10 py-4 shadow-sm text-[#1a1a1a]'
          : 'bg-transparent text-[#1a1a1a]'
      }`}
      style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
    >
      {/* Left: Brand Signal (Restrained Monogram / Wordmark) */}
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        data-cursor="KINGSHADP"
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <div className="w-7 h-7 rounded-sm border border-[#1a1a1a]/30 flex items-center justify-center text-[10px] font-bold font-mono tracking-tighter text-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all">
          KSP
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#1a1a1a] transition-colors">
            KingShadP
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#1a1a1a]/50">
            SANCTUM CODEX
          </span>
        </div>
      </div>

      {/* Center: Desktop Liquid Pill Navigation */}
      <nav
        className="hidden lg:flex items-center gap-1 bg-white/85 backdrop-blur-md rounded-full px-5 py-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[#1a1a1a]/70 border border-[#1a1a1a]/10 shadow-sm select-none"
      >
        <button
          onClick={() => onNavigateTo('now-playing')}
          className="px-3.5 py-1 rounded-full hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer"
        >
          AUDIO
        </button>
        <button
          onClick={() => onNavigateTo('the-work')}
          className="px-3.5 py-1 rounded-full hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer"
        >
          WORK
        </button>
        <button
          onClick={() => onNavigateTo('visual-archive')}
          className="px-3.5 py-1 rounded-full hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer"
        >
          VISUALS
        </button>
        <button
          onClick={() => onNavigateTo('archive-index')}
          className="px-3.5 py-1 rounded-full hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer"
        >
          ARCHIVE
        </button>
        <button
          onClick={() => onNavigateTo('manifesto')}
          className="px-3.5 py-1 rounded-full hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer"
        >
          STORY
        </button>
        <button
          onClick={() => onNavigateTo('selected-objects')}
          className="px-3.5 py-1 rounded-full hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer"
        >
          PORTAL
        </button>
      </nav>

      {/* Right Controls: Search + Shortcuts + Listen Now CTA */}
      <div
        className="hidden sm:flex items-center gap-3 select-none"
      >
        {/* Studio Shortcuts Trigger */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            aria-label="Studio shortcuts and keys"
            data-cursor="KEYS"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-2 rounded-full border border-[#1a1a1a]/15 bg-white/60 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40 transition-all cursor-pointer"
          >
            <Command size={11} className="text-[#B76E79]" />
            <span className="hidden xl:inline">KEYS</span>
            <kbd className="px-1 py-0.2 rounded bg-[#1a1a1a]/10 text-[8px] font-mono">?</kbd>
          </button>
        )}

        {/* Search */}
        <button
          onClick={onOpenSearch}
          aria-label="Search KingShadP Archive"
          data-cursor="SEARCH"
          className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase px-3.5 py-2 rounded-full border border-[#1a1a1a]/15 bg-white/60 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40 transition-all cursor-pointer"
        >
          <Search size={12} />
          <span className="hidden md:inline">SEARCH</span>
          <kbd className="hidden lg:inline px-1 py-0.2 rounded bg-[#1a1a1a]/10 text-[8px] font-mono text-[#1a1a1a]/50">/</kbd>
        </button>

        {/* Listen Now Primary Pill */}
        <button
          onClick={onListenNow}
          data-cursor="LISTEN"
          className="px-5 py-2 rounded-full bg-[#1a1a1a] text-[#f8f7f4] text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-black hover:scale-[1.02] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Play size={11} className="fill-current" />
          <span>LISTEN NOW</span>
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="flex sm:hidden items-center gap-2">
        <button
          onClick={onOpenSearch}
          aria-label="Search"
          className="w-9 h-9 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/80 hover:text-[#1a1a1a] bg-white/60"
        >
          <Search size={14} />
        </button>

        <button
          onClick={onOpenMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-[#1a1a1a] border border-[#1a1a1a]/20 shadow-sm"
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
    </header>
  );
}
