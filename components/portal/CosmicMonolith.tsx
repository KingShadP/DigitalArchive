'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { soundEngine } from '../../lib/soundEngine';
import { MonolithDossierModal } from './MonolithDossierModal';
import { FileText, Eye, Sparkles } from 'lucide-react';

interface CosmicMonolithProps {
  onInteract?: () => void;
  externalMode?: number;
  onModeChange?: (modeIdx: number) => void;
}

export function CosmicMonolith({
  onInteract,
  externalMode,
  onModeChange,
}: CosmicMonolithProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalMode, setInternalMode] = useState(0);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [degreeAngle, setDegreeAngle] = useState(0);

  // Derive active mode directly from externalMode if provided
  const activeMode = externalMode !== undefined ? externalMode : internalMode;

  const monolithModes = [
    {
      id: 'obsidian',
      label: '01 OBSIDIAN',
      title: 'Obsidian Volumetric Raytrace',
      image: '/THE GIRAGON.png',
      freq: 432,
      accent: '#B76E79',
    },
    {
      id: 'glory',
      label: '02 GLORY',
      title: '24K Anodized Monument',
      image: '/girgonglory.png',
      freq: 528,
      accent: '#D4AF37',
    },
    {
      id: 'rose-gold',
      label: '03 ROSE ALLOY',
      title: 'Forged Copper Maquette',
      image: '/ROSE GOLD GIRAGON.png',
      freq: 648,
      accent: '#E0A899',
    },
    {
      id: 'wireframe',
      label: '04 WIREFRAME',
      title: 'Geometric Golden-Ratio Mesh',
      image: null,
      freq: 768,
      accent: '#F4F1EC',
    },
  ];

  // Subtle continuous slow rotation for the celestial coordinate ring
  useEffect(() => {
    let animId: number;
    const updateOrbit = () => {
      setDegreeAngle((prev) => (prev + 0.04) % 360);
      animId = requestAnimationFrame(updateOrbit);
    };
    animId = requestAnimationFrame(updateOrbit);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, shineX, shineY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  }, []);

  const handleMonolithClick = () => {
    const currentMode = monolithModes[activeMode];
    try {
      soundEngine.playHarmonicChime(currentMode.freq);
    } catch {
      // Graceful
    }
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 1400);
    if (onInteract) onInteract();
  };

  const handleSwitchMode = (idx: number) => {
    setInternalMode(idx);
    if (onModeChange) onModeChange(idx);
    const mode = monolithModes[idx];
    try {
      soundEngine.playHarmonicChime(mode.freq);
    } catch {
      // Graceful
    }
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 800);
  };

  const currentMode = monolithModes[activeMode];

  return (
    <div className="flex flex-col items-center select-none w-full max-w-lg mx-auto">
      {/* Interactive 3D Cosmic Celestial Orb Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          soundEngine.playClick(1100, 0.015, 0.01);
        }}
        onMouseLeave={handleMouseLeave}
        onClick={handleMonolithClick}
        className="relative flex items-center justify-center cursor-pointer group w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[460px] lg:h-[460px]"
        style={{ perspective: 1200 }}
        aria-label={`KingShadP Sovereign Monolith in ${currentMode.title}`}
        id="cosmic-monolith-centerpiece"
      >
        {/* 1. Celestial Event Horizon Corona (Adaptive aura color) */}
        <div 
          className="absolute inset-[-15%] sm:inset-[-20%] rounded-full pointer-events-none transition-all duration-1000 ease-out"
          style={{
            background: isHovered
              ? `radial-gradient(circle, ${currentMode.accent}26 0%, rgba(244,241,236,0.06) 40%, rgba(5,5,5,0) 72%)`
              : `radial-gradient(circle, ${currentMode.accent}14 0%, rgba(244,241,236,0.02) 42%, rgba(5,5,5,0) 70%)`,
            transform: `scale(${isHovered ? 1.08 : 1})`,
          }}
        />

        {/* 2. Interactive Horizon Ripple Pulse on Click */}
        {rippleActive && (
          <div 
            className="absolute inset-0 rounded-full border animate-ping pointer-events-none"
            style={{ 
              borderColor: currentMode.accent,
              animationDuration: '1.2s', 
              animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
            }}
          />
        )}

        {/* 3. Astronomical Celestial Gyroscopic SVG Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-60 group-hover:opacity-90 transition-opacity duration-700"
          viewBox="0 0 500 500"
          fill="none"
        >
          {/* Outer Fine Precision Ring */}
          <circle
            cx="250"
            cy="250"
            r="238"
            stroke="rgba(244, 241, 236, 0.12)"
            strokeWidth="0.75"
          />

          {/* Rotating Outer Graduated Ring with Degree Ticks */}
          <g style={{ transform: `rotate(${degreeAngle}deg)`, transformOrigin: '250px 250px' }}>
            <circle
              cx="250"
              cy="250"
              r="224"
              stroke={currentMode.accent}
              strokeOpacity="0.25"
              strokeWidth="0.75"
              strokeDasharray="2 12"
            />
            {/* Cardinal degree notches */}
            <line x1="250" y1="20" x2="250" y2="28" stroke={currentMode.accent} strokeWidth="1.2" />
            <line x1="250" y1="472" x2="250" y2="480" stroke={currentMode.accent} strokeWidth="1.2" />
            <line x1="20" y1="250" x2="28" y2="250" stroke={currentMode.accent} strokeWidth="1.2" />
            <line x1="472" y1="250" x2="480" y2="250" stroke={currentMode.accent} strokeWidth="1.2" />
            
            {/* Orbiting Starlight Node */}
            <circle
              cx="250"
              cy="26"
              r="2.5"
              fill="#F4F1EC"
              className="shadow-[0_0_8px_#F4F1EC]"
            />
          </g>

          {/* Counter-Rotating Mid Celestial Ring */}
          <g style={{ transform: `rotate(${-degreeAngle * 0.7}deg)`, transformOrigin: '250px 250px' }}>
            <circle
              cx="250"
              cy="250"
              r="195"
              stroke="rgba(244, 241, 236, 0.08)"
              strokeWidth="0.6"
              strokeDasharray="4 24"
            />
            <circle
              cx="250"
              cy="55"
              r="1.8"
              fill={currentMode.accent}
              opacity="0.8"
            />
          </g>

          {/* Hairline Center Crosshairs */}
          <line x1="240" y1="250" x2="260" y2="250" stroke="rgba(244, 241, 236, 0.2)" strokeWidth="0.5" />
          <line x1="250" y1="240" x2="250" y2="260" stroke="rgba(244, 241, 236, 0.2)" strokeWidth="0.5" />
        </svg>

        {/* 4. The Monolith Sculptural Core with 3D Perspective Tilt */}
        <div
          className="relative w-[82%] h-[82%] flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Specular Sheen Layer */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.4) 0%, ${currentMode.accent}40 35%, transparent 70%)`,
            }}
          />

          {/* High-Resolution Monolith Render OR Interactive Wireframe */}
          <div className="relative w-full h-full flex items-center justify-center animate-float">
            {currentMode.image ? (
              <Image
                key={currentMode.id}
                src={currentMode.image}
                alt={`KingShadP Sovereign Monolith - ${currentMode.title}`}
                fill
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 360px, 420px"
                priority
                className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_25px_60px_rgba(183,110,121,0.3)] transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Sacred Geometry Wireframe Mode */
              <svg
                viewBox="0 0 300 300"
                className="w-[85%] h-[85%] overflow-visible filter drop-shadow-[0_0_20px_rgba(244,241,236,0.2)]"
              >
                {/* Golden Ratio Isometric Wireframe Octahedron */}
                <polygon
                  points="150,30 250,110 250,190 150,270 50,190 50,110"
                  fill="rgba(183,110,121,0.06)"
                  stroke="#B76E79"
                  strokeWidth="1.2"
                />
                <polygon
                  points="150,75 220,130 220,170 150,225 80,170 80,130"
                  fill="none"
                  stroke="#F4F1EC"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                />
                {/* Structural Diagonals */}
                <line x1="150" y1="30" x2="150" y2="270" stroke="#F4F1EC" strokeOpacity="0.4" strokeWidth="0.8" />
                <line x1="50" y1="110" x2="250" y2="190" stroke="#F4F1EC" strokeOpacity="0.3" strokeWidth="0.8" />
                <line x1="50" y1="190" x2="250" y2="110" stroke="#F4F1EC" strokeOpacity="0.3" strokeWidth="0.8" />
                
                {/* Key Geometric Vertices */}
                <circle cx="150" cy="30" r="3" fill="#B76E79" />
                <circle cx="250" cy="110" r="3" fill="#B76E79" />
                <circle cx="250" cy="190" r="3" fill="#B76E79" />
                <circle cx="150" cy="270" r="3" fill="#B76E79" />
                <circle cx="50" cy="190" r="3" fill="#B76E79" />
                <circle cx="50" cy="110" r="3" fill="#B76E79" />
                <circle cx="150" cy="150" r="4" fill="#F4F1EC" />
                
                <text x="160" y="145" fill="#F4F1EC" fontSize="8" fontFamily="monospace" opacity="0.6">
                  CORE [0,0,0]
                </text>
                <text x="160" y="35" fill="#B76E79" fontSize="8" fontFamily="monospace">
                  Y = +1.618 Φ
                </text>
              </svg>
            )}
          </div>
        </div>

        {/* Hover Cue Tag */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none text-[8px] font-mono tracking-[0.25em] uppercase text-[#F4F1EC]/60 whitespace-nowrap bg-[#050505]/90 px-2.5 py-0.5 rounded-full border border-white/10">
          <Sparkles size={9} className="text-[#B76E79]" />
          <span>CLICK TO RESONATE ({currentMode.freq} HZ)</span>
        </div>
      </div>

      {/* 5. Minimalist Mode Switcher Bar & Dossier Trigger */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-1 p-1 rounded-full border border-[#F4F1EC]/10 bg-[#050505]/80 backdrop-blur-md shadow-lg">
          {monolithModes.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleSwitchMode(idx)}
              className={`px-3 py-1 rounded-full text-[8px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                activeMode === idx
                  ? 'bg-[#F4F1EC] text-[#050505] font-bold shadow-md'
                  : 'text-[#F4F1EC]/50 hover:text-[#F4F1EC] hover:bg-[#F4F1EC]/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Dossier Quick Trigger */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick(900, 0.02, 0.02);
            setIsDossierOpen(true);
          }}
          title="Inspect Monolith Architectural Specifications"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B76E79]/30 bg-[#B76E79]/10 text-[#F4F1EC] hover:bg-[#B76E79] hover:text-[#050505] text-[8px] font-mono tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md"
        >
          <FileText size={10} className="text-[#B76E79] group-hover:text-[#050505]" />
          <span>DOSSIER</span>
        </button>
      </div>

      {/* Architectural Dossier Modal */}
      <MonolithDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        activeModeName={currentMode.title}
      />
    </div>
  );
}
