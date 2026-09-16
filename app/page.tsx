'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, Search, Sliders, MessageSquare, Keyboard, Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';
import { TransmissionModal } from '../components/TransmissionModal';
import { SearchOverlay } from '../components/ui/SearchOverlay';
import { HarmonicMatrixModal } from '../components/portal/HarmonicMatrixModal';
import { SpatialHUDModal } from '../components/portal/SpatialHUDModal';
import { MonolithDossierModal } from '../components/portal/MonolithDossierModal';

const MONOLITH_MODES = [
  { id: 'obsidian', name: 'Sovereign Obsidian', image: '/THE GIRAGON.png', freq: 432 },
  { id: 'glory', name: 'Alabaster Glory', image: '/girgonglory.png', freq: 528 },
  { id: 'rose', name: 'Rose Alloy Sanctum', image: '/ROSE GOLD GIRAGON.png', freq: 648 },
  { id: 'wireframe', name: 'Subtractive Lattice', image: '/THE GIRAGON.png', freq: 768 },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(222); // 03:42 default
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHarmonicsOpen, setIsHarmonicsOpen] = useState(false);
  const [isHUDOpen, setIsHUDOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      soundEngine.playClick(400, 0.02, 0.02);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          soundEngine.playHarmonicChime(432);
        })
        .catch(() => {
          // If browser restricts autoplay before interaction
          setIsPlaying(true);
        });
    }
  }, [isPlaying]);

  // Keyboard Shortcuts Listener (Cmd+K, C, T, S, 1-4, ?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setIsTransmissionOpen(false);
        setIsSearchOpen(false);
        setIsHarmonicsOpen(false);
        setIsHUDOpen(false);
        setIsDossierOpen(false);
        return;
      }

      if (['1', '2', '3', '4'].includes(e.key)) {
        const modeIdx = parseInt(e.key, 10) - 1;
        setActiveModeIdx(modeIdx);
        soundEngine.playHarmonicChime(MONOLITH_MODES[modeIdx].freq);
        return;
      }

      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        soundEngine.playHarmonicChime(528);
        setIsHarmonicsOpen((prev) => !prev);
        return;
      }

      if (e.key === '?' || e.key.toLowerCase() === 'h') {
        e.preventDefault();
        soundEngine.playClick(900, 0.02, 0.02);
        setIsHUDOpen((prev) => !prev);
        return;
      }

      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        soundEngine.playHarmonicChime(540);
        setIsTransmissionOpen(true);
        return;
      }

      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        soundEngine.playClick(520, 0.03, 0.02);
        soundEngine.toggleSubHarmonic();
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayAudio();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayAudio]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = pct * duration;
    setCurrentTime(pct * duration);
    soundEngine.playClick(800, 0.015, 0.015);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentMode = MONOLITH_MODES[activeModeIdx];

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#121212] flex flex-col justify-between selection:bg-[#b76e79] selection:text-[#f5f2ed] transition-colors duration-500">
      {/* Hidden Audio Engine Reference */}
      <audio
        ref={audioRef}
        src="/music/behold-the-twisted-beast.mp3"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Variation 3 Header */}
      <header className="px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-[rgba(18,18,18,0.06)]">
        <div className="brand">
          <span className="label block mb-1">Archival Evidence // Sanctum</span>
          <Link href="/" className="inline-block group">
            <h1 className="font-serif font-light text-3xl sm:text-4xl tracking-[0.1em] uppercase text-[#121212] transition-opacity group-hover:opacity-75">
              KingShadP
            </h1>
          </Link>
        </div>

        <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
          {/* Editorial Italic Navigation Links */}
          <nav className="nav-links flex flex-col gap-1 sm:text-right" aria-label="Main Navigation">
            <Link
              href="/music"
              className="font-serif italic text-lg sm:text-xl text-[#121212] hover:opacity-50 transition-opacity"
            >
              The Audio
            </Link>
            <Link
              href="/visuals"
              className="font-serif italic text-lg sm:text-xl text-[#121212] hover:opacity-50 transition-opacity"
            >
              The Darkroom
            </Link>
            <Link
              href="/archive"
              className="font-serif italic text-lg sm:text-xl text-[#121212] hover:opacity-50 transition-opacity"
            >
              The Records
            </Link>
            <Link
              href="/shop"
              className="font-serif italic text-lg sm:text-xl text-[#121212] hover:opacity-50 transition-opacity"
            >
              The Collection
            </Link>
            <Link
              href="/story"
              className="font-serif italic text-lg sm:text-xl text-[#121212] hover:opacity-50 transition-opacity"
            >
              The Lore
            </Link>
          </nav>

          {/* Quick Utility Tools */}
          <div className="flex items-center gap-3 pt-2 border-t border-[rgba(18,18,18,0.06)] w-full sm:w-auto justify-start sm:justify-end">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(900, 0.02, 0.02);
                setIsSearchOpen(true);
              }}
              title="Quick Search (Cmd+K)"
              className="p-1.5 text-[#121212]/50 hover:text-[#121212] hover:bg-black/5 rounded transition-colors"
            >
              <Search size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playHarmonicChime(528);
                setIsHarmonicsOpen(true);
              }}
              title="Harmonic Calibration [C]"
              className="p-1.5 text-[#121212]/50 hover:text-[#121212] hover:bg-black/5 rounded transition-colors"
            >
              <Sliders size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playHarmonicChime(540);
                setIsTransmissionOpen(true);
              }}
              title="Dispatch Transmission [T]"
              className="p-1.5 text-[#121212]/50 hover:text-[#121212] hover:bg-black/5 rounded transition-colors"
            >
              <MessageSquare size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(900, 0.02, 0.02);
                setIsHUDOpen(true);
              }}
              title="Keyboard Shortcuts [?]"
              className="p-1.5 text-[#121212]/50 hover:text-[#121212] hover:bg-black/5 rounded transition-colors"
            >
              <Keyboard size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Variation 3 Main Grid */}
      <main className="main-grid flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 px-6 sm:px-12 lg:px-16 py-8 lg:py-16 items-end">
        {/* Hero Statement (Cols 1 - 7) */}
        <div className="hero-statement lg:col-span-7">
          <div className="label mb-3 text-[#b76e79]">
            Archival Sanctum // 432 Hz Master
          </div>
          <h1 className="font-serif font-light text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-[0.03em] uppercase mb-5 text-[#121212]">
            WELCOME TO KINGSHADP
          </h1>
          <p className="text-[#121212]/70 max-w-lg text-base sm:text-lg leading-[1.65] mb-7 font-light">
            &ldquo;Everything I make leaves evidence.&rdquo; Step into the permanent interdisciplinary sanctuary spanning 432 Hz orchestral compositions, monolithic sculptures, and authenticated archival evidence.
          </p>

          {/* Primary Call To Action */}
          <div className="mb-9">
            <Link
              href="/archive"
              className="button-outline group inline-flex items-center gap-3 text-xs tracking-[0.2em]"
            >
              <span>ENTER THE SITE</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Archival Codex Rows */}
          <div className="codex-list mt-6 max-w-lg">
            <button
              type="button"
              onClick={togglePlayAudio}
              className="codex-row w-full text-left group cursor-pointer"
            >
              <span className="font-serif italic text-base group-hover:text-[#b76e79] transition-colors flex items-center gap-2">
                <span>Behold the Twisted Beast</span>
                {isPlaying && (
                  <span className="inline-flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-[#b76e79] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#b76e79] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#b76e79] animate-pulse delay-150" />
                  </span>
                )}
              </span>
              <span className="label group-hover:text-[#121212]">432 Hz</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const nextIdx = (activeModeIdx + 1) % MONOLITH_MODES.length;
                setActiveModeIdx(nextIdx);
                soundEngine.playHarmonicChime(MONOLITH_MODES[nextIdx].freq);
              }}
              className="codex-row w-full text-left group cursor-pointer"
            >
              <span className="font-serif italic text-base group-hover:text-[#b76e79] transition-colors">
                {currentMode.name}
              </span>
              <span className="label group-hover:text-[#121212]">{currentMode.id}</span>
            </button>

            <Link
              href="/archive"
              className="codex-row w-full text-left group cursor-pointer"
            >
              <span className="font-serif italic text-base group-hover:text-[#b76e79] transition-colors">
                Subtractive Codex
              </span>
              <span className="label group-hover:text-[#121212]">Archive</span>
            </Link>
          </div>
        </div>

        {/* Featured Image & Overlapping Audio Module (Cols 8 - 12) */}
        <div className="featured-image lg:col-span-5 relative mt-6 lg:mt-0 flex flex-col items-end">
          {/* Overlapping Floating Audio Module */}
          <div className="audio-module relative lg:absolute lg:-top-10 lg:-left-10 z-20 shadow-2xl shadow-black/5 mb-6 lg:mb-0 border border-[#121212] bg-[#f5f2ed] p-6 sm:p-7">
            <div className="flex items-center justify-between mb-2">
              <span className="label" style={{ color: 'var(--accent)' }}>
                Now Playing
              </span>
              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="text-[#121212]/40 hover:text-[#121212] transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
            </div>

            <div className="font-serif text-xl sm:text-2xl text-[#121212] my-2 leading-tight">
              Behold the Twisted Beast
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={togglePlayAudio}
                className="w-8 h-8 rounded-full border border-[#121212] flex items-center justify-center text-[#121212] hover:bg-[#121212] hover:text-[#f5f2ed] transition-colors shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
              </button>

              {/* Interactive Progress Track */}
              <div
                onClick={handleSeek}
                className="flex-1 h-3 flex items-center cursor-pointer group"
                title="Click to seek"
              >
                <div className="w-full h-[1px] bg-[rgba(18,18,18,0.2)] relative group-hover:h-[2px] transition-all">
                  <div
                    className="h-full bg-[#121212]"
                    style={{
                      width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <span className="label font-mono text-[0.625rem] tabular-nums shrink-0">
                {formatTime(currentTime > 0 ? currentTime : 222)}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-[rgba(18,18,18,0.06)] flex items-center justify-between text-[0.6rem] font-mono text-[#121212]/40 uppercase tracking-widest">
              <span>Master // 432 Hz</span>
              <button
                type="button"
                onClick={() => soundEngine.toggleSubHarmonic()}
                className="hover:text-[#b76e79] transition-colors"
              >
                [S] Sub-Drone
              </button>
            </div>
          </div>

          {/* Monolith Photographic Display Frame */}
          <div className="w-full relative border border-[rgba(18,18,18,0.08)] p-3 sm:p-4 bg-[#f5f2ed]">
            <div className="relative aspect-square w-full overflow-hidden bg-[#ebe7e0] flex items-center justify-center">
              <Image
                src={currentMode.image}
                alt={`Sovereign Monolith — ${currentMode.name}`}
                width={700}
                height={700}
                priority
                className="w-full h-full object-cover transition-opacity duration-700 ease-out"
              />

              {/* Mode Switcher Overlay Chips */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#f5f2ed]/90 backdrop-blur-sm border border-[rgba(18,18,18,0.08)] px-2.5 py-1.5">
                <div className="flex gap-1.5">
                  {MONOLITH_MODES.map((mode, idx) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setActiveModeIdx(idx);
                        soundEngine.playHarmonicChime(mode.freq);
                      }}
                      className={`text-[9px] font-mono px-1.5 py-0.5 uppercase tracking-wider transition-colors ${
                        activeModeIdx === idx
                          ? 'bg-[#121212] text-[#f5f2ed]'
                          : 'text-[#121212]/50 hover:text-[#121212]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsDossierOpen(true)}
                  className="text-[9px] font-mono tracking-widest uppercase text-[#121212]/70 hover:text-[#b76e79] flex items-center gap-1"
                >
                  <span>Dossier</span>
                  <ChevronRight size={10} />
                </button>
              </div>
            </div>

            <div className="label mt-3 text-right">
              Fig. 01 // The Giragon Monolith ({currentMode.name})
            </div>
          </div>
        </div>
      </main>

      {/* Variation 3 Stats Strip */}
      <footer className="stats-strip px-6 sm:px-12 lg:px-16 py-5 border-t border-[rgba(18,18,18,0.08)] flex flex-wrap items-center gap-8 sm:gap-12 lg:gap-16">
        <div className="stat-item">
          <span className="label block mb-0.5">Coordinate</span>
          <span className="val font-serif text-lg sm:text-xl text-[#121212]">
            34.0522° N // 118.2437° W
          </span>
        </div>

        <div className="stat-item">
          <span className="label block mb-0.5">Resonance</span>
          <button
            type="button"
            onClick={() => soundEngine.playHarmonicChime(432.08)}
            title="Click to audition 432 Hz"
            className="val font-serif text-lg sm:text-xl text-[#121212] hover:text-[#b76e79] transition-colors text-left"
          >
            432.08 Hz
          </button>
        </div>

        <div className="stat-item">
          <span className="label block mb-0.5">Vault Integrity</span>
          <span className="val font-serif text-lg sm:text-xl text-[#121212]">
            Lossless 24-Bit
          </span>
        </div>

        <div className="stat-item sm:ml-auto flex items-center gap-2">
          <div>
            <span className="label block mb-0.5">Status</span>
            <span className="val font-serif text-lg sm:text-xl text-[#b76e79] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b76e79] animate-pulse" />
              System Online
            </span>
          </div>
        </div>
      </footer>

      {/* Integrated Overlays & Modals */}
      <HarmonicMatrixModal
        isOpen={isHarmonicsOpen}
        onClose={() => setIsHarmonicsOpen(false)}
      />

      <SpatialHUDModal
        isOpen={isHUDOpen}
        onClose={() => setIsHUDOpen(false)}
      />

      <TransmissionModal
        isOpen={isTransmissionOpen}
        onClose={() => setIsTransmissionOpen(false)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MonolithDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        activeModeName={currentMode.name}
      />
    </div>
  );
}
