'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Disc, Eye, Archive } from 'lucide-react';
import { Reveal } from '../motion/Reveal';

interface TheWorkProps {
  onNavigateMusic?: () => void;
  onNavigateVisuals?: () => void;
  onNavigateArchive?: () => void;
}

export function TheWork({
  onNavigateMusic,
  onNavigateVisuals,
  onNavigateArchive,
}: TheWorkProps) {
  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>, handler?: () => void) => {
    if (handler && typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      handler();
    }
  };

  return (
    <section
      id="the-work"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#f8f7f4] text-[#1a1a1a] select-none border-b border-[#1a1a1a]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1a1a1a]/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block font-semibold">
                CORE / DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1a1a] mt-1 font-serif">
                Selected <span className="font-editorial italic font-normal text-[#B76E79]">Mediums.</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50">
              DISCIPLINARY TAXONOMY
            </span>
          </div>
        </Reveal>

        {/* 4-Card Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 01: Sonic Architecture */}
          <Reveal delay={0.1}>
            <div className="discipline-card flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                  01 / Sonic Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                  Acoustic Engineering
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/70 leading-relaxed">
                  Songs are the foundation. Every release becomes an entry into the larger KingShadP world—sub-harmonics, 432Hz tuning, and vacuum decay intervals.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['RECORDS', 'MASTERING', 'PYTHAGOREAN', 'FREQUENCY'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.03] text-[#1a1a1a]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1a1a1a]/10">
                <Link
                  href="/music"
                  onClick={(e) => handleAction(e, onNavigateMusic)}
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#B76E79] font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>EXPLORE MUSIC</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 02: Visual Artifacts */}
          <Reveal delay={0.15}>
            <div className="discipline-card flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                  02 / Visual Artifacts
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                  Spatial Monoliths
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/70 leading-relaxed">
                  Raytraced sculptures, matte obsidian textures, and rose gold cadences that expand the acoustic narrative into physical and virtual space.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['SCULPTURE', 'RAYTRACING', 'MONOLITHS', 'IDENTITY'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.03] text-[#1a1a1a]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1a1a1a]/10">
                <Link
                  href="/visuals"
                  onClick={(e) => handleAction(e, onNavigateVisuals)}
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#B76E79] font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>VIEW VISUALS</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 03: The Codex */}
          <Reveal delay={0.2}>
            <div className="discipline-card flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                  03 / The Codex
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                  Archival Philosophy
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/70 leading-relaxed">
                  An evolving record of eras, manuscripts, philosophies, and unreleased blueprints documenting the creative lineage across time.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['MANUSCRIPTS', 'DOSSIER', 'EVIDENCE', 'CHRONOLOGY'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.03] text-[#1a1a1a]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1a1a1a]/10">
                <Link
                  href="/archive"
                  onClick={(e) => handleAction(e, onNavigateArchive)}
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#B76E79] font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>ENTER ARCHIVE</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 04: Spatial Experiments */}
          <Reveal delay={0.25}>
            <div className="discipline-card flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                  04 / Spatial Experiments
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                  Interactive Portals
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/70 leading-relaxed">
                  Real-time shader portals, acoustic synthesizers, and dynamic chambers allowing immediate immersion into KingShadP&apos;s world.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['PORTALS', 'SHADERS', 'ACOUSTICS', 'INTERACTION'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.03] text-[#1a1a1a]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1a1a1a]/10">
                <Link
                  href="/shop"
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#B76E79] font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>EXPLORE OBJECTS</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}

