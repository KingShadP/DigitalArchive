'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { AmbientMediaLayer } from '../components/media/AmbientMediaLayer';
import { CustomCursor } from '../components/ui/CustomCursor';
import { Loader } from '../components/ui/Loader';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased overflow-hidden select-none">
      <AmbientMediaLayer
        activeMediaKey="scenePrimary"
        brightness={0.4}
      />
      <Loader />
      <CustomCursor />
      
      {/* Absolute Header (Top) */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 sm:px-12 py-8 w-full flex justify-between items-start mix-blend-difference pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F4F1EC]/50 font-semibold">
            EST. MMXXVI
          </span>
          <span className="text-xs font-serif italic text-[#F4F1EC] font-light">
            Sanctum Archive
          </span>
        </div>
        
        <nav className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-8 pointer-events-auto">
          {['AUDIO', 'VISUALS', 'ARCHIVE', 'SHOP'].map((item) => (
            <Link 
              key={item}
              href={`/${item === 'AUDIO' ? 'music' : item.toLowerCase()}`}
              className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#F4F1EC]/70 hover:text-[#B76E79] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Composition */}
      <section className="relative w-full h-[100dvh] flex flex-col justify-end items-start px-6 sm:px-12 md:px-20 pb-20 sm:pb-32 z-20 pointer-events-none">
        
        {/* Cinematic Z-Axis Drift Wrap */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="max-w-5xl flex flex-col gap-6 pointer-events-auto"
        >
          {/* Metadata / Coordinates */}
          <div className="flex items-center gap-4 opacity-70 mb-2">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#F4F1EC]">
              COORD: 34.0522° N // 432 HZ
            </span>
            <div className="w-12 h-[1px] bg-[#B76E79]/60 hidden sm:block" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#B76E79] font-bold uppercase hidden sm:block">
              KINGSHADP
            </span>
          </div>

          {/* Master Headline */}
          <div className="flex flex-col gap-0">
            <h1 
              className="text-[#F4F1EC] font-serif font-light tracking-tight leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              Everything I Make
            </h1>
            <h1 
              className="text-[#F4F1EC] font-serif font-light italic tracking-tight leading-[0.9] text-[#B76E79] mt-2"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              Leaves Evidence.
            </h1>
          </div>

          <p className="text-sm sm:text-lg font-light tracking-wide text-[#F4F1EC]/60 max-w-2xl leading-relaxed mt-4 sm:mt-6">
            You have entered the void. A digital monument encompassing deep-frequency 
            audio, subtractive visual architecture, and permanent archival records. 
            Proceed with intention.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-8">
            <Link 
              href="/music"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#F4F1EC] text-[#050505] text-[10px] font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#B76E79] hover:text-white transition-all duration-700 shadow-xl"
            >
              <span>INITIATE AUDIO</span>
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-700" />
            </Link>
            <Link 
              href="/archive"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[#F4F1EC]/20 text-[10px] font-mono tracking-[0.2em] uppercase text-[#F4F1EC] hover:border-[#B76E79]/50 hover:bg-[#B76E79]/10 transition-all duration-700 backdrop-blur-md"
            >
              <span>ENTER ARCHIVE</span>
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Deep Shadow overlay to ground text */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-10 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 z-10 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
    </main>
  );
}
