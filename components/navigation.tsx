'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { MonoLabel } from '@/components/system';
import { useAudio } from '@/components/audio-provider';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'IDENTITY', href: '/#identity' },
  { label: 'MUSIC', href: '/music' },
  { label: 'ARCHIVE', href: '/archive' },
  { label: 'DIGITAL', href: '/#digital' },
  { label: 'VISUAL', href: '/#visual' },
  { label: 'BRAND', href: '/#brand' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { audioActive, toggleAudio } = useAudio();

  // Close mobile menu on route change
  useEffect(() => {
    const timeout = setTimeout(() => setMobileMenuOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const isCurrentRoute = (href: string) => {
    if (href.includes('#')) return false;
    return pathname === href;
  };

  return (
    <>
      {/* Structural Framing border from Immersive UI */}
      <div className="fixed top-5 bottom-5 left-5 right-5 border border-border pointer-events-none z-30 hidden md:block" />

      {/* Header Navigation */}
      <nav aria-label="Primary" className={`fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none' : ''}`}>
        <Link href="/" className="font-serif italic text-xl md:text-lg text-foreground tracking-wide font-light hover:text-white transition-colors duration-400 z-50">
          kingshadp
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-neutral-500 font-mono text-[9px] tracking-widest uppercase">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`hover:text-foreground transition-colors duration-400 ${isCurrentRoute(link.href) ? 'text-foreground font-bold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-foreground z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-between p-8 pb-12"
          >
            <div className="mt-20">
              <MonoLabel className="mb-8 block text-center">PRIMARY DESTINATIONS</MonoLabel>
              <div className="flex flex-col items-center gap-8 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <Link 
                    href={link.href}
                    className={`font-mono text-lg tracking-widest uppercase ${isCurrentRoute(link.href) ? 'text-foreground font-bold' : 'text-neutral-500'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <button
                onClick={toggleAudio}
                className="w-full border border-border px-4 py-4 text-left transition-colors hover:border-foreground/50"
              >
                <MonoLabel className="block text-foreground">GLOBAL AUDIO</MonoLabel>
                <MonoLabel>{audioActive ? 'CHANNEL ACTIVE' : 'CHANNEL MUTED'}</MonoLabel>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating System Attributes (Bottom Left) */}
      <ul className="fixed bottom-0 left-0 p-6 md:p-12 z-40 space-y-2 hidden md:block pointer-events-none mix-blend-difference">
        <li className="flex items-center gap-2">
          <span className="w-[4px] h-[4px] rounded-full bg-foreground animate-ping" />
          <MonoLabel>SIGNAL STRENGTH: MAXIMUM</MonoLabel>
        </li>
        <li><MonoLabel>LAT: 34.0522° N // LONG: 118.2437° W</MonoLabel></li>
      </ul>
    </>
  );
}
