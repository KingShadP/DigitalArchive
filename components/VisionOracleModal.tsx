'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Copy, Check, Terminal, Compass, Disc } from 'lucide-react';

interface OracleResponse {
  title: string;
  classification: string;
  manifesto: string;
  sonicPalette: string[];
  visualCoordinates: string[];
  creativeDirective: string;
}

interface VisionOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogs?: () => void;
}

const SAMPLE_PROMPTS = [
  "Monolithic architecture in zero gravity",
  "The tension between dragon power and serpentine grace",
  "The acoustic signature of pure obsidian",
  "Creation through systematic subtraction",
];

export function VisionOracleModal({ isOpen, onClose, onOpenLogs }: VisionOracleModalProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OracleResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (queryText?: string) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error('Oracle Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyDecryption = () => {
    if (!result) return;
    const text = `// KINGSHADP // ${result.classification}\nTITLE: ${result.title}\n\nMANIFESTO:\n"${result.manifesto}"\n\nSONIC PALETTE:\n${result.sonicPalette.map(s => `• ${s}`).join('\n')}\n\nVISUAL COORDINATES:\n${result.visualCoordinates.map(v => `• ${v}`).join('\n')}\n\nDIRECTIVE:\n"${result.creativeDirective}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Modal Window */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#080808] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#EAEAEA]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 shrink-0 bg-[#080808]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 block font-mono">
                INTELLIGENT CREATIVE ENGINE
              </span>
              <h3 className="text-sm sm:text-base font-light tracking-[0.2em] uppercase text-white">
                THE VISION ORACLE // TRANSMUTATION
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Oracle modal"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col gap-6">
          
          {/* Input Interface */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono flex items-center gap-2">
              <Terminal size={12} />
              INPUT CREATIVE SEED OR PHILOSOPHICAL QUERY
            </label>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}
              className="flex items-center gap-2 relative"
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Silence after violent resonance, obsidian monument in deep void..."
                className="w-full bg-white/[0.03] border border-white/15 focus:border-white/50 rounded-xl px-5 py-4 text-xs sm:text-sm text-white placeholder:text-white/25 outline-none transition-all tracking-wide"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="absolute right-2 px-4 py-2.5 rounded-lg bg-white text-black text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#EAEAEA] disabled:opacity-30 disabled:hover:bg-white transition-all flex items-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">DECRYPTING...</span>
                ) : (
                  <>
                    <span>TRANSMUTE</span>
                    <Send size={12} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Seeds */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[9px] tracking-widest uppercase text-white/30 self-center">SEEDS:</span>
              {SAMPLE_PROMPTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(sample);
                    handleGenerate(sample);
                  }}
                  className="text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Pulse */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full border border-white/20 border-t-white animate-spin" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-mono animate-pulse">
                CHANNELING RESTRAINED ARCHITECTURAL INTELLIGENCE...
              </p>
            </div>
          )}

          {/* Output Display */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="border border-white/15 bg-white/[0.02] rounded-xl p-6 sm:p-8 flex flex-col gap-6 relative"
              >
                {/* Header of Decryption */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B76E79] block">
                      {result.classification}
                    </span>
                    <h4 className="text-base sm:text-xl font-light tracking-[0.15em] uppercase text-white mt-0.5">
                      {result.title}
                    </h4>
                  </div>
                  <button
                    onClick={copyDecryption}
                    className="self-start sm:self-auto flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/60 hover:text-white border border-white/15 hover:border-white/40 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY TRANSMISSION'}</span>
                  </button>
                </div>

                {/* Manifesto Passage */}
                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-mono block mb-2">
                    PHILOSOPHICAL ESSENCE
                  </span>
                  <blockquote className="text-sm sm:text-base font-light italic leading-relaxed text-white/90 pl-4 border-l-2 border-white/30">
                    &ldquo;{result.manifesto}&rdquo;
                  </blockquote>
                </div>

                {/* Grid of Coordinates & Palettes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Sonic Palette */}
                  <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-mono flex items-center gap-1.5 mb-3">
                      <Disc size={11} className="text-[#B76E79]" />
                      SONIC TEXTURE PALETTE
                    </span>
                    <ul className="flex flex-col gap-2">
                      {result.sonicPalette.map((item, i) => (
                        <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                          <span className="text-white/30 font-mono">0{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Coordinates */}
                  <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-mono flex items-center gap-1.5 mb-3">
                      <Compass size={11} className="text-[#B76E79]" />
                      SPATIAL & VISUAL DIRECTIVES
                    </span>
                    <ul className="flex flex-col gap-2">
                      {result.visualCoordinates.map((item, i) => (
                        <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                          <span className="text-white/30 font-mono">0{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Creative Directive */}
                <div className="p-4 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-[8px] tracking-[0.3em] uppercase text-white/40 font-mono block">
                      SACRED DIRECTIVE
                    </span>
                    <p className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white mt-0.5">
                      {result.creativeDirective}
                    </p>
                  </div>
                  {onOpenLogs && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenLogs();
                      }}
                      className="text-[9px] tracking-[0.2em] uppercase text-[#B76E79] hover:text-white transition-colors underline cursor-pointer"
                    >
                      Log in Sanctum Vault →
                    </button>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {!result && !loading && (
            <div className="border border-dashed border-white/10 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
              <Sparkles className="size-6 text-white/20" />
              <p className="text-xs tracking-wider uppercase text-white/40 max-w-md">
                Input any seed concept above to decrypt its philosophical architecture, sonic frequency palette, and spatial coordinates.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-3 bg-black/80 border-t border-white/10 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/40 uppercase">
          <span>MODEL: GEMINI-3.7-FLASH // KSP_CORE</span>
          <span>SUBTRACTIVE REASONING SYSTEM</span>
        </div>
      </motion.div>
    </div>
  );
}
