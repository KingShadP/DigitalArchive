'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, Disc, Eye, Archive } from 'lucide-react';
import { Reveal } from '../motion/Reveal';

interface TheWorkProps {
  onNavigateMusic: () => void;
  onNavigateVisuals: () => void;
  onNavigateArchive: () => void;
}

export function TheWork({
  onNavigateMusic,
  onNavigateVisuals,
  onNavigateArchive,
}: TheWorkProps) {
  return (
    <section
      id="the-work"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 bg-black/60 backdrop-blur-xl border-t border-white/5 text-[#F4F1EC] select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block">
                &#47;&#47; THE WORK
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight uppercase text-white mt-1">
                ONE NAME. <span className="font-editorial italic font-normal text-white/90">MULTIPLE LANGUAGES.</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
              DISCIPLINARY TAXONOMY
            </span>
          </div>
        </Reveal>

        {/* Asymmetric Editorial Planes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Plane 1: MUSIC */}
          <div className="lg:col-span-12 relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 backdrop-blur-md p-8 sm:p-14 flex flex-col md:flex-row justify-between gap-8 group">
            <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
              <Image
                src="/twisted-beast-cover.png"
                alt="Music Discipline Artwork"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Disc size={16} className="text-[#B76E79]" />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                    DISCIPLINE 01
                  </span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-extralight tracking-wide uppercase text-white">
                  SONIC ORCHESTRATION
                </h3>
                <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed mt-3">
                  Songs are the foundation. Every release becomes an entry into the larger KingShadP world—sound, language, imagery and memory moving together.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['RECORDS', 'WRITING', 'PRODUCTION', 'PERFORMANCE'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-end items-start md:items-end">
              <button
                onClick={onNavigateMusic}
                data-cursor="MUSIC"
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold tracking-[0.2em] uppercase hover:bg-[#F4F1EC] hover:scale-105 transition-all flex items-center gap-2 shadow-2xl cursor-pointer"
              >
                <span>EXPLORE MUSIC</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Plane 2: VISUALS */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 backdrop-blur-md p-8 sm:p-12 flex flex-col justify-between gap-6 group">
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
              <Image
                src="/girgonglory.png"
                alt="Visuals Discipline Artwork"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-[#B76E79]" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                  DISCIPLINE 02
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extralight tracking-wide uppercase text-white">
                VISUAL IDENTITY & MONOLITHS
              </h3>
              <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed max-w-md">
                Visual identity is part of the work itself: covers, portraits, moving image, campaigns and experiments that expand what the music means.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['FILM', 'PHOTOGRAPHY', 'ARTWORK', 'DIRECTION'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <button
                onClick={onNavigateVisuals}
                data-cursor="VISUALS"
                className="text-xs font-mono tracking-[0.2em] uppercase text-white/70 hover:text-white flex items-center gap-1.5 cursor-pointer group"
              >
                <span>VIEW VISUALS</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Plane 3: ARCHIVE */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 backdrop-blur-md p-8 sm:p-12 flex flex-col justify-between gap-6 group">
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Archive size={16} className="text-[#B76E79]" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                  DISCIPLINE 03
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extralight tracking-wide uppercase text-white">
                THE ARCHIVE CODEX
              </h3>
              <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                An evolving record of eras, ideas, unfinished material, documents and creative evidence across the KingShadP timeline.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['PROCESS', 'HISTORY', 'ARTIFACTS', 'NOTES'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <button
                onClick={onNavigateArchive}
                data-cursor="ARCHIVE"
                className="text-xs font-mono tracking-[0.2em] uppercase text-white/70 hover:text-white flex items-center gap-1.5 cursor-pointer group"
              >
                <span>ENTER ARCHIVE</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
