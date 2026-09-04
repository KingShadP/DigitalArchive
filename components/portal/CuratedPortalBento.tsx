'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Layers,
  Box,
  Disc3,
  Flame,
  CheckCircle2,
  Lock,
  FileText,
  Sliders,
  Maximize2,
} from 'lucide-react';
import { releases } from '../../data/releases';
import { visualAssets } from '../../data/visuals';
import { archiveRecords } from '../../data/archive';
import { products } from '../../data/products';
import { soundEngine } from '../../lib/soundEngine';

export function CuratedPortalBento() {
  // --- NODE 1: SONICS STATE ---
  const [isPlayingSonic, setIsPlayingSonic] = useState(false);
  const [sonicProgress, setSonicProgress] = useState(0.28); // preview position ~28%
  const [sonicHoverBar, setSonicHoverBar] = useState<number | null>(null);
  const sonicAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- NODE 2: VISUALS 3D TILT & SELECTOR STATE ---
  const [activeVisualIdx, setActiveVisualIdx] = useState(0);
  const visualCardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });

  // Curated visual slides
  const visualSlides = [
    {
      id: 'the-giragon-master',
      title: 'The Giragon // Sovereign Monolith',
      medium: '4K Cinematic Volumetrics',
      src: '/THE GIRAGON.png',
      aspectRatio: '1:1',
      tags: ['OBSIDIAN', 'RAYTRACED', '4K MASTER'],
    },
    {
      id: 'giragon-glory',
      title: 'Giragon Sanctum Glory Edition',
      medium: 'Sculptural Hybrid Study & Render',
      src: '/girgonglory.png',
      aspectRatio: '1:1',
      tags: ['GOLD ANODIZING', 'MONUMENT', 'EDITION 01'],
    },
    {
      id: 'rose-gold-giragon',
      title: 'Rose Gold Giragon Study',
      medium: 'Cast Composite Specimen',
      src: '/ROSE GOLD GIRAGON.png',
      aspectRatio: '1:1',
      tags: ['PVD COATING', 'HYBRID FORM', 'SANCTUM'],
    },
  ];

  // --- NODE 3: VAULT / TERMINAL STATE ---
  const [selectedLogIdx, setSelectedLogIdx] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Curated archive entries
  const terminalLogs = [
    {
      id: 'ARCH-001',
      title: 'Behold the Twisted Beast (Master Opus)',
      year: 2026,
      category: 'AUDIO // LOSSLESS',
      status: 'AUTHENTICATED',
      excerpt:
        'Sanctum Opus 01 rendered in 432 Hz Pythagorean resonance. 112 BPM liturgical sub-frequency architecture featuring Latinate choral antiphons (Kyrie, Aeterna) over massive dynamic brass.',
      author: 'KingShadP',
      hash: '0x8f2b...c419',
    },
    {
      id: 'ARCH-002',
      title: 'Giragon Spatial Hybrid Study',
      year: 2026,
      category: 'VISUAL // 3D MATRIX',
      status: 'VERIFIED',
      excerpt:
        'Volumetric fusion of celestial giraffe height and draconic majesty. Cast in density obsidian composite with razor-thin rose gold edge illumination.',
      author: 'Visual Architecture Directive',
      hash: '0x14e7...9d03',
    },
    {
      id: 'ARCH-003',
      title: 'Subtractive Architecture & Sovereignty',
      year: 2026,
      category: 'TREATISE // CODEX',
      status: 'CLASSIFIED',
      excerpt:
        'The principle of subtractive discipline: elegance is not achieved when there is nothing left to add, but when every unnecessary element has been excised leaving only sacred geometry.',
      author: 'Executive Codex',
      hash: '0x53a9...e821',
    },
  ];

  // --- NODE 4: COLLECTION (SHOP) STATE ---
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const featuredProducts = [products[0], products[1]]; // Maquette & Monograph

  // Sonic Audio playback sync
  useEffect(() => {
    const audio = sonicAudioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setSonicProgress(audio.currentTime / audio.duration);
      }
    };
    const onEnded = () => setIsPlayingSonic(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const toggleSonicPlay = () => {
    soundEngine.playClick(1050, 0.03, 0.02);
    const audio = sonicAudioRef.current;
    if (!audio) return;

    if (isPlayingSonic) {
      audio.pause();
      setIsPlayingSonic(false);
    } else {
      audio.play().catch(() => {});
      setIsPlayingSonic(true);
    }
  };

  const handleWaveformClick = (index: number, total: number) => {
    soundEngine.playClick(1200, 0.02, 0.02);
    const newProgress = index / total;
    setSonicProgress(newProgress);
    const audio = sonicAudioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = newProgress * audio.duration;
      if (!isPlayingSonic) {
        audio.play().catch(() => {});
        setIsPlayingSonic(true);
      }
    }
  };

  // 3D Card Hover Tilt calculation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = visualCardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setTilt({
      rotateX: -normY * 9,
      rotateY: normX * 9,
      shineX: (x / rect.width) * 100,
      shineY: (y / rect.height) * 100,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  const handleSelectLog = (idx: number) => {
    soundEngine.playClick(850, 0.03, 0.02);
    setIsDecrypting(true);
    setSelectedLogIdx(idx);
    setTimeout(() => setIsDecrypting(false), 240);
  };

  return (
    <section 
      id="sanctum-nodes"
      className="relative w-full py-24 sm:py-36 px-6 sm:px-12 md:px-20 z-20 bg-[#050505] text-[#F4F1EC]"
    >
      <audio
        ref={sonicAudioRef}
        src="/music/behold-the-twisted-beast.mp3"
        preload="metadata"
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#F4F1EC]/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79] animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-medium">
                SANCTUM ARCHIVES // CODEX QUADRANT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F4F1EC] tracking-tight">
              Curated Sanctum Sectors
            </h2>
            <p className="text-sm font-light text-[#F4F1EC]/50 max-w-xl mt-2 leading-relaxed">
              Direct telemetry into KingShadP’s sonic compositions, darkroom spatial studies, authenticated cryptographic archives, and limited physical maquettes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] uppercase text-[#F4F1EC]/40">
            <span>INDEX: 01 — 04</span>
            <span className="text-[#B76E79]">{'//'}</span>
            <span>SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* ========================================================= */}
        {/* NODE 1: SONICS (Featured Track & Interactive Waveform)    */}
        {/* ========================================================= */}
        <div 
          id="node-sonics"
          className="lg:col-span-7 group relative rounded-2xl border border-[#F4F1EC]/10 bg-gradient-to-b from-[#0c0c0c] to-[#060606] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#B76E79]/40"
        >
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#B76E79]/10 blur-3xl pointer-events-none group-hover:bg-[#B76E79]/20 transition-all duration-700" />
          
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-[#B76E79]/15 text-[#B76E79]">
                  <Disc3 size={15} className={isPlayingSonic ? 'animate-spin' : ''} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#B76E79] uppercase font-bold">
                  CHAPTER I // SONIC ARCHITECTURE
                </span>
              </div>
              <span className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-[#F4F1EC]/15 bg-[#F4F1EC]/5 text-[#F4F1EC]/60 uppercase tracking-widest">
                432 HZ LOSSLESS
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
              {/* Cover Artwork with Play Trigger */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-[#F4F1EC]/15 shadow-2xl group/art">
                <Image
                  src="/twisted-beast-cover.png"
                  alt="Behold the Twisted Beast Artwork"
                  fill
                  className="object-cover transition-transform duration-700 group-hover/art:scale-105"
                  sizes="128px"
                />
                <button
                  type="button"
                  id="bento-sonic-play-btn"
                  onClick={toggleSonicPlay}
                  aria-label={isPlayingSonic ? 'Pause Track' : 'Play Track'}
                  className="absolute inset-0 bg-[#050505]/50 backdrop-blur-[2px] flex items-center justify-center opacity-90 group-hover/art:opacity-100 transition-opacity"
                >
                  <div className="w-11 h-11 rounded-full bg-[#F4F1EC] text-[#050505] flex items-center justify-center shadow-2xl group-hover/art:bg-[#B76E79] group-hover/art:text-white transition-colors">
                    {isPlayingSonic ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                  </div>
                </button>
              </div>

              {/* Track Info */}
              <div className="flex flex-col justify-center">
                <span className="text-xs font-mono text-[#F4F1EC]/50 uppercase tracking-wider mb-1">
                  Sanctum Opus 01 // Master Cut
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#F4F1EC] tracking-tight">
                  Behold the Twisted Beast
                </h3>
                <p className="text-xs text-[#F4F1EC]/60 font-light leading-relaxed mt-2 max-w-md">
                  A foundational 112 BPM orchestral composition tuned to 432 Hz Pythagorean resonance. 
                  Featuring dense Latinate choral polyphony, deep sub-bass architecture, and live orchestral dynamics.
                </p>
              </div>
            </div>

            {/* Interactive Waveform Scrubber */}
            <div className="bg-[#050505]/70 border border-[#F4F1EC]/10 rounded-xl p-4 sm:p-5 mb-6">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#F4F1EC]/50 uppercase tracking-widest mb-3">
                <div className="flex items-center gap-2">
                  <Sliders size={11} className="text-[#B76E79]" />
                  <span>INTERACTIVE HARMONIC WAVEFORM</span>
                </div>
                <span>{isPlayingSonic ? 'PLAYING // 112 BPM' : 'CLICK BAR TO SCRUB'}</span>
              </div>

              {/* 44 Custom Waveform Columns */}
              <div 
                className="flex items-end gap-[3px] h-14 w-full cursor-pointer group/wave py-1"
                onMouseLeave={() => setSonicHoverBar(null)}
              >
                {Array.from({ length: 44 }).map((_, idx) => {
                  const total = 44;
                  // Dynamic height based on simulated orchestral energy curve
                  const baseH = Math.sin((idx / total) * Math.PI) * 0.75 + Math.cos(idx * 0.6) * 0.25;
                  const clampedH = Math.max(0.18, Math.min(1.0, Math.abs(baseH)));
                  const isPast = (idx / total) <= sonicProgress;
                  const isHovered = sonicHoverBar !== null && idx <= sonicHoverBar;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setSonicHoverBar(idx)}
                      onClick={() => handleWaveformClick(idx, total)}
                      className="flex-1 rounded-full transition-all duration-150 ease-out"
                      style={{
                        height: `${clampedH * 100}%`,
                        backgroundColor: isPast 
                          ? '#B76E79' 
                          : isHovered 
                            ? 'rgba(183, 110, 121, 0.5)' 
                            : 'rgba(244, 241, 236, 0.18)',
                        transform: isHovered ? 'scaleY(1.15)' : 'scaleY(1)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Telemetry Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#F4F1EC]/5 mt-3 text-[9px] font-mono text-[#F4F1EC]/60 uppercase tracking-wider">
                <div>
                  <span className="text-[#F4F1EC]/30 block">TEMPO:</span>
                  <span className="text-[#F4F1EC]">112 BPM</span>
                </div>
                <div>
                  <span className="text-[#F4F1EC]/30 block">SCALE:</span>
                  <span className="text-[#F4F1EC]">D-MINOR</span>
                </div>
                <div>
                  <span className="text-[#F4F1EC]/30 block">ENERGY:</span>
                  <span className="text-[#B76E79]">92% INTENSITY</span>
                </div>
                <div>
                  <span className="text-[#F4F1EC]/30 block">RESONANCE:</span>
                  <span className="text-[#F4F1EC]">432.08 HZ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F4F1EC]/10">
            <span className="text-[10px] font-mono text-[#F4F1EC]/40 tracking-widest uppercase">
              COMPLETE REPERTOIRE (6 TRACKS)
            </span>
            <Link
              href="/music"
              className="group/btn flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#F4F1EC] hover:text-[#B76E79] transition-colors"
            >
              <span>ENTER SONIC SANCTUM</span>
              <ArrowUpRight size={13} className="group-hover/btn:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NODE 2: VISUALS & ARTIFACTS (3D Hover Tilt Darkroom)      */}
        {/* ========================================================= */}
        <div 
          id="node-visuals"
          className="lg:col-span-5 group relative rounded-2xl border border-[#F4F1EC]/10 bg-gradient-to-b from-[#0c0c0c] to-[#060606] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#B76E79]/40"
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-[#B76E79]/15 text-[#B76E79]">
                  <Layers size={15} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#B76E79] uppercase font-bold">
                  CHAPTER II // SPATIAL MONOLITHS
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#F4F1EC]/40 tracking-widest uppercase">
                TILT TO EXPLORE
              </span>
            </div>

            {/* 3D Tilt Card Display */}
            <div
              ref={visualCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full aspect-square max-h-[300px] rounded-xl overflow-hidden border border-[#F4F1EC]/15 bg-[#050505] cursor-pointer mb-5 shadow-2xl transition-transform duration-200 ease-out"
              style={{
                perspective: 1000,
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              <Image
                src={visualSlides[activeVisualIdx].src}
                alt={visualSlides[activeVisualIdx].title}
                fill
                className="object-cover select-none transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Dynamic Specular Light Glint */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
                }}
              />

              {/* Overlay Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {visualSlides[activeVisualIdx].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#050505]/70 backdrop-blur-md text-[#F4F1EC] border border-[#F4F1EC]/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#050505]/80 backdrop-blur-md border border-[#F4F1EC]/10">
                <span className="text-[9px] font-mono text-[#B76E79] uppercase block tracking-wider">
                  {visualSlides[activeVisualIdx].medium}
                </span>
                <span className="text-sm font-serif text-[#F4F1EC] tracking-tight block truncate">
                  {visualSlides[activeVisualIdx].title}
                </span>
              </div>
            </div>

            {/* Slide Selection Buttons */}
            <div className="flex items-center gap-2 mb-4">
              {visualSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(900 + idx * 100, 0.02, 0.02);
                    setActiveVisualIdx(idx);
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-lg border text-[9px] font-mono tracking-wider uppercase transition-all duration-300 ${
                    activeVisualIdx === idx
                      ? 'border-[#B76E79] bg-[#B76E79]/15 text-[#F4F1EC] font-bold'
                      : 'border-[#F4F1EC]/10 bg-[#F4F1EC]/5 text-[#F4F1EC]/50 hover:text-[#F4F1EC]'
                  }`}
                >
                  0{idx + 1} {'//'} {slide.title.split('//')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F4F1EC]/10">
            <span className="text-[10px] font-mono text-[#F4F1EC]/40 tracking-widest uppercase">
              GALLERY CATALOG (7 STUDIES)
            </span>
            <Link
              href="/visuals"
              className="group/btn flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#F4F1EC] hover:text-[#B76E79] transition-colors"
            >
              <span>ENTER DARKROOM</span>
              <ArrowUpRight size={13} className="group-hover/btn:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NODE 3: SANCTUM VAULT / ARCHIVE (Brutalist Terminal Log)  */}
        {/* ========================================================= */}
        <div 
          id="node-vault"
          className="lg:col-span-6 group relative rounded-2xl border border-[#F4F1EC]/10 bg-gradient-to-b from-[#0c0c0c] to-[#060606] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#B76E79]/40"
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-[#B76E79]/15 text-[#B76E79]">
                  <Terminal size={15} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#B76E79] uppercase font-bold">
                  CHAPTER III // PERMANENT CODEX
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">
                  DECRYPTED
                </span>
              </div>
            </div>

            {/* Brutalist Terminal Screen */}
            <div className="rounded-xl border border-[#F4F1EC]/15 bg-[#030303] p-4 sm:p-5 font-mono text-xs mb-5 overflow-hidden shadow-inner">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-[#F4F1EC]/10 pb-2.5 mb-3 text-[9px] text-[#F4F1EC]/40">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  <span className="ml-2">vault@kingshadp:~/records</span>
                </div>
                <span>SSH-ED25519</span>
              </div>

              {/* Log List */}
              <div className="space-y-1.5 mb-4">
                {terminalLogs.map((log, idx) => (
                  <button
                    key={log.id}
                    type="button"
                    onClick={() => handleSelectLog(idx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between text-[10px] transition-colors ${
                      selectedLogIdx === idx
                        ? 'bg-[#B76E79]/20 text-[#F4F1EC] border-l-2 border-[#B76E79]'
                        : 'text-[#F4F1EC]/50 hover:bg-[#F4F1EC]/5 hover:text-[#F4F1EC]'
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-[#B76E79] mr-2">[{log.id}]</span>
                      {log.title}
                    </span>
                    <span className="text-[9px] opacity-40 shrink-0 ml-2">{log.category}</span>
                  </button>
                ))}
              </div>

              {/* Terminal Active Log Content Readout */}
              <div className="border-t border-[#F4F1EC]/10 pt-3 text-[11px] text-[#F4F1EC]/80 leading-relaxed min-h-[90px]">
                <div className="flex items-center justify-between text-[9px] text-[#F4F1EC]/40 uppercase mb-2">
                  <span>RECORD: {terminalLogs[selectedLogIdx].id}</span>
                  <span className="text-[#B76E79]">VERIFIED: {terminalLogs[selectedLogIdx].hash}</span>
                </div>
                <p className={`${isDecrypting ? 'opacity-30 blur-[1px]' : 'opacity-100'} transition-all duration-300 text-xs text-[#F4F1EC]/90 font-light`}>
                  {terminalLogs[selectedLogIdx].excerpt}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[#B76E79] text-[10px]">
                  <span>_</span>
                  <span className="animate-pulse">█</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F4F1EC]/10">
            <span className="text-[10px] font-mono text-[#F4F1EC]/40 tracking-widest uppercase">
              ARCHIVE DATABASE (8 RECORDS)
            </span>
            <Link
              href="/archive"
              className="group/btn flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#F4F1EC] hover:text-[#B76E79] transition-colors"
            >
              <span>EXPLORE ARCHIVE CODEX</span>
              <ArrowUpRight size={13} className="group-hover/btn:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NODE 4: THE COLLECTION (Shop / Limited Artifacts)         */}
        {/* ========================================================= */}
        <div 
          id="node-collection"
          className="lg:col-span-6 group relative rounded-2xl border border-[#F4F1EC]/10 bg-gradient-to-b from-[#0c0c0c] to-[#060606] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#B76E79]/40"
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-[#B76E79]/15 text-[#B76E79]">
                  <Box size={15} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#B76E79] uppercase font-bold">
                  CHAPTER IV // PHYSICAL SPECIMENS
                </span>
              </div>
              <span className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 uppercase tracking-widest">
                LIMITED EDITION
              </span>
            </div>

            {/* Product Feature Card */}
            <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl border border-[#F4F1EC]/10 bg-[#050505]/70 mb-5">
              <div className="relative w-full sm:w-36 h-36 rounded-lg overflow-hidden shrink-0 border border-[#F4F1EC]/15">
                <Image
                  src={featuredProducts[activeProductIdx].primaryImage}
                  alt={featuredProducts[activeProductIdx].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 150px"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#050505]/80 backdrop-blur-md text-[9px] font-mono text-[#F4F1EC] font-bold">
                  {featuredProducts[activeProductIdx].price}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-[#B76E79] uppercase tracking-wider block mb-1">
                    {featuredProducts[activeProductIdx].category}
                  </span>
                  <h4 className="text-lg font-serif font-light text-[#F4F1EC] tracking-tight">
                    {featuredProducts[activeProductIdx].name}
                  </h4>
                  <p className="text-xs text-[#F4F1EC]/60 font-light leading-relaxed mt-1 line-clamp-2">
                    {featuredProducts[activeProductIdx].description}
                  </p>
                </div>

                {/* Stock Allocation Gauge */}
                <div className="pt-3 border-t border-[#F4F1EC]/5 mt-2">
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase text-[#F4F1EC]/50 mb-1.5">
                    <span>ALLOCATION STATUS</span>
                    <span className="text-amber-400">17 / 24 CLAIMED (7 LEFT)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#F4F1EC]/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#B76E79] to-amber-500 w-[70%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spec pills */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-[9px] font-mono text-[#F4F1EC]/60">
              <div className="p-2.5 rounded-lg border border-[#F4F1EC]/10 bg-[#F4F1EC]/5">
                <span className="text-[#F4F1EC]/40 block uppercase">SPECIMEN SPEC:</span>
                <span className="text-[#F4F1EC]">{featuredProducts[activeProductIdx].specs.material}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-[#F4F1EC]/10 bg-[#F4F1EC]/5">
                <span className="text-[#F4F1EC]/40 block uppercase">ORIGIN:</span>
                <span className="text-[#F4F1EC]">{featuredProducts[activeProductIdx].specs.origin}</span>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F4F1EC]/10">
            <span className="text-[10px] font-mono text-[#F4F1EC]/40 tracking-widest uppercase">
              SANCTUM COLLECTION (3 PIECES)
            </span>
            <Link
              href="/shop"
              className="group/btn flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#F4F1EC] hover:text-[#B76E79] transition-colors"
            >
              <span>ACQUIRE ARTIFACTS</span>
              <ArrowUpRight size={13} className="group-hover/btn:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
