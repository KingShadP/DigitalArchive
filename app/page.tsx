'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AmbientMediaLayer } from '../components/media/AmbientMediaLayer';
import { CustomCursor } from '../components/ui/CustomCursor';
import { Loader } from '../components/ui/Loader';
import { AtmosphericCanvas } from '../components/portal/AtmosphericCanvas';
import { ParallaxMetadataLayer } from '../components/portal/ParallaxMetadataLayer';
import { PortalHeader } from '../components/portal/PortalHeader';
import { PortalHero } from '../components/portal/PortalHero';
import { CuratedPortalBento } from '../components/portal/CuratedPortalBento';
import { PortalFooter } from '../components/portal/PortalFooter';
import { TransmissionModal } from '../components/TransmissionModal';
import { SearchOverlay } from '../components/ui/SearchOverlay';
import { HarmonicMatrixModal } from '../components/portal/HarmonicMatrixModal';
import { SpatialHUDModal } from '../components/portal/SpatialHUDModal';
import { soundEngine } from '../lib/soundEngine';
import { Keyboard } from 'lucide-react';

export default function Home() {
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHarmonicsOpen, setIsHarmonicsOpen] = useState(false);
  const [isHUDOpen, setIsHUDOpen] = useState(false);
  const [monolithMode, setMonolithMode] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Cmd+K or Ctrl+K opens quick search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      // Escape closes all active modals
      if (e.key === 'Escape') {
        setIsTransmissionOpen(false);
        setIsSearchOpen(false);
        setIsHarmonicsOpen(false);
        setIsHUDOpen(false);
        return;
      }

      // Mode shifting keys 1 - 4
      if (['1', '2', '3', '4'].includes(e.key)) {
        const modeIdx = parseInt(e.key, 10) - 1;
        setMonolithMode(modeIdx);
        const freqs = [432, 528, 648, 768];
        soundEngine.playHarmonicChime(freqs[modeIdx]);
        return;
      }

      // C opens Harmonic Calibration Matrix
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        soundEngine.playHarmonicChime(528);
        setIsHarmonicsOpen((prev) => !prev);
        return;
      }

      // ? or H opens HUD shortcuts
      if (e.key === '?' || e.key.toLowerCase() === 'h') {
        e.preventDefault();
        soundEngine.playClick(900, 0.02, 0.02);
        setIsHUDOpen((prev) => !prev);
        return;
      }

      // T opens Transmission modal
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        soundEngine.playHarmonicChime(540);
        setIsTransmissionOpen(true);
        return;
      }

      // S toggles sub-harmonic drone
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        soundEngine.playClick(520, 0.03, 0.02);
        soundEngine.toggleSubHarmonic();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToNodes = useCallback(() => {
    const el = document.getElementById('sanctum-nodes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased overflow-x-hidden selection:bg-[#B76E79] selection:text-white">
      {/* Dynamic Interactive Celestial Particle Field Canvas */}
      <AtmosphericCanvas />

      {/* Layered Parallax Typography, Coordinates & Architectural Crosshairs */}
      <ParallaxMetadataLayer />

      {/* Ambient Video Base Film Layer */}
      <AmbientMediaLayer
        activeMediaKey="scenePrimary"
        brightness={0.38}
        blurTreatment={1}
      />

      {/* Bespoke Custom Cursor & Initial Entry Loader */}
      <Loader />
      <CustomCursor />

      {/* Fixed Portal Header with Audio Engine Visualizer Bar & Route Links */}
      <PortalHeader 
        onOpenTransmission={() => setIsTransmissionOpen(true)} 
        onOpenHarmonics={() => setIsHarmonicsOpen(true)}
      />

      {/* Cinematic Hero Section with Monolith Mode Sync */}
      <PortalHero 
        onScrollToNodes={handleScrollToNodes} 
        onOpenHarmonics={() => setIsHarmonicsOpen(true)}
        monolithMode={monolithMode}
        onModeChange={setMonolithMode}
      />

      {/* Curated Preview Nodes: Sonics, Visuals & Artifacts, Vault/Terminal, Collection/Shop */}
      <CuratedPortalBento />

      {/* Architectural Portal Footer */}
      <PortalFooter 
        onOpenTransmission={() => setIsTransmissionOpen(true)} 
      />

      {/* 432 Hz Pythagorean Harmonic Calibration Matrix Modal */}
      <HarmonicMatrixModal
        isOpen={isHarmonicsOpen}
        onClose={() => setIsHarmonicsOpen(false)}
      />

      {/* Global Spatial HUD & Keyboard Telemetry Modal */}
      <SpatialHUDModal
        isOpen={isHUDOpen}
        onClose={() => setIsHUDOpen(false)}
      />

      {/* Global Interactive Transmission Dispatch Modal */}
      <TransmissionModal
        isOpen={isTransmissionOpen}
        onClose={() => setIsTransmissionOpen(false)}
      />

      {/* Universal Search Overlay (Cmd + K) */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Floating Spatial HUD Trigger Pill (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick(900, 0.02, 0.02);
            setIsHUDOpen(true);
          }}
          title="Open Keyboard Navigation Matrix [?]"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F4F1EC]/15 bg-[#050505]/80 backdrop-blur-md text-[8px] font-mono tracking-[0.25em] uppercase text-[#F4F1EC]/50 hover:text-[#F4F1EC] hover:border-[#B76E79]/50 transition-all shadow-xl"
        >
          <Keyboard size={11} className="text-[#B76E79]" />
          <span>KEYBOARD MATRIX [?]</span>
        </button>
      </div>

      {/* Edge vignettes to softly frame viewport */}
      <div className="fixed top-0 left-0 right-0 h-28 pointer-events-none z-30 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent" />
      <div className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none z-30 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent" />
    </main>
  );
}
