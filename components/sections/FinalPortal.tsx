'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { CinematicVideo } from '../media/CinematicVideo';
import { Reveal } from '../motion/Reveal';

interface FinalPortalProps {
  onNavigateTo?: (sectionId: string) => void;
  onOpenTransmission: () => void;
}

export function FinalPortal({ onNavigateTo, onOpenTransmission }: FinalPortalProps) {
  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (onNavigateTo && typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      onNavigateTo(sectionId);
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] bg-[#f8f7f4] text-[#1a1a1a] flex flex-col justify-between overflow-hidden select-none">
      
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        <CinematicVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4"
          poster="/THE GIRAGON.png"
          objectPosition="center 30%"
          fadeLoop={true}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f7f4] via-[#f8f7f4]/80 to-[#f8f7f4]" />
      </div>

      <div className="relative z-10 w-full pt-16" />

      {/* Center Cinematic Portal Statement */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 flex flex-col items-center text-center gap-6 my-auto py-16">
        <Reveal>
          <div className="w-12 h-12 rounded-full border border-[#1a1a1a]/20 bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Compass size={20} className="text-[#B76E79]" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#1a1a1a]/50 block">
            ENTRY &#8594; MUSIC &#8594; VISUALS &#8594; ARCHIVE &#8594; PORTAL
          </span>

          <h2 className="text-4xl sm:text-7xl font-serif font-light tracking-tight text-[#1a1a1a] mt-2">
            KingShadP
          </h2>

          <p className="font-editorial text-2xl sm:text-4xl italic text-[#1a1a1a]/80 font-light mt-3">
            The archive remains open.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenTransmission}
              data-cursor="CONTACT"
              className="btn-pill bg-[#1a1a1a] text-white hover:bg-[#B76E79] text-[11px] font-mono font-bold tracking-[0.22em] uppercase shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>SEND TRANSMISSION</span>
              <ArrowUpRight size={12} />
            </button>

            <Link
              href="/music"
              onClick={(e) => handleAction(e, 'now-playing')}
              className="btn-pill bg-white text-[#1a1a1a] border border-[#1a1a1a]/20 hover:border-[#1a1a1a]/50 text-[11px] font-mono tracking-[0.22em] uppercase shadow-sm"
            >
              REPLAY RELEASE
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Prestige Footer */}
      <footer className="relative z-10 w-full border-t border-[#1a1a1a]/10 bg-white/70 backdrop-blur-sm px-6 sm:px-12 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono tracking-[0.25em] text-[#1a1a1a]/60 uppercase">
        
        {/* Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 font-semibold">
          <Link href="/music" onClick={(e) => handleAction(e, 'now-playing')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
            MUSIC
          </Link>
          <Link href="/visuals" onClick={(e) => handleAction(e, 'the-work')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
            VISUALS
          </Link>
          <Link href="/archive" onClick={(e) => handleAction(e, 'archive-index')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
            ARCHIVE
          </Link>
          <Link href="/story" onClick={(e) => handleAction(e, 'manifesto')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
            STORY
          </Link>
          <Link href="/about" className="hover:text-[#B76E79] transition-colors cursor-pointer">
            ABOUT
          </Link>
          <Link href="/shop" onClick={(e) => handleAction(e, 'selected-objects')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
            SHOP
          </Link>
        </nav>

        {/* Streaming Platforms */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[#1a1a1a]/40">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">
            SPOTIFY
          </a>
          <span>·</span>
          <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">
            APPLE MUSIC
          </a>
          <span>·</span>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">
            YOUTUBE
          </a>
          <span>·</span>
          <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">
            SOUNDCLOUD
          </a>
          <span>·</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">
            INSTAGRAM
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span>© 2026 KINGSHADP</span>
          <span className="text-[#B76E79] font-bold">SANCTUM</span>
        </div>

      </footer>

    </section>
  );
}

