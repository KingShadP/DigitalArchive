'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Sparkles, X, ArrowRight, Send } from 'lucide-react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
}

export function ContactButton({
  className = '',
  onClick,
  label = 'Contact Me',
}: ContactButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailAddress = 'kingshadp@3dcreator.art';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setModalOpen(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2200);
  };

  return (
    <>
      <motion.button
        type="button"
        id="hero-contact-button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (onClick) {
            onClick();
          } else {
            setModalOpen(true);
          }
        }}
        className={`relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer transition-all duration-300 ${className}`}
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
          outline: '2px solid #FFFFFF',
          outlineOffset: '-3px',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        <span className="relative z-10">{label}</span>
      </motion.button>

      {/* Interactive Contact Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] text-[#D7E2EA] shadow-2xl overflow-hidden z-10"
              style={{
                boxShadow: '0 20px 60px -15px rgba(182, 0, 168, 0.3)',
              }}
            >
              {/* Decorative gradient blob */}
              <div
                className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-40"
                style={{
                  background: 'linear-gradient(123deg, #B600A8, #7621B0, #BE4C00)',
                }}
              />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B600A8] to-[#BE4C00]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                    Let&apos;s Build Together
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/70 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                Start a Project
              </h2>
              <p className="text-sm text-[#D7E2EA]/70 mb-6 font-light leading-relaxed">
                Reach out for 3D modeling, photorealistic rendering, motion graphics, or full visual branding.
              </p>

              {/* Direct email pill */}
              <div className="flex items-center justify-between p-3.5 mb-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#161616]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#BBCCD7] shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-white truncate">
                    {emailAddress}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#22242a] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] text-[#D7E2EA] transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-base font-medium text-white">Message Transmitted!</p>
                  <p className="text-xs text-[#D7E2EA]/70 mt-1">
                    KingShadP will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#D7E2EA]/20 text-white placeholder:text-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@studio.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#D7E2EA]/20 text-white placeholder:text-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                      Project Vision / Needs
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your timeline, 3D assets, rendering, or branding scope..."
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#D7E2EA]/20 text-white placeholder:text-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                      outline: '2px solid #FFFFFF',
                      outlineOffset: '-3px',
                    }}
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ContactButton;
