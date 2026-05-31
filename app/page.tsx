'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Play, Volume2, ArrowDown, Activity, Radio, X, Terminal, Cpu, Info } from 'lucide-react';
import Image from 'next/image';
import Magnetic from '@/components/magnetic';

// Artifact Interface & Dataset for telemetry database mapping
export interface Artifact {
  id: string;
  entry: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  hash: string;
  coords: string;
  lore: string;
  specs: { label: string; val: string }[];
  frequency: string;
}

const ARTIFACTS: Artifact[] = [
  {
    id: 'art-01',
    entry: 'ENTRY_01 // SECURE',
    title: 'Sonic Weaving',
    subtitle: 'NFC ACCELERATOR COLLAR',
    description: 'Integrated NFC signals within clothing tags that open continuous high-contrast ambient audio waves synced directly with the current user location.',
    status: 'PROTOTYPING',
    hash: 'H-927A0B7C',
    coords: '80.12° N / 144.11° E',
    lore: 'Embedded deeply within the high-density double-weave collar structure, the NFC capsule interfaces with the KingShadP sonic satellite network. Upon physical validation, it initiates a 48Hz deep orbital drone customized to your environment’s acoustic geometry. A perfect translation of space and garment.',
    specs: [
      { label: 'CHIP TYPE', val: 'NFC-v4.9 Ultra Shielded' },
      { label: 'ENCRYPTION', val: 'AES-256 GCM' },
      { label: 'FREQUENCY', val: '13.56 MHz Standard' },
      { label: 'COATING', val: 'Liquid carbon polymer' }
    ],
    frequency: '48.00 Hz'
  },
  {
    id: 'art-02',
    entry: 'ENTRY_02 // SYSTEM',
    title: 'Architectural Vaults',
    subtitle: 'VIRTUAL BLUEPRINT CORRIDOR',
    description: 'CGI collections rendered entirely within simulated geometric, monochromatic concrete halls. No physical settings or standard retail layouts.',
    status: 'RESEARCH',
    hash: 'H-1108D82F',
    coords: '90.00° N / 0.00° W',
    lore: 'Impossible, scale-less structures built inside concrete digital simulations. These volumes act as lookbooks where items are suspended in mid-air, resisting virtual gravity. Designed with infinite vaults, they present the garments not as merchandise, but as relics rescued from a decommissioned space station.',
    specs: [
      { label: 'RENDER ENG', val: 'Realtime Unreal Engine 6' },
      { label: 'POLYGONS', val: '14,200,000 instanced' },
      { label: 'RESOLUTION', val: 'Raw 8K stereoscopic' },
      { label: 'RAYTRACING', val: 'Path traced offline bias' }
    ],
    frequency: '104.20 MHz'
  },
  {
    id: 'art-03',
    entry: 'ENTRY_03 // TRANS',
    title: 'Numerical Drops',
    subtitle: 'TYPOGRAPHIC DECRYPTION PORTAL',
    description: 'Unannounced access pages protected by visual and numerical code sequences hidden within typographic patterns of previous architectural files.',
    status: 'SYSTEM_ON',
    hash: 'H-55C71E9D',
    coords: '35.67° N / 139.65° E',
    lore: 'An active digital riddle. These hidden spaces are only accessible by decrypting string patterns embedded inside the microscopic typography of our physical lookbooks. Once cracked, a secure terminal link spawns to lease rare individual garment models.',
    specs: [
      { label: 'HASH SEED', val: 'SHA3-512 Random Orbit' },
      { label: 'RESOLVER', val: 'Diffie-Hellman Key v2' },
      { label: 'CIPHER', val: 'Vigenère typographic shift' },
      { label: 'TTL', val: '180 seconds per session' }
    ],
    frequency: '921.05 KHz'
  },
  {
    id: 'art-04',
    entry: 'ENTRY_04 // UTILITY',
    title: 'Monolith Garments',
    subtitle: 'CARBON-MATTE SHELL SHEATH',
    description: 'Heavy structural outer coats tailored with raw carbon-cotton blends blocking infrared signatures and preserving clean monumental silhouettes.',
    status: 'PRODUCTION',
    hash: 'H-449FF10A',
    coords: '52.52° N / 13.40° E',
    lore: 'Structured outwear modeled on monolithic geometry. Featuring heavy-insulated high-neck hoods and asymmetric double-breasted zippers, this piece acts as a protective shield in noisy environments. The heavy weight creates physical tension, altering your posture to command authority.',
    specs: [
      { label: 'THREAD WT', val: '720 GSM Raw Cotton & Carbon' },
      { label: 'THERMAL CAP', val: '99.4% IR Blockage' },
      { label: 'ARMOR TIER', val: 'Level II tactical weave' },
      { label: 'COLORWAY', val: 'Pitch Void Matte Black' }
    ],
    frequency: '12.40 GHz'
  },
  {
    id: 'art-05',
    entry: 'ENTRY_05 // INTERFACE',
    title: 'Orbital Transmitters',
    subtitle: 'KINETIC ANALOG HARNESS',
    description: 'Analog interface transmitters tracking live satellite magnetic sweeps, translating telemetry maps directly into synthesizer control signals.',
    status: 'ENCODING',
    hash: 'H-9034EBA8',
    coords: '0.00° S / 102.45° W',
    lore: 'A micro-transmitter module designed to click onto tactical harness rigs. Capturing magnetic disturbances from low-Earth orbit satellites, it translates mathematical orbits into raw analog control voltages, filtering live ambient synth sounds on your physical sound system.',
    specs: [
      { label: 'ANTENNA', val: 'Dipole microline array' },
      { label: 'TELEMETRY', val: 'VHF Uplink 144.1 MHz' },
      { label: 'POWER SRC', val: 'Kinetic heat harvester' },
      { label: 'COMPAT', val: 'Analog synth level v1' }
    ],
    frequency: '144.10 MHz'
  },
  {
    id: 'art-06',
    entry: 'ENTRY_06 // SENSOR',
    title: 'Spectral Panel Caps',
    subtitle: 'FOCAL ALIGNMENT PANEL',
    description: 'Low-profile tactical panels with spatial filters calibrated to respond to localized electromagnetic noise and ambient user attention.',
    status: 'COMPLETED',
    hash: 'H-097FEE14',
    coords: '40.71° N / 74.00° W',
    lore: 'Low-profile cap panels that track ambient light variations to align visual elements on wearer\'s wrist devices. Designed with graphene composite structure, they absorb 99.8% of light to remain black and low-key at any angle.',
    specs: [
      { label: 'SENSOR TYPE', val: 'Photonic focus tracker' },
      { label: 'LATENCY', val: '1.2 milliseconds max' },
      { label: 'CALIBRATION', val: 'Deep Space Vector Align' },
      { label: 'MATERIAL', val: 'Graphene fiber composite' }
    ],
    frequency: '566.80 THz'
  }
];

