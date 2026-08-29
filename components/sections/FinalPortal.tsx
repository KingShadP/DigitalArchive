'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { CinematicVideo } from '../media/CinematicVideo';
import { Reveal } from '../motion/Reveal';

interface FinalPortalProps {
  onNavigateTo: (sectionId: string) => void;
  onOpenTransmission: () => void;
}

export function FinalPortal({ onNavigateTo, onOpenTransmission }: FinalPortalProps) {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#050505] text-[#F4F1EC] flex flex-col justify-between overflow-hidden select-none">
      
      {/* Background Cinematic Portal Video Environmental Plane */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <CinematicVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4"
          poster="/THE GIRAGON.png"
          objectPosition="center 30%"
          fadeLoop={true}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]" />
      </div>

      <div className="relative z-10 w-full pt-20" />

      {/* Center Cinematic Portal Statement */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 flex flex-col items-center text-center gap-8 my-auto py-16">
        <Reveal>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Compass size={20} className="text-[#B76E79]" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 block">
            ENTRY &#8594; MUSIC &#8594; VISUALS &#8594; ARCHIVE &#8594; PORTAL
          </span>

          <h2 className="text-4xl sm:text-7xl font-extralight tracking-tight uppercase text-white mt-2">
            KINGSHADP
          </h2>

          <p className="font-editorial text-2xl sm:text-4xl italic text-white/80 font-light mt-3">
            The archive remains open.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenTransmission}
              data-cursor="CONTACT"
              className="px-8 py-3.5 rounded-full bg-[#F4F1EC] text-[#050505] text-[11px] font-mono font-bold tracking-[0.22em] uppercase hover:bg-white hover:scale-105 transition-all shadow-2xl flex items-center gap-2 cursor-pointer"
            >
              <span>SEND TRANSMISSION</span>
              <ArrowUpRight size={12} />
            </button>

            <button
              onClick={() => onNavigateTo('now-playing')}
              className="px-6 py-3.5 rounded-full border border-white/20 text-[11px] font-mono tracking-[0.22em] uppercase text-white/80 hover:text-white hover:border-white/50 transition-all cursor-pointer"
            >
              REPLAY RELEASE
            </button>
          </div>
        </Reveal>
      </div>

      {/* Prestige Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 px-6 sm:px-12 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
        
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button onClick={() => onNavigateTo('now-playing')} className="hover:text-white transition-colors cursor-pointer">
            MUSIC
          </button>
          <button onClick={() => onNavigateTo('the-work')} className="hover:text-white transition-colors cursor-pointer">
            VISUALS
          </button>
          <button onClick={() => onNavigateTo('archive-index')} className="hover:text-white transition-colors cursor-pointer">
            ARCHIVE
          </button>
          <button onClick={() => onNavigateTo('manifesto')} className="hover:text-white transition-colors cursor-pointer">
            STORY
          </button>
          <button onClick={() => onNavigateTo('selected-objects')} className="hover:text-white transition-colors cursor-pointer">
            SHOP
          </button>
        </div>

        {/* Streaming Platforms */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-white/40">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            SPOTIFY
          </a>
          <span>·</span>
          <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            APPLE MUSIC
          </a>
          <span>·</span>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            YOUTUBE
          </a>
          <span>·</span>
          <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            SOUNDCLOUD
          </a>
          <span>·</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            INSTAGRAM
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span>© 2026 KINGSHADP</span>
          <span className="text-[#B76E79]">SANCTUM</span>
        </div>

      </footer>

    </section>
  );
}
