'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Track, Release } from '@/lib/music-data';

interface AudioContextType {
  audioActive: boolean;
  audioEngineReady: boolean;
  playbackError: string | null;
  toggleAudio: () => void;
  setAudioFrequency: (freq: number) => void;
  clearPlaybackError: () => void;

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

const AudioStateContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [audioActive, setAudioActive] = useState(false);
  const [audioEngineReady, setAudioEngineReady] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
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
  const queueRef = useRef<Track[]>([]);
  const queueIndexRef = useRef(-1);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    queueIndexRef.current = queueIndex;
  }, [queueIndex]);

  const clearPlaybackError = useCallback(() => setPlaybackError(null), []);

  const stopDrone = useCallback(() => {
    if (synthRef.current) {
      const { stop } = synthRef.current;
      stop();
      synthRef.current = null;
      setAudioActive(false);
    }
  }, []);

  const playFromQueue = useCallback(
    (targetIndex: number) => {
      const activeRelease = currentRelease;
      if (!activeRelease) return;

      const nextTrack = queueRef.current[targetIndex];
      if (!nextTrack) return;

      setQueueIndex(targetIndex);
      setCurrentTrack(nextTrack);
      setCurrentTime(0);
      setDuration(0);
      setPlaybackError(null);
      stopDrone();

      if (!audioRef.current) return;
      if (!nextTrack.audioSource) {
        setIsPlaying(false);
        setIsLoading(false);
        setPlaybackError('Audio source unavailable for this track.');
        audioRef.current.src = '';
        return;
      }

      audioRef.current.src = nextTrack.audioSource;
      setIsLoading(true);
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
        setPlaybackError('Playback could not start. Tap play to retry.');
      });
    },
    [currentRelease, stopDrone],
  );

  const playTrack = useCallback(
    (track: Track, release: Release, newQueue?: Track[]) => {
      if (newQueue && newQueue.length > 0) {
        setQueue(newQueue);
        const idx = newQueue.findIndex((entry) => entry.id === track.id);
        setQueueIndex(idx === -1 ? 0 : idx);
      } else if (queueRef.current.length === 0 || !queueRef.current.some((entry) => entry.id === track.id)) {
        setQueue(release.tracks);
        const releaseIndex = release.tracks.findIndex((entry) => entry.id === track.id);
        setQueueIndex(releaseIndex === -1 ? 0 : releaseIndex);
      }

      setCurrentRelease(release);
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(0);
      setPlaybackError(null);
      stopDrone();

      if (!audioRef.current) return;

      if (!track.audioSource) {
        audioRef.current.src = '';
        setIsPlaying(false);
        setIsLoading(false);
        setPlaybackError('Audio source unavailable for this track.');
        return;
      }

      audioRef.current.src = track.audioSource;
      setIsLoading(true);
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
        setPlaybackError('Playback could not start. Tap play to retry.');
      });
    },
    [stopDrone],
  );

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }

    stopDrone();

    if (!currentTrack.audioSource) {
      setPlaybackError('Audio source unavailable for this track.');
      return;
    }

    setPlaybackError(null);
    setIsLoading(true);
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
      setIsLoading(false);
      setPlaybackError('Playback could not start. Tap play to retry.');
    });
  }, [currentTrack, isPlaying, stopDrone]);

  const seek = useCallback((time: number) => {
    if (audioRef.current && audioRef.current.src && Number.isFinite(time)) {
      audioRef.current.currentTime = Math.max(0, time);
      setCurrentTime(Math.max(0, time));
    }
  }, []);

  const setVolumeLevel = useCallback((vol: number) => {
    const nextVolume = Math.max(0, Math.min(1, vol));
    setVolume(nextVolume);
    if (nextVolume > 0 && isMuted) setIsMuted(false);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const nextTrack = useCallback(() => {
    if (queueRef.current.length === 0) return;
    const targetIndex = queueIndexRef.current + 1;
    if (targetIndex <= queueRef.current.length - 1) {
      playFromQueue(targetIndex);
    }
  }, [playFromQueue]);

  const prevTrack = useCallback(() => {
    if (currentTime > 3) {
      seek(0);
      return;
    }

    if (queueRef.current.length === 0) return;
    const targetIndex = queueIndexRef.current - 1;
    if (targetIndex >= 0) {
      playFromQueue(targetIndex);
    }
  }, [currentTime, playFromQueue, seek]);

  useEffect(() => {
    if (typeof window === 'undefined' || audioRef.current) return;

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;
    setAudioEngineReady(true);

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsLoading(false);
      setPlaybackError(null);
    };

    const handleEnded = () => nextTrack();
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setPlaybackError(null);
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setPlaybackError('This media is unavailable right now.');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      setAudioEngineReady(false);
    };
  }, [isMuted, nextTrack, volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    navigator.mediaSession.setActionHandler('play', () => {
      if (!isPlaying) togglePlayPause();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (isPlaying) togglePlayPause();
    });
    navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime !== undefined) seek(details.seekTime);
    });
  }, [isPlaying, nextTrack, prevTrack, seek, togglePlayPause]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    if (currentTrack && currentRelease) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.credits?.map((credit) => credit.name).join(', ') || 'KingShadP',
        album: currentRelease.title,
        artwork: currentRelease.artwork?.url
          ? [
              { src: currentRelease.artwork.url, sizes: '512x512', type: 'image/jpeg' },
              { src: currentRelease.artwork.url, sizes: '256x256', type: 'image/jpeg' },
            ]
          : [],
      });
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
      return;
    }

    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
  }, [currentTrack, currentRelease, isPlaying]);

  const toggleAudio = useCallback(() => {
    if (audioActive) {
      stopDrone();
      return;
    }

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        setPlaybackError('Web Audio is not available in this browser.');
        return;
      }

      const ctx = new AudioCtxClass();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const amp = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(48, ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(96, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      amp.gain.setValueAtTime(0, ctx.currentTime);
      amp.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(40, ctx.currentTime);

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
          osc2.frequency.setTargetAtTime(f * 2, ctx.currentTime, 0.5);
        },
      };

      setPlaybackError(null);
      setAudioActive(true);
    } catch {
      setPlaybackError('Ambient engine failed to initialize.');
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
        audioRef.current.src = '';
      }
    };
  }, []);

  return (
    <AudioStateContext.Provider
      value={{
        audioActive,
        audioEngineReady,
        playbackError,
        toggleAudio,
        setAudioFrequency,
        clearPlaybackError,
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
        playTrack,
        togglePlayPause,
        seek,
        setVolumeLevel,
        toggleMute,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </AudioStateContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioStateContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
