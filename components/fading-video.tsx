'use client';

import React, { useRef, useEffect } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds

export function FadingVideo({ src, className, style, poster }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial opacity
    video.style.opacity = '0';

    const fadeTo = (targetOpacity: number, durationMs: number = FADE_MS, onComplete?: () => void) => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const startOpacity = parseFloat(video.style.opacity) || 0;
      const opacityDelta = targetOpacity - startOpacity;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const currentOpacity = startOpacity + opacityDelta * progress;
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          video.style.opacity = targetOpacity.toString();
          rafIdRef.current = null;
          if (onComplete) onComplete();
        }
      };

      rafIdRef.current = requestAnimationFrame(step);
    };

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(() => {
        // Autoplay may need user gesture in strict environments, keep opacity 1
        fadeTo(1, FADE_MS);
      });
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration && !isNaN(video.duration)) {
        const remaining = video.duration - video.currentTime;
        if (remaining <= FADE_OUT_LEAD && remaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0, FADE_MS);
        }
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

      timeoutIdRef.current = setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        video.play().catch(() => {});
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If already loaded before listeners attached
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{
        ...style,
        transition: 'none', // Strict rule: No CSS transitions on video opacity
      }}
    />
  );
}
