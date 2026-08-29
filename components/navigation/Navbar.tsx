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
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent'
      }`}
      style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
    >
      {/* Left: Brand Signal (Restrained Monogram / Wordmark) */}
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        data-cursor="KINGSHADP"
        className="flex items-center gap-3 cursor-pointer group select-none animate-rise"
        style={{ animationDelay: '0ms' }}
      >
        <div className="w-7 h-7 rounded-sm border border-white/25 flex items-center justify-center text-[10px] font-bold font-mono tracking-tighter text-white group-hover:border-white/70 transition-all">
          KSP
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white group-hover:text-[#F4F1EC] transition-colors">
            KingShadP
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-white/40">
            SANCTUM CODEX
          </span>
        </div>
      </div>

      {/* Center: Desktop Liquid Glass Pill Navigation */}
      <nav
        className="hidden lg:flex items-center gap-1 liquid-glass rounded-full px-5 py-2 text-[11px] font-mono tracking-[0.25em] uppercase text-white/60 select-none animate-rise"
        style={{ animationDelay: '50ms' }}
      >
        <button
          onClick={() => onNavigateTo('now-playing')}
          className="px-3.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          MUSIC
        </button>
        <button
          onClick={() => onNavigateTo('the-work')}
          className="px-3.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          VISUALS
        </button>
        <button
          onClick={() => onNavigateTo('archive-index')}
          className="px-3.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          ARCHIVE
        </button>
        <button
          onClick={() => onNavigateTo('manifesto')}
          className="px-3.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          STORY
        </button>
        <button
          onClick={() => onNavigateTo('selected-objects')}
          className="px-3.5 py-1 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          SHOP
        </button>
      </nav>

      {/* Right Controls: Search + Shortcuts + Listen Now CTA */}
      <div
        className="hidden sm:flex items-center gap-3 select-none animate-rise"
        style={{ animationDelay: '100ms' }}
      >
        {/* Studio Shortcuts Trigger */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            aria-label="Studio shortcuts and keys"
            data-cursor="KEYS"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-2 rounded-full border border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer"
          >
            <Command size={11} className="text-[#B76E79]" />
            <span className="hidden xl:inline">KEYS</span>
            <kbd className="px-1 py-0.2 rounded bg-white/10 text-[8px] font-mono">?</kbd>
          </button>
        )}

        {/* Search */}
        <button
          onClick={onOpenSearch}
          aria-label="Search KingShadP Archive"
          data-cursor="SEARCH"
          className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase px-3.5 py-2 rounded-full border border-white/15 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
        >
          <Search size={12} />
          <span className="hidden md:inline">SEARCH</span>
          <kbd className="hidden lg:inline px-1 py-0.2 rounded bg-white/10 text-[8px] font-mono text-white/40">/</kbd>
        </button>

        {/* Listen Now Primary Pill */}
        <button
          onClick={onListenNow}
          data-cursor="LISTEN"
          className="px-5 py-2 rounded-full bg-[#F4F1EC] text-[#050505] text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-white hover:scale-[1.02] transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
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
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white"
        >
          <Search size={14} />
        </button>

        <button
          onClick={onOpenMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white border border-white/20"
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
    </header>
  );
}
