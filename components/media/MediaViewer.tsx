'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { visualAssets, VisualAsset } from '../../data/visuals';

interface MediaViewerProps {
  activeAssetId: string | null;
  onClose: () => void;
}

export function MediaViewer({ activeAssetId, onClose }: MediaViewerProps) {
  const initialIndex = visualAssets.findIndex((a) => a.id === activeAssetId);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [showInfo, setShowInfo] = useState<boolean>(true);

  // Sync index when activeAssetId changes
  const targetIndex = visualAssets.findIndex((a) => a.id === activeAssetId);
  const resolvedIndex = targetIndex >= 0 ? targetIndex : 0;
  const currentAsset: VisualAsset | undefined = visualAssets[currentIndex] || visualAssets[resolvedIndex];

  const nextAsset = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % visualAssets.length);
  }, []);

  const prevAsset = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + visualAssets.length) % visualAssets.length);
  }, []);

  useEffect(() => {
    if (!activeAssetId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextAsset();
      if (e.key === 'ArrowLeft') prevAsset();
      if (e.key === 'i' || e.key === 'I') setShowInfo((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAssetId, nextAsset, prevAsset, onClose]);

  if (!activeAssetId || !currentAsset) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[#050505]/95 backdrop-blur-3xl select-none">
      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-10 py-5 flex items-center justify-between border-b border-white/10 bg-[#050505]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B76E79]">
            VISUAL ARCHIVE VIEWER
          </span>
          <span className="text-[10px] font-mono text-white/40 tracking-widest">
            [{currentIndex + 1} / {visualAssets.length}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              showInfo
                ? 'border-white bg-white/10 text-white'
                : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'
            }`}
          >
            <Info size={13} />
            <span className="hidden sm:inline">METADATA</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close media viewer"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-16 pt-20 pb-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAsset.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={currentAsset.src}
                alt={currentAsset.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Arrow Buttons */}
        <button
          onClick={prevAsset}
          aria-label="Previous artwork"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all cursor-pointer z-20"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextAsset}
          aria-label="Next artwork"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all cursor-pointer z-20"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Metadata Drawer / Panel */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-0 left-0 right-0 z-30 px-6 sm:px-12 py-5 border-t border-white/10 bg-[#050505]/85 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B76E79]">
                {currentAsset.era} {'//'} {currentAsset.medium}
              </span>
              <span className="text-[9px] font-mono text-white/40">{currentAsset.year}</span>
            </div>
            <h3 className="text-sm sm:text-base font-light tracking-[0.15em] uppercase text-white">
              {currentAsset.title}
            </h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              {currentAsset.notes}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1 text-[9px] font-mono text-white/40 tracking-wider">
            {currentAsset.dimensions && <span>SCALE: {currentAsset.dimensions}</span>}
            {currentAsset.materials && <span>SPEC: {currentAsset.materials}</span>}
          </div>
        </motion.div>
      )}
    </div>
  );
}
