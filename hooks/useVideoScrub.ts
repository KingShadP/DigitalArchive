'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as MP4BoxModule from 'mp4box';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

interface FrameEntry {
  ts: number; // in microseconds
  blob: Blob;
}

export function useVideoScrub(videoSrc: string) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);

  // High-frequency state kept in refs to avoid redundant re-renders
  const bankRef = useRef<FrameEntry[]>([]);
  const lruRef = useRef<Map<number, ImageBitmap | null>>(new Map());
  const pendingBitmapsRef = useRef<Set<number>>(new Set());

  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const durRef = useRef(0);

  const readyRef = useRef(false);
  const revertedRef = useRef(false);
  const paintedRef = useRef(false);
  const buildingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const decoderRef = useRef<VideoDecoder | null>(null);
  const watchdogTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to extract MP4 description buffer for VideoDecoder
  const getTrackDescription = useCallback(
    (track: MP4BoxModule.MP4MediaTrack, mp4boxfile: MP4BoxModule.MP4BoxFile): Uint8Array | undefined => {
      try {
        // @ts-expect-error MP4Box internal trak lookup
        const trak = mp4boxfile.getTrackById ? mp4boxfile.getTrackById(track.id) : null;
        if (trak?.mdia?.minf?.stbl?.stsd?.entries) {
          const entry = trak.mdia.minf.stbl.stsd.entries[0];
          const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
          if (box) {
            const stream = new MP4BoxModule.DataStream(undefined, 0, MP4BoxModule.DataStream.BIG_ENDIAN);
            box.write(stream);
            return new Uint8Array(stream.buffer, 8); // Skip length and box type header
          }
        }
      } catch {
        // Fallback
      }
      return undefined;
    },
    []
  );

  // Binary search for nearest frame timestamp
  const nearestIndex = useCallback((tSeconds: number): number => {
    const bank = bankRef.current;
    if (bank.length === 0) return -1;
    const targetMicro = tSeconds * 1_000_000;

    let low = 0;
    let high = bank.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (bank[mid].ts === targetMicro) return mid;
      if (bank[mid].ts < targetMicro) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (low >= bank.length) return bank.length - 1;
    if (high < 0) return 0;

    const d1 = Math.abs(bank[low].ts - targetMicro);
    const d2 = Math.abs(bank[high].ts - targetMicro);
    return d1 < d2 ? low : high;
  }, []);

  // Warm up and retrieve ImageBitmap from LRU
  const getOrWarmBitmap = useCallback((index: number): ImageBitmap | null => {
    if (index < 0 || index >= bankRef.current.length) return null;

    const lru = lruRef.current;
    const existing = lru.get(index);
    if (existing !== undefined) {
      // Move to end (most recently used)
      lru.delete(index);
      lru.set(index, existing);
      return existing;
    }

    // Trigger async creation if not already pending
    if (!pendingBitmapsRef.current.has(index)) {
      pendingBitmapsRef.current.add(index);
      const entry = bankRef.current[index];
      createImageBitmap(entry.blob)
        .then((bitmap) => {
          pendingBitmapsRef.current.delete(index);
          // Check LRU eviction
          if (lru.size >= LRU_MAX) {
            const firstKey = lru.keys().next().value;
            if (firstKey !== undefined) {
              const old = lru.get(firstKey);
              if (old && typeof old.close === 'function') {
                try {
                  old.close();
                } catch {
                  // ignored
                }
              }
              lru.delete(firstKey);
            }
          }
          lru.set(index, bitmap);
        })
        .catch(() => {
          pendingBitmapsRef.current.delete(index);
          lru.set(index, null);
        });
    }

    // Also pre-warm neighbours [i-1, i+1, i+2]
    const neighbours = [index - 1, index + 1, index + 2];
    for (const n of neighbours) {
      if (n >= 0 && n < bankRef.current.length && !lru.has(n) && !pendingBitmapsRef.current.has(n)) {
        pendingBitmapsRef.current.add(n);
        const neighborEntry = bankRef.current[n];
        createImageBitmap(neighborEntry.blob)
          .then((b) => {
            pendingBitmapsRef.current.delete(n);
            if (lru.size >= LRU_MAX) {
              const firstKey = lru.keys().next().value;
              if (firstKey !== undefined) {
                const old = lru.get(firstKey);
                if (old && typeof old.close === 'function') {
                  try {
                    old.close();
                  } catch {
                    // ignored
                  }
                }
                lru.delete(firstKey);
              }
            }
            lru.set(n, b);
          })
          .catch(() => {
            pendingBitmapsRef.current.delete(n);
            lru.set(n, null);
          });
      }
    }

    return null;
  }, []);

  // Frame Bank Building Pipeline via ref to support software retry recursion
  const buildFrameBankRef = useRef<(acceleration?: 'prefer-hardware' | 'prefer-software') => Promise<void>>(async () => {});

  useEffect(() => {
    buildFrameBankRef.current = async (acceleration: 'prefer-hardware' | 'prefer-software' = 'prefer-hardware') => {
      if (typeof window === 'undefined') return;
      if (prefersReducedMotionRef.current) return;
      if (typeof VideoDecoder === 'undefined') {
        revertedRef.current = true;
        return;
      }
      if (buildingRef.current) return;
      buildingRef.current = true;

      // Start 60s watchdog timer
      watchdogTimerRef.current = setTimeout(() => {
        if (!readyRef.current) {
          revertedRef.current = true;
          setCanvasLive(false);
        }
      }, WATCHDOG);

      try {
        const response = await fetch(videoSrc, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();

        const mp4boxfile = MP4BoxModule.createFile();
        let decoderConfig: VideoDecoderConfig | null = null;

        const offscreen = document.createElement('canvas');
        offscreen.width = 1920;
        offscreen.height = 1080;
        const offCtx = offscreen.getContext('2d');

        const samplesQueue: MP4BoxModule.MP4Sample[] = [];
        let processing = false;

        let trackTimescale = 1000;

        const processNextChunk = async () => {
          if (!decoderRef.current || decoderRef.current.state !== 'configured') return;
          if (decoderRef.current.decodeQueueSize >= LEAD || samplesQueue.length === 0) return;

          const sample = samplesQueue.shift();
          if (!sample) return;

          const timescale = sample.timescale || trackTimescale || 1000;
          try {
            const chunk = new EncodedVideoChunk({
              type: sample.is_sync ? 'key' : 'delta',
              timestamp: (sample.cts * 1_000_000) / timescale,
              duration: (sample.duration * 1_000_000) / timescale,
              data: sample.data,
            });
            decoderRef.current.decode(chunk);
          } catch {
            // handle chunk error
          }
        };

        const initDecoder = () => {
          if (!decoderConfig) return;

          decoderRef.current = new VideoDecoder({
            output: (frame: VideoFrame) => {
              if (offCtx) {
                offCtx.drawImage(frame, 0, 0, 1920, 1080);
                const ts = frame.timestamp;
                offscreen.toBlob(
                  (blob) => {
                    if (blob) {
                      bankRef.current.push({ ts, blob });
                      if (!readyRef.current && bankRef.current.length >= 12) {
                        readyRef.current = true;
                      }
                    }
                  },
                  'image/webp',
                  0.82
                );
              }
              frame.close();
              processNextChunk();
            },
            error: () => {
              if (acceleration === 'prefer-hardware') {
                // Retry once with software
                buildingRef.current = false;
                buildFrameBankRef.current('prefer-software');
              } else {
                revertedRef.current = true;
              }
            },
          });

          decoderRef.current.configure({
            ...decoderConfig,
            hardwareAcceleration: acceleration,
          });

          // Begin processing samples
          for (let i = 0; i < LEAD; i++) {
            processNextChunk();
          }
        };

        mp4boxfile.onReady = (info: MP4BoxModule.MP4Info) => {
          const track = info.videoTracks[0];
          if (!track) return;
          trackTimescale = track.timescale;
          durRef.current = info.duration / info.timescale;

          const desc = getTrackDescription(track, mp4boxfile);
          decoderConfig = {
            codec: track.codec,
            codedWidth: track.video?.width || track.track_width || 1920,
            codedHeight: track.video?.height || track.track_height || 1080,
            description: desc,
          };

          initDecoder();
          mp4boxfile.setExtractionOptions(track.id, null, { nbSamples: 1000 });
          mp4boxfile.start();
        };

        mp4boxfile.onSamples = (id, user, samples) => {
          for (const s of samples) {
            samplesQueue.push(s);
          }
          if (!processing) {
            processing = true;
            processNextChunk();
          }
        };

        mp4boxfile.onError = () => {
          revertedRef.current = true;
        };

        // Feed buffer
        const buf = buffer as ArrayBuffer & { fileStart?: number };
        buf.fileStart = 0;
        mp4boxfile.appendBuffer(buf);
        mp4boxfile.flush();
      } catch {
        // Fallback safely to standard video element seeking
        revertedRef.current = true;
      }
    };
  }, [videoSrc, getTrackDescription]);

  // Main Animation & Scrubbing Loop
  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotionRef.current = mediaQuery.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener('change', handler);
    }

    const videoEl = videoRef.current;
    if (videoEl) {
      const onLoadedMetadata = () => {
        if (videoEl.duration && videoEl.duration > 0) {
          durRef.current = videoEl.duration;
        }
      };
      videoEl.addEventListener('loadedmetadata', onLoadedMetadata);
      if (videoEl.duration && videoEl.duration > 0) {
        durRef.current = videoEl.duration;
      }
    }

    const getScrollProgress = () => {
      if (!containerRef.current || typeof window === 'undefined') return 0;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / totalScrollable));
    };

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const deltaSeconds = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      const dt = Math.min(0.1, Math.max(0.001, deltaSeconds));

      const p = getScrollProgress();
      setScrollProgress(p);

      const dur = durRef.current || 10;
      targetRef.current = p * dur;

      // LERP Smoothing
      if (prefersReducedMotionRef.current) {
        currentRef.current = targetRef.current;
      } else {
        currentRef.current += (targetRef.current - currentRef.current) * (1 - Math.exp(-dt * LERP_TAU));
        if (Math.abs(targetRef.current - currentRef.current) < SNAP) {
          currentRef.current = targetRef.current;
        }
      }

      const current = currentRef.current;

      // Render Frame
      const canvas = canvasRef.current;
      let frameRendered = false;

      if (canvas && readyRef.current && bankRef.current.length > 0) {
        const idx = nearestIndex(current);
        if (idx >= 0) {
          const bitmap = getOrWarmBitmap(idx);
          if (bitmap) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
              frameRendered = true;
              if (!paintedRef.current) {
                paintedRef.current = true;
                setCanvasLive(true);
              }
            }
          }
        }
      }

      // Video Seeking Fallback
      if ((!frameRendered || revertedRef.current) && videoRef.current) {
        const vid = videoRef.current;
        if (!vid.seeking && Math.abs(vid.currentTime - current) > 0.01) {
          vid.currentTime = current;
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    // Trigger Frame Bank Build
    const handleLoad = () => {
      buildFrameBankRef.current();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    const currentLru = lruRef.current;

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (watchdogTimerRef.current) clearTimeout(watchdogTimerRef.current);
      window.removeEventListener('load', handleLoad);

      if (decoderRef.current) {
        try {
          if (decoderRef.current.state !== 'closed') {
            decoderRef.current.close();
          }
        } catch {
          // ignored
        }
      }

      // Cleanup LRU ImageBitmaps
      currentLru.forEach((bitmap) => {
        if (bitmap && typeof bitmap.close === 'function') {
          try {
            bitmap.close();
          } catch {
            // ignored
          }
        }
      });
      currentLru.clear();
      bankRef.current = [];
    };
  }, [getOrWarmBitmap, nearestIndex]);

  return {
    containerRef,
    videoRef,
    canvasRef,
    scrollProgress,
    canvasLive,
  };
}
