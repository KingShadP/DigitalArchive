'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BlurText } from '../motion/BlurText';
import { Reveal } from '../motion/Reveal';

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#F4F1EC] text-[#101010] py-32 sm:py-44 px-6 sm:px-12 md:px-20 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-24 sm:gap-36">
        
        {/* Top Manifesto Block */}
        <div className="flex flex-col gap-8 sm:gap-12">
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A0F19] font-bold">
              &#47;&#47; KINGSHADP
            </span>
            <div className="w-8 h-[1px] bg-[#101010]/20" />
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#101010]/50">
              PHILOSOPHICAL MANIFESTO
            </span>
          </div>

          {/* Master Display Headline */}
          <div className="max-w-4xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[0.95] uppercase text-[#101010]">
              CREATE IT. <br />
              DOCUMENT IT. <br />
              <span className="font-editorial italic font-normal text-[#8A0F19]">
                PUSH IT FURTHER.
              </span>
            </h2>
          </div>

          {/* Support Copy */}
          <div className="max-w-2xl border-l-2 border-[#8A0F19] pl-6 sm:pl-8 py-1">
            <p className="text-sm sm:text-base md:text-lg font-light text-[#101010]/80 leading-relaxed">
              KingShadP is an evolving creative identity constructed through sound, image, experimentation and lived experience. This is not simply a portfolio of finished objects. It is evidence of creation in motion.
            </p>
          </div>

        </div>

        {/* Editorial Breathing Moment (Dedicates space to the central quote) */}
        <div className="py-20 sm:py-28 border-t border-[#101010]/15 flex flex-col items-center text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8A0F19] mb-8" />
          
          <blockquote className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#101010] max-w-3xl leading-tight">
            &ldquo;Everything I make is part of the same conversation.&rdquo;
          </blockquote>

          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#101010]/50 mt-8">
            — KINGSHADP
          </span>
        </div>

      </div>
    </section>
  );
}
