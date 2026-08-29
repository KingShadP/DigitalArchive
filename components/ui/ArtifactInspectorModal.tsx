'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, RotateCw, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../data/products';

interface ArtifactInspectorModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenTransmission?: () => void;
}

export function ArtifactInspectorModal({
  product,
  onClose,
  onOpenTransmission,
}: ArtifactInspectorModalProps) {
  const [viewMode, setViewMode] = useState<'RENDER' | 'DETAIL' | 'SPECULAR'>('RENDER');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  if (!product) return null;

  const handleRotate = () => {
    setIsRotating(true);
    setRotationAngle((prev) => prev + 90);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

      {/* Modal Stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-[#080808] border border-white/15 rounded-3xl flex flex-col shadow-2xl overflow-hidden text-[#EAEAEA]"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#080808]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79]">
              OBJECT INSPECTOR {'//'} {product.id.toUpperCase()}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline">
              [EDITION: {product.availability}]
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close inspector"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Main 2-Column Inspector Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center max-h-[75vh] overflow-y-auto">
          {/* Left Column: Interactive Spatial Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-black/90 shadow-2xl group flex items-center justify-center">
              {/* Background Ambient Radial Glow */}
              <div className="absolute inset-0 bg-radial from-[#8A0F19]/20 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Image View */}
              <motion.div
                animate={{ rotate: rotationAngle }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src={viewMode === 'DETAIL' ? product.detailImage : product.primaryImage}
                  alt={product.name}
                  fill
                  className={`object-cover ${viewMode === 'SPECULAR' ? 'contrast-150 grayscale invert' : ''} transition-all duration-500`}
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* View Mode Switcher Pill */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/15">
                {(['RENDER', 'DETAIL', 'SPECULAR'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-full text-[8px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                      viewMode === mode
                        ? 'bg-white text-black font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Rotate Action Button */}
              <button
                onClick={handleRotate}
                aria-label="Rotate object 90 degrees"
                className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <RotateCw size={13} className={isRotating ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Right Column: Specification & Acquisition Matrix */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79]">
                {product.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide uppercase text-white mt-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-lg font-mono font-bold text-white">{product.price}</span>
                <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase border border-white/10 px-2 py-0.5 rounded">
                  {product.availability}
                </span>
              </div>
            </div>

            <p className="text-xs font-light text-white/70 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Grid */}
            <div className="flex flex-col gap-2 border-y border-white/10 py-4">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/40 mb-1">
                TECHNICAL & PHYSICAL ATTRIBUTES
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[8px] text-white/40 uppercase block">DIMENSIONS</span>
                  <span className="text-white/90">{product.specs.dimensions}</span>
                </div>
                <div>
                  <span className="text-[8px] text-white/40 uppercase block">EDITION</span>
                  <span className="text-white/90">{product.specs.edition}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[8px] text-white/40 uppercase block">MATERIALS</span>
                  <span className="text-white/90">{product.specs.material}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[8px] text-white/40 uppercase block">PROVENANCE</span>
                  <span className="text-white/90">{product.specs.origin}</span>
                </div>
              </div>
            </div>

            {/* Acquisition Action */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenTransmission?.();
                }}
                className="w-full py-3.5 rounded-full bg-[#F4F1EC] text-black text-xs font-mono font-bold tracking-[0.2em] uppercase hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>REQUEST ACQUISITION PROTOCOL</span>
                <ArrowRight size={13} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[8px] font-mono tracking-widest text-white/40 uppercase">
                <ShieldCheck size={11} className="text-[#B76E79]" />
                <span>OFFICIAL VERIFIED CERTIFICATE OF AUTHENTICITY INCLUDED</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
