'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ChevronUp, Info, X, Music, Sparkles, FolderArchive, Compass } from 'lucide-react';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import { Stagger } from '@/components/Stagger';
import { NowPlayingModal } from '@/components/NowPlayingModal';
import { ArchiveModal } from '@/components/ArchiveModal';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';
const DARK = '#1D3045';

export default function KingShadPLandingPage() {
  const { containerRef, videoRef, canvasRef, scrollProgress, canvasLive } = useVideoScrub(VIDEO_SRC);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nowPlayingOpen, setNowPlayingOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archiveTab, setArchiveTab] = useState<'visuals' | 'vision' | 'archive'>('archive');
  const [navEntered, setNavEntered] = useState(false);

  // Trigger initial navbar entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavEntered(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when any modal or mobile menu is open & listen for Escape
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (menuOpen || nowPlayingOpen || archiveOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setNowPlayingOpen(false);
        setArchiveOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, nowPlayingOpen, archiveOpen]);

  const p = scrollProgress;

  // Section 1 Opacity
  let s1Opacity = 0;
  if (p < 0.20) {
    s1Opacity = 1;
  } else {
    s1Opacity = Math.max(0, 1 - (p - 0.20) / 0.08);
  }

  // Section 2 Opacity
  let s2Opacity = 0;
  if (p < 0.32) {
    s2Opacity = 0;
  } else if (p < 0.40) {
    s2Opacity = (p - 0.32) / 0.08;
  } else if (p < 0.55) {
    s2Opacity = 1;
  } else {
    s2Opacity = Math.max(0, 1 - (p - 0.55) / 0.08);
  }

  // Section 3 Opacity
  let s3Opacity = 0;
  if (p < 0.67) {
    s3Opacity = 0;
  } else if (p < 0.75) {
    s3Opacity = (p - 0.67) / 0.08;
  } else {
    s3Opacity = 1;
  }

  // Nav color transition at p > 0.55
  const isDarkFrame = p > 0.55;
  const navColor = isDarkFrame ? '#FFFFFF' : DARK;

  const scrollToNext = () => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    if (p < 0.35) {
      window.scrollTo({ top: maxScroll * 0.45, behavior: 'smooth' });
    } else if (p < 0.7) {
      window.scrollTo({ top: maxScroll * 0.85, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    if (p >= 0.6) {
      window.scrollTo({ top: maxScroll * 0.45, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (link: string) => {
    if (link === 'MUSIC') {
      setNowPlayingOpen(true);
    } else if (link === 'VISUALS') {
      setArchiveTab('visuals');
      setArchiveOpen(true);
    } else if (link === 'ARCHIVE') {
      setArchiveTab('archive');
      setArchiveOpen(true);
    } else if (link === 'VISION') {
      setArchiveTab('vision');
      setArchiveOpen(true);
    } else if (link === 'KINGSHADP') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  const navLinks = ['KINGSHADP', 'MUSIC', 'VISION', 'VISUALS', 'ARCHIVE'];

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      {/* STICKY 100VH VIEWPORT */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none">
        
        {/* 1. VIDEO ELEMENT */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 2. FRAME CANVAS */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
          style={{ opacity: canvasLive ? 1 : 0 }}
        />

        {/* 3. INTERFACE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* NAVBAR */}
          <nav
            className="absolute top-0 left-0 right-0 z-50 pointer-events-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex items-center justify-between transition-colors duration-500"
            style={{ color: navColor }}
          >
            {/* Mobile Hamburger (below lg) */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                aria-label="Toggle Navigation Menu"
                onClick={() => setMenuOpen(true)}
                className="flex flex-col gap-[5px] cursor-pointer p-2 -ml-2 transition-opacity hover:opacity-70"
              >
                <span
                  className="block h-[2px] w-[24px] transition-colors duration-500"
                  style={{ backgroundColor: navColor }}
                />
                <span
                  className="block h-[2px] w-[24px] transition-colors duration-500"
                  style={{ backgroundColor: navColor }}
                />
                <span
                  className="block h-[2px] w-[16px] transition-colors duration-500"
                  style={{ backgroundColor: navColor }}
                />
              </button>
            </div>

            {/* Desktop Left Nav Cluster (lg+) */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((label, i) => {
                const isActive = label === 'KINGSHADP';
                const delay = i * 80 + 100;
                return (
                  <div
                    key={label}
                    style={{
                      opacity: navEntered ? 1 : 0,
                      transform: navEntered ? 'translateY(0)' : 'translateY(-12px)',
                      transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                    }}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(label)}
                      className="text-xs tracking-[0.15em] uppercase font-medium hover:opacity-70 cursor-pointer transition-opacity"
                    >
                      {label}
                    </button>
                    {isActive && (
                      <span
                        className="absolute -bottom-3 left-0 w-full h-[2px] transition-colors duration-500"
                        style={{
                          backgroundColor: isDarkFrame ? '#ECE9E4' : '#8A0F19',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Nav Cluster (hidden below sm) */}
            <div
              className="hidden sm:flex items-center gap-6 md:gap-8"
              style={{
                opacity: navEntered ? 1 : 0,
                transform: navEntered ? 'translateY(0)' : 'translateY(-12px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 500ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 500ms',
              }}
            >
              {/* Item 1: NOW PLAYING */}
              <button
                type="button"
                onClick={() => setNowPlayingOpen(true)}
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-xs tracking-[0.2em] uppercase font-medium">
                  NOW PLAYING
                </span>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500"
                  style={{ backgroundColor: navColor }}
                >
                  <Info
                    size={10}
                    style={{ color: isDarkFrame ? '#050505' : '#FFFFFF' }}
                  />
                </div>
              </button>

              {/* Item 2: MENU */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="text-xs tracking-[0.2em] uppercase font-medium cursor-pointer hover:opacity-70 transition-opacity"
                >
                  MENU
                </button>
              </div>
            </div>
          </nav>

          {/* ============================================================ */}
          {/* SECTION 1 — KINGSHADP HERO                                    */}
          {/* ============================================================ */}
          <section
            className="absolute inset-0 flex items-center px-6 sm:px-8 md:px-20 lg:px-32"
            style={{
              opacity: s1Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s1Opacity > 0.1 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-4xl text-left">
              {/* Title */}
              <Stagger visible={s1Opacity > 0.3} delayMs={0}>
                <h1
                  className="font-light uppercase leading-[1.2] tracking-tight"
                  style={{
                    color: DARK,
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                  }}
                >
                  BUILT TO BE REMEMBERED
                </h1>
              </Stagger>

              {/* Subtitle */}
              <Stagger visible={s1Opacity > 0.3} delayMs={150}>
                <p
                  className="mt-6 text-sm tracking-[0.3em] uppercase font-medium"
                  style={{ color: '#1D304590' }}
                >
                  MUSIC · IDENTITY · VISUAL EXPERIENCE
                </p>
              </Stagger>
            </div>

            {/* Bottom-Right Arrow Action */}
            <div className="absolute bottom-12 right-6 sm:right-8 md:right-12">
              <Stagger visible={s1Opacity > 0.3} delayMs={300}>
                <button
                  type="button"
                  onClick={scrollToNext}
                  aria-label="Scroll to next section"
                  className="w-12 h-12 rounded-full border border-[#1D3045]/50 flex items-center justify-center text-[#1D3045] hover:opacity-70 transition-opacity cursor-pointer pointer-events-auto"
                >
                  <ArrowRight size={18} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 2 — KINGSHADP MANIFESTO                               */}
          {/* ============================================================ */}
          <section
            className="absolute inset-0 px-6 sm:px-8 flex items-center justify-center"
            style={{
              opacity: s2Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s2Opacity > 0.1 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-[900px] w-full text-center">
              <Stagger visible={s2Opacity > 0.3} delayMs={0}>
                <h2
                  className="font-extralight tracking-wide leading-[1.3] text-center uppercase"
                  style={{
                    fontSize: 'clamp(1.5rem, 4.5vw, 4.5rem)',
                  }}
                >
                  <span className="block" style={{ color: DARK, opacity: 1 }}>
                    MUSIC BECOMES IDENTITY,
                  </span>
                  <span className="block" style={{ color: DARK, opacity: 0.8 }}>
                    IDENTITY BECOMES MEMORY,
                  </span>
                  <span className="block" style={{ color: DARK, opacity: 0.5 }}>
                    MEMORY BECOMES LEGACY
                  </span>
                </h2>
              </Stagger>
            </div>

            {/* Section 2 Right Controls */}
            <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4 pointer-events-auto">
              {/* Down Button */}
              <Stagger visible={s2Opacity > 0.3} delayMs={200}>
                <button
                  type="button"
                  onClick={scrollToNext}
                  aria-label="Scroll to Section 3"
                  className="w-12 h-12 rounded-full border border-[#1D3045]/40 flex items-center justify-center text-[#1D3045] hover:border-[#1D3045] transition-colors cursor-pointer"
                >
                  <ArrowDown size={18} />
                </button>
              </Stagger>

              {/* Progress Dots */}
              <Stagger visible={s2Opacity > 0.3} delayMs={350}>
                <div className="mt-4 flex gap-2 items-center">
                  <span className="block w-2 h-2 rounded-full bg-[#1D3045]" />
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#1D3045]/40" />
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#1D3045]/40" />
                </div>
              </Stagger>

              {/* Up Button */}
              <Stagger visible={s2Opacity > 0.3} delayMs={500}>
                <button
                  type="button"
                  onClick={scrollToPrev}
                  aria-label="Scroll back to Section 1"
                  className="w-10 h-10 rounded-full border border-[#1D3045]/30 flex items-center justify-center text-[#1D3045]/80 hover:text-[#1D3045] hover:border-[#1D3045] transition-colors mt-2 cursor-pointer"
                >
                  <ChevronUp size={16} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 3 — FINAL KINGSHADP MOMENT                           */}
          {/* ============================================================ */}
          <section
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32"
            style={{
              opacity: s3Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s3Opacity > 0.1 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-2xl text-left">
              {/* Eyebrow */}
              <Stagger visible={s3Opacity > 0.3} delayMs={0}>
                <p className="text-white/60 text-lg tracking-wide mb-4 uppercase font-medium">
                  KINGSHADP | CURRENT ERA
                </p>
              </Stagger>

              {/* Final Headline */}
              <Stagger visible={s3Opacity > 0.3} delayMs={150}>
                <h3
                  className="font-light text-white leading-[1.2] uppercase tracking-wide mb-8"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                  }}
                >
                  STAY CLOSE TO
                  <br />
                  WHAT COMES NEXT.
                </h3>
              </Stagger>

              {/* Final CTA */}
              <Stagger visible={s3Opacity > 0.3} delayMs={300}>
                <div
                  onClick={() => {
                    setArchiveTab('archive');
                    setArchiveOpen(true);
                  }}
                  className="flex items-center gap-4 pointer-events-auto group cursor-pointer w-fit"
                >
                  <span className="text-sm tracking-[0.3em] text-white/80 uppercase group-hover:text-white transition-colors">
                    ENTER KSP
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 duration-300 transition-transform">
                    <ArrowRight size={16} className="text-gray-800" />
                  </div>
                </div>
              </Stagger>
            </div>
          </section>

        </div>
      </div>

      {/* ============================================================ */}
      {/* FULLSCREEN MOBILE & GLOBAL MENU OVERLAY                       */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          backgroundColor: '#050505',
          backgroundImage: 'radial-gradient(circle at center, rgba(94, 0, 8, 0.15) 0%, rgba(5, 5, 5, 1) 70%)',
        }}
      >
        <div
          className={`w-full h-full flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            menuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {/* Top Bar / Close Button */}
          <div className="w-full flex justify-end px-6 sm:px-8 pt-8 sm:pt-12">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Centered Navigation Links */}
          <div className="px-8 sm:px-12 flex flex-col items-start justify-center">
            {navLinks.map((link, idx) => {
              const isActive = link === 'KINGSHADP';
              return (
                <div
                  key={link}
                  style={{
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 0.5s ease-out ${idx * 60}ms, opacity 0.5s ease-out ${idx * 60}ms`,
                  }}
                  className="py-3"
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className={`text-2xl sm:text-3xl font-light tracking-wide uppercase cursor-pointer transition-colors ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-8 sm:px-12 pb-10 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-white/60 font-medium">
            <button
              onClick={() => {
                setMenuOpen(false);
                setNowPlayingOpen(true);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              LISTEN
            </button>
            <a
              href="mailto:KShadP@gmail.com"
              className="hover:text-white transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>

      {/* NOW PLAYING AUDIO MODAL (Behold the Twisted Beast + Cover Art) */}
      <NowPlayingModal
        isOpen={nowPlayingOpen}
        onClose={() => setNowPlayingOpen(false)}
      />

      {/* ARCHIVE & MEDIA VAULT MODAL (Giragon Sculpture, Keys, Profiles) */}
      <ArchiveModal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        initialTab={archiveTab}
      />
    </div>
  );
}
