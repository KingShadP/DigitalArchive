'use client';

import React from 'react';
import Link from 'next/link';
import { MonoLabel } from '@/components/system';
import Magnetic from '@/components/magnetic';

const FOOTER_LINKS = [
  { label: 'Identity', href: '/#identity' },
  { label: 'Music', href: '/music' },
  { label: 'Archive', href: '/archive' },
  { label: 'Digital', href: '/#digital' },
  { label: 'Visual', href: '/#visual' },
  { label: 'Brand', href: '/#brand' },
];

export default function Footer() {
  return (
    <footer className="py-24 px-6 md:px-20 flex flex-col items-center justify-center border-t border-border relative z-10 bg-background">
      <Magnetic range={100} strength={0.5} scaleStrength={0.12}>
        <div 
          className="w-16 h-16 border border-border rounded-full flex items-center justify-center mb-8 relative overflow-hidden group hover:border-foreground transition-all duration-700 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <div className="w-1 h-1 bg-foreground rounded-full group-hover:scale-[8] transition-transform duration-700 ease-out" />
        </div>
      </Magnetic>
      
      <nav aria-label="End navigation" className="mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="text-center space-y-3 max-w-3xl">
        <MonoLabel className="block text-foreground">END OF TRANSMISSION // KINGSHADP DIGITAL ARCHIVE CHANNEL</MonoLabel>
        <MonoLabel className="block opacity-50">© 2026 // ALL COGNITIVE RADIAL DIRECTIONS VERIFIED</MonoLabel>
      </div>
    </footer>
  );
}
