'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { MobileMenu } from '../components/navigation/MobileMenu';
import { Hero } from '../components/sections/Hero';
import { NowPlaying } from '../components/sections/NowPlaying';
import { TheWork } from '../components/sections/TheWork';
import { VisualArchive } from '../components/sections/VisualArchive';
import { Manifesto } from '../components/sections/Manifesto';
import { ArchiveIndex } from '../components/sections/ArchiveIndex';
import { SelectedObjects } from '../components/sections/SelectedObjects';
import { FinalPortal } from '../components/sections/FinalPortal';
import { CustomCursor } from '../components/ui/CustomCursor';
import { SearchOverlay } from '../components/ui/SearchOverlay';
import { MediaViewer } from '../components/media/MediaViewer';
import { GlobalMediaDock } from '../components/media/GlobalMediaDock';
import { Loader } from '../components/ui/Loader';
import { TransmissionModal } from '../components/TransmissionModal';
import { ShortcutsModal } from '../components/ui/ShortcutsModal';
import { AmbientMediaLayer } from '../components/media/AmbientMediaLayer';
import { ModeSwitcher } from '../components/ui/ModeSwitcher';
import { releases, Track } from '../data/releases';
import { soundEngine } from '../lib/soundEngine';
import { ExperienceMode } from '../data/scenes';

