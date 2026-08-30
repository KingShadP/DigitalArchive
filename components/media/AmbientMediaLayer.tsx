'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEDIA, MEDIA_REGISTRY, MediaAssetConfig } from '../../data/media';

interface AmbientMediaLayerProps {
  activeMediaKey?: string;
  customSrc?: string;
  customPoster?: string;
  brightness?: number;
  blurTreatment?: number;
  overlayStrength?: number;
  objectPosition?: string;
  playbackRate?: number;
  onVideoLoaded?: () => void;
  isPlayingMusic?: boolean;
}

export function AmbientMediaLayer({
  activeMediaKey = 'scenePrimary',
  customSrc,
  customPoster,
  brightness = 0.85,
  blurTreatment = 0,
  overlayStrength = 0.45,
  objectPosition = 'center 35%',
  playbackRate = 1.0,
  onVideoLoaded,
  isPlayingMusic = false,
}: AmbientMediaLayerProps) {
  const currentConfig: MediaAssetConfig =
    MEDIA_REGISTRY[activeMediaKey] || MEDIA_REGISTRY.scenePrimary;

  const currentSrc = customSrc || currentConfig.src;
  const currentPoster = customPoster || currentConfig.poster;
  const currentPosition = objectPosition || currentConfig.desktopPosition || 'center center';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoopFading, setIsLoopFading] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  // Seamless loop crossfade handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackRate;

    let isSubscribed = true;
    const FADE_OUT_LEAD = 0.6;
    const FADE_DURATION = 400;

    const checkTime = () => {
      if (!video || !isSubscribed) return;

      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration && !isNaN(duration) && duration > 1) {
        const timeLeft = duration - currentTime;

        if (timeLeft <= FADE_OUT_LEAD && !isLoopFading) {
          setIsLoopFading(true);
          setTimeout(() => {
            if (!video || !isSubscribed) return;
            video.currentTime = 0;
            video.play().catch(() => {});
            setTimeout(() => {
              if (!isSubscribed) return;
              setIsLoopFading(false);
            }, 60);
          }, FADE_DURATION);
        }
      }

      rafIdRef.current = requestAnimationFrame(checkTime);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      onVideoLoaded?.();
      video.play().catch(() => {});
      rafIdRef.current = requestAnimationFrame(checkTime);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      isSubscribed = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, [currentSrc, playbackRate, isLoopFading, onVideoLoaded]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#050505]"
    >
      {/* Video Display Plane */}
      <motion.div
        key={currentSrc}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{
          opacity: isLoopFading ? 0.2 : 1,
          scale: 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
        style={{
          filter: `brightness(${brightness}) blur(${blurTreatment}px)`,
          transform: isPlayingMusic
            ? 'scale(calc(1 + var(--audio-low, 0) * 0.008))'
            : 'scale(1)',
          transition: 'transform 0.15s ease-out, filter 0.5s ease',
        }}
      >
        <video
          ref={videoRef}
          src={currentSrc}
          poster={currentPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            objectPosition: currentPosition,
          }}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* Atmospheric Overlays for Typographic Legibility & Cinematic Mood */}
      {/* Dark Vignette & Edge Shadow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(5, 5, 5, ${overlayStrength * 0.4}) 0%, rgba(5, 5, 5, ${Math.min(0.92, overlayStrength + 0.35)}) 100%)`,
        }}
      />

      {/* Subtle Noise / Film Grain Layer */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Bottom Architectural Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />

      {/* Top Navigation Fade */}
      <div className="absolute top-0 left-0 right-0 h-32 z-10 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none" />
    </div>
  );
}
