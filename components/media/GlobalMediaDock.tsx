'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  BookOpen,
  Headphones,
  Square,
  Sparkles,
  Layers,
  FastForward,
  Rewind,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { releases, Track } from '../../data/releases';
import { speechEngine, SpeechState } from '../../lib/speechEngine';
import { soundEngine } from '../../lib/soundEngine';

interface GlobalMediaDockProps {
  currentTrackId?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack?: () => void;
  onPrevTrack?: () => void;
  onOpenNowPlayingSection?: () => void;
  onOpenArchiveSection?: () => void;
}

export function GlobalMediaDock({
  currentTrackId = 'track-01',
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onOpenNowPlayingSection,
  onOpenArchiveSection,
}: GlobalMediaDockProps) {
  const [speechState, setSpeechState] = useState<SpeechState>(speechEngine.getState());
  const [activeChannel, setActiveChannel] = useState<'MUSIC' | 'LITERATURE'>('MUSIC');
  const [isExpanded, setIsExpanded] = useState(false);

  const release = releases[0];
  const track: Track = release.tracks.find((t) => t.id === currentTrackId) || release.tracks[0];

  useEffect(() => {
    const unsub = speechEngine.subscribe((st) => {
      setSpeechState(st);
      if (st.isPlaying) {
        setActiveChannel('LITERATURE');
      }
    });
    return () => unsub();
  }, []);

  const isNarrating = speechState.isPlaying;
  const isNarrationPaused = speechState.isPaused;

  const handleToggleNarration = () => {
    soundEngine.playClick(isNarrating && !isNarrationPaused ? 450 : 750, 0.03);
    speechEngine.togglePlay();
  };

  const handleStopNarration = () => {
    soundEngine.playClick(350, 0.03);
    speechEngine.stop();
    setActiveChannel('MUSIC');
  };

  const handleSpeedChange = (rate: number) => {
    soundEngine.playClick(650, 0.02);
    speechEngine.setRate(rate);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none max-w-[calc(100vw-3rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-2 pl-3 pr-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 text-[#1a1a1a] shadow-2xl border border-[#1a1a1a]/15"
      >
        {/* Top / Mobile Channel Selector Pill */}
        <div className="flex items-center justify-between sm:justify-start gap-1 pb-1 sm:pb-0 sm:border-r border-[#1a1a1a]/10 sm:pr-2">
          <div className="flex items-center gap-1 bg-[#1a1a1a]/5 p-0.5 rounded-full border border-[#1a1a1a]/10">
            <button
              onClick={() => {
                setActiveChannel('MUSIC');
                soundEngine.playClick(600, 0.02);
              }}
              className={`px-2 py-0.5 rounded-full text-[8px] font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                activeChannel === 'MUSIC'
                  ? 'bg-[#1a1a1a] text-white font-bold'
                  : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
              }`}
            >
              <Headphones size={9} />
              <span>MUSIC</span>
            </button>

            <button
              onClick={() => {
                setActiveChannel('LITERATURE');
                soundEngine.playClick(700, 0.02);
              }}
              className={`px-2 py-0.5 rounded-full text-[8px] font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                activeChannel === 'LITERATURE'
                  ? 'bg-[#B76E79] text-white font-bold'
                  : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
              }`}
            >
              <BookOpen size={9} />
              <span>TTS READ</span>
              {isNarrating && !isNarrationPaused && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsExpanded((p) => !p)}
            className="sm:hidden text-[#1a1a1a]/50 p-1"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* LITERATURE TTS CHANNEL VIEW                                              */}
        {/* ========================================================================= */}
        {activeChannel === 'LITERATURE' && (
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Play / Pause TTS */}
            <button
              onClick={handleToggleNarration}
              aria-label={isNarrating && !isNarrationPaused ? 'Pause narration' : 'Play narration'}
              data-cursor={isNarrating && !isNarrationPaused ? 'PAUSE TTS' : 'PLAY TTS'}
              className="w-8 h-8 rounded-full bg-[#B76E79] text-white hover:bg-[#a05a65] flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
            >
              {isNarrating && !isNarrationPaused ? (
                <Pause size={13} />
              ) : (
                <Play size={13} className="ml-0.5" />
              )}
            </button>

            {/* Stop TTS Button */}
            {isNarrating && (
              <button
                onClick={handleStopNarration}
                title="Stop Narration"
                className="w-6 h-6 rounded-full border border-[#1a1a1a]/15 text-[#1a1a1a]/60 hover:text-red-500 hover:border-red-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Square size={10} className="fill-current" />
              </button>
            )}

            {/* Literature Title & Live Spoken Word / Paragraph Ticker */}
            <div
              onClick={onOpenArchiveSection}
              className="flex flex-col cursor-pointer group pr-1 max-w-[140px] sm:max-w-[210px]"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#B76E79] font-bold">
                  {speechState.category || 'LITERATURE'}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isNarrating && !isNarrationPaused
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-[#1a1a1a]/20'
                  }`}
                />
                {speechState.totalParagraphs > 0 && (
                  <span className="text-[8px] font-mono text-[#1a1a1a]/50">
                    P{speechState.currentParagraphIndex + 1}/{speechState.totalParagraphs}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono font-medium tracking-tight text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors truncate">
                {speechState.title || 'KingShadP Archival Codex'}
              </span>
              {isNarrating && speechState.currentWord && (
                <span className="text-[9px] font-mono text-[#1a1a1a]/60 truncate italic">
                  &ldquo;{speechState.currentWord}...&rdquo;
                </span>
              )}
            </div>

            {/* TTS Speech Rate Toggles */}
            <div className="hidden md:flex items-center gap-1 bg-[#1a1a1a]/5 p-0.5 rounded-full border border-[#1a1a1a]/10">
              {[0.8, 1.0, 1.2, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-1.5 py-0.5 rounded-full text-[8px] font-mono transition-all cursor-pointer ${
                    speechState.rate === spd
                      ? 'bg-[#1a1a1a] text-white font-bold'
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Skip Paragraphs */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => {
                  speechEngine.prevParagraph();
                  soundEngine.playClick(600, 0.02);
                }}
                title="Previous paragraph"
                className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors cursor-pointer p-1"
              >
                <Rewind size={12} />
              </button>
              <button
                onClick={() => {
                  speechEngine.nextParagraph();
                  soundEngine.playClick(600, 0.02);
                }}
                title="Next paragraph"
                className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors cursor-pointer p-1"
              >
                <FastForward size={12} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 432Hz MUSIC CHANNEL VIEW                                                 */}
        {/* ========================================================================= */}
        {activeChannel === 'MUSIC' && (
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
              className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white hover:bg-[#B76E79] flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
            </button>

            {/* Track Details & Visualizer */}
            <div
              onClick={onOpenNowPlayingSection}
              className="flex flex-col cursor-pointer group pr-2 max-w-[130px] sm:max-w-[200px]"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                  {release.era}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-[#1a1a1a]/20'
                  }`}
                />
              </div>
              <span className="text-[11px] font-mono font-medium tracking-wide text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors truncate">
                {track.title}
              </span>
            </div>

            {/* Subtle Spectrum Waves on Desktop */}
            <div className="hidden sm:flex items-center gap-1 h-3.5 px-2 border-l border-[#1a1a1a]/10">
              {[35, 75, 45, 95, 60, 30].map((height, i) => (
                <div
                  key={i}
                  className={`w-[2px] rounded-full transition-all duration-200 ${
                    isPlaying ? 'bg-[#1a1a1a] animate-pulse' : 'bg-[#1a1a1a]/20 h-1'
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
                className="hidden md:flex text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors cursor-pointer p-1"
              >
                <SkipForward size={14} />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
