'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useAudio } from '@/components/audio-provider';

type StageKey = 'hydration' | 'fonts' | 'primaryData' | 'criticalMedia' | 'audioInit' | 'experienceModules';
type StageStatus = 'pending' | 'ready' | 'failed' | 'skipped';

const CRITICAL_MEDIA = ['https://picsum.photos/seed/soundscape/1200/800?grayscale'];

const STAGES: { key: StageKey; label: string; required: boolean }[] = [
  { key: 'hydration', label: 'APPLICATION HYDRATION', required: true },
  { key: 'fonts', label: 'TYPOGRAPHY READY', required: true },
  { key: 'primaryData', label: 'PRIMARY DATA INDEX', required: true },
  { key: 'criticalMedia', label: 'CRITICAL MEDIA', required: false },
  { key: 'audioInit', label: 'AUDIO ENGINE', required: true },
  { key: 'experienceModules', label: 'EXPERIENCE MODULES', required: false },
];

const INITIAL_STAGE_STATE: Record<StageKey, StageStatus> = {
  hydration: 'ready',
  fonts: 'pending',
  primaryData: 'pending',
  criticalMedia: 'pending',
  audioInit: 'pending',
  experienceModules: 'pending',
};

export function Bootloader({ onComplete }: { onComplete: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const { audioEngineReady } = useAudio();
  const [stages, setStages] = useState<Record<StageKey, StageStatus>>(INITIAL_STAGE_STATE);
  const [isVisible, setIsVisible] = useState(true);
  const [forcedDegrade, setForcedDegrade] = useState(false);

  const setStage = useCallback((key: StageKey, status: StageStatus) => {
    setStages((prev) => {
      if (prev[key] !== 'pending') return prev;
      return { ...prev, [key]: status };
    });
  }, []);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setStage('fonts', 'ready')).catch(() => setStage('fonts', 'failed'));
    } else {
      window.setTimeout(() => setStage('fonts', 'ready'), 0);
    }

    import('@/lib/music-data')
      .then(() => setStage('primaryData', 'ready'))
      .catch(() => setStage('primaryData', 'failed'));

    Promise.all(
      CRITICAL_MEDIA.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => reject(new Error('media failed'));
            image.src = src;
          }),
      ),
    )
      .then(() => setStage('criticalMedia', 'ready'))
      .catch(() => setStage('criticalMedia', 'failed'));

    Promise.all([import('@/components/art-direction-showcase'), import('@/components/global-player')])
      .then(() => setStage('experienceModules', 'ready'))
      .catch(() => setStage('experienceModules', 'failed'));

    const degradeTimer = window.setTimeout(() => {
      setForcedDegrade(true);
      setStages((prev) => {
        const next = { ...prev };
        STAGES.filter((stage) => !stage.required).forEach((stage) => {
          if (next[stage.key] === 'pending') next[stage.key] = 'skipped';
        });
        return next;
      });
    }, 4500);

    return () => window.clearTimeout(degradeTimer);
  }, [setStage]);

  useEffect(() => {
    if (audioEngineReady) {
      window.setTimeout(() => setStage('audioInit', 'ready'), 0);
      return;
    }

    const fallback = window.setTimeout(() => {
      setStage('audioInit', 'failed');
    }, 3200);

    return () => window.clearTimeout(fallback);
  }, [audioEngineReady, setStage]);

  const requiredReady = useMemo(
    () => STAGES.filter((stage) => stage.required).every((stage) => stages[stage.key] !== 'pending'),
    [stages],
  );

  const completedCount = Object.values(stages).filter((status) => status !== 'pending').length;
  const progressPercent = Math.round((completedCount / STAGES.length) * 100);

  const finish = useCallback(() => {
    setIsVisible(false);
    const exitDelay = prefersReducedMotion ? 120 : 650;
    window.setTimeout(onComplete, exitDelay);
  }, [onComplete, prefersReducedMotion]);

  useEffect(() => {
    if (!requiredReady) return;
    const timer = window.setTimeout(() => finish(), 0);
    return () => window.clearTimeout(timer);
  }, [finish, requiredReady]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish();
      }
      if ((event.key === 'Enter' || event.key === ' ') && (requiredReady || forcedDegrade)) {
        event.preventDefault();
        finish();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finish, forcedDegrade, requiredReady]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          aria-label="Application initialization"
          className="fixed inset-0 z-[9999] bg-[#E5E5E5] text-[#050505] flex flex-col justify-between p-8 md:p-12"
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '-8%' }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-between items-start text-[#050505]/55 font-mono text-[9px] uppercase tracking-widest">
            <span>KINGSHADP // INITIALIZATION</span>
            <button
              type="button"
              onClick={finish}
              className="hover:text-[#050505] transition-colors"
              aria-label="Skip initialization"
            >
              SKIP
            </button>
          </div>

          <div className="max-w-2xl mx-auto w-full space-y-10">
            <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-center">KingShadP</h1>

            <div className="space-y-4">
              <div className="h-[1px] w-full bg-[#050505]/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#050505]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#050505]/60 flex justify-between">
                <span>{requiredReady ? 'READY' : 'INITIALIZING'}</span>
                <span>{progressPercent}%</span>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 font-mono text-[9px] uppercase tracking-widest text-[#050505]/65">
              {STAGES.map((stage) => {
                const status = stages[stage.key];
                const stateLabel = status === 'ready' ? 'OK' : status === 'pending' ? '..' : status === 'failed' ? 'FAIL' : 'SKIP';
                return (
                  <li key={stage.key} className="flex items-center justify-between border-b border-[#050505]/10 py-2">
                    <span>{stage.label}</span>
                    <span className={status === 'failed' ? 'text-[#73131a]' : 'text-[#050505]'}>[{stateLabel}]</span>
                  </li>
                );
              })}
            </ul>

            {(forcedDegrade || !requiredReady) && (
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#050505]/45 text-center">
                Press ESC to enter now.
              </p>
            )}
          </div>

          <div className="flex justify-between items-end text-[#050505]/55 font-mono text-[9px] uppercase tracking-widest">
            <span>{forcedDegrade ? 'DEGRADED ENTRY ENABLED' : 'READINESS CHECKS ACTIVE'}</span>
            <span>DIAGNOSTIC RESTRAINT</span>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
