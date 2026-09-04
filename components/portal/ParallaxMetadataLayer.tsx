'use client';

import React, { useState, useEffect } from 'react';

export function ParallaxMetadataLayer() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [timeUtc, setTimeUtc] = useState('');
  const [resonancePhase, setResonancePhase] = useState('432.08 Hz');

  useEffect(() => {
    // Ticking high-precision UTC time
    const updateTime = () => {
      const now = new Date();
      const iso = now.toISOString().replace('T', ' // ').replace('Z', ' UTC');
      setTimeUtc(iso);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Subtle resonance fluctuation
    const resTimer = setInterval(() => {
      const jitter = (Math.random() * 0.12 - 0.06).toFixed(3);
      setResonancePhase(`${(432.0 + parseFloat(jitter)).toFixed(2)} Hz`);
    }, 3200);

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      clearInterval(resTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      {/* Giant Ambient Watermark Parallax Typography */}
      <div
        className="absolute top-1/4 -left-12 -right-12 flex justify-between items-center opacity-[0.025] transition-transform duration-700 ease-out whitespace-nowrap"
        style={{
          transform: `translate3d(${mouseOffset.x * -35}px, ${mouseOffset.y * -25}px, 0)`,
        }}
      >
        <span
          className="text-[#F4F1EC] font-serif font-light tracking-[-0.05em] uppercase text-[16vw] leading-none"
          style={{ letterSpacing: '0.15em' }}
        >
          SANCTUM
        </span>
        <span
          className="text-[#F4F1EC] font-serif font-light italic tracking-[-0.05em] uppercase text-[16vw] leading-none"
        >
          MMXXVI
        </span>
      </div>

      <div
        className="absolute bottom-12 left-6 right-6 flex justify-between items-center opacity-[0.02] transition-transform duration-1000 ease-out whitespace-nowrap"
        style={{
          transform: `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * 15}px, 0)`,
        }}
      >
        <span className="text-[#F4F1EC] font-mono tracking-[0.4em] uppercase text-[6vw]">
          SUBTRACTIVE ARCHITECTURE // ZERO POINT
        </span>
      </div>

      {/* Precision Corner Crosshairs & Architectural Registration Marks */}
      <div className="absolute top-24 left-8 text-[#F4F1EC]/25 font-mono text-[8px] tracking-[0.3em] uppercase hidden lg:block select-none">
        + [34.0522° N // 118.2437° W]
      </div>
      <div className="absolute top-24 right-8 text-[#F4F1EC]/25 font-mono text-[8px] tracking-[0.3em] uppercase hidden lg:block text-right select-none">
        [{timeUtc || '00:00:00 UTC'}] +
      </div>

      {/* Floating telemetry pills pinned near corners */}
      <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#B76E79] animate-pulse" />
        <span className="text-[8px] font-mono tracking-[0.25em] text-[#F4F1EC]/40 uppercase">
          RESONANCE: {resonancePhase} {'//'} ENCRYPTION: LOSSLESS 24-BIT
        </span>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 text-right">
        <span className="text-[8px] font-mono tracking-[0.25em] text-[#F4F1EC]/40 uppercase">
          VAULT STATUS: ONLINE {'//'} VOL. 01 PERMANENT
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
      </div>
    </div>
  );
}
