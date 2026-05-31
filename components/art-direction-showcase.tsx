'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Radio, Shield, Globe, Compass, RefreshCw, Layers, ZoomIn, Info } from 'lucide-react';
import Image from 'next/image';

interface MockupDetails {
  title: string;
  subtitle: string;
  version: string;
  latency: string;
}

export default function ArtDirectionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeInteractiveNode, setActiveInteractiveNode] = useState<number | null>(null);
  const [currentOrbitAngle, setCurrentOrbitAngle] = useState(0);

  // Parallax coordinates driven by mouse move over this specific container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 22, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic transforms to create depth between background shapes, desktop, and mobile mockups
  const bgParallaxX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgParallaxY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const desktopParallaxX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const desktopParallaxY = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);
  const desktopRotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const desktopRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const mobileParallaxX = useTransform(smoothX, [-0.5, 0.5], [-70, 70]);
  const mobileParallaxY = useTransform(smoothY, [-0.5, 0.5], [-70, 70]);
  const mobileRotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const mobileRotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const xVal = (e.clientX - left) / width - 0.5;
    const yVal = (e.clientY - top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Continuous rotation for absolute orbital paths
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOrbitAngle((prev) => (prev + 0.3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Telemetry interactive points on the mockup
  const hotspots = [
    { id: 1, top: '28%', left: '42%', title: 'COLLAR NFC CORE', details: 'Fusing raw magnetic copper coils with physical tags tracking continuous 48Hz acoustic sweeps.' },
    { id: 2, top: '48%', left: '55%', title: 'MAGNETIC POSTURE RIB', details: 'Graphene fiber rib panels naturally shifting physical alignment on custom harness hooks.' },
    { id: 3, top: '72%', left: '38%', title: 'TACTICAL EXPANSION SLEEVE', details: 'Dual asymmetric double-weave zippers blocking standard 99.4% of infrared heat waves.' },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[850px] lg:min-h-[950px] bg-[#020202] border border-white/10 rounded-md overflow-hidden flex flex-col justify-between p-6 md:p-10 select-none group"
      style={{ perspective: 1200 }}
    >
      {/* 1. Deep Atmospheric Gradient Atmosphere Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Deep blue radial base */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_45%_55%,_rgba(15,23,42,0.65)_0%,_transparent_55%)]" />
        
        {/* Pulsing cosmic crimson gradient */}
        <motion.div 
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[30%] -right-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,_rgba(127,17,224,0.18)_0%,_transparent_60%)] mix-blend-color-dodge" 
        />
        
        {/* Volcanic magma warm core highlight */}
        <motion.div 
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[30%] -left-[10%] w-[90%] h-[90%] bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.12)_0%,_transparent_60%)] mix-blend-screen" 
        />

        {/* Ambient neon violet drift */}
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(219,39,119,0.06)_0%,_transparent_70%)]" />
        
        {/* Micro coordinate grid lines */}
        <motion.div 
          style={{ x: bgParallaxX, y: bgParallaxY }}
          className="absolute inset-[-40px] bg-[radial-gradient(#ffffff_1px,_transparent_1.5px)] [background-size:48px_48px] opacity-[0.05] pointer-events-none" 
        />
      </div>

      {/* 2. Abstract Orbital Star Paths & Geometries (Absolute Layer Behind Mockups) */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        {/* Giant Orbit circle (Outer) */}
        <svg className="absolute w-[650px] h-[650px] opacity-[0.08]" style={{ transform: `rotate(${currentOrbitAngle}deg)` }}>
          <circle cx="325" cy="325" r="300" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3 9" />
          <circle cx="325" cy="25" r="4" fill="white" className="animate-pulse" />
        </svg>

        {/* Medium Orbit circle (Middle) */}
        <svg className="absolute w-[450px] h-[450px] opacity-[0.14]" style={{ transform: `rotate(${-currentOrbitAngle * 1.5}deg)` }}>
          <circle cx="225" cy="225" r="210" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="20 40" />
          <circle cx="15" cy="225" r="3" fill="white" />
        </svg>

        {/* Concentric rings showing target telemetry alignments */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.04] flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
          <div className="w-[190px] h-[190px] rounded-full border border-dashed border-white/[0.06]" />
        </div>
      </div>

      {/* 3. Oversized Subtle Outline Brand Wordmark behind everything */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden z-0">
        <h2 className="text-center font-serif text-[130px] sm:text-[180px] lg:text-[230px] leading-none tracking-[0.25em] text-white/[0.015] font-black uppercase whitespace-nowrap">
          KINGSHADP
        </h2>
      </div>

      {/* 4. Top Minimal Top Navigation / Status Header inside the sandbox container */}
      <div className="relative w-full flex justify-between items-center text-[8px] font-mono tracking-widest text-[#666666] border-b border-white/[0.06] pb-3 z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-[#E5E5E5]">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> 
            PORTAL_ACTIVE: SHAD_V2.19
          </span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="hidden sm:inline">ALGORITHM: NESTED_ORBITALS</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">LATENCY // 1.25ms [DIRECT]</span>
          <span className="text-[#E5E5E5] bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded font-mono text-[7px]">MATRIX RESOLVED</span>
        </div>
      </div>

      {/* 5. Centerpiece Showcase: Desktop Mockup and Mobile Mockup Floating side-by-side */}
      <div className="relative w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 z-20 my-8 py-4">
        
        {/* A. Desktop Mockup (Left Centerpiece) */}
        <motion.div
          style={{ 
            x: desktopParallaxX, 
            y: desktopParallaxY,
            rotateY: desktopRotateY,
            rotateX: desktopRotateX,
            transformStyle: 'preserve-3d'
          }}
          className="w-full max-w-[580px] bg-[#070707]/90 rounded border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-xl group/desktop"
        >
          {/* Mockup Header Toolbar */}
          <div className="w-full h-8 px-4 bg-[#0a0a0a] border-b border-white/5 flex justify-between items-center text-[8px] font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              </div>
              <span className="opacity-70">kingshadp.universe // core_system</span>
            </div>
            <div className="flex items-center gap-3">
              <Terminal className="w-3 h-3 text-neutral-500" />
              <span>TERMINAL SECURE</span>
            </div>
          </div>

          {/* Mockup Screensheet Display: Broken Grid & Monochromatic Masterpiece */}
          <div className="p-5 md:p-7 space-y-6 relative min-h-[340px] flex flex-col justify-between text-left">
            {/* Fine border mask inside */}
            <div className="absolute inset-0 border border-white/[0.015] m-3 pointer-events-none" />

            {/* Top Mock navigation line */}
            <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
              <span className="font-serif italic text-xs tracking-wider text-[#E5E5E5]">kingshadp</span>
              <div className="flex gap-4 font-mono text-[7px] text-neutral-500 tracking-wider">
                <span className="text-white">CONCEPT_01</span>
                <span>SYSTEM</span>
                <span>CATALOGUE</span>
              </div>
            </div>

            {/* Asymmetrical Overlapping Layout Mock */}
            <div className="grid grid-cols-12 gap-4 items-center">
              
              {/* Product Visual Area with overlay targets */}
              <div className="col-span-6 relative aspect-[5/6] bg-neutral-900 border border-white/10 overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/editorial_hood/600/720?grayscale"
                  alt="KingShadP Heavy Carbon Monolith Anorak Jacket mockup"
                  fill
                  className="object-cover opacity-35 mix-blend-luminosity brightness-95 group-hover/desktop:scale-105 transition-transform duration-1000"
                />
                
                {/* Embedded Grid Marks */}
                <div className="absolute inset-0 border border-white/[0.02] m-2 pointer-events-none" />
                
                {/* Active telemetry signal dots */}
                {hotspots.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setActiveInteractiveNode(activeInteractiveNode === pt.id ? null : pt.id)}
                    className="absolute w-4 h-4 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto"
                    style={{ top: pt.top, left: pt.left }}
                  >
                    <span className={`absolute inset-0 rounded-full bg-orange-500 opacity-60 animate-ping`} />
                    <span className={`w-2 h-2 rounded-full border border-white ${activeInteractiveNode === pt.id ? 'bg-orange-500' : 'bg-white/80'} transition-colors duration-300`} />
                  </button>
                ))}
              </div>

              {/* Editorial Broken Grid Text Info columns */}
              <div className="col-span-6 pl-2 space-y-3">
                <span className="font-mono text-[7px] tracking-widest text-[#444444] uppercase block">[ARTIFACT CORE 04_S]</span>
                <h3 className="font-serif italic text-lg leading-tight text-[#E5E5E5] font-light">
                  Heavy Carbon <br />Monolith Coat
                </h3>
                <p className="text-[9px] text-neutral-500 leading-relaxed font-sans">
                  Tailored outerwear block modeled specifically with integrated electromagnetic and physical postural armor frames.
                </p>

                {/* Simulated Spec table tag */}
                <div className="pt-2 border-t border-white/[0.04] space-y-1.5 font-mono text-[7px] text-[#444444]">
                  <div className="flex justify-between">
                    <span>CODENAME</span>
                    <span className="text-neutral-400">VOID_MATTE_04</span>
                  </div>
                  <div className="flex justify-between">
                    <span>INDEXED</span>
                    <span className="text-neutral-400">SYS_H-449FF10A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary telemetry diagnostic box */}
            <div className="bg-[#0b0b0b] border border-white/5 p-2 rounded flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-orange-500/80 animate-pulse" />
                <div className="font-mono text-[7px] text-neutral-500 leading-tight">
                  <div className="text-neutral-300 uppercase">Interactive Hotspot Telemetry</div>
                  <div>Click any pulsing orange beacon to read technical specs</div>
                </div>
              </div>
              <LottieRadarMinimal />
            </div>

          </div>
        </motion.div>

        {/* B. Smartphone / Mobile Mockup (Right, Overlapping Layered Depth) */}
        <motion.div
          style={{ 
            x: mobileParallaxX, 
            y: mobileParallaxY,
            rotateY: mobileRotateY,
            rotateX: mobileRotateX,
            transformStyle: 'preserve-3d'
          }}
          className="w-[200px] sm:w-[230px] bg-[#070707] rounded-2xl border border-white/20 shadow-[0_25px_50px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-xl group/mobile hidden sm:block"
        >
          {/* Phone Notch/Inner framing */}
          <div className="absolute top-0 inset-x-0 h-4 bg-black flex justify-center items-center z-30">
            <div className="w-12 h-3 bg-neutral-900 rounded-b-xl border-x border-b border-white/5" />
          </div>

          {/* Screen Content */}
          <div className="pt-7 p-4 pb-5 space-y-5 text-left text-[9px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-mono text-[6px] tracking-widest text-[#444444]">04B // MATRIX_INDEX</span>
              <span className="text-green-500 font-mono text-[5px] animate-pulse">● SWEEPING SAT</span>
            </div>

            {/* Mobile Visual Space */}
            <div className="relative aspect-[3/4] w-full bg-[#0a0a0a] border border-white/5 overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/modelmobile/400/530?grayscale"
                alt="Mobile preview look"
                fill
                className="object-cover opacity-25 mix-blend-luminosity brightness-95 group-hover/mobile:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-2 left-2 font-serif text-[10px] text-neutral-300 italic">kingshadp</div>
            </div>

            {/* Telemetry data list */}
            <div className="space-y-2 border-t border-white/5 pt-3 font-mono text-[7px]">
              <div className="flex justify-between text-[#888888]">
                <span>CORE TRANSMITTER</span>
                <span className="text-white">[ACTIVE]</span>
              </div>
              <div className="h-[2px] w-full bg-neutral-950 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-orange-500"
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  style={{ width: '30%' }}
                />
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>TUNE_FREQUENCY</span>
                <span className="text-neutral-400">144.10 MHz</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>ANTENNA STATUS</span>
                <span className="text-neutral-400">DIPOLE LOCK_06</span>
              </div>
            </div>

            {/* Small circular radar overlay on phone bottom */}
            <div className="flex items-center gap-1.5 p-1.5 bg-neutral-950 rounded border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span className="text-[6px] font-mono leading-none uppercase text-neutral-400">Acoustic Signal Synchronous</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Interactive Telemetry Overlay Drawer Info (Displays state of active hotspots) */}
      <div className="absolute top-[48px] right-6 max-w-[280px] z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeInteractiveNode !== null && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-[#090909]/95 border border-orange-500/30 p-4 rounded shadow-2xl backdrop-blur-md pointer-events-auto text-left"
            >
              <div className="flex justify-between items-baseline border-b border-white/10 pb-2 mb-2 font-mono text-[8px]">
                <span className="text-orange-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full animate-ping" />
                  NODE_BEACON_0{activeInteractiveNode}
                </span>
                <button 
                  onClick={() => setActiveInteractiveNode(null)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-[7px]"
                >
                  CLOSE [X]
                </button>
              </div>
              <h4 className="font-serif italic text-xs text-[#E5E5E5] mb-1.5">
                {hotspots.find(h => h.id === activeInteractiveNode)?.title}
              </h4>
              <p className="font-sans text-[9px] text-[#888888] leading-relaxed">
                {hotspots.find(h => h.id === activeInteractiveNode)?.details}
              </p>
              <div className="mt-3 flex justify-between font-mono text-[7px] text-[#444444]">
                <span>DECRYPT: COMPLETE</span>
                <span>SYS_AL_180</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Margins: Vertical side labels, indicators, numbers of deep structure */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[7px] tracking-widest text-[#444444] uppercase hidden md:flex flex-col gap-8 z-30 select-none">
        <span className="transform -rotate-90 origin-left">AXIS_GRID COORDINATE // LAT_34.0522°</span>
        <span className="transform -rotate-90 origin-left">COGNITIVE ATMOSPHERE // SYSTEM MATRIX</span>
      </div>
      
      <div className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[7px] tracking-widest text-[#444444] uppercase hidden md:flex flex-col gap-8 z-30 select-none">
        <span className="transform rotate-90 origin-right">SPECTRUM VECTOR TUNE // 566.8 THz</span>
        <span className="transform rotate-90 origin-right">CRAFTED UNIVERSE ARCHIVE // ORBITAL MODEL</span>
      </div>

      {/* 7. Bottom Frame parameters showing active calibrations */}
      <div className="relative w-full flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono tracking-widest text-[#444444] border-t border-white/[0.06] pt-3 z-30">
        <div className="flex gap-4">
          <span>COSMIC COMPRESSION: 99.8%</span>
          <span>ORBIT_RANGE: STABLE</span>
        </div>
        <div className="flex items-center gap-1 bg-[#090909] px-2 py-0.5 border border-white/5 rounded text-neutral-300 mt-2 sm:mt-0 select-none">
          <Layers className="w-2.5 h-2.5 text-orange-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>ENGAGE SYSTEM PARALLAX (MOUSE SENSOR ACTIVE)</span>
        </div>
      </div>
    </div>
  );
}

// Minimal loading canvas simulation node
function LottieRadarMinimal() {
  return (
    <div className="w-14 h-8 bg-black/40 border border-white/5 rounded relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[#070707] flex flex-col justify-between p-1 text-[5px] font-mono text-neutral-600">
        <div className="flex justify-between">
          <span className="text-orange-500 animate-pulse">LOCK</span>
          <span>CH4</span>
        </div>
        <div className="h-1 bg-[#111] rounded relative overflow-hidden">
          <motion.div 
            animate={{ width: ['10%', '90%', '40%', '100%', '10%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-0 bg-orange-500/30" 
          />
        </div>
      </div>
    </div>
  );
}
