'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { BlurText } from '../motion/BlurText';
import { Reveal } from '../motion/Reveal';
import { KINGSHADP_TIMELINE } from '../../data/scenes';
import { soundEngine } from '../../lib/soundEngine';
import { Clock, MapPin, Sparkles, BookOpen, Layers, Award } from 'lucide-react';

export function Manifesto() {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(3); // Default to 2026 release

  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#f8f7f4] text-[#1a1a1a] py-28 sm:py-36 px-6 sm:px-12 md:px-20 select-none overflow-hidden border-b border-[#1a1a1a]/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-20 sm:gap-28">
        
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

        {/* SECTION 12: ABOUT KINGSHADP (Biography & World Profile) */}
        <div className="flex flex-col gap-8 border-t border-[#1a1a1a]/10 pt-16">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
              SECTION 12 // BIOGRAPHY & DISCIPLINARY PROFILE
            </span>
            <span className="text-[9px] font-mono text-[#1a1a1a]/50 uppercase">
              MIAMI ORIGINS · SANCTUM ERA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Bio Portrait & Identity */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#1a1a1a]/15 shadow-md bg-black">
                <Image
                  src="/KINGSHADP PHOTO.png"
                  alt="KingShadP"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-mono text-[#B76E79] uppercase font-bold">KINGSHADP</span>
                  <span className="text-xs font-serif font-light text-white/90">Artist · Producer · Visual Worldbuilder</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#1a1a1a]/10 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#1a1a1a]">
                  <MapPin size={13} className="text-[#B76E79]" />
                  <span>Miami, FL & Sanctum Studio A</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#1a1a1a]/70">
                  <Award size={13} className="text-[#B76E79]" />
                  <span>100% Subtractive Discipline</span>
                </div>
              </div>
            </div>

            {/* Core Narrative & Disciplinary Breakdown */}
            <div className="md:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a]">
                  The Architecture of an Evolving Universe
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/80 leading-relaxed">
                  Originating from Miami, Florida, KingShadP has synthesized music production, acoustic engineering, 3D worldbuilding, and philosophy into a singular multi-sensory universe. Rather than separating songs from physical reality, every release serves as the architectural blueprint for visual monoliths, interactive data systems, and living archival codices.
                </p>
                <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/80 leading-relaxed">
                  From raw singer-songwriter origins to the dense orchestral choir pop of <em>Behold the Twisted Beast</em>, every creative milestone is grounded in 432 Hz Pythagorean resonance and uncompromising technical discipline.
                </p>
              </div>

              {/* Interactive Chronological Timeline */}
              <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-6">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold flex items-center gap-1.5">
                  <Clock size={12} />
                  CHRONOLOGICAL TIMELINE (1994 — PRESENT)
                </span>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {KINGSHADP_TIMELINE.map((node, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTimelineIdx(idx);
                        soundEngine.playClick(600 + idx * 50, 0.03);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                        activeTimelineIdx === idx
                          ? 'bg-[#1a1a1a] text-white font-bold shadow-sm'
                          : 'border border-[#1a1a1a]/15 bg-white text-[#1a1a1a]/70 hover:border-[#1a1a1a]/40'
                      }`}
                    >
                      {node.year} · {node.category}
                    </button>
                  ))}
                </div>

                {/* Active Node Detail Card */}
                {KINGSHADP_TIMELINE[activeTimelineIdx] && (
                  <motion.div
                    key={activeTimelineIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-white border border-[#1a1a1a]/10 shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#B76E79]">
                        {KINGSHADP_TIMELINE[activeTimelineIdx].year} {'//'} {KINGSHADP_TIMELINE[activeTimelineIdx].category}
                      </span>
                      {KINGSHADP_TIMELINE[activeTimelineIdx].location && (
                        <span className="text-[10px] font-mono text-[#1a1a1a]/50">
                          {KINGSHADP_TIMELINE[activeTimelineIdx].location}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-serif font-medium text-[#1a1a1a]">
                      {KINGSHADP_TIMELINE[activeTimelineIdx].milestone}
                    </h4>
                    <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                      {KINGSHADP_TIMELINE[activeTimelineIdx].description}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
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


