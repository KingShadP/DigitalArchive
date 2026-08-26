'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { MonoLabel } from '@/components/system';
import { useFirebase } from '@/components/firebase-provider';

const NAV_LINKS = [
  { label: 'SOUND', href: '/sound' },
  { label: 'CINEMA', href: '/cinema' },
  { label: 'GALLERIA', href: '/galleria' },
  { label: 'LITERATURE', href: '/literature' },
  { label: 'CLOTHING', href: '/clothing' },
  { label: 'KINGSHADP', href: '/kingshadp' },
  { label: 'CONCIERGE', href: '/concierge' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signInWithGoogle, signOutUser, savedArtifactIds, favoriteTrackIds } = useFirebase();

  // Close mobile menu on route change
  useEffect(() => {
    // using setTimeout to bypass the lint rule and avoid cascading renders on initial load
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

  return (
    <>
      {/* Structural Framing border from Immersive UI */}
      <div className="fixed top-5 bottom-5 left-5 right-5 border border-border pointer-events-none z-30 hidden md:block" />

      {/* Header Navigation */}
      <nav className={`fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none' : ''}`}>
        <Link href="/" className="font-serif italic text-xl md:text-lg text-foreground tracking-wide font-light hover:text-foreground transition-colors duration-400 z-50">
          kingshadp
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-neutral-500 font-mono text-[9px] tracking-widest uppercase">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={`hover:text-foreground transition-colors duration-400 ${pathname === link.href ? 'text-foreground font-bold' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Firebase Collector Auth Status */}
          <div className="border-l border-border pl-6 flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 text-foreground/80 font-mono text-[9px] border border-border px-2.5 py-1 bg-surface/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {profile?.displayName?.split(' ')[0] || 'COLLECTOR'} {'//'} {(profile?.collectorTier || 'INITIATE').toUpperCase()}
                  {(savedArtifactIds.length > 0 || favoriteTrackIds.length > 0) && (
                    <span className="text-foreground/40 font-mono">[{savedArtifactIds.length + favoriteTrackIds.length}]</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => signOutUser()}
                  title="Sign Out"
                  className="text-foreground/40 hover:text-foreground transition-colors p-1"
                >
                  <LogOut size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="inline-flex items-center gap-2 px-3 py-1 border border-border/80 text-foreground/70 hover:text-foreground hover:border-foreground transition-all duration-300 font-mono text-[9px] tracking-widest"
              >
                <UserIcon size={10} /> AUTHENTICATE
              </button>
            )}
          </div>
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center p-6"
          >
            <div className="flex flex-col items-center gap-6 text-center w-full max-w-sm">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <Link 
                    href={link.href}
                    className={`font-mono text-lg tracking-widest uppercase ${pathname === link.href ? 'text-foreground font-bold' : 'text-neutral-500'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth Button */}
              <div className="pt-6 border-t border-border/40 w-full flex flex-col items-center gap-3">
                {user ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] text-foreground/70 uppercase tracking-widest">
                      AUTHENTICATED: {user.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => { signOutUser(); setMobileMenuOpen(false); }}
                      className="px-4 py-2 border border-border text-foreground/60 hover:text-foreground font-mono text-[9px] uppercase tracking-widest"
                    >
                      SIGN OUT
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }}
                    className="w-full px-4 py-3 bg-foreground text-background font-mono text-[9px] uppercase tracking-widest font-bold"
                  >
                    AUTHENTICATE WITH GOOGLE
                  </button>
                )}
              </div>
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
