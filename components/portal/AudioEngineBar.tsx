'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio, Waves, BellRing, Activity } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface AudioEngineBarProps {
  isCompact?: boolean;
  onOpenHarmonics?: () => void;
}

export function AudioEngineBar({ isCompact = false, onOpenHarmonics }: AudioEngineBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [subActive, setSubActive] = useState(false);
  const [frequencies, setFrequencies] = useState<number[]>(new Array(16).fill(0.1));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(222); // 3:42 default
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Connect and monitor audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 222);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  // Animate frequency visualizer bars
  useEffect(() => {
    let phase = 0;
    const updateVisualizer = () => {
      phase += 0.08;
      if (isPlaying && !isMuted) {
        setFrequencies((prev) =>
          prev.map((_, i) => {
            const harmonic = Math.sin(phase + i * 0.4) * 0.4 + Math.cos(phase * 1.5 + i * 0.2) * 0.3;
            return Math.max(0.12, Math.min(1.0, 0.45 + harmonic * 0.5));
          })
        );
      } else if (subActive) {
        setFrequencies((prev) =>
          prev.map((_, i) => {
            const sub = Math.sin(phase * 0.5 + i * 0.15) * 0.2;
            return Math.max(0.08, Math.min(0.6, 0.2 + sub));
          })
        );
      } else {
        setFrequencies((prev) => prev.map((val) => Math.max(0.08, val * 0.92)));
      }
      rafRef.current = requestAnimationFrame(updateVisualizer);
    };

    rafRef.current = requestAnimationFrame(updateVisualizer);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, isMuted, subActive]);

  const togglePlay = () => {
    soundEngine.playClick(1100, 0.03, 0.02);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Fallback or user gesture requirement
      });
      soundEngine.initCtx();
    }
  };

  const toggleMute = () => {
    soundEngine.playClick(800, 0.03, 0.02);
    const newMute = !isMuted;
    setIsMuted(newMute);
    soundEngine.setMute(newMute);
    if (audioRef.current) {
      audioRef.current.muted = newMute;
    }
  };

  const handleSubToggle = () => {
    soundEngine.playClick(520, 0.04, 0.03);
    const active = soundEngine.toggleSubHarmonic();
    setSubActive(active);
  };

  const handleChime = () => {
    soundEngine.playHarmonicChime(432);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative flex items-center gap-3 md:gap-4 px-3.5 py-2 md:px-5 md:py-2.5 rounded-full border border-[#F4F1EC]/15 bg-[#050505]/80 backdrop-blur-xl transition-all duration-500 shadow-2xl hover:border-[#B76E79]/50 ${
        isPlaying ? 'border-[#B76E79]/40 ring-1 ring-[#B76E79]/20' : ''
      }`}
    >
      <audio
        ref={audioRef}
        src="/music/behold-the-twisted-beast.mp3"
        preload="metadata"
        loop
      />

      {/* Main Play / Pause Button */}
      <button
        type="button"
        id="audio-engine-play-toggle"
        onClick={togglePlay}
        title={isPlaying ? 'Pause Audio' : 'Initiate 432 Hz Master Audio'}
        aria-label={isPlaying ? 'Pause Master Audio' : 'Play Master Audio'}
        className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
          isPlaying
            ? 'bg-[#B76E79] text-[#050505] shadow-[0_0_15px_rgba(183,110,121,0.5)]'
            : 'bg-[#F4F1EC]/10 text-[#F4F1EC] hover:bg-[#F4F1EC] hover:text-[#050505]'
        }`}
      >
        {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
      </button>

      {/* Frequency Visualizer Bars (16 Bars) */}
      <div 
        className="flex items-end gap-[2px] md:gap-[3px] h-4 w-16 md:w-24 px-1 cursor-pointer"
        onClick={togglePlay}
        title="Harmonic Frequency Analyser (432 Hz)"
      >
        {frequencies.map((energy, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-full transition-all duration-100 ease-out"
            style={{
              height: `${Math.max(12, energy * 100)}%`,
              backgroundColor: isPlaying
                ? idx % 2 === 0 ? '#B76E79' : '#F4F1EC'
                : 'rgba(244, 241, 236, 0.25)',
              opacity: isPlaying ? 0.9 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Track Label & Timecode */}
      <div className="hidden sm:flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#F4F1EC]">
            432 HZ MASTER
          </span>
          <span className="text-[8px] font-mono text-[#B76E79]">
            {isPlaying ? 'ACTIVE' : 'READY'}
          </span>
        </div>
        <span className="text-[8px] font-mono text-[#F4F1EC]/40 tracking-wider">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="w-[1px] h-4 bg-[#F4F1EC]/10 hidden md:block" />

      {/* 28 Hz Sub-Harmonic Binaural Grounding Toggle */}
      <button
        type="button"
        id="audio-engine-sub-toggle"
        onClick={handleSubToggle}
        title="Toggle 28 Hz Infrasound Sub-Harmonic Grounding Tone"
        className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-mono tracking-widest uppercase transition-all duration-300 ${
          subActive
            ? 'bg-[#B76E79]/20 text-[#B76E79] border border-[#B76E79]/40'
            : 'text-[#F4F1EC]/50 hover:text-[#F4F1EC] hover:bg-[#F4F1EC]/5 border border-transparent'
        }`}
      >
        <Waves size={10} className={subActive ? 'animate-pulse' : ''} />
        <span>SUB 28Hz</span>
      </button>

      {/* 432 Hz Harmonic Chime Trigger */}
      <button
        type="button"
        id="audio-engine-chime-button"
        onClick={handleChime}
        title="Harmonic 432 Hz Pythagorean Chime"
        className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-mono tracking-widest uppercase text-[#F4F1EC]/50 hover:text-[#B76E79] hover:bg-[#B76E79]/10 transition-colors"
      >
        <BellRing size={10} />
        <span>CHIME</span>
      </button>

      {/* 432 Hz Pythagorean Harmonic Calibration Modal Trigger */}
      {onOpenHarmonics && (
        <button
          type="button"
          id="audio-engine-matrix-button"
          onClick={() => {
            soundEngine.playHarmonicChime(528);
            onOpenHarmonics();
          }}
          title="Open Pythagorean 432 Hz Calibration Matrix"
          className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#B76E79]/30 bg-[#B76E79]/10 text-[#B76E79] hover:bg-[#B76E79] hover:text-[#050505] text-[8px] font-mono tracking-widest uppercase transition-all duration-300"
        >
          <Activity size={10} />
          <span>MATRIX</span>
        </button>
      )}

      {/* Mute / Unmute Button */}
      <button
        type="button"
        id="audio-engine-mute-toggle"
        onClick={toggleMute}
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        className="text-[#F4F1EC]/60 hover:text-[#F4F1EC] transition-colors p-1"
      >
        {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} />}
      </button>
    </div>
  );
}
