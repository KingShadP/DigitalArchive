'use client';

import React from 'react';
import { MonoLabel } from '@/components/system';
import Magnetic from '@/components/magnetic';

export default function Footer() {
  return (
    <footer className="py-24 px-6 md:px-20 flex flex-col items-center justify-center border-t border-border relative z-10 bg-background">
      <Magnetic range={100} strength={0.5} scaleStrength={0.12}>
        <button
          type="button"
          className="w-16 h-16 border border-border rounded-full flex items-center justify-center mb-8 relative overflow-hidden group hover:border-foreground transition-all duration-700 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <div className="w-1 h-1 bg-foreground rounded-full group-hover:scale-[8] transition-transform duration-700 ease-out" />
        </button>
      </Magnetic>
      
      <div className="text-center space-y-3">
        <MonoLabel className="block text-foreground">END OF TRANSMISSION // KINGSHADP DIGITAL ARCHIVE CHANNEL</MonoLabel>
        <MonoLabel className="block opacity-50">© 2026 // ALL COGNITIVE RADIAL DIRECTIONS VERIFIED</MonoLabel>
      </div>
    </footer>
  );
}
