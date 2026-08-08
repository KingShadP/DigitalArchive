'use client';

import React, { useState } from 'react';
import { useAudio } from './audio-provider';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, Settings2, SkipBack, SkipForward, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { MonoLabel } from './system';
import Image from 'next/image';

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '00:00';
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export function GlobalPlayer() {
  const { 
    audioActive, toggleAudio, 
    currentTrack, currentRelease, isPlaying, currentTime, duration, 
    volume, isMuted, isLoading, queue, queueIndex,
    togglePlayPause, seek, toggleMute, nextTrack, prevTrack 
  } = useAudio();

  const [expanded, setExpanded] = useState(false);

  // If we have a track, we show the music player.
  if (currentTrack) {
    return (
      <div className="fixed bottom-6 right-6 left-6 md:left-auto md:bottom-12 md:right-12 z-[60] flex justify-end pointer-events-none">
        <motion.div 
          className="bg-surface/95 backdrop-blur-xl border border-border p-3 md:p-4 rounded-sm shadow-2xl w-full md:w-[420px] flex flex-col gap-4 pointer-events-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Metadata & Controls */}
          <div className="flex items-center gap-4">
            {/* Artwork */}
            <div className="w-12 h-12 bg-surface-dim border border-border flex-shrink-0 relative overflow-hidden">
              {currentRelease?.artworkUrl ? (
                <Image src={currentRelease.artworkUrl} alt="Cover" fill className="object-cover grayscale" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-30">
                   <Settings2 size={16} />
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <div className="font-serif italic text-lg text-foreground truncate">{currentTrack.title}</div>
              <MonoLabel className="text-[9px] opacity-60 truncate mt-1">
                {currentRelease?.title} {'//'} {currentTrack.credits?.join(', ') || 'KingShadP'}
              </MonoLabel>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={prevTrack} 
                className="text-foreground/60 hover:text-foreground transition-colors disabled:opacity-30"
                disabled={queue.length <= 1}
                aria-label="Previous track"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>
              <button 
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                aria-label={isPlaying ? "Pause track" : "Play track"}
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
                disabled={queue.length <= 1 || queueIndex === queue.length - 1}
                aria-label="Next track"
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Scrubber */}
          <div className="flex items-center gap-3 font-mono text-[9px] text-foreground/50">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-1 bg-border/50 relative cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                seek(pos * duration);
              }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-full bg-foreground"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="w-8">{formatTime(duration)}</span>
            
            {/* Volume toggle */}
            <button onClick={toggleMute} className="ml-2 hover:text-foreground transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Legacy Drone Player View
  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[60]">
      <motion.div 
        className="bg-surface/90 backdrop-blur-md border border-border p-3 rounded-sm flex items-center gap-4 shadow-2xl"
        initial={false}
        animate={{ width: expanded ? 280 : "auto" }}
      >
        <button 
          onClick={toggleAudio}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-sm hover:bg-foreground/80 transition-colors"
          aria-label={audioActive ? "Stop audio" : "Play audio"}
        >
          {audioActive ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="translate-x-[1px]" />}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-1 overflow-hidden whitespace-nowrap"
            >
              <div className="flex flex-col">
                <MonoLabel className="text-foreground text-[10px]">KINGSHADP // GLOBAL ENGINE</MonoLabel>
                <MonoLabel className="text-[8px] opacity-60">
                  {audioActive ? "48HZ ORBITAL FREQUENCY - ACTIVE" : "SYSTEM STANDBY - MUTED"}
                </MonoLabel>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-foreground transition-colors"
          aria-label="Toggle player details"
        >
          <Settings2 size={14} />
        </button>
      </motion.div>
    </div>
  );
}
