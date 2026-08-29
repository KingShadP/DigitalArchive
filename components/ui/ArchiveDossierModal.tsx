'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, ArrowUpRight, Play, Eye, Calendar, Tag, Shield } from 'lucide-react';
import { ArchiveRecord } from '../../data/archive';

interface ArchiveDossierModalProps {
  record: ArchiveRecord | null;
  onClose: () => void;
  onPlayTrack?: (trackId: string) => void;
  onOpenViewer?: (assetId: string) => void;
}

export function ArchiveDossierModal({
  record,
  onClose,
  onPlayTrack,
  onOpenViewer,
}: ArchiveDossierModalProps) {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-3xl bg-[#080808] border border-white/15 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#EAEAEA]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#080808]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79]">
              ARCHIVAL DOSSIER {'//'} {record.id.toUpperCase()}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline">
              [{record.type} {'//'} {record.year}]
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dossier"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
          {/* Top visual banner */}
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-white/10 bg-black">
            <Image
              src={record.thumbnail}
              alt={record.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79]">
                  {record.era}
                </span>
                <h3 className="text-xl sm:text-2xl font-light tracking-wide uppercase text-white">
                  {record.title}
                </h3>
              </div>
              <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-black/70 border border-white/20 text-white">
                STATUS: {record.status}
              </span>
            </div>
          </div>

          {/* Description & Historical Context */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/40">
              HISTORICAL RECORD & SUMMARY
            </span>
            <p className="text-sm font-light text-white/80 leading-relaxed">
              {record.description}
            </p>
          </div>

          {/* Tags & Metadata */}
          {record.tags && record.tags.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/40">
                TAXONOMY & DESCRIPTORS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {record.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-white/40 uppercase">
              <Shield size={12} className="text-[#B76E79]" />
              <span>PERMANENT ENTRY // KINGSHADP ARCHIVES</span>
            </div>

            <div className="flex items-center gap-3">
              {record.downloadUrl && (
                <a
                  href={record.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-white text-black text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-[#EAEAEA] transition-all flex items-center gap-2"
                >
                  <span>VIEW FULL PDF</span>
                  <ArrowUpRight size={12} />
                </a>
              )}

              {record.type === 'MUSIC' && (
                <button
                  onClick={() => {
                    onPlayTrack?.('track-01');
                    onClose();
                  }}
                  className="px-5 py-2 rounded-full bg-white text-black text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-[#EAEAEA] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play size={12} className="fill-current" />
                  <span>PLAY RECORDING</span>
                </button>
              )}

              {record.type === 'VISUAL' && (
                <button
                  onClick={() => {
                    onOpenViewer?.('sanctum-env-1');
                    onClose();
                  }}
                  className="px-5 py-2 rounded-full bg-white text-black text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-[#EAEAEA] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Eye size={12} />
                  <span>VIEW FULL RESOLUTION</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
