'use client';

import React from 'react';
import Link from 'next/link';
import { Send, ArrowUp, ShieldCheck, Compass } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface PortalFooterProps {
  onOpenTransmission?: () => void;
}

export function PortalFooter({ onOpenTransmission }: PortalFooterProps) {
  const scrollToTop = () => {
    soundEngine.playHarmonicChime(648);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-[#F4F1EC]/10 bg-[#030303] text-[#F4F1EC] pt-20 pb-16 px-6 sm:px-12 md:px-20 z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Architectural Grid Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F4F1EC]/10">
          
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono tracking-[0.3em] text-[#B76E79] uppercase font-bold">
                  SANCTUM ARCHITECTURAL CODEX
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                  SYSTEM SYNCHRONIZED
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#F4F1EC] mb-4">
                KINGSHADP // SANCTUM
              </h3>

              <p className="text-sm font-light text-[#F4F1EC]/50 max-w-md leading-relaxed">
                A permanent interdisciplinary laboratory spanning 432 Hz orchestral compositions, 
                3D sculptural monoliths, subtractive architectural theory, and limited material artifacts.
              </p>
            </div>

            {onOpenTransmission && (
              <div className="mt-8">
                <button
                  type="button"
                  id="footer-transmission-trigger"
                  onClick={() => {
                    soundEngine.playHarmonicChime(540);
                    onOpenTransmission();
                  }}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[#B76E79]/40 bg-[#B76E79]/10 text-xs font-mono tracking-[0.2em] uppercase text-[#F4F1EC] hover:bg-[#B76E79] hover:text-[#050505] transition-all duration-500 shadow-xl"
                >
                  <Send size={13} className="text-[#B76E79] group-hover:text-[#050505]" />
                  <span>TRANSMIT DISPATCH / INQUIRY</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Matrix */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#F4F1EC]/40 uppercase block mb-4">
              CODEX SECTORS
            </span>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider uppercase">
              <li>
                <Link 
                  href="/music" 
                  onClick={() => soundEngine.playClick(900, 0.02, 0.02)}
                  className="text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors flex items-center justify-between"
                >
                  <span>01. SONIC ARCHITECTURE</span>
                  <span className="text-[9px] opacity-40">432 HZ</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/visuals" 
                  onClick={() => soundEngine.playClick(950, 0.02, 0.02)}
                  className="text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors flex items-center justify-between"
                >
                  <span>02. DARKROOM VISUALS</span>
                  <span className="text-[9px] opacity-40">4K MATTE</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/archive" 
                  onClick={() => soundEngine.playClick(1000, 0.02, 0.02)}
                  className="text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors flex items-center justify-between"
                >
                  <span>03. PERMANENT ARCHIVE</span>
                  <span className="text-[9px] opacity-40">ENCRYPTED</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop" 
                  onClick={() => soundEngine.playClick(1050, 0.02, 0.02)}
                  className="text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors flex items-center justify-between"
                >
                  <span>04. PHYSICAL ARTIFACTS</span>
                  <span className="text-[9px] opacity-40">ED. 24</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/story" 
                  onClick={() => soundEngine.playClick(1100, 0.02, 0.02)}
                  className="text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors flex items-center justify-between"
                >
                  <span>05. SANCTUM ORIGINS</span>
                  <span className="text-[9px] opacity-40">LORE</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  onClick={() => soundEngine.playClick(1150, 0.02, 0.02)}
                  className="text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors flex items-center justify-between"
                >
                  <span>06. EXECUTIVE BIOGRAPHY</span>
                  <span className="text-[9px] opacity-40">DOSSIER</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Telemetry & Specifications */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#F4F1EC]/40 uppercase block mb-4">
                SYSTEM SPECIFICATION
              </span>
              <div className="space-y-2 text-[10px] font-mono text-[#F4F1EC]/60">
                <div className="flex justify-between border-b border-[#F4F1EC]/5 pb-1">
                  <span className="text-[#F4F1EC]/30">MASTER TUNING:</span>
                  <span className="text-[#F4F1EC]">432 HZ PYTHAGOREAN</span>
                </div>
                <div className="flex justify-between border-b border-[#F4F1EC]/5 pb-1">
                  <span className="text-[#F4F1EC]/30">LOCATION:</span>
                  <span className="text-[#F4F1EC]">LOS ANGELES // TOKYO</span>
                </div>
                <div className="flex justify-between border-b border-[#F4F1EC]/5 pb-1">
                  <span className="text-[#F4F1EC]/30">ARCHIVE INTEGRITY:</span>
                  <span className="text-emerald-400">100% LOSSLESS</span>
                </div>
                <div className="flex justify-between border-b border-[#F4F1EC]/5 pb-1">
                  <span className="text-[#F4F1EC]/30">INFRASOUND SUB:</span>
                  <span className="text-[#B76E79]">28 HZ BINAURAL</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="mt-8 flex items-center justify-between p-3 rounded-xl border border-[#F4F1EC]/15 hover:border-[#B76E79] text-[9px] font-mono uppercase tracking-widest text-[#F4F1EC]/60 hover:text-[#F4F1EC] transition-all"
            >
              <span>ASCEND TO ZERO POINT</span>
              <ArrowUp size={13} />
            </button>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono tracking-[0.2em] uppercase text-[#F4F1EC]/30">
          <div>
            © MMXXVI KINGSHADP. ALL ARCHIVAL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F4F1EC]/50">
              <ShieldCheck size={11} className="text-[#B76E79]" />
              AUTHENTICATED MASTER SYSTEM
            </span>
            <span>{'//'}</span>
            <span>BUILD 2026.09.SANCTUM</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
