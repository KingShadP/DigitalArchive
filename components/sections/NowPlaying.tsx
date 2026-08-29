'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Disc,
  Waves,
  FileText,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Sparkles,
  Activity,
  Sliders,
  Maximize2,
  Compass,
} from 'lucide-react';
import { releases, Track } from '../../data/releases';
import { TRACK_WORLDS } from '../../data/scenes';
import { Reveal } from '../motion/Reveal';
import { soundEngine } from '../../lib/soundEngine';

interface NowPlayingProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTrackId: string;
  onSelectTrack: (trackId: string) => void;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  onSwitchSceneVideo?: (videoKey: string) => void;
}

export function NowPlaying({
  isPlaying,
  onTogglePlay,
  currentTrackId,
  onSelectTrack,
  audioRef,
  onSwitchSceneVideo,
}: NowPlayingProps) {
  const release = releases[0];
  const activeTrack: Track =
    release.tracks.find((t) => t.id === currentTrackId) || release.tracks[0];
  const trackWorld = TRACK_WORLDS[activeTrack.id] || TRACK_WORLDS['track-01'];

  const [showLyrics, setShowLyrics] = useState(false);
  const [showRecordExplorer, setShowRecordExplorer] = useState(false);
  const [tuningMode, setTuningMode] = useState<'432Hz' | '440Hz'>('432Hz');
  const [subHarmonicActive, setSubHarmonicActive] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(222);

  // Time simulation & sync
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => (prev >= durationSec ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSec]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTimeSec(Math.floor(percent * durationSec));
    soundEngine.playClick(600, 0.03);
  };

  const handleTuningToggle = (mode: '432Hz' | '440Hz') => {
    setTuningMode(mode);
    soundEngine.playHarmonicChime(mode === '432Hz' ? 432 : 440);
  };

  const handleSubToggle = () => {
    const active = soundEngine.toggleSubHarmonic();
    setSubHarmonicActive(active);
  };

  const handleTrackSelectInternal = (trackId: string) => {
    onSelectTrack(trackId);
    if (trackId === 'track-01') onSwitchSceneVideo?.('scenePrimary');
    if (trackId === 'track-02') onSwitchSceneVideo?.('cinematicB');
    if (trackId === 'track-03') onSwitchSceneVideo?.('cinematicC');
    soundEngine.playClick(700, 0.03);
  };

  return (
    <section
      id="now-playing"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#f8f7f4] text-[#1a1a1a] select-none border-b border-[#1a1a1a]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-18">
        
        {/* Section Sub-header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1a1a1a]/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block font-semibold">
                CURRENT MASTER // CODEX 01
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1a1a] mt-1 font-serif">
                Now <span className="font-editorial italic font-normal text-[#B76E79]">Playing.</span>
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 block">
                CATALOGUE: {release.catalogNumber}
              </span>
              <span className="text-xs font-mono text-[#1a1a1a]/80 tracking-wider">
                {release.era} {'//'} {release.year}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Master Audio Stage Container (Two Column Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          
          {/* Left Column: Crisp White Player Shell Card */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="player-shell flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                    Current Master
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-600 flex items-center gap-1.5 uppercase font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-black/20'}`} />
                    {isPlaying ? 'STREAM LIVE' : 'STANDBY'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1a1a1a] font-serif leading-tight">
                    {activeTrack.title}
                  </h3>
                  <span className="text-xs font-mono text-[#1a1a1a]/50 uppercase tracking-widest block mt-1">
                    {release.artist} — {activeTrack.number}
                  </span>
                </div>

                {/* Animated Rose-Gold Waveform Bars */}
                <div className="waveform flex items-end gap-1.5 h-12 my-2">
                  {[35, 55, 75, 45, 85, 95, 60, 40, 70, 90, 65, 80, 50, 75, 95, 85, 45, 60, 90, 70, 50, 80, 65, 40, 85, 60].map((val, i) => {
                    const dynamicHeight = isPlaying ? Math.max(15, (val * ((i % 3) + 1)) % 100) : 18;
                    return (
                      <motion.div
                        key={i}
                        animate={{ height: `${dynamicHeight}%` }}
                        transition={{ duration: 0.2, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', delay: i * 0.015 }}
                        className="bar w-1.5 rounded-sm bg-[#B76E79]"
                        style={{ height: `${dynamicHeight}%` }}
                      />
                    );
                  })}
                </div>

                {/* Scrubber Progress Bar */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-1.5 bg-[#1a1a1a]/10 rounded-full overflow-hidden cursor-pointer group"
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-[#1a1a1a] group-hover:bg-[#B76E79] transition-all"
                    style={{ width: `${(currentTimeSec / durationSec) * 100}%` }}
                  />
                </div>

                {/* Time & Telemetry Indicators */}
                <div className="flex items-center justify-between text-xs font-mono text-[#1a1a1a]/70 pt-1">
                  <span>{formatTime(currentTimeSec)} / {formatTime(durationSec)}</span>
                  <span className="text-[#B76E79] font-bold">{tuningMode}</span>
                </div>

                {/* Track Selector List */}
                <div className="flex flex-col border-t border-[#1a1a1a]/10 pt-4 gap-1.5">
                  {release.tracks.map((t) => {
                    const isCurrent = t.id === activeTrack.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleTrackSelectInternal(t.id)}
                        className={`py-2 px-3 rounded-lg flex items-center justify-between text-xs transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#1a1a1a] text-white font-medium shadow-sm'
                            : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[10px] ${isCurrent ? 'text-[#B76E79]' : 'opacity-50'}`}>
                            {t.number}
                          </span>
                          <span className="font-sans font-medium uppercase tracking-wide">
                            {t.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] opacity-60">{t.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Master Analysis & Controls */}
          <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50">
                  Analysis
                </span>
                <p className="text-lg sm:text-2xl font-light text-[#1a1a1a] leading-relaxed font-serif">
                  &ldquo;{trackWorld.story || 'Constructed around a deep 28Hz fundamental drone overlaid with staccato brass harmonics and vacuum decay intervals.'}&rdquo;
                </p>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/70 leading-relaxed max-w-xl">
                  {activeTrack.notes || 'Mastered to Pythagorean natural resonance, emphasizing physical presence and monolithic acoustic impact.'}
                </p>
              </div>
            </Reveal>

            {/* Acoustic Tuning & Resonance Engine Controls */}
            <Reveal delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 432 Hz vs 440 Hz Tuning Switcher */}
                <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-white/70 flex items-center justify-between shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono tracking-widest uppercase text-[#1a1a1a]/50">TUNING MODE</span>
                    <span className="text-xs font-mono text-[#1a1a1a] font-semibold">
                      {tuningMode === '432Hz' ? '432 Hz PYTHAGOREAN' : '440 Hz STANDARD'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#1a1a1a]/5 p-1 rounded-full border border-[#1a1a1a]/10">
                    <button
                      onClick={() => handleTuningToggle('432Hz')}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
                        tuningMode === '432Hz' ? 'bg-[#1a1a1a] text-white font-bold' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                      }`}
                    >
                      432Hz
                    </button>
                    <button
                      onClick={() => handleTuningToggle('440Hz')}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
                        tuningMode === '440Hz' ? 'bg-[#1a1a1a] text-white font-bold' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                      }`}
                    >
                      440Hz
                    </button>
                  </div>
                </div>

                {/* 28 Hz Sub-Harmonic Binaural Grounding */}
                <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-white/70 flex items-center justify-between shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono tracking-widest uppercase text-[#1a1a1a]/50">SUB-HARMONIC DRONE</span>
                    <span className="text-xs font-mono text-[#1a1a1a] font-semibold">
                      {subHarmonicActive ? '28 Hz ENGAGED' : '28 Hz STANDBY'}
                    </span>
                  </div>
                  <button
                    onClick={handleSubToggle}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                      subHarmonicActive
                        ? 'bg-[#B76E79] text-white font-bold shadow-md'
                        : 'border border-[#1a1a1a]/20 text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
                    }`}
                  >
                    <Activity size={11} className={subHarmonicActive ? 'animate-pulse' : ''} />
                    <span>{subHarmonicActive ? 'DISENGAGE' : 'ENGAGE 28Hz'}</span>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Action Buttons Matching Design Variation */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onTogglePlay}
                  data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                  className="btn-pill btn-pill-primary text-xs font-bold shadow-md cursor-pointer"
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
                  <span>{isPlaying ? 'PAUSE PLAYBACK' : 'PLAY MASTER TRACK'}</span>
                </button>

                <button
                  onClick={() => setShowLyrics(!showLyrics)}
                  className="btn-pill text-xs border-[#1a1a1a]/20 hover:border-[#1a1a1a] bg-white cursor-pointer"
                >
                  <FileText size={13} className="text-[#B76E79]" />
                  <span>SCORE NOTES</span>
                </button>

                <button
                  onClick={() => setShowRecordExplorer(true)}
                  className="btn-pill text-xs border-[#1a1a1a]/20 hover:border-[#1a1a1a] bg-white cursor-pointer"
                >
                  <Compass size={13} />
                  <span>EXPLORE RECORD</span>
                </button>
              </div>

              {/* Streaming Links */}
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-[#1a1a1a]/50 pt-4">
                <span>PLATFORMS:</span>
                <a href={release.links.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-[#B76E79] transition-colors">
                  SPOTIFY
                </a>
                <span>/</span>
                <a href={release.links.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:text-[#B76E79] transition-colors">
                  APPLE
                </a>
                <span>/</span>
                <a href={release.links.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#B76E79] transition-colors">
                  YOUTUBE
                </a>
              </div>
            </Reveal>

            {/* Score & Manuscript Notes Drawer */}
            <AnimatePresence>
              {showLyrics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-[#1a1a1a]/10 pt-4 flex flex-col gap-3 bg-white/60 p-4 rounded-xl"
                >
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                    MANUSCRIPT & COMPOSITION CODEX
                  </span>
                  <p className="text-xs font-light text-[#1a1a1a]/80 italic leading-relaxed pl-3 border-l-2 border-[#B76E79]">
                    {activeTrack.notes}
                  </p>
                  {activeTrack.lyrics && (
                    <div className="flex flex-col gap-1 pl-3 pt-1 font-serif text-sm text-[#1a1a1a]/90">
                      {activeTrack.lyrics.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Explore This Record Immersive Modal */}
      <AnimatePresence>
        {showRecordExplorer && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            <div
              onClick={() => setShowRecordExplorer(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative z-10 w-full max-w-3xl bg-[#080808] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79] block">
                    TRACK WORLD DOSSIER // {activeTrack.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light tracking-wide uppercase text-white">
                    {activeTrack.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowRecordExplorer(false)}
                  className="px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white/70 hover:text-white"
                >
                  CLOSE [ESC]
                </button>
              </div>

              {/* Quote Block */}
              {trackWorld.quote && (
                <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#B76E79] italic font-editorial text-lg text-white/90">
                  &ldquo;{trackWorld.quote}&rdquo;
                </div>
              )}

              {/* Story */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/40">
                  ACOUSTIC PRODUCTION STORY
                </span>
                <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                  {trackWorld.story}
                </p>
              </div>

              {/* Credits Matrix */}
              {trackWorld.credits && (
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/40">
                    EXECUTIVE CREDITS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trackWorld.credits.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono text-white/70">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-white/40">TUNING</span>
                  <span className="text-xs font-mono text-white">{activeTrack.tuning}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-white/40">KEY</span>
                  <span className="text-xs font-mono text-white">{activeTrack.key}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-white/40">TEMPO</span>
                  <span className="text-xs font-mono text-white">{activeTrack.bpm} BPM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-white/40">DURATION</span>
                  <span className="text-xs font-mono text-white">{activeTrack.duration}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
