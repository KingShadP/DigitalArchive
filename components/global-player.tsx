'use client';

import React, { useEffect, useState } from 'react';
import { useAudio } from './audio-provider';
import { motion } from 'motion/react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { MonoLabel } from './system';
import Image from 'next/image';
import { formatDurationLabel } from '@/lib/music-data';

const formatTime = (time: number) => {
  if (!time || Number.isNaN(time)) return '00:00';
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export function GlobalPlayer() {
  const {
    audioActive,
    toggleAudio,
    currentTrack,
    currentRelease,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    queue,
    queueIndex,
    playbackError,
    clearPlaybackError,
    togglePlayPause,
    seek,
    toggleMute,
    nextTrack,
    prevTrack,
    setVolumeLevel,
  } = useAudio();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!currentTrack) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return;

      if (event.code === 'Space') {
        event.preventDefault();
        togglePlayPause();
      }

      if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrack, toggleMute, togglePlayPause]);

  if (currentTrack) {
    const durationLabel = formatDurationLabel(duration, currentTrack.durationLabel) || '--:--';
    const canSeek = duration > 0;

    return (
      <div className="fixed bottom-4 right-4 left-4 md:left-auto md:bottom-10 md:right-10 z-[60] flex justify-end pointer-events-none">
        <motion.section
          aria-label="Global audio player"
          className="bg-surface/95 backdrop-blur-xl border border-border p-3 md:p-4 rounded-sm shadow-2xl w-full md:w-[460px] flex flex-col gap-3 pointer-events-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface-dim border border-border flex-shrink-0 relative overflow-hidden">
              {currentRelease?.artwork?.url ? (
                <Image src={currentRelease.artwork.url} alt={currentRelease.artwork.alt || currentRelease.title} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <Volume2 size={14} />
                </div>
              )}
            </div>

            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <div className="font-serif italic text-lg text-foreground truncate">{currentTrack.title}</div>
              <MonoLabel className="text-[9px] opacity-60 truncate mt-1">
                {currentRelease?.title || 'Untitled Release'}
                {currentTrack.credits?.length ? ` // ${currentTrack.credits.map((credit) => credit.name).join(', ')}` : ''}
              </MonoLabel>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTrack}
                className="text-foreground/60 hover:text-foreground transition-colors disabled:opacity-30"
                disabled={queue.length <= 1 || queueIndex <= 0}
                aria-label="Previous track"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : isPlaying ? (
                  <Pause size={16} fill="currentColor" />
                ) : (
                  <Play size={16} fill="currentColor" className="translate-x-[1px]" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="text-foreground/60 hover:text-foreground transition-colors disabled:opacity-30"
                disabled={queue.length <= 1 || queueIndex >= queue.length - 1}
                aria-label="Next track"
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[9px] text-foreground/60">
            <span className="w-10 text-right">{formatTime(currentTime)}</span>
            <input
              aria-label="Seek position"
              type="range"
              min={0}
              max={canSeek ? duration : 1}
              step={1}
              value={canSeek ? Math.min(currentTime, duration) : 0}
              onChange={(event) => seek(Number(event.target.value))}
              disabled={!canSeek}
              className="w-full accent-foreground disabled:opacity-40"
            />
            <span className="w-10">{durationLabel}</span>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <button onClick={toggleMute} className="hover:text-foreground transition-colors" aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              aria-label="Volume"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(event) => setVolumeLevel(Number(event.target.value))}
              className="w-full accent-foreground"
            />
          </div>

          {playbackError && (
            <div className="border border-oxblood/40 bg-oxblood/10 p-2 flex items-start justify-between gap-2 text-[10px]">
              <div className="flex items-start gap-2 text-foreground/80">
                <AlertCircle size={12} className="mt-0.5 text-crimson" />
                <span>{playbackError}</span>
              </div>
              <button onClick={clearPlaybackError} className="font-mono text-[9px] uppercase tracking-widest text-foreground/60 hover:text-foreground">
                Dismiss
              </button>
            </div>
          )}
        </motion.section>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60]">
      <motion.div
        className="bg-surface/90 backdrop-blur-md border border-border p-3 rounded-sm flex items-center gap-4 shadow-2xl"
        initial={false}
        animate={{ width: expanded ? 300 : 'auto' }}
      >
        <button
          onClick={toggleAudio}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-sm hover:bg-foreground/80 transition-colors"
          aria-label={audioActive ? 'Stop ambient audio' : 'Play ambient audio'}
        >
          {audioActive ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="translate-x-[1px]" />}
        </button>

        {expanded && (
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <div className="flex flex-col">
              <MonoLabel className="text-foreground text-[10px]">KINGSHADP // GLOBAL ENGINE</MonoLabel>
              <MonoLabel className="text-[8px] opacity-60">{audioActive ? '48HZ ORBITAL FREQUENCY ACTIVE' : 'SYSTEM STANDBY'}</MonoLabel>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-foreground transition-colors"
          aria-label="Toggle ambient player details"
        >
          <span className="font-mono text-[10px]">{expanded ? '–' : '+'}</span>
        </button>
      </motion.div>
    </div>
  );
}
