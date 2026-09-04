'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, Waves, Sparkles, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface HarmonicMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HarmonicMatrixModal({ isOpen, onClose }: HarmonicMatrixModalProps) {
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'432' | '440' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  // Solfeggio & Sacred Frequencies
  const solfeggioNodes = [
    { freq: 432, label: '432 Hz', title: 'Universal Natural Tone', desc: 'Pythagorean cosmic frequency; mathematically tuned to sacred geometry and water resonance.' },
    { freq: 528, label: '528 Hz', title: 'Transformation & Miracle', desc: 'Ancient Solfeggio "Mi"; associated with cellular equilibrium and harmonic repair.' },
    { freq: 639, label: '639 Hz', title: 'Harmonic Connection', desc: 'Resonance of interconnected relationship, spatial coherence, and sonic bridge.' },
    { freq: 852, label: '852 Hz', title: 'Pure Intuition & Light', desc: 'Higher vibrational harmonic for mental stillness and clarity of form.' },
  ];

  // Cleanup tone on unmount
  useEffect(() => {
    return () => {
      soundEngine.stopContinuousTone();
    };
  }, []);

  const handleCloseModal = () => {
    soundEngine.stopContinuousTone();
    setActiveFrequency(null);
    setComparisonMode(null);
    onClose();
  };

  // Real-time oscilloscope canvas animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const renderWave = () => {
      phase += (activeFrequency ? activeFrequency * 0.0003 : 0.04);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(244, 241, 236, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Draw Sine Wave
      ctx.beginPath();
      ctx.lineWidth = activeFrequency ? 2 : 1;
      ctx.strokeStyle = activeFrequency === 432 ? '#B76E79' : activeFrequency ? '#F4F1EC' : 'rgba(244, 241, 236, 0.2)';

      const wavelength = activeFrequency ? (5000 / activeFrequency) * 4 : 45;
      const amplitude = activeFrequency ? 28 : 8;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x / wavelength) + phase) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animRef.current = requestAnimationFrame(renderWave);
    };

    animRef.current = requestAnimationFrame(renderWave);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isOpen, activeFrequency]);

  const handleToneToggle = (freq: number) => {
    soundEngine.playClick(1100, 0.02, 0.015);
    if (activeFrequency === freq) {
      soundEngine.stopContinuousTone();
      setActiveFrequency(null);
      setComparisonMode(null);
    } else {
      soundEngine.playContinuousTone(freq, 0.06);
      setActiveFrequency(freq);
      if (freq === 432) setComparisonMode('432');
      else if (freq === 440) setComparisonMode('440');
      else setComparisonMode(null);
    }
  };

  const handleStopAll = () => {
    soundEngine.stopContinuousTone();
    setActiveFrequency(null);
    setComparisonMode(null);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="harmonic-matrix-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#050505]/85 backdrop-blur-2xl animate-fade-in"
    >
      <div className="relative w-full max-w-3xl rounded-3xl border border-[#F4F1EC]/15 bg-gradient-to-b from-[#0f0f0f] via-[#080808] to-[#040404] p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B76E79]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#F4F1EC]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Title & Close Button */}
        <div className="flex items-start justify-between border-b border-[#F4F1EC]/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B76E79] animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
                ACOUSTIC CALIBRATION ENGINE
              </span>
            </div>
            <h2 id="harmonic-matrix-title" className="text-2xl sm:text-3xl font-serif font-light text-[#F4F1EC]">
              Pythagorean Frequency Matrix
            </h2>
            <p className="text-xs font-mono text-[#F4F1EC]/50 mt-1 tracking-wider">
              Natural Harmonic Resonance (A=432 Hz) vs Standard Equal Temperament (A=440 Hz)
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Close Frequency Matrix"
            className="p-2.5 rounded-full border border-[#F4F1EC]/15 text-[#F4F1EC]/70 hover:text-[#050505] hover:bg-[#F4F1EC] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Real-time Waveform Oscilloscope Visualizer */}
        <div className="relative w-full h-24 rounded-2xl border border-[#F4F1EC]/10 bg-[#000000]/60 p-2 mb-8 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between px-3 pt-1 text-[8px] font-mono text-[#F4F1EC]/40 tracking-widest uppercase">
            <span>OSCILLOSCOPE // REAL-TIME SINE GENERATOR</span>
            <span>
              STATUS: {activeFrequency ? `ACTIVE (${activeFrequency} HZ)` : 'STANDBY'}
            </span>
          </div>
          
          <canvas
            ref={canvasRef}
            width={700}
            height={70}
            className="w-full h-16 pointer-events-none"
          />
        </div>

        {/* Primary A/B Comparative Section: 432 Hz vs 440 Hz */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#F4F1EC]/60">
              01 // THE A/B HARMONIC COMPARISON
            </span>
            {activeFrequency && (
              <button
                type="button"
                onClick={handleStopAll}
                className="text-[9px] font-mono tracking-widest text-[#B76E79] hover:underline uppercase"
              >
                [ SILENCE FREQUENCY ]
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 432 Hz Card */}
            <div
              onClick={() => handleToneToggle(432)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                comparisonMode === '432'
                  ? 'border-[#B76E79] bg-[#B76E79]/15 shadow-[0_0_20px_rgba(183,110,121,0.2)]'
                  : 'border-[#F4F1EC]/10 bg-[#0c0c0c]/80 hover:border-[#B76E79]/40 hover:bg-[#121212]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-serif font-light text-[#F4F1EC]">432 Hz Natural Tuning</span>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#B76E79]/20 text-[#B76E79] tracking-wider">
                    {comparisonMode === '432' ? 'EMITTING' : 'VERIFIED'}
                  </span>
                </div>
                <p className="text-xs text-[#F4F1EC]/60 leading-relaxed font-light mb-4">
                  Pythagorean natural frequency. Harmonizes with water cymatics, mathematical $\Phi$ ratios, and deep somatic grounding.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F4F1EC]/10 text-[9px] font-mono tracking-wider text-[#F4F1EC]/50">
                <span>RATIO: 27:16</span>
                <span className="text-[#B76E79] font-bold">
                  {comparisonMode === '432' ? '■ CLICK TO STOP' : '▶ CLICK TO AUDITION'}
                </span>
              </div>
            </div>

            {/* 440 Hz Card */}
            <div
              onClick={() => handleToneToggle(440)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                comparisonMode === '440'
                  ? 'border-[#F4F1EC] bg-[#F4F1EC]/10 shadow-[0_0_20px_rgba(244,241,236,0.15)]'
                  : 'border-[#F4F1EC]/10 bg-[#0c0c0c]/80 hover:border-[#F4F1EC]/30 hover:bg-[#121212]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-serif font-light text-[#F4F1EC]">440 Hz Standard Pitch</span>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#F4F1EC]/70 tracking-wider">
                    {comparisonMode === '440' ? 'EMITTING' : 'STANDARD'}
                  </span>
                </div>
                <p className="text-xs text-[#F4F1EC]/60 leading-relaxed font-light mb-4">
                  Standardized internationally in 1939. Creates slight acoustic harmonic tension (+8 Hz offset) in human biological cymatics.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F4F1EC]/10 text-[9px] font-mono tracking-wider text-[#F4F1EC]/50">
                <span>OFFSET: +8 HZ</span>
                <span className="text-[#F4F1EC]/80 font-bold">
                  {comparisonMode === '440' ? '■ CLICK TO STOP' : '▶ CLICK TO AUDITION'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Solfeggio Scale Selector */}
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#F4F1EC]/60 mb-3 block">
            02 // SOLFEGGIO RESONANCE NODES
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {solfeggioNodes.map((node) => {
              const isSelected = activeFrequency === node.freq;
              return (
                <button
                  key={node.freq}
                  type="button"
                  onClick={() => handleToneToggle(node.freq)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#B76E79] bg-[#B76E79]/20 shadow-lg'
                      : 'border-[#F4F1EC]/10 bg-[#090909] hover:border-[#F4F1EC]/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-serif font-light text-[#F4F1EC]">{node.label}</span>
                      <Activity size={12} className={isSelected ? 'text-[#B76E79] animate-pulse' : 'text-[#F4F1EC]/30'} />
                    </div>
                    <span className="text-[8px] font-mono text-[#B76E79] tracking-wider uppercase block">
                      {node.title}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-[#F4F1EC]/40 tracking-widest mt-2 uppercase">
                    {isSelected ? 'ACTIVE' : 'AUDITION'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="mt-8 pt-6 border-t border-[#F4F1EC]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-[#F4F1EC]/40 tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-[#B76E79]" />
            <span>ALL SOVEREIGN KINGSHADP MASTERS ARE RECORDED & RENDERED AT 432.08 HZ</span>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-1.5 rounded-full border border-[#F4F1EC]/20 text-[#F4F1EC] hover:bg-[#F4F1EC] hover:text-[#050505] transition-colors uppercase tracking-widest text-[8px]"
          >
            DISMISS MATRIX
          </button>
        </div>

      </div>
    </div>
  );
}
