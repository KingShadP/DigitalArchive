'use client';

import React from 'react';
import { motion } from 'motion/react';

export function SymbolAlignment({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <motion.circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
      <motion.line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" />
      <motion.line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="2" fill="currentColor" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      <circle cx="80" cy="80" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SymbolLens({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M10 50 Q 50 10 90 50 Q 50 90 10 50" stroke="currentColor" strokeWidth="0.5" />
      <path d="M30 50 Q 50 30 70 50 Q 50 70 30 50" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
  );
}

export function SymbolSignal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
    </svg>
  );
}

export function SymbolVoid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <rect x="25" y="10" width="50" height="80" stroke="currentColor" strokeWidth="0.5" />
      <line x1="25" y1="90" x2="75" y2="10" stroke="currentColor" strokeWidth="0.5" />
      <defs>
        <linearGradient id="voidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="35" y="20" width="30" height="60" fill="url(#voidGrad)" />
    </svg>
  );
}

export function SymbolHorizon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="40" r="30" stroke="currentColor" strokeWidth="0.5" />
      <line x1="0" y1="70" x2="100" y2="70" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
      <circle cx="50" cy="70" r="3" fill="currentColor" />
    </svg>
  );
}
