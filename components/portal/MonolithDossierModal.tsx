'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShieldCheck, Box, Compass, ExternalLink, Download, FileText, Check } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface MonolithDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModeName: string;
}

export function MonolithDossierModal({ isOpen, onClose, activeModeName }: MonolithDossierModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen) return null;

  const genesisHash = 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069';

  const handleCopyHash = () => {
    soundEngine.playClick(1200, 0.02, 0.02);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(genesisHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="monolith-dossier-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#050505]/85 backdrop-blur-2xl animate-fade-in"
    >
      <div className="relative w-full max-w-3xl rounded-3xl border border-[#F4F1EC]/15 bg-gradient-to-b from-[#111111] via-[#090909] to-[#040404] p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Subtle Ambient Filament Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#B76E79]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#F4F1EC]/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B76E79] animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
                ARCHITECTURAL SPECIFICATION DOSSIER
              </span>
            </div>
            <h2 id="monolith-dossier-title" className="text-2xl sm:text-3xl font-serif font-light text-[#F4F1EC]">
              The Sovereign Giragon Monolith
            </h2>
            <p className="text-xs font-mono text-[#F4F1EC]/50 mt-1 tracking-wider uppercase">
              STUDIO KINGSHADP // CLASSIFICATION: PERMANENT ARCHIVAL MAQUETTE MMXXVI
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(800, 0.02, 0.02);
              onClose();
            }}
            aria-label="Close Monolith Dossier"
            className="p-2.5 rounded-full border border-[#F4F1EC]/15 text-[#F4F1EC]/70 hover:text-[#050505] hover:bg-[#F4F1EC] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl border border-[#F4F1EC]/10 bg-[#070707]/80 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-[#F4F1EC]/40 uppercase tracking-widest mb-1">
              PHYSICAL DIMENSIONS
            </span>
            <span className="text-lg font-serif font-light text-[#F4F1EC]">1:1 Master Scale</span>
            <span className="text-[9px] font-mono text-[#B76E79] tracking-wider mt-2">
              RATIO Φ = 1.618033
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-[#F4F1EC]/10 bg-[#070707]/80 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-[#F4F1EC]/40 uppercase tracking-widest mb-1">
              MATERIAL COMPOSITION
            </span>
            <span className="text-lg font-serif font-light text-[#F4F1EC]">Acoustic Obsidian</span>
            <span className="text-[9px] font-mono text-[#B76E79] tracking-wider mt-2">
              TITANIUM-BISMUTH CORE
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-[#F4F1EC]/10 bg-[#070707]/80 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-[#F4F1EC]/40 uppercase tracking-widest mb-1">
              ACOUSTIC RESONANCE
            </span>
            <span className="text-lg font-serif font-light text-[#F4F1EC]">432.08 Hz Fundamental</span>
            <span className="text-[9px] font-mono text-[#B76E79] tracking-wider mt-2">
              PYTHAGOREAN TUNING
            </span>
          </div>
        </div>

        {/* Cryptographic Ledger & Provenance Box */}
        <div className="p-5 rounded-2xl border border-[#F4F1EC]/10 bg-[#090909] mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#B76E79]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#F4F1EC]">
                CRYPTOGRAPHIC GENESIS SEAL
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyHash}
              className="flex items-center gap-1.5 text-[8px] font-mono tracking-widest uppercase text-[#B76E79] hover:underline"
            >
              {copiedHash ? <Check size={11} /> : <FileText size={11} />}
              <span>{copiedHash ? 'HASH COPIED' : 'COPY SHA-256'}</span>
            </button>
          </div>

          <p className="font-mono text-[10px] text-[#F4F1EC]/70 break-all bg-black/50 p-3 rounded-lg border border-white/5 selection:bg-[#B76E79]">
            {genesisHash}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-[9px] font-mono text-[#F4F1EC]/50 border-t border-white/5 pt-3">
            <div>
              <span className="block text-[#F4F1EC]/30 text-[8px]">LOCATION</span>
              <span className="text-[#F4F1EC]/80">LOS ANGELES // TOKYO</span>
            </div>
            <div>
              <span className="block text-[#F4F1EC]/30 text-[8px]">EDITION</span>
              <span className="text-[#F4F1EC]/80">01 OF 01 PERMANENT</span>
            </div>
            <div>
              <span className="block text-[#F4F1EC]/30 text-[8px]">OBSERVATION</span>
              <span className="text-[#B76E79] uppercase">{activeModeName}</span>
            </div>
            <div>
              <span className="block text-[#F4F1EC]/30 text-[8px]">CURATOR</span>
              <span className="text-[#F4F1EC]/80">KINGSHADP ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* Architectural Narrative Description */}
        <div className="space-y-3 text-xs font-light text-[#F4F1EC]/70 leading-relaxed mb-8">
          <p>
            The Giragon Monolith embodies KingShadP’s philosophy of subtractive discipline: stripping ornamentation until only pure architectural authority remains.
          </p>
          <p>
            Constructed as an acoustic transducer, the monolithic interior cavity functions as a Helmholtz resonator tuned precisely to 432.08 Hz. When ambient low-frequency sound penetrates its obsidian skin, harmonic standing waves are formed, aligning the physical space with cosmic resonance.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#F4F1EC]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/visuals"
            onClick={() => soundEngine.playClick(900, 0.02, 0.02)}
            className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#B76E79] hover:text-[#F4F1EC] uppercase transition-colors"
          >
            <span>EXPLORE 4K RENDER ARCHIVE IN DARKROOM</span>
            <ExternalLink size={12} />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/archive"
              onClick={() => soundEngine.playClick(900, 0.02, 0.02)}
              className="px-4 py-2 rounded-full border border-[#F4F1EC]/20 text-[#F4F1EC] hover:bg-[#F4F1EC] hover:text-[#050505] text-[9px] font-mono tracking-widest uppercase transition-all duration-300"
            >
              ACCESS VAULT
            </Link>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(800, 0.02, 0.02);
                onClose();
              }}
              className="px-4 py-2 rounded-full bg-[#B76E79] text-[#050505] text-[9px] font-mono tracking-widest uppercase hover:bg-[#F4F1EC] transition-all duration-300 font-bold"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
