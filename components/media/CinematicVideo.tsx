'use client';

import React, { useRef, useEffect, useState } from 'react';

export interface CinematicVideoProps {
  src: string;
  poster?: string;
  className?: string;
  objectPosition?: string;
  fadeLoop?: boolean;
}

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

export function CinematicVideo({
  src,
  poster,
  className = '',
  objectPosition = 'center center',
  fadeLoop = true,
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opacity, setOpacity] = useState(1);
  const isFadingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !fadeLoop) return;

    let isSubscribed = true;

    const checkTime = () => {
      if (!video || !isSubscribed) return;

      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration && !isNaN(duration) && duration > 1) {
        const timeLeft = duration - currentTime;

        // Initiate fade out before loop boundary
        if (timeLeft <= FADE_OUT_LEAD && !isFadingRef.current) {
          isFadingRef.current = true;
          setOpacity(0);

          setTimeout(() => {
            if (!video || !isSubscribed) return;
            video.currentTime = 0;
            video.play().catch(() => {});
            setTimeout(() => {
              if (!isSubscribed) return;
              setOpacity(1);
              isFadingRef.current = false;
            }, 60);
          }, FADE_MS);
        }
      }

      rafIdRef.current = requestAnimationFrame(checkTime);
    };

    const handleLoadedMetadata = () => {
      video.play().catch(() => {});
      if (fadeLoop) {
        rafIdRef.current = requestAnimationFrame(checkTime);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoadedMetadata);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      isSubscribed = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, [src, fadeLoop]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      style={{
        objectPosition,
        opacity,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
      className={`w-full h-full object-cover pointer-events-none select-none ${className}`}
    />
  );
}
