'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

interface TransmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransmissionModal({ isOpen, onClose }: TransmissionModalProps) {
  const [channel, setChannel] = useState<'sonic' | 'visual' | 'creative' | 'general'>('creative');
  const [identity, setIdentity] = useState('');
  const [communication, setCommunication] = useState('');
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim() || !communication.trim()) return;

    setTransmitting(true);
    setTimeout(() => {
      setTransmitting(false);
      setTransmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setTransmitted(false);
    setIdentity('');
    setCommunication('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-white border border-[#1a1a1a]/15 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#1a1a1a]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#1a1a1a]/10 bg-white/90 backdrop-blur-md">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B76E79] block font-mono font-bold">
              DIRECT PROTOCOL
            </span>
            <h3 className="text-base font-serif tracking-wide text-[#1a1a1a]">
              Transmission & Commission Inquiry
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close transmission modal"
            className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {transmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full border border-emerald-500/30 bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-lg font-serif tracking-wide text-[#1a1a1a]">
                  Transmission Sealed & Encrypted
                </h4>
                <p className="text-xs text-[#1a1a1a]/60 max-w-md leading-relaxed font-light">
                  Your communication vector has been dispatched to the KingShadP executive archive. Responses are deployed selectively.
                </p>
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] border border-[#1a1a1a]/20 px-4 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    SEND ANOTHER DISPATCH
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-pill text-[10px] tracking-[0.2em] uppercase bg-[#1a1a1a] text-white font-semibold px-5 py-2 hover:bg-[#B76E79]"
                  >
                    RETURN TO SANCTUM
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Channel Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-mono">
                    SELECT INQUIRY VECTOR
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'creative', label: 'CREATIVE DIR.' },
                      { id: 'sonic', label: 'SONIC ARCH.' },
                      { id: 'visual', label: 'VISUAL / 3D' },
                      { id: 'general', label: 'COLLABORATION' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setChannel(item.id as any)}
                        className={`px-3 py-2 rounded-xl text-[9px] tracking-wider uppercase border transition-all text-left cursor-pointer ${
                          channel === item.id
                            ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white font-medium shadow-sm'
                            : 'border-[#1a1a1a]/15 bg-[#1a1a1a]/[0.02] text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/30'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Identity / Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-mono">
                    YOUR IDENTITY / CONTACT VECTOR (EMAIL OR HANDLE)
                  </label>
                  <input
                    type="text"
                    required
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder="name@domain.com or @handle"
                    className="w-full bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/15 focus:border-[#1a1a1a] rounded-xl px-4 py-3 text-xs text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none transition-all"
                  />
                </div>

                {/* Communication Body */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-mono">
                    TRANSMISSION DETAILS / COMMISSION BRIEF
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={communication}
                    onChange={(e) => setCommunication(e.target.value)}
                    placeholder="Describe scope, concept, timeline, and aesthetic objectives..."
                    className="w-full bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/15 focus:border-[#1a1a1a] rounded-xl px-4 py-3 text-xs text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]/10">
                  <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-[#1a1a1a]/40 font-mono uppercase">
                    <ShieldCheck size={12} className="text-[#B76E79]" />
                    <span>256-BIT ENCRYPTED</span>
                  </div>

                  <button
                    type="submit"
                    disabled={transmitting || !identity.trim() || !communication.trim()}
                    className="btn-pill text-[10px] tracking-[0.2em] uppercase font-semibold bg-[#1a1a1a] text-white hover:bg-[#B76E79] disabled:opacity-30 flex items-center gap-2"
                  >
                    {transmitting ? (
                      <span className="animate-pulse">ENCRYPTING & DISPATCHING...</span>
                    ) : (
                      <>
                        <span>TRANSMIT DISPATCH</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
