'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Release {
  id: string;
  title: string;
  type: string;
  date: string;
  img: string;
  desc: string;
  details: string;
  href: string;
}

export function CatalogueTimeline({ releases }: { releases: Release[] }) {
  const [activeId, setActiveId] = useState<string>(releases[0]?.id || '');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    releases.forEach((rel) => {
      const el = document.getElementById(rel.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [releases]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative grid md:grid-cols-12 gap-12 items-start" ref={containerRef}>
      {/* Sticky Timeline Left Panel */}
      <div className="hidden md:block md:col-span-4 sticky top-40 z-10">
        <div className="relative pl-6 py-4 space-y-12">
          {/* Continuous vertical line */}
          <div className="absolute left-[0.25rem] top-4 bottom-4 w-px bg-border-strong" />

          {releases.map((rel) => {
            const isActive = activeId === rel.id;
            return (
              <button
                key={rel.id}
                onClick={() => scrollTo(rel.id)}
                className={`block text-left w-full transition-all duration-300 relative group ${
                  isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                {/* Fixed dot on the line */}
                <div className="absolute -left-[1.35rem] top-[0.6rem] w-[5px] h-[5px] rounded-full bg-foreground/20 group-hover:bg-foreground/50 transition-colors" />

                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTimelineIndicator"
                    className="absolute -left-[1.5rem] top-[0.5rem] w-[10px] h-[10px] bg-foreground rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                )}
                
                <div className="font-mono text-[10px] tracking-widest uppercase mb-1">
                  {rel.date}
                </div>
                <div className={`font-serif text-2xl transition-all duration-500 ${isActive ? 'italic' : ''}`}>
                  {rel.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrolling Content Right Panel */}
      <div className="md:col-span-8 space-y-32 pb-32">
        {releases.map((rel) => (
          <div key={rel.id} id={rel.id} className="scroll-mt-48 group">
            <div className="border border-border-strong bg-surface/50 p-6 md:p-10 flex flex-col gap-8 items-start hover:border-foreground/30 transition-colors">
              
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-border pb-4 w-full">
                <span className="font-mono text-[9px] text-accent tracking-widest">{rel.type}</span>
                <span className="font-mono text-[9px] text-foreground/50">{rel.date}</span>
              </div>

              <div className="flex flex-col xl:flex-row gap-8 w-full">
                <div className="relative w-full xl:w-64 aspect-square flex-shrink-0 border border-border-strong overflow-hidden bg-background">
                  <Image 
                    src={rel.img} 
                    alt={rel.title} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>

                <div className="flex-1 space-y-6">
                  <h3 className="font-serif italic text-3xl md:text-4xl text-foreground">{rel.title}</h3>
                  <div className="space-y-4">
                    <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed border-l-2 border-accent pl-4">
                      {rel.desc}
                    </p>
                    <p className="font-mono text-[10px] text-foreground/50 leading-relaxed uppercase tracking-wide">
                      ARTIFACT NOTES // {rel.details}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <Link 
                      href={rel.href} 
                      className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-foreground border border-border-strong px-4 py-3 hover:bg-foreground hover:text-black transition-all duration-300"
                    >
                      EXAMINE IN VAULT <ArrowUpRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