export default function MasterKingShadPExperience() {
  // Experience Engine Mode & Ambient Media Video Feed
  const [currentMode, setCurrentMode] = useState<ExperienceMode>('EXPERIENCE');
  const [activeMediaKey, setActiveMediaKey] = useState<string>('scenePrimary');

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState('track-01');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Overlay / Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [activeMediaViewerId, setActiveMediaViewerId] = useState<string | null>(null);

  // Audio handling
  const allTracks = releases[0].tracks;
  const activeTrack: Track =
    allTracks.find((t) => t.id === currentTrackId) || allTracks[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      soundEngine.connectAudioElement(audio);
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
    }
    soundEngine.setMute(isMuted);
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    soundEngine.playClick(isPlaying ? 400 : 700, 0.03);
  }, [isPlaying]);

  const handleSelectTrack = useCallback((trackId: string) => {
    setCurrentTrackId(trackId);
    setIsPlaying(true);
    soundEngine.playClick(800, 0.04);
  }, []);

  const handleNextTrack = useCallback(() => {
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    handleSelectTrack(allTracks[nextIndex].id);
  }, [allTracks, currentTrackId, handleSelectTrack]);

  const handlePrevTrack = useCallback(() => {
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + allTracks.length) % allTracks.length;
    handleSelectTrack(allTracks[prevIndex].id);
  }, [allTracks, currentTrackId, handleSelectTrack]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleModeChange = (mode: ExperienceMode) => {
    setCurrentMode(mode);
    if (mode === 'EXPERIENCE') {
      setActiveMediaKey('scenePrimary');
      scrollToSection('hero');
    } else if (mode === 'LISTEN') {
      setActiveMediaKey('cinematicB');
      scrollToSection('now-playing');
      setIsPlaying(true);
    } else if (mode === 'VISUAL') {
      setActiveMediaKey('cinematicA');
      scrollToSection('visual-archive');
    } else if (mode === 'ARCHIVE') {
      setActiveMediaKey('cinematicC');
      scrollToSection('archive-index');
    }
  };

  // Global Studio Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key.toLowerCase() === 'm') {
        setIsMuted((prev) => !prev);
      } else if (e.key.toLowerCase() === 'j') {
        handlePrevTrack();
      } else if (e.key.toLowerCase() === 'l') {
        handleNextTrack();
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsTransmissionOpen(false);
        setIsShortcutsOpen(false);
        setActiveMediaViewerId(null);
      } else if (e.key === '1') {
        scrollToSection('hero');
      } else if (e.key === '2') {
        scrollToSection('now-playing');
      } else if (e.key === '3') {
        scrollToSection('the-work');
      } else if (e.key === '4') {
        scrollToSection('visual-archive');
      } else if (e.key === '5') {
        scrollToSection('manifesto');
      } else if (e.key === '6') {
        scrollToSection('archive-index');
      } else if (e.key === '7') {
        scrollToSection('selected-objects');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, handleNextTrack, handlePrevTrack, scrollToSection]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased overflow-x-hidden">
      {/* ========================================================================= */}
      {/* GLOBAL FULLSCREEN AMBIENT BACKGROUND VIDEO LAYER                          */}
      {/* ========================================================================= */}
      <AmbientMediaLayer
        activeMediaKey={activeMediaKey}
        isPlayingMusic={isPlaying}
      />

      {/* Hidden Master Audio Element */}
      <audio
        ref={audioRef}
        src={activeTrack.audioSrc}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Restrained Loading Phase */}
      <Loader />

      {/* Desktop Precision Cursor */}
      <CustomCursor />

      {/* Top Fixed Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onListenNow={() => {
          scrollToSection('now-playing');
          setIsPlaying(true);
        }}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onNavigateTo={scrollToSection}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Fullscreen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigateTo={scrollToSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onListenNow={() => {
          scrollToSection('now-playing');
          setIsPlaying(true);
        }}
      />

      {/* Experience Mode & Ambient Camera Switcher */}
      <ModeSwitcher
        currentMode={currentMode}
        onSelectMode={handleModeChange}
        activeMediaKey={activeMediaKey}
        onSelectMediaKey={(key) => setActiveMediaKey(key)}
      />

      {/* ========================================================================= */}
      {/* CHAPTER 00: ENTRY HERO STAGE                                             */}
      {/* ========================================================================= */}
      <Hero
        onListenNow={() => {
          scrollToSection('now-playing');
          setIsPlaying(true);
        }}
        onEnterArchive={() => scrollToSection('archive-index')}
        onExploreWork={() => scrollToSection('the-work')}
        onSwitchSceneVideo={(videoKey) => setActiveMediaKey(videoKey)}
      />

      {/* ========================================================================= */}
      {/* CHAPTER 01: NOW PLAYING                                                   */}
      {/* ========================================================================= */}
      <NowPlaying
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        currentTrackId={currentTrackId}
        onSelectTrack={handleSelectTrack}
        audioRef={audioRef}
        onSwitchSceneVideo={(videoKey) => setActiveMediaKey(videoKey)}
      />

      {/* ========================================================================= */}
      {/* CHAPTER 02: THE WORK (DISCIPLINARY TAXONOMY)                              */}
      {/* ========================================================================= */}
      <TheWork
        onNavigateMusic={() => scrollToSection('now-playing')}
        onNavigateVisuals={() => scrollToSection('visual-archive')}
        onNavigateArchive={() => scrollToSection('archive-index')}
      />

      {/* ========================================================================= */}
      {/* CHAPTER 03: VISUAL ARCHIVE                                                */}
      {/* ========================================================================= */}
      <VisualArchive onOpenViewer={(assetId) => setActiveMediaViewerId(assetId)} />

      {/* ========================================================================= */}
      {/* CHAPTER 04: MANIFESTO & EDITORIAL BREATHING MOMENT                       */}
      {/* ========================================================================= */}
      <Manifesto />

      {/* ========================================================================= */}
      {/* CHAPTER 05: ARCHIVE DATABASE MATRIX                                       */}
      {/* ========================================================================= */}
      <ArchiveIndex
        onPlayTrack={(trackId) => {
          handleSelectTrack(trackId);
          scrollToSection('now-playing');
        }}
        onOpenViewer={(assetId) => setActiveMediaViewerId(assetId)}
      />

      {/* ========================================================================= */}
      {/* CHAPTER 06: SELECTED OBJECTS                                              */}
      {/* ========================================================================= */}
      <SelectedObjects onOpenTransmission={() => setIsTransmissionOpen(true)} />

      {/* ========================================================================= */}
      {/* CHAPTER 07: FINAL PORTAL & ARCHIVAL FOOTER                                */}
      {/* ========================================================================= */}
      <FinalPortal
        onNavigateTo={scrollToSection}
        onOpenTransmission={() => setIsTransmissionOpen(true)}
      />

      {/* Persistent Global Liquid-Glass Music Dock */}
      <GlobalMediaDock
        currentTrackId={currentTrackId}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onOpenNowPlayingSection={() => scrollToSection('now-playing')}
      />

      {/* Immersive Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onPlayTrack={(trackId) => {
          handleSelectTrack(trackId);
          scrollToSection('now-playing');
        }}
        onSelectMedia={(assetId) => setActiveMediaViewerId(assetId)}
        onScrollTo={scrollToSection}
      />

      {/* Studio Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onNavigateTo={scrollToSection}
        onTogglePlay={togglePlay}
      />

      {/* Fullscreen High-Resolution Media Viewer Lightbox */}
      <MediaViewer
        activeAssetId={activeMediaViewerId}
        onClose={() => setActiveMediaViewerId(null)}
      />

      {/* Commission Inquiry & Direct Protocol Modal */}
      <TransmissionModal
        isOpen={isTransmissionOpen}
        onClose={() => setIsTransmissionOpen(false)}
      />
    </main>
  );
}