// Characters for decryption animation
const CHARS = '0123456789XØ■□▲△▼▽✦✧⊙☉⚝◇⧉⧔⧕';

const DecryptingText = ({ text, delay = 0, speed = 40 }: { text: string; delay?: number; speed?: number }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      let currentIteration = 0;
      
      timer = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, index) => {
              if (index < currentIteration) {
                return char;
              }
              if (char === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (currentIteration >= text.length) {
          clearInterval(timer);
        }
        currentIteration += 1 / 3;
      }, speed);
    };
    run();
    return () => clearInterval(timer);
  }, [text, delay, speed]);

  return <span>{display}</span>;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, subtitle, number }: { children: React.ReactNode; subtitle?: string; number: string }) => (
  <div className="mb-20 md:mb-32 relative">
    <FadeIn>
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-[10px] text-[#444444] tracking-widest">{number}</span>
        <h2 className="font-serif italic text-3xl md:text-5xl text-[#E5E5E5] tracking-wide font-light">
          {children}
        </h2>
      </div>
      {subtitle && (
        <p className="text-[#444444] font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed mt-2 max-w-xl">
          [{subtitle}]
        </p>
      )}
    </FadeIn>
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-[1px] bg-white/[0.04] hidden md:block" />
  </div>
);

const RuleList = ({ title, items, isNegative = false }: { title: string; items: string[]; isNegative?: boolean }) => (
  <div className="mb-12">
    <h3 className={`font-mono text-[10px] uppercase tracking-widest mb-6 ${isNegative ? 'text-[#444444]/60' : 'text-[#444444]'}`}>
      [{title}]
    </h3>
    <ul className="space-y-6">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-4 ${isNegative ? 'text-[#444444]/80' : 'text-[#E5E5E5]'}`}>
          <span className="font-mono text-[9px] mt-1 text-[#444444]">{i < 9 ? `0${i + 1}` : i + 1} {"//"}</span>
          <span className="text-sm tracking-wide leading-relaxed font-sans">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function Page() {
  const [initLoader, setInitLoader] = useState(true);
  const [percent, setPercent] = useState(0);
  const [audioActive, setAudioActive] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const synthRef = useRef<{ ctx: AudioContext; stop: () => void } | null>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 80]);

  // Mouse Parallax Coordinate Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  useEffect(() => {
    // Shifting simulation coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Loading animation
  useEffect(() => {
    if (!initLoader) return;
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setInitLoader(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [initLoader]);

  // Synthesizer toggle - safe, high fidelity, 100% standard Web Audio API
  const toggleAudio = () => {
    if (audioActive) {
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
      setAudioActive(false);
    } else {
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtxClass();
        
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const amp = ctx.createGain();

        // Atmospheric Sub Oscillation
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(48, ctx.currentTime); // C# deep space hum
        
        // Quiet harmonic
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(96, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);

        amp.gain.setValueAtTime(0, ctx.currentTime);
        amp.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);

        // Low frequency modifier for distance filter sweeps
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // extremely slow 12s sweep
        lfoGain.gain.setValueAtTime(25, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(amp);
        amp.connect(ctx.destination);

        lfo.start();
        osc1.start();
        osc2.start();

        synthRef.current = {
          ctx,
          stop: () => {
            amp.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
            setTimeout(() => {
              osc1.stop();
              osc2.stop();
              lfo.stop();
              ctx.close();
            }, 1200);
          }
        };
        setAudioActive(true);
      } catch (err) {
        console.error('Audio synthesizer initialization failed', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  const atmosphereX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const atmosphereY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const gridX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const gridY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#E5E5E5] selection:text-[#050505] overflow-hidden">
      
      {/* 1. Loader Sequence "Transmission Decryptor" */}
      {initLoader && (
        <motion.div 
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-8 md:p-16 border-frame font-mono text-[10px] text-[#444444]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div>{"// SYSTEM CODENAME: KINGSHADP"}</div>
              <div>{"// TRANS-REC-SECURE: ACTIVE"}</div>
            </div>
            <div>[0x{percent.toString(16).toUpperCase()}_ARCH]</div>
          </div>

          <div className="max-w-xl self-center w-full text-center">
            <div className="text-[#E5E5E5] font-serif italic text-3xl md:text-5xl font-light mb-4">
              <DecryptingText text="KINGSHADP" speed={25} />
            </div>
            <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#444444] mb-8">
              INITIALIZING IMMERSIVE COGNITIVE CHANNEL
            </div>
            {/* Minimal Decrypted Progress Bar */}
            <div className="h-[2px] w-full bg-[#111111] relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#E5E5E5] transition-all duration-300 ease-out" 
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 text-[8px] text-[#444444]/60">
              <span className="animate-pulse">STABILIZING SATELLITE VECTOR</span>
              <span>{percent}% RESOLVED</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>{"ORBITAL ANGLE: STABLE // DECR_MODE_2"}</div>
            <div>VER: 4.1.9 // PREVIEW</div>
          </div>
        </motion.div>
      )}

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ x: atmosphereX, y: atmosphereY }}
          className="absolute inset-[-100px] bg-[radial-gradient(circle_at_70%_30%,_#141414_0%,_transparent_65%)] opacity-50" 
        />
        <motion.div 
          style={{ x: gridX, y: gridY }}
          className="absolute inset-[-100px] bg-[radial-gradient(#222222_1px,_transparent_1.5px)] [background-size:64px_64px] opacity-15" 
        />
      </div>
      
      {/* Structural Framing border from Immersive UI */}
      <div className="fixed top-5 bottom-5 left-5 right-5 border border-white/[0.02] pointer-events-none z-40 hidden md:block" />

      {/* Header Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-50 mix-blend-difference">
        <div className="font-serif italic text-lg text-[#E5E5E5] tracking-wide font-light">
          kingshadp
        </div>
        <div className="flex items-center gap-12 text-[#444444] font-mono text-[9px] tracking-widest uppercase">
          <a href="#core" className="hover:text-white transition-colors duration-400">01 / CONCEPT</a>
          <a href="#visual" className="hover:text-white transition-colors duration-400">02 / VISUALS</a>
          <a href="#music" className="hover:text-white transition-colors duration-400">03 / AUDIO</a>
          <span className="hidden md:inline text-neutral-800">|</span>
          <span className="hidden md:inline font-bold text-[#E5E5E5]">ARCHIVE_2026</span>
        </div>
      </nav>

      {/* Floating System Attributes */}
      <ul className="fixed bottom-0 left-0 p-6 md:p-12 z-50 font-mono text-[9px] tracking-widest text-[#444444] uppercase space-y-2 hidden md:block mix-blend-difference">
        <li className="flex items-center gap-2">
          <span className="w-[4px] h-[4px] rounded-full bg-[#E5E5E5] animate-ping" />
          SIGNAL STRENGTH: MAXIMUM
        </li>
        <li>LAT: 34.0522° N // LONG: 118.2437° W</li>
        <li>FEED STATUS: ONLINE [STABLE_ORBIT]</li>
      </ul>

      {/* Dynamic Waveform Visualizer connected to Audio Hum */}
      <div className="fixed bottom-0 right-0 p-6 md:p-12 z-50 flex items-center gap-4 font-mono text-[9px] text-[#444444] hidden md:flex mix-blend-difference">
        <div className="text-right">
          <div className="text-[#E5E5E5]">FREQUENCY WAVE</div>
          <div className="opacity-60">{audioActive ? "ACTIVE drone 48hz" : "MUTED"}</div>
        </div>
        <div className="flex items-end gap-[3px] h-6 w-16">
          <div className={`w-[2px] transition-all duration-300 ${audioActive ? 'bg-[#E5E5E5] h-3 animate-pulse' : 'bg-neutral-800 h-1'}`} />
          <div className={`w-[2px] transition-all duration-300 ${audioActive ? 'bg-[#E5E5E5] h-5' : 'bg-neutral-800 h-[2px]'}`} style={{ animationDelay: '0.1s' }} />
          <div className={`w-[2px] transition-all duration-300 ${audioActive ? 'bg-[#E5E5E5] h-6 animate-bounce' : 'bg-neutral-800 h-1'}`} style={{ animationDelay: '0.2s' }} />
          <div className={`w-[2px] transition-all duration-300 ${audioActive ? 'bg-[#E5E5E5] h-4' : 'bg-neutral-800 h-[2px]'}`} style={{ animationDelay: '0.3s' }} />
          <div className={`w-[2px] transition-all duration-300 ${audioActive ? 'bg-[#E5E5E5] h-2 animate-pulse' : 'bg-neutral-800 h-1'}`} style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-end items-start px-6 md:px-20 pb-20 md:pb-32 w-full max-w-[1700px] mx-auto z-10">
        
        {/* Cinematic Live Feed Container */}
        <div className="absolute right-6 md:right-20 top-[20%] w-full md:w-[500px] lg:w-[600px] aspect-[16/10] bg-neutral-950/80 border border-white/[0.04] p-2 rounded overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Header Bar */}
          <div className="flex justify-between items-center px-3 py-1.5 border-b border-white/[0.03] font-mono text-[8px] text-[#444444] uppercase mb-2">
            <span className="flex items-center gap-1.5"><Radio className="w-2.5 h-2.5 text-neutral-400 animate-pulse" /> SATELLITE RADAR FEED</span>
            <span className="animate-pulse text-[#E5E5E5]">LIVE_CONNECTION_01</span>
          </div>

          <div className="relative w-full h-[calc(100%-24px)] overflow-hidden bg-black group">
            {/* Noise filter + grid mask */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] [background-size:100%_4px,_6px_100%] opacity-20" />
            
            {/* The Cinematic image */}
            <Image 
              src="https://picsum.photos/seed/monolith/1000/600?grayscale" 
              alt="Orbital Monolith live telemetry" 
              fill
              className="object-cover opacity-40 mix-blend-luminosity transform scale-102 group-hover:scale-105 group-hover:opacity-75 transition-all duration-[2000ms] ease-out pointer-events-none"
            />

            {/* Simulated target grid */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 border border-white/[0.1] rounded-full flex items-center justify-center scale-75 animate-pulse">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
              
              <div className="absolute top-4 left-4 font-mono text-[8px] text-[#444444] uppercase flex flex-col gap-0.5">
                <span>RANG: 48,000KM</span>
                <span>AZIMUTH: 182.4°</span>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#444444] uppercase">
                STABLE_ORBIT [100.0%]
              </div>
            </div>
          </div>
        </div>

        {/* Brand Text positioned specifically to utilize negative space mapping */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-xl z-20 absolute bottom-20 left-6 md:left-20"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[9px] text-[#444444] tracking-[0.25em] uppercase">
            <span>[ARCHIVE FILE_017C]</span>
            <span className="w-3 h-[1px] bg-[#444444]" />
            <span>ORBIT REVELATION</span>
          </div>

          <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#E5E5E5] font-light mb-8">
            Digital <br className="hidden md:inline" />Archive
          </h1>
          
          <p className="font-mono text-[10px] text-[#888888] uppercase tracking-[0.3em] leading-relaxed max-w-lg">
            A quiet visual manifesto of KingShadP. Investigating cosmic gravity, silent typography, and curated garments designed as material artifacts in a wider narrative architecture.
          </p>

          <div className="mt-12 flex items-center gap-6">
            <Magnetic range={120} strength={0.4} scaleStrength={0.08}>
              <button 
                onClick={() => {
                  const el = document.getElementById('core');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-mono text-[9px] tracking-widest uppercase text-[#E5E5E5] border border-white/20 px-6 py-3 hover:bg-white hover:text-black hover:border-white transition-all duration-400 flex items-center gap-2"
              >
                Descend to Core <ArrowDown className="w-3 h-3" />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      {/* CORE CONCEPT SECTION */}
      <section id="core" className="py-44 md:py-64 px-6 md:px-20 mx-auto max-w-6xl relative z-10 scroll-mt-24">
        <SectionHeading number="01" subtitle="RECONSTRUCTING BRAND IDENTITY">
          Core Vision & Identity
        </SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-start">
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-3xl font-serif text-[#E5E5E5] leading-relaxed font-light italic mb-8">
              KingShadP is more than garments. It is an exploration of space, deep-space distance, and structural command.
            </p>
            <p className="text-neutral-500 font-sans leading-relaxed text-sm md:text-base">
              By utilizing expansive positive space coupled with deliberate visual voids, we treat visual communication with architectural discipline. There is no need for superficial graphic noise — weight is created where we choose not to construct.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 gap-12">
             <FadeIn delay={0.2}>
               <h3 className="font-mono text-[10px] tracking-widest text-[#444444] mb-4 uppercase">SYSTEM PARAMETERS</h3>
               <div className="w-full h-[1px] bg-[#444444]/30 mb-6" />
               <ul className="space-y-4 font-sans text-sm text-[#E5E5E5]">
                 <li className="flex justify-between border-b border-[#444444]/20 pb-3">
                   <span className="text-[#888888] font-mono text-[10px]">01 / MOOD</span> 
                   <span className="tracking-wide text-right">Cinematic Silence</span>
                 </li>
                 <li className="flex justify-between border-b border-[#444444]/20 pb-3">
                   <span className="text-[#888888] font-mono text-[10px]">02 / COMPOSITION</span> 
                   <span className="tracking-wide text-right">Extremely Loose Negative Space</span>
                 </li>
                 <li className="flex justify-between border-b border-[#444444]/20 pb-3">
                   <span className="text-[#888888] font-mono text-[10px]">03 / PALETTE</span> 
                   <span className="tracking-wide text-right">Stark Monochromatic #050505</span>
                 </li>
                 <li className="flex justify-between border-b border-[#444444]/20 pb-3">
                   <span className="text-[#888888] font-mono text-[10px]">04 / BRAND VALUE</span> 
                   <span className="tracking-wide text-right">Physical Narrative Artifacts</span>
                 </li>
               </ul>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* VISUAL LAYOUTS SECTION */}
      <section id="visual" className="py-36 md:py-52 px-6 md:px-20 bg-transparent relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading number="02" subtitle="SYMBOLISM RECONFIGURED">
            Visual Language & Geometry
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-center">
            {/* Interactive Image Frame */}
            <div className="md:col-span-5 relative aspect-[3/4] w-full bg-[#090909] overflow-hidden group border border-white/[0.04]">
               {/* Grid scanner lines */}
               <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/[0.03] pointer-events-none z-10" />
               <div className="absolute inset-y-0 left-2/3 w-[1px] bg-white/[0.03] pointer-events-none z-10" />
               <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.03] pointer-events-none z-10" />

               <Image 
                 src="https://picsum.photos/seed/monochromeplate/800/1200?grayscale" 
                 alt="Concrete structural geometry" 
                 fill
                 className="object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-60 transition-all duration-[1500ms] pointer-events-none"
               />
               <div className="absolute inset-0 border border-[#444444]/20 m-4 pointer-events-none" />
               <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-widest text-[#444444] uppercase flex items-center gap-2">
                 <Activity className="w-3 h-3" /> MODEL FEED FRAME: 02B
               </div>
            </div>

            <div className="md:col-span-1" />

            {/* Typography Content blocks */}
            <div className="md:col-span-6 space-y-16">
              <FadeIn>
                <div className="font-mono text-[10px] text-[#444444] mb-2 uppercase">[RULE_01 / SPACE]</div>
                <h4 className="font-serif italic text-2xl text-[#E5E5E5] mb-4 font-light">Negative Space as Storytelling</h4>
                <p className="text-[#888888] font-sans text-sm leading-relaxed">
                  We believe standard fashion layouts explain themselves too much, diluting interest. KingShadP treats space as a quiet structural design. This highlights each item’s individual presence, preserving an aura of mystery.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <div className="font-mono text-[10px] text-[#444444] mb-2 uppercase">[RULE_02 / COSMIC]</div>
                <h4 className="font-serif italic text-2xl text-[#E5E5E5] mb-4 font-light">Architectural Cosmism</h4>
                <p className="text-[#888888] font-sans text-sm leading-relaxed">
                  A dynamic cosmic alignment. Instead of obvious galaxy photos, we rely on shadows, micro-grid coordinates, and heavy-contrast visual frames reminiscent of spacecraft cockpits and structural vaults.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="font-mono text-[10px] text-[#444444] mb-2 uppercase">[RULE_03 / MATTE]</div>
                <h4 className="font-serif italic text-2xl text-[#E5E5E5] mb-4 font-light">Artifact Finishes</h4>
                <p className="text-[#888888] font-sans text-sm leading-relaxed">
                  Colors are strictly restricted to space black, lunar grey, and stellar white. Materials simulation focuses on heavy cottons, raw carbon filaments, and concrete dust textures rather than standard synthetic fabrics.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED INTERSECTION TABLE */}
      <section className="py-24 px-6 md:px-20 mx-auto max-w-6xl relative z-10 border-t border-b border-white/[0.02]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <FadeIn>
            <h3 className="font-serif italic text-3xl text-white font-light mb-8">System Architectural Rules</h3>
            <p className="font-mono text-[9px] text-[#444444] uppercase tracking-widest mb-10">{"// TECHNICAL DIRECTIVE FOR BRAND ASSETS"}</p>
            <RuleList 
              title="ARCHITECTURAL INSTRUCTIONS"
              items={[
                "Utilize asymmetrical off-center grids to focus attention dynamically.",
                "Let empty space take up at least 60% of every layout container.",
                "Frame all images with crisp microscopic sub-borders and thin technical specs.",
                "Treat physical items as temporary 'archive entries' with unique indexes."
              ]}
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <h3 className="font-serif italic text-3xl text-white font-light mb-8">Creative Boundaries</h3>
            <p className="font-mono text-[9px] text-[#444444] uppercase tracking-widest mb-10">{"// CONSTRAINTS TO PRESERVE MONUMENTAL LOOK"}</p>
            <RuleList 
              title="STRICT NEGATIVE RESTRAINTS"
              isNegative={true}
              items={[
                "No standard shopping cart templates or aggressive promotional buy buttons.",
                "No stacked golden crowns or royal cliches that look generic.",
                "No streetwear slang or neon colored digital panels.",
                "No motivational jargon. The silence is the message."
              ]}
            />
          </FadeIn>
        </div>
      </section>

      {/* AUDIO INTEGRATION / SYNTH SECTION */}
      <section id="music" className="relative py-48 px-6 md:px-20 overflow-hidden relative z-10 scroll-mt-24 bg-neutral-950/40">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#111111_0%,_transparent_65%)] opacity-40 -z-10" />
         
         <div className="mx-auto max-w-4xl text-center">
            <FadeIn>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] mb-8 block uppercase">
                [03 / EXPANSIVE SONICS]
              </span>
              <h2 className="font-serif italic text-3xl md:text-5xl lg:text-6xl tracking-wide text-[#E5E5E5] mb-8 font-light">
                Sound as Architecture
              </h2>
              <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed mb-12 max-w-2xl mx-auto">
                Sound acts as an invisible landscape. In the world of KingShadP, apparel artifacts are paired directly with custom frequencies. Activate the sub-harmonic frequency channel to hear the planetary loop tracker.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-6">
                <Magnetic range={140} strength={0.45} scaleStrength={0.1}>
                  <button 
                    onClick={toggleAudio}
                    className={`relative h-20 w-20 rounded-full border flex items-center justify-center transition-all duration-700 pointer-events-auto cursor-pointer ${
                      audioActive 
                        ? 'border-[#E5E5E5] bg-[#E5E5E5] text-[#050505] shadow-[0_0_30px_rgba(229,229,229,0.15)]' 
                        : 'border-white/10 text-[#E5E5E5] hover:border-white hover:bg-white/5'
                    }`}
                  >
                    {audioActive ? (
                      <Volume2 className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Play className="w-6 h-6 ml-1 text-white" />
                    )}
                  </button>
                </Magnetic>
                <div className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">
                  {audioActive ? (
                    <span className="text-[#E5E5E5] animate-pulse">48Hz TRANSMISSION LOCK ACTIVE</span>
                  ) : (
                    <span>STREAM INERT. CLICK FEED TO UNMUTE</span>
                  )}
                </div>
              </div>
         {/* ARTIFACTS / FUTURE ARCHIVES INTEGRATED MODULE */}
      <section className="py-36 md:py-52 px-6 md:px-20 mx-auto max-w-6xl relative z-10">
        <SectionHeading number="03" subtitle="THE FUTURE ARCHIVE">
          Active Telemetry Artifacts
        </SectionHeading>

        {/* 6-Grid Interactive Display Interface */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTIFACTS.map((artifact, idx) => (
            <FadeIn 
              key={artifact.id} 
              delay={idx % 3 * 0.1}
              className="border border-white/[0.04] p-8 hover:border-white/[0.18] hover:bg-white/[0.02] transition-all duration-500 bg-[#050505]/60 flex flex-col justify-between aspect-square cursor-pointer group"
            >
              <div onClick={() => setSelectedArtifact(artifact)} className="h-full flex flex-col justify-between select-none pointer-events-auto">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] text-[#444444] tracking-widest block uppercase">{artifact.entry}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-400" />
                  </div>
                  
                  <h4 className="font-serif italic text-2xl text-[#E5E5E5] mb-2 font-light group-hover:text-white transition-colors">
                    {artifact.title}
                  </h4>
                  
                  <p className="text-xs text-[#888888] leading-relaxed font-sans mt-3 group-hover:text-[#b1b1b1] transition-all duration-500">
                    {artifact.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-end border-t border-white/[0.02] pt-4 mt-4">
                  <span className="font-mono text-[8px] text-[#444444] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
                    [STATUS: {artifact.status}]
                  </span>
                  
                  <span className="font-mono text-[8px] text-[#888888] underline underline-offset-4 tracking-wider group-hover:text-white transition-all duration-300">
                    ENGAGE TELEMETRY
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Telemetry Data Panel Overlay Modal */}
      <AnimatePresence>
        {selectedArtifact && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-black/85 font-mono text-[11px]"
            onClick={() => setSelectedArtifact(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl bg-[#090909] border border-white/10 rounded overflow-hidden flex flex-col relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Scan Lines / Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] [background-size:24px_24px]" />
              
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0d0d0d] relative z-10 select-none">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[#888888] font-mono text-[9px] tracking-widest">{selectedArtifact.entry}</span>
                </div>
                <button 
                  onClick={() => setSelectedArtifact(null)}
                  className="text-[#888888] hover:text-white transition-colors duration-200 cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 md:p-8 space-y-8 relative z-10 overflow-y-auto max-h-[80vh]">
                
                {/* Product/Artifact Title */}
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-white/5 pb-6">
                  <div>
                    <span className="text-[#444444] text-[9px] uppercase tracking-widest block mb-1">[{selectedArtifact.subtitle}]</span>
                    <h3 className="font-serif italic text-3xl md:text-4xl text-white font-light tracking-wide">{selectedArtifact.title}</h3>
                  </div>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] tracking-widest text-[#E5E5E5] uppercase">
                    SYSTEM_STATUS: {selectedArtifact.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Lore Spec on Left */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[#444444] text-[9px] uppercase tracking-widest border-b border-white/5 pb-2">
                      <Terminal className="w-3.5 h-3.5" /> ARCHEOLOGY NARRATIVE
                    </div>
                    <p className="text-[#888888] leading-relaxed font-sans text-sm">
                      {selectedArtifact.lore}
                    </p>
                    
                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded space-y-3 font-mono text-[9px] tracking-widest">
                      <div className="flex justify-between">
                        <span className="text-[#444444]">ORBITAL HASH:</span>
                        <span className="text-white hover:text-[#444444] transition-colors">{selectedArtifact.hash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#444444]">COORDINATES:</span>
                        <span className="text-white">{selectedArtifact.coords}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#444444]">TUNER LOCK:</span>
                        <span className="text-white flex items-center gap-1.5"><Radio className="w-3 h-3 text-green-500 animate-pulse" /> {selectedArtifact.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Settings on Right */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[#444444] text-[9px] uppercase tracking-widest border-b border-white/5 pb-2">
                      <Cpu className="w-3.5 h-3.5" /> TECHNICAL SPECIFICATIONS
                    </div>
                    
                    <div className="space-y-3">
                      {selectedArtifact.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-2 text-[10px] tracking-wider">
                          <span className="text-[#888888] font-mono">[{spec.label}]</span>
                          <span className="text-[#E5E5E5] text-right font-medium">{spec.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Telemetry Radar Block */}
                    <div className="h-24 bg-black border border-white/5 relative overflow-hidden flex items-center justify-center rounded">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111111_0%,_transparent_75%)] opacity-20" />
                      
                      {/* Animated signal curve */}
                      <div className="w-full h-[1px] bg-[#444444]/30 absolute top-1/2 left-0" />
                      <motion.div 
                        animate={{ 
                          scaleY: [0.3, 1.6, 0.2, 1.4, 0.3],
                          opacity: [0.3, 0.8, 0.4, 0.9, 0.3]
                        }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                        className="w-full h-8 bg-gradient-to-r from-transparent via-[#E5E5E5]/15 to-transparent absolute top-1/4 select-none pointer-events-none"
                      />
                      
                      <span className="font-mono text-[8px] text-[#444444] absolute bottom-2 left-3 uppercase tracking-widest">CALIBRATING RECEIVER VECTOR...</span>
                      <span className="font-mono text-[8px] text-[#E5E5E5]/60 absolute top-2 right-3 uppercase flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5 animate-pulse text-green-400" /> LOCK_017
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                  <span className="text-[9px] text-[#444444] uppercase tracking-widest">system index // SECURE SHELL</span>
                  <button 
                    onClick={() => setSelectedArtifact(null)}
                    className="text-[#E5E5E5] border border-white/10 px-5 py-2 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-[9px] uppercase tracking-widest"
                  >
                    Close Terminal
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
           </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 md:px-20 flex flex-col items-center justify-center border-t border-white/[0.02] relative z-10">
         <Magnetic range={100} strength={0.5} scaleStrength={0.12}>
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-8 relative overflow-hidden group hover:border-[#E5E5E5] transition-all duration-700 cursor-pointer">
               <div className="w-1 h-1 bg-[#E5E5E5] rounded-full group-hover:scale-[8] transition-transform duration-700 ease-out" />
            </div>
         </Magnetic>
         
         <div className="font-mono text-[9px] tracking-[0.3em] text-[#444444] uppercase text-center space-y-3">
            <p className="text-[#E5E5E5]">End of Transmission // KingShadP Digital Archive Channel</p>
            <p className="opacity-50">© 2026 // ALL COGNITIVE RADIAL DIRECTIONS VERIFIED</p>
         </div>
      </footer>

    </main>
  );
}
