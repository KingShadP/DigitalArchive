'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Track, Release } from '@/lib/music-data';

interface AudioContextType {
  audioActive: boolean;
  toggleAudio: () => void;
  setAudioFrequency: (freq: number) => void;

  currentTrack: Track | null;
  currentRelease: Release | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  queue: Track[];
  queueIndex: number;
  
  playTrack: (track: Track, release: Release, newQueue?: Track[]) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolumeLevel: (vol: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [audioActive, setAudioActive] = useState(false);
  const synthRef = useRef<{ 
    ctx: AudioContext; 
    stop: () => void;
    setFreq: (f: number) => void;
  } | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopDrone = useCallback(() => {
    if (synthRef.current) {
      const { stop } = synthRef.current;
      stop();
      synthRef.current = null;
      setAudioActive(false);
    }
  }, []);

  const playTrack = useCallback((track: Track, release: Release, newQueue?: Track[]) => {
    stopDrone();

    setCurrentTrack(track);
    setCurrentRelease(release);
    if (newQueue) {
      setQueue(newQueue);
      const idx = newQueue.findIndex(t => t.id === track.id);
      setQueueIndex(idx !== -1 ? idx : 0);
    }

    if (audioRef.current) {
      if (track.audioSource) {
        audioRef.current.src = track.audioSource;
        audioRef.current.play().catch(e => {
          console.error("Playback failed", e.message || e);
          setIsPlaying(false);
        });
        setIsPlaying(true);
        setIsLoading(true);
      } else {
        audioRef.current.src = "";
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  }, [stopDrone]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      stopDrone();
      if (currentTrack.audioSource) {
        audioRef.current.play().catch(e => console.error(e.message || e));
      } else {
        setIsPlaying(true);
      }
    }
  }, [currentTrack, isPlaying, stopDrone]);

  const seek = useCallback((time: number) => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolumeLevel = (vol: number) => {
    setVolume(Math.max(0, Math.min(1, vol)));
    if (vol > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const nextTrack = useCallback(() => {
    if (queue.length > 0 && queueIndex < queue.length - 1) {
      const next = queue[queueIndex + 1];
      if (currentRelease) playTrack(next, currentRelease, queue);
    }
  }, [currentRelease, playTrack, queue, queueIndex]);

  const prevTrack = useCallback(() => {
    if (currentTime > 3) {
      seek(0);
      return;
    }
    if (queue.length > 0 && queueIndex > 0) {
      const prev = queue[queueIndex - 1];
      if (currentRelease) playTrack(prev, currentRelease, queue);
    }
  }, [currentRelease, currentTime, playTrack, queue, queueIndex, seek]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setIsLoading(false);
        }
      };

      const handleEnded = () => {
        nextTrack();
      };

      const handlePlaying = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleWaiting = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('play', handlePlaying);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('waiting', handleWaiting);
      audioRef.current.addEventListener('canplay', handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('play', handlePlaying);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('waiting', handleWaiting);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [nextTrack]);

  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack && currentRelease) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.credits?.join(', ') || 'KingShadP',
        album: currentRelease.title,
        artwork: currentRelease.artworkUrl ? [
          { src: currentRelease.artworkUrl, sizes: '512x512', type: 'image/jpeg' },
          { src: currentRelease.artworkUrl, sizes: '256x256', type: 'image/jpeg' }
        ] : []
      });
    }
  }, [currentTrack, currentRelease]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seek(details.seekTime);
      });
    }
  }, [isPlaying, queue, queueIndex, togglePlayPause, prevTrack, nextTrack, seek]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const toggleAudio = useCallback(() => {
    if (audioActive) {
      stopDrone();
    } else {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
      }

      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtxClass();
        
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const amp = ctx.createGain();

        // Fundamental deep drone (e.g. F1 = ~43.65Hz)
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(43.65, ctx.currentTime);
        
        // Slightly detuned warm harmonic
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(43.85, ctx.currentTime);

        // Lowpass filter to keep it subby and atmospheric
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, ctx.currentTime);
        filter.Q.setValueAtTime(2, ctx.currentTime);

        amp.gain.setValueAtTime(0, ctx.currentTime);
        amp.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 4.0); // Slower, warmer attack

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        
        // Very slow LFO for filter movement
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.05, ctx.currentTime); 
        lfoGain.gain.setValueAtTime(30, ctx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(amp);
        amp.connect(ctx.destination);

        osc1.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        lfo.start(ctx.currentTime);

        synthRef.current = {
          ctx,
          stop: () => {
            const currentAmp = amp.gain.value;
            amp.gain.cancelScheduledValues(ctx.currentTime);
            amp.gain.setValueAtTime(currentAmp, ctx.currentTime);
            amp.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
            setTimeout(() => {
              osc1.stop();
              osc2.stop();
              lfo.stop();
              ctx.close();
            }, 1600);
          },
          setFreq: (f: number) => { 
             osc1.frequency.setTargetAtTime(f, ctx.currentTime, 0.5);
             osc2.frequency.setTargetAtTime(f + 0.2, ctx.currentTime, 0.5); // Maintain slight detune
          }
        };
        setAudioActive(true);
      } catch (err) {
        console.error("Audio generation failed", err instanceof Error ? err.message : String(err));
      }
    }
  }, [audioActive, isPlaying, stopDrone]);

  const setAudioFrequency = useCallback((freq: number) => {
    if (synthRef.current) {
        synthRef.current.setFreq(freq);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.stop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ 
      audioActive, toggleAudio, setAudioFrequency,
      currentTrack, currentRelease, isPlaying, currentTime, duration, 
      volume, isMuted, isLoading, queue, queueIndex,
      playTrack, togglePlayPause, seek, setVolumeLevel, toggleMute, nextTrack, prevTrack
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
