'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, Waves, Disc } from 'lucide-react';
import { releases, Track } from '../../data/releases';

interface GlobalMediaDockProps {
  currentTrackId?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack?: () => void;
  onPrevTrack?: () => void;
  onOpenNowPlayingSection?: () => void;
}

export function GlobalMediaDock({
  currentTrackId = 'track-01',
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onOpenNowPlayingSection,
}: GlobalMediaDockProps) {
  const [minimized, setMinimized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('3:42');

  const release = releases[0];
  const track: Track = release.tracks.find((t) => t.id === currentTrackId) || release.tracks[0];

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="liquid-glass-strong rounded-full p-2 pl-3 pr-4 flex items-center gap-3 text-white shadow-2xl border border-white/10"
      >
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
          className="w-8 h-8 rounded-full bg-white text-black hover:bg-[#F4F1EC] flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>

        {/* Track Details & Visualizer */}
        <div
          onClick={onOpenNowPlayingSection}
          className="flex flex-col cursor-pointer group pr-2 max-w-[130px] sm:max-w-[200px]"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#B76E79]">
              {release.era}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
          </div>
          <span className="text-[11px] font-mono tracking-wide text-white group-hover:text-[#B76E79] transition-colors truncate">
            {track.title}
          </span>
        </div>

        {/* Subtle Spectrum Waves on Desktop */}
        <div className="hidden sm:flex items-center gap-1 h-3.5 px-2 border-l border-white/10">
          {[35, 75, 45, 95, 60, 30].map((height, i) => (
            <div
              key={i}
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isPlaying ? 'bg-white/80 animate-pulse' : 'bg-white/20 h-1'
              }`}
              style={{
                height: isPlaying ? `${height}%` : '3px',
                animationDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </div>

        {/* Skip Actions */}
        {onNextTrack && (
          <button
            onClick={onNextTrack}
            aria-label="Next track"
            className="hidden md:flex text-white/40 hover:text-white transition-colors cursor-pointer p-1"
          >
            <SkipForward size={14} />
          </button>
        )}
      </motion.div>
    </div>
  );
}
