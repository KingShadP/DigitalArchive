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
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 bg-black/60 backdrop-blur-xl border-t border-white/5 text-[#F4F1EC] select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 sm:gap-20">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block">
                &#47;&#47; CURRENT RELEASE
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight uppercase text-white mt-1">
                NOW <span className="font-editorial italic font-normal text-white/90">PLAYING</span>
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 block">
                CATALOGUE: {release.catalogNumber}
              </span>
              <span className="text-xs font-mono text-white/80 tracking-wider">
                {release.era} {'//'} {release.year}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Master Audio Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Left Column: Large Vinyl Artwork Presentation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Reveal delay={0.1}>
              <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-black/40">
                <Image
                  src={release.artwork}
                  alt={release.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Vinyl Grooves Center Highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Central Play/Pause Trigger Badge */}
                <button
                  onClick={onTogglePlay}
                  data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                  aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl z-10"
                >
                  {isPlaying ? (
                    <Pause size={28} className="fill-current" />
                  ) : (
                    <Play size={28} className="fill-current ml-1" />
                  )}
                </button>

                {/* Sub-label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase text-white/70">
                  <span>{release.artist}</span>
                  <span>{activeTrack.duration}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Track Info, Tracklist, Acoustics, Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B76E79]">
                    {release.artist} {'//'} {release.subtitle}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400 flex items-center gap-1 uppercase">
                      <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-white/20'}`} />
                      {isPlaying ? 'STREAM LIVE' : 'STANDBY'}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase text-white leading-tight">
                  {activeTrack.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-white/60 leading-relaxed max-w-xl mt-1">
                  {trackWorld.story ||
                    'Synthesizing sub-bass frequency vectors, orchestral brass friction, and vacuum pauses to evoke the sovereign gait of the Giragon.'}
                </p>
              </div>
            </Reveal>

            {/* Interactive Waveform Scrubber Stage */}
            <Reveal delay={0.22}>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col gap-3">
                {/* 24-Band Frequency Spectrum Visualizer */}
                <div className="flex items-end justify-between h-8 gap-1 px-1">
                  {[45, 65, 80, 50, 90, 70, 40, 85, 95, 60, 45, 75, 85, 60, 95, 70, 50, 80, 65, 45, 60, 75, 90, 55].map((val, i) => {
                    const dynamicHeight = isPlaying ? Math.max(15, (val * ((i % 3) + 1)) % 100) : 10;
                    return (
                      <motion.div
                        key={i}
                        animate={{ height: `${dynamicHeight}%` }}
                        transition={{ duration: 0.25, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', delay: i * 0.02 }}
                        className={`w-full rounded-t-sm transition-colors ${
                          isPlaying ? 'bg-gradient-to-t from-white/30 to-[#B76E79]' : 'bg-white/10'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Scrubber Progress Bar */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-white group-hover:bg-[#B76E79] transition-all"
                    style={{ width: `${(currentTimeSec / durationSec) * 100}%` }}
                  />
                </div>

                {/* Time & Telemetry Labels */}
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-white/40">
                  <div className="flex items-center gap-3">
                    <span className="text-white">{formatTime(currentTimeSec)}</span>
                    <span>/</span>
                    <span>{formatTime(durationSec)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>DYNAMIC RANGE: {release.technicalSpecs.dynamicRange}</span>
                    <span>PEAK: -0.1 dBTP</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Interactive Track List */}
            <Reveal delay={0.25}>
              <div className="flex flex-col border-y border-white/10 divide-y divide-white/5 py-1">
                {release.tracks.map((t) => {
                  const isCurrent = t.id === activeTrack.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleTrackSelectInternal(t.id)}
                      data-cursor="PLAY"
                      className={`py-3 px-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-white/10 text-white font-medium shadow-inner'
                          : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono tracking-widest text-[#B76E79]">
                          {t.number}
                        </span>
                        <span className="text-xs sm:text-sm tracking-wide uppercase">
                          {t.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] font-mono tracking-wider">
                        <span className="text-white/40">{t.tuning}</span>
                        <span>{t.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Acoustic Tuning & Resonance Engine Controls */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 432 Hz vs 440 Hz Tuning Switcher */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono tracking-widest uppercase text-white/40">ACOUSTIC TUNING</span>
                    <span className="text-xs font-mono text-white tracking-wider">
                      {tuningMode === '432Hz' ? '432 Hz NATURAL PYTHAGOREAN' : '440 Hz STANDARD CONCERT'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 p-1 rounded-full border border-white/10">
                    <button
                      onClick={() => handleTuningToggle('432Hz')}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
                        tuningMode === '432Hz' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      432Hz
                    </button>
                    <button
                      onClick={() => handleTuningToggle('440Hz')}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
                        tuningMode === '440Hz' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      440Hz
                    </button>
                  </div>
                </div>

                {/* 28 Hz Sub-Harmonic Binaural Grounding */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono tracking-widest uppercase text-white/40">SUB-HARMONIC DRONE</span>
                    <span className="text-xs font-mono text-white tracking-wider">
                      {subHarmonicActive ? '28 Hz INFRASOUND ACTIVE' : 'INFRASOUND MUTED'}
                    </span>
                  </div>
                  <button
                    onClick={handleSubToggle}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                      subHarmonicActive
                        ? 'bg-[#B76E79] text-white font-bold shadow-lg'
                        : 'border border-white/20 text-white/60 hover:text-white'
                    }`}
                  >
                    <Activity size={11} className={subHarmonicActive ? 'animate-pulse' : ''} />
                    <span>{subHarmonicActive ? 'DISENGAGE' : 'ENGAGE 28Hz'}</span>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Playback Controls & External Streaming Platforms */}
            <Reveal delay={0.35}>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onTogglePlay}
                    data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                    className="px-6 py-3 rounded-full bg-[#F4F1EC] text-[#050505] text-xs font-mono font-bold tracking-[0.2em] uppercase hover:bg-white transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
                    <span>{isPlaying ? 'PAUSE PLAYBACK' : 'PLAY MASTER TRACK'}</span>
                  </button>

                  <button
                    onClick={() => setShowRecordExplorer(true)}
                    className="px-4 py-3 rounded-full border border-white/20 text-xs font-mono tracking-[0.2em] uppercase transition-all flex items-center gap-2 text-white/80 hover:text-white hover:border-white/40 cursor-pointer"
                  >
                    <Compass size={13} className="text-[#B76E79]" />
                    <span>EXPLORE THIS RECORD</span>
                  </button>

                  <button
                    onClick={() => setShowLyrics(!showLyrics)}
                    className={`px-4 py-3 rounded-full border text-xs font-mono tracking-[0.2em] uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      showLyrics
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
                    }`}
                  >
                    <FileText size={13} />
                    <span>SCORE NOTES</span>
                  </button>
                </div>

                {/* External Streaming Platform Anchors */}
                <div className="flex items-center gap-3 text-[9px] font-mono tracking-widest uppercase text-white/50">
                  <a
                    href={release.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    SPOTIFY
                  </a>
                  <span>/</span>
                  <a
                    href={release.links.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    APPLE
                  </a>
                  <span>/</span>
                  <a
                    href={release.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    YOUTUBE
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Score & Manuscript Notes Drawer */}
            <AnimatePresence>
              {showLyrics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-white/10 pt-4 flex flex-col gap-3"
                >
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B76E79]">
                    MANUSCRIPT & COMPOSITION CODEX
                  </span>
                  <p className="text-xs font-light text-white/70 italic leading-relaxed pl-4 border-l-2 border-[#B76E79]">
                    {activeTrack.notes}
                  </p>
                  {activeTrack.lyrics && (
                    <div className="flex flex-col gap-1 pl-4 pt-1 font-editorial text-sm sm:text-base text-white/80">
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
