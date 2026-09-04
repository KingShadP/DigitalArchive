'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AudioEngineBar } from './AudioEngineBar';
import { soundEngine } from '../../lib/soundEngine';
import { Send, Menu, X, Terminal, Radio } from 'lucide-react';

interface PortalHeaderProps {
  onOpenTransmission?: () => void;
  onOpenHarmonics?: () => void;
}

export function PortalHeader({ onOpenTransmission, onOpenHarmonics }: PortalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'AUDIO', href: '/music' },
    { label: 'VISUALS', href: '/visuals' },
    { label: 'ARCHIVE', href: '/archive' },
    { label: 'SHOP', href: '/shop' },
    { label: 'STORY', href: '/story' },
  ];

  const handleNavHover = () => {
    soundEngine.playClick(1200, 0.02, 0.015);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-5 w-full flex items-center justify-between pointer-events-none transition-all duration-300">
      {/* Brand Identity / Left */}
      <div className="flex items-center gap-4 pointer-events-auto bg-[#050505]/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#F4F1EC]/10 shadow-lg">
        <Link 
          href="/"
          onClick={() => soundEngine.playClick(700, 0.03, 0.02)}
          className="flex flex-col group"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F4F1EC] font-bold group-hover:text-[#B76E79] transition-colors">
              KINGSHADP
            </span>
            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-[#B76E79]/20 text-[#B76E79] tracking-wider">
              MMXXVI
            </span>
          </div>
          <span className="text-[9px] font-serif italic text-[#F4F1EC]/50 font-light">
            Sanctum Void Portal
          </span>
        </Link>
      </div>

      {/* Center Audio Engine Bar */}
      <div className="hidden md:flex pointer-events-auto">
        <AudioEngineBar onOpenHarmonics={onOpenHarmonics} />
      </div>

      {/* Right Navigation & Transmission Trigger */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Desktop Nav Links with Micro-Feedback */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#050505]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F4F1EC]/10 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={handleNavHover}
              onClick={() => soundEngine.playClick(950, 0.02, 0.02)}
              className="px-3 py-1 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase text-[#F4F1EC]/70 hover:text-[#050505] hover:bg-[#F4F1EC] hover:shadow-[0_0_12px_rgba(244,241,236,0.3)] transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Transmission Modal Trigger */}
        {onOpenTransmission && (
          <button
            type="button"
            id="portal-transmit-button"
            onClick={() => {
              soundEngine.playHarmonicChime(540);
              onOpenTransmission();
            }}
            onMouseEnter={handleNavHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#B76E79]/40 bg-[#B76E79]/15 text-[#F4F1EC] text-[9px] font-mono tracking-[0.2em] uppercase hover:bg-[#B76E79] hover:text-[#050505] transition-all duration-500 shadow-xl backdrop-blur-md"
          >
            <Send size={11} className="text-[#B76E79] group-hover:text-[#050505]" />
            <span className="hidden sm:inline">TRANSMISSION</span>
          </button>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          id="portal-mobile-menu-toggle"
          onClick={() => {
            soundEngine.playClick(800, 0.02, 0.02);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2.5 rounded-full bg-[#050505]/80 border border-[#F4F1EC]/15 text-[#F4F1EC] hover:border-[#B76E79] transition-colors shadow-lg"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-[#F4F1EC]/15 shadow-2xl pointer-events-auto flex flex-col gap-6">
          <div className="pb-3 border-b border-[#F4F1EC]/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#B76E79] tracking-widest uppercase font-bold">
              SANCTUM NAVIGATION
            </span>
            <span className="text-[9px] font-mono text-[#F4F1EC]/40">
              COORD: 34.0522° N
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-serif text-[#F4F1EC] hover:text-[#B76E79] p-2 rounded-lg hover:bg-[#F4F1EC]/5 transition-all"
              >
                <span>{item.label}</span>
                <span className="text-[9px] font-mono text-[#F4F1EC]/40">ENTER →</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F4F1EC]/10">
            <AudioEngineBar isCompact />
          </div>
        </div>
      )}
    </header>
  );
}
