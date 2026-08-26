'use client';

import React, { useSyncExternalStore } from 'react';

interface StaggerProps {
  visible: boolean;
  delayMs?: number;
  className?: string;
  children: React.ReactNode;
}

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getReducedMotionServerSnapshot = () => false;

export function Stagger({ visible, delayMs = 0, className = '', children }: StaggerProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : reducedMotion
          ? 'none'
          : 'translateY(24px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
