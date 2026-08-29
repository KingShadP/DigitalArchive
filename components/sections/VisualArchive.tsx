'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { visualAssets, VisualAsset } from '../../data/visuals';
import { Reveal } from '../motion/Reveal';

interface VisualArchiveProps {
  onOpenViewer: (assetId: string) => void;
}

export function VisualArchive({ onOpenViewer }: VisualArchiveProps) {
  return (
    <section
      id="visual-archive"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#f8f7f4] text-[#1a1a1a] select-none border-b border-[#1a1a1a]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1a1a1a]/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block font-semibold">
                CHAPTER 04 / VISUAL CODEX
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1a1a] mt-1 font-serif">
                Evidence of <span className="font-editorial italic font-normal text-[#B76E79]">an Era.</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50">
              CURATED MEDIA SEQUENCE
            </span>
          </div>
        </Reveal>

        {/* Asymmetric Editorial Visual Pacing */}
        <div className="flex flex-col gap-12 sm:gap-16">
          
          {/* Row 1: Large Volumetric Sovereign Frame + Portrait Study */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Wide The Giragon Frame */}
            <div
              onClick={() => onOpenViewer('the-giragon-master')}
              data-cursor="VIEW"
              className="md:col-span-8 group relative rounded-2xl overflow-hidden border border-[#1a1a1a]/15 aspect-[16/9] sm:aspect-[16/10] cursor-pointer shadow-md bg-white"
            >
              <Image
                src="/THE GIRAGON.png"
                alt="The Giragon Sovereign Monolith"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79] block font-bold">
                    WORLDBUILDING // 2026
                  </span>
                  <h4 className="text-sm font-medium tracking-wide uppercase text-white">
                    THE GIRAGON // SOVEREIGN MONOLITH
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 size={13} />
                </div>
              </div>
            </div>

            {/* Small Portrait Archive Snapshot */}
            <div
              onClick={() => onOpenViewer('giragon-glory')}
              data-cursor="VIEW"
              className="md:col-span-4 group relative rounded-2xl overflow-hidden border border-[#1a1a1a]/15 aspect-[3/4] cursor-pointer shadow-md bg-white"
            >
              <Image
                src="/girgonglory.png"
                alt="Giragon Glory Edition"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79] block font-bold">
                    SCULPTURAL STUDY
                  </span>
                  <h4 className="text-xs font-medium tracking-wide uppercase text-white">
                    THE GIRAGON HYBRID
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 size={13} />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Typographic Intermission Statement */}
          <div className="py-12 sm:py-16 px-8 sm:px-16 border-y border-[#1a1a1a]/10 bg-white rounded-2xl flex flex-col items-center text-center shadow-sm">
            <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-[#B76E79] mb-3 font-semibold">
              CREATIVE DIRECTIVE
            </span>
            <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] max-w-3xl leading-tight">
              &ldquo;Form is not decorated onto the surface; it emerges from the ruthless subtraction of excess.&rdquo;
            </p>
          </div>

          {/* Row 3: Square Identity Key + Rose Gold Sculpture Study */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div
              onClick={() => onOpenViewer('kingshadp-portrait')}
              data-cursor="VIEW"
              className="md:col-span-5 group relative rounded-2xl overflow-hidden border border-[#1a1a1a]/15 aspect-square cursor-pointer shadow-md bg-white"
            >
              <Image
                src="/KINGSHADP PHOTO.png"
                alt="KingShadP Photographic Monograph"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79] block font-bold">
                    PHOTOGRAPHIC STUDY
                  </span>
                  <h4 className="text-xs font-medium tracking-wide uppercase text-white">
                    KINGSHADP PORTRAIT
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 size={13} />
                </div>
              </div>
            </div>

            <div
              onClick={() => onOpenViewer('rose-gold-giragon')}
              data-cursor="VIEW"
              className="md:col-span-7 group relative rounded-2xl overflow-hidden border border-[#1a1a1a]/15 aspect-[4/3] cursor-pointer shadow-md bg-white"
            >
              <Image
                src="/ROSE GOLD GIRAGON.png"
                alt="Rose Gold Giragon Study"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79] block font-bold">
                    SCULPTURAL METALLURGY
                  </span>
                  <h4 className="text-xs font-medium tracking-wide uppercase text-white">
                    ROSE GOLD GIRAGON
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 size={13} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
