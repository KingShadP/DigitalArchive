'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BlurText } from '../motion/BlurText';
import { Reveal } from '../motion/Reveal';

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#f8f7f4] text-[#1a1a1a] py-28 sm:py-40 px-6 sm:px-12 md:px-20 select-none overflow-hidden border-b border-[#1a1a1a]/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-20 sm:gap-32">
        
        {/* Top Manifesto Block */}
        <div className="flex flex-col gap-8 sm:gap-10">
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold">
              KINGSHADP // CODEX
            </span>
            <div className="w-8 h-[1px] bg-[#1a1a1a]/20" />
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50">
              PHILOSOPHICAL MANIFESTO
            </span>
          </div>

          {/* Master Display Headline */}
          <div className="max-w-4xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[0.95] text-[#1a1a1a] font-serif">
              Create it. <br />
              Document it. <br />
              <span className="font-editorial italic font-light text-[#B76E79]">
                Push it further.
              </span>
            </h2>
          </div>

          {/* Support Copy */}
          <div className="max-w-2xl border-l-2 border-[#B76E79] pl-6 sm:pl-8 py-1">
            <p className="text-sm sm:text-base md:text-lg font-light text-[#1a1a1a]/80 leading-relaxed">
              KingShadP is an evolving creative identity constructed through sound, image, experimentation and lived experience. This is not simply a portfolio of finished objects. It is evidence of creation in motion.
            </p>
          </div>

        </div>

        {/* Editorial Breathing Moment (Dedicates space to the central quote) */}
        <div className="py-16 sm:py-24 border-t border-[#1a1a1a]/10 flex flex-col items-center text-center">
          <div className="w-2 h-2 rounded-full bg-[#B76E79] mb-8" />
          
          <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1a1a] max-w-3xl leading-tight">
            &ldquo;Everything I make is part of the same conversation.&rdquo;
          </blockquote>

          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#1a1a1a]/50 mt-8 font-semibold">
            — KINGSHADP
          </span>
        </div>

      </div>
    </section>
  );
}

