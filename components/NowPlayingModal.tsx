'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Disc, X } from 'lucide-react';

interface NowPlayingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NowPlayingModal({ isOpen, onClose }: NowPlayingModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newRatio = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = newRatio * duration;
    setProgress(newRatio * 100);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <audio ref={audioRef} src="/music/behold-the-twisted-beast.mp3" preload="metadata" />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0C0C0C] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#8A0F19]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Disc className={`size-4 text-[#B76E79] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/70 font-medium">NOW PLAYING</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close track player"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Artwork & Track Info */}
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src="/twisted-beast-cover.png"
              alt="Behold the Twisted Beast Cover Art"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="mt-5">
            <h4 className="text-lg sm:text-xl font-medium tracking-wide uppercase text-white">
              Behold the Twisted Beast
            </h4>
            <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] mt-1 font-medium">
              KingShadP · Original Composition
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div 
            onClick={handleSeek}
            className="relative w-full h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden group"
          >
            <div 
              className="absolute left-0 top-0 bottom-0 bg-[#8A0F19] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-0 bottom-0 w-2 bg-[#ECE9E4] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 4px)` }}
            />
          </div>
          <div className="flex justify-between text-[10px] tracking-widest text-white/40 mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-12 h-12 rounded-full bg-white text-black hover:bg-[#ECE9E4] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            {isPlaying ? <Pause size={18} className="fill-black" /> : <Play size={18} className="fill-black translate-x-0.5" />}
          </button>

          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 border border-white/10 px-2.5 py-1 rounded-full">
            HQ AUDIO
          </span>
        </div>
      </div>
    </div>
  );
}
