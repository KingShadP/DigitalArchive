'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Disc,
  Layers,
  Sparkles,
  Volume2,
  Film,
  FileText,
  Activity,
  ArrowUpRight,
  Bookmark,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { Track, Release } from '../../data/releases';
import { TrackWorld } from '../../data/scenes';
import { archiveRecords } from '../../data/archive';
import { soundEngine } from '../../lib/soundEngine';

interface RecordExplorerModalProps {
  track: Track;
  release: Release;
  trackWorld: TrackWorld;
  isOpen: boolean;
  isPlaying: boolean;
  onClose: () => void;
  onTogglePlay: () => void;
  onSelectTrack?: (trackId: string) => void;
  onOpenViewer?: (assetId: string) => void;
}

export function RecordExplorerModal({
  track,
  release,
  trackWorld,
  isOpen,
  isPlaying,
  onClose,
  onTogglePlay,
  onSelectTrack,
  onOpenViewer,
}: RecordExplorerModalProps) {
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'ANALYTICS' | 'MANUSCRIPT'>('EXPLORE');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const analytics = track.analytics || {
    bpm: track.bpm || 112,
    melodicness: 85,
    acousticness: 60,
    valence: 75,
    danceability: 60,
    energy: 90,
  };

  const relatedArchive = archiveRecords.filter((rec) =>
    trackWorld.relatedArchiveIds?.includes(rec.id)
  );

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      soundEngine.playHarmonicChime(528);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0c0c0c]/80 backdrop-blur-xl"
      />

      {/* Main Modal Shell (Editorial White Sheet) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-white text-[#1a1a1a] rounded-3xl border border-[#1a1a1a]/15 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#1a1a1a]/10 bg-white/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
              RECORD EXPLORER {'//'} {release.catalogNumber}
            </span>
            <span className="text-[10px] font-mono text-[#1a1a1a]/40 uppercase hidden sm:inline">
              [{release.era} · {track.number}]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full border border-[#1a1a1a]/15 text-[10px] font-mono tracking-widest text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Share2 size={12} />}
              <span>{copied ? 'COPIED LINK' : 'SHARE'}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close record explorer"
              className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Scrollable Sequence Container */}
        <div className="overflow-y-auto p-6 sm:p-10 flex flex-col gap-12">
          
          {/* SEQUENCE 1: TITLE & HERO TELEMETRY */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1a1a1a]/10 pb-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                TRACK {track.number} MASTER CUT
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1a1a1a] font-serif">
                {track.title}
              </h2>
              <span className="text-sm font-sans text-[#1a1a1a]/60">
                {release.artist} — {release.title} ({release.year})
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onTogglePlay}
                className="btn-pill btn-pill-primary text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
                <span>{isPlaying ? 'PAUSE PLAYBACK' : 'PLAY MASTER'}</span>
              </button>
            </div>
          </div>

          {/* SEQUENCE 2: AUDIO & 6-PILLARS ANALYTICS RADAR */}
          <div className="flex flex-col gap-6 bg-[#f8f7f4] p-6 sm:p-8 rounded-2xl border border-[#1a1a1a]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#B76E79]" />
                <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-[#1a1a1a] font-bold">
                  THE 6 PILLARS OF MUSICAL DATA
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#1a1a1a]/50">
                TEMPO: {analytics.bpm} BPM · {track.tuning}
              </span>
            </div>

            {/* Metrics Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Melodicness */}
              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 flex flex-col justify-between gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/60">MELODICNESS</span>
                  <span className="text-xs font-mono font-bold text-[#B76E79]">{analytics.melodicness}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#B76E79] h-full rounded-full" style={{ width: `${analytics.melodicness}%` }} />
                </div>
                <span className="text-[9px] text-[#1a1a1a]/50 line-clamp-1">Liturgical chant & vocal contour</span>
              </div>

              {/* Energy */}
              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 flex flex-col justify-between gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/60">ENERGY</span>
                  <span className="text-xs font-mono font-bold text-[#1a1a1a]">{analytics.energy}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1a1a1a] h-full rounded-full" style={{ width: `${analytics.energy}%` }} />
                </div>
                <span className="text-[9px] text-[#1a1a1a]/50 line-clamp-1">Instrumentation density & punch</span>
              </div>

              {/* Valence */}
              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 flex flex-col justify-between gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/60">VALENCE</span>
                  <span className="text-xs font-mono font-bold text-[#B76E79]">{analytics.valence}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#B76E79] h-full rounded-full" style={{ width: `${analytics.valence}%` }} />
                </div>
                <span className="text-[9px] text-[#1a1a1a]/50 line-clamp-1">Emotional color & dramatic tone</span>
              </div>

              {/* Acousticness */}
              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 flex flex-col justify-between gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/60">ACOUSTICNESS</span>
                  <span className="text-xs font-mono font-bold text-[#1a1a1a]">{analytics.acousticness}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1a1a1a] h-full rounded-full" style={{ width: `${analytics.acousticness}%` }} />
                </div>
                <span className="text-[9px] text-[#1a1a1a]/50 line-clamp-1">Physical orchestra vs digital synth</span>
              </div>

              {/* Danceability */}
              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 flex flex-col justify-between gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/60">DANCEABILITY</span>
                  <span className="text-xs font-mono font-bold text-[#1a1a1a]">{analytics.danceability}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1a1a1a] h-full rounded-full" style={{ width: `${analytics.danceability}%` }} />
                </div>
                <span className="text-[9px] text-[#1a1a1a]/50 line-clamp-1">Tempo stability & downbeat focus</span>
              </div>

              {/* BPM Heartbeat */}
              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 flex flex-col justify-between gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/60">CORE TEMPO</span>
                  <span className="text-xs font-mono font-bold text-[#B76E79]">{analytics.bpm} BPM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono text-[#1a1a1a]/70 font-semibold">{track.key} · 432 Hz</span>
                </div>
                <span className="text-[9px] text-[#1a1a1a]/50 line-clamp-1">Fundamental physiological pace</span>
              </div>
            </div>

            {/* Analytics Summary */}
            {analytics.analysisSummary && (
              <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans bg-white p-4 rounded-xl border border-[#1a1a1a]/10">
                {analytics.analysisSummary}
              </p>
            )}
          </div>

          {/* SEQUENCE 3 & 4: ARTWORK & CINEMATIC FILM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Artwork Card */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold">
                03 // OFFICIAL COVER ARTWORK
              </span>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#1a1a1a]/15 shadow-md bg-black">
                <Image
                  src={release.artwork}
                  alt={track.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Cinematic Film Atmosphere */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold flex items-center gap-1.5">
                <Film size={12} className="text-[#B76E79]" />
                04 // CINEMATIC FILM ENVIRONMENT
              </span>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#1a1a1a]/15 shadow-md bg-black flex items-center justify-center">
                {trackWorld.videoSrc ? (
                  <video
                    src={trackWorld.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src="/THE GIRAGON.png"
                    alt="Atmosphere"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-mono tracking-widest text-[#B76E79] uppercase font-bold">
                    VOLUMETRIC VISUAL ENGINE
                  </span>
                  <span className="text-xs font-light text-white/90">
                    432 Hz Harmonic Dispersion Matrix
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SEQUENCE 5: STORY & LYRICS */}
          <div className="flex flex-col gap-5 border-t border-[#1a1a1a]/10 pt-8">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
              05 // STORY & COMPOSITIONAL CODEX
            </span>

            {trackWorld.quote && (
              <blockquote className="p-5 rounded-2xl bg-[#f8f7f4] border-l-4 border-[#B76E79] text-lg sm:text-xl font-serif italic text-[#1a1a1a] leading-relaxed">
                &ldquo;{trackWorld.quote}&rdquo;
              </blockquote>
            )}

            <p className="text-sm font-light text-[#1a1a1a]/80 leading-relaxed max-w-3xl">
              {trackWorld.story}
            </p>

            {track.lyrics && (
              <div className="p-6 rounded-2xl bg-white border border-[#1a1a1a]/10 flex flex-col gap-2 shadow-sm">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold">
                  LYRICAL TRANSCRIPTION
                </span>
                <div className="flex flex-col gap-1.5 font-serif text-base text-[#1a1a1a] pt-2">
                  {track.lyrics.map((line, i) => (
                    <p key={i} className="italic">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SEQUENCE 6: PRODUCTION CREDITS */}
          <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold">
              06 // EXECUTIVE CREDITS & ARRANGEMENT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4]">
                <span className="text-[8px] font-mono uppercase text-[#1a1a1a]/50 block">COMPOSITION</span>
                <span className="text-xs font-mono font-bold text-[#1a1a1a]">{release.credits.composition}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4]">
                <span className="text-[8px] font-mono uppercase text-[#1a1a1a]/50 block">CHOIR</span>
                <span className="text-xs font-mono font-bold text-[#B76E79]">
                  {release.credits.choir || "KSP's Cathedral Regal Choir"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4]">
                <span className="text-[8px] font-mono uppercase text-[#1a1a1a]/50 block">ORCHESTRA</span>
                <span className="text-xs font-mono font-bold text-[#1a1a1a]">
                  {release.credits.orchestra || 'Sanctum Symphony Orchestra'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4]">
                <span className="text-[8px] font-mono uppercase text-[#1a1a1a]/50 block">MASTERING</span>
                <span className="text-xs font-mono font-bold text-[#1a1a1a]">{release.technicalSpecs.mastering}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4]">
                <span className="text-[8px] font-mono uppercase text-[#1a1a1a]/50 block">TUNING</span>
                <span className="text-xs font-mono font-bold text-[#1a1a1a]">{release.technicalSpecs.tuning}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4]">
                <span className="text-[8px] font-mono uppercase text-[#1a1a1a]/50 block">FREQUENCY RANGE</span>
                <span className="text-xs font-mono font-bold text-[#1a1a1a]">{release.technicalSpecs.frequencyRange}</span>
              </div>
            </div>
          </div>

          {/* SEQUENCE 7 & 8: VISUALS & CONNECTED ARCHIVE MATERIAL */}
          {relatedArchive.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                07 & 08 // CONNECTED ARCHIVAL ARTIFACTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArchive.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border border-[#1a1a1a]/10 bg-white hover:border-[#1a1a1a]/30 shadow-sm transition-all flex flex-col gap-2"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5">
                      <Image
                        src={rec.thumbnail}
                        alt={rec.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-[#B76E79] uppercase font-bold">{rec.type}</span>
                    <h5 className="text-xs font-serif text-[#1a1a1a] font-medium line-clamp-1">{rec.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEQUENCE 9: RELATED RELEASES IN THE UNIVERSE */}
          <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8 pb-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold">
              09 // RELATED WORK IN KINGSHADP DISCOGRAPHY
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {release.tracks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    if (onSelectTrack) onSelectTrack(t.id);
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    t.id === track.id
                      ? 'border-[#B76E79] bg-[#B76E79]/5'
                      : 'border-[#1a1a1a]/10 bg-white hover:bg-[#1a1a1a]/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#B76E79] font-bold">{t.number}</span>
                    <div>
                      <span className="text-xs font-serif font-medium text-[#1a1a1a] block">{t.title}</span>
                      <span className="text-[10px] font-mono text-[#1a1a1a]/50">{t.duration} · {t.bpm} BPM</span>
                    </div>
                  </div>
                  <ArrowUpRight size={12} className="text-[#1a1a1a]/40" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-[#1a1a1a]/10 bg-[#f8f7f4] flex items-center justify-between text-[9px] font-mono text-[#1a1a1a]/60 uppercase tracking-widest shrink-0">
          <span>KINGSHADP EXPERIENCE ENGINE</span>
          <span>PRESS [ESC] TO CLOSE</span>
        </div>
      </motion.div>
    </div>
  );
}
