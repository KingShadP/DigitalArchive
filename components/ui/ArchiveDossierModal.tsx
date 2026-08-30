'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FileText,
  ArrowUpRight,
  Play,
  Pause,
  Eye,
  Calendar,
  Tag,
  Shield,
  Volume2,
  Square,
  Sparkles,
  FastForward,
  Rewind,
  BookOpen,
  Stamp,
} from 'lucide-react';
import { ArchiveRecord } from '../../data/archive';
import { speechEngine, SpeechState } from '../../lib/speechEngine';
import { soundEngine } from '../../lib/soundEngine';

interface ArchiveDossierModalProps {
  record: ArchiveRecord | null;
  onClose: () => void;
  onPlayTrack?: (trackId: string) => void;
  onOpenViewer?: (assetId: string) => void;
  onOpenSealReport?: () => void;
}

export function ArchiveDossierModal({
  record,
  onClose,
  onPlayTrack,
  onOpenViewer,
  onOpenSealReport,
}: ArchiveDossierModalProps) {
  const [speechState, setSpeechState] = useState<SpeechState>(speechEngine.getState());
  const [selectedSpeed, setSelectedSpeed] = useState<number>(1.0);

  useEffect(() => {
    const unsub = speechEngine.subscribe((st) => {
      setSpeechState(st);
      setSelectedSpeed(st.rate);
    });
    return () => unsub();
  }, []);

  if (!record) return null;

  const isCurrentNarrating =
    speechState.isPlaying && speechState.id === record.id;
  const isPaused = isCurrentNarrating && speechState.isPaused;

  const handleToggleNarrate = () => {
    soundEngine.playClick(isCurrentNarrating && !isPaused ? 450 : 750, 0.03);
    if (isCurrentNarrating) {
      speechEngine.togglePlay();
    } else {
      const textToRead =
        record.manuscriptText ||
        `${record.title}. ${record.description}. Created during the ${record.era}. Permanent archive entry in KingShadP studios.`;

      speechEngine.speak({
        id: record.id,
        title: record.title,
        subtitle: `${record.era} // ${record.type}`,
        category: record.type,
        text: textToRead,
      });
    }
  };

  const handleStopNarrate = () => {
    soundEngine.playClick(350, 0.03);
    speechEngine.stop();
  };

  const handleParagraphClick = (idx: number, text: string) => {
    soundEngine.playClick(650, 0.02);
    const fullText =
      record.manuscriptText || `${record.title}. ${record.description}`;
    speechEngine.speak({
      id: record.id,
      title: record.title,
      subtitle: `${record.era} // ${record.type}`,
      category: record.type,
      text: fullText,
      startParagraphIndex: idx,
    });
  };

  const paragraphs = record.manuscriptText
    ? record.manuscriptText
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : [record.description];

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
        className="relative z-10 w-full max-w-3xl bg-white border border-[#1a1a1a]/15 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#1a1a1a]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#1a1a1a]/10 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
              ARCHIVAL DOSSIER {'//'} {record.id.toUpperCase()}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#1a1a1a]/50 uppercase hidden sm:inline">
              [{record.type} {'//'} {record.year}]
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dossier"
            className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
          {/* Top visual banner */}
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#1a1a1a]/10 bg-[#1a1a1a]/5">
            <Image
              src={record.thumbnail}
              alt={record.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79] font-bold">
                  {record.era}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-white">
                  {record.title}
                </h3>
              </div>
              <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-white">
                STATUS: {record.status}
              </span>
            </div>
          </div>

          {/* TTS LITERATURE ENGINE BAR */}
          <div className="p-4 rounded-xl bg-[#1a1a1a]/[0.03] border border-[#1a1a1a]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleNarrate}
                data-cursor={isCurrentNarrating && !isPaused ? 'PAUSE' : 'LISTEN'}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                  isCurrentNarrating && !isPaused
                    ? 'bg-[#B76E79] text-white animate-pulse'
                    : 'bg-[#1a1a1a] text-white hover:bg-[#B76E79]'
                }`}
              >
                {isCurrentNarrating && !isPaused ? (
                  <Pause size={15} />
                ) : (
                  <Volume2 size={15} className="ml-0.5" />
                )}
              </button>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#B76E79]">
                    TEXT-TO-SPEECH NARRATOR
                  </span>
                  {isCurrentNarrating && !isPaused && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <span className="text-xs font-mono text-[#1a1a1a] font-medium">
                  {isCurrentNarrating
                    ? isPaused
                      ? 'Narration Paused'
                      : `Speaking: "${speechState.currentWord || 'Reading...'}"`
                    : 'Listen to Complete Archival Codex'}
                </span>
              </div>
            </div>

            {/* TTS Controls & Speed Switchers */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {isCurrentNarrating && (
                <button
                  onClick={handleStopNarrate}
                  title="Stop Narration"
                  className="p-2 rounded-full border border-[#1a1a1a]/15 text-[#1a1a1a]/70 hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer"
                >
                  <Square size={12} className="fill-current" />
                </button>
              )}

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#1a1a1a]/10">
                {[0.8, 1.0, 1.2, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setSelectedSpeed(spd);
                      speechEngine.setRate(spd);
                      soundEngine.playClick(700, 0.02);
                    }}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono transition-all cursor-pointer ${
                      selectedSpeed === spd
                        ? 'bg-[#1a1a1a] text-white font-bold'
                        : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full Manuscript Reader Text Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold flex items-center gap-1.5">
                <BookOpen size={12} className="text-[#B76E79]" />
                ARCHIVAL MANUSCRIPT & CODEX
              </span>
              <span className="text-[9px] font-mono text-[#1a1a1a]/40 uppercase">
                CLICK PARAGRAPH TO JUMP NARRATION
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {paragraphs.map((p, idx) => {
                const isCurrentPara =
                  isCurrentNarrating && speechState.currentParagraphIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handleParagraphClick(idx, p)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCurrentPara
                        ? 'bg-[#B76E79]/10 border-[#B76E79] shadow-sm'
                        : 'bg-white border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 hover:bg-[#1a1a1a]/[0.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] font-mono text-[#B76E79] font-bold uppercase">
                        PARAGRAPH {String(idx + 1).padStart(2, '0')}
                      </span>
                      {isCurrentPara && (
                        <span className="text-[8px] font-mono text-[#B76E79] font-bold animate-pulse">
                          ● ACTIVE NARRATION
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-light text-[#1a1a1a]/90 leading-relaxed font-sans">
                      {p}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tags & Metadata */}
          {record.tags && record.tags.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-[#1a1a1a]/10 pt-4">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 font-bold">
                TAXONOMY & DESCRIPTORS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {record.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1a1a1a]/[0.04] border border-[#1a1a1a]/10 text-[#1a1a1a]/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-[#1a1a1a]/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#1a1a1a]/50 uppercase">
              <Shield size={12} className="text-[#B76E79]" />
              <span>PERMANENT ENTRY // KINGSHADP ARCHIVES</span>
            </div>

            <div className="flex items-center gap-3">
              {onOpenSealReport && (
                <button
                  onClick={() => {
                    soundEngine.playHarmonicChime(528);
                    onOpenSealReport();
                  }}
                  className="btn-pill text-[10px] font-mono tracking-widest uppercase font-bold bg-[#B76E79]/10 text-[#B76E79] hover:bg-[#B76E79] hover:text-white border border-[#B76E79]/30 flex items-center gap-2 cursor-pointer transition-all"
                  title="Generate sealed report containing this artifact"
                >
                  <Stamp size={12} />
                  <span>SEALED REPORT</span>
                </button>
              )}

              {record.downloadUrl && (
                <a
                  href={record.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill text-[10px] font-mono tracking-widest uppercase font-bold bg-[#1a1a1a] text-white hover:bg-[#B76E79] flex items-center gap-2"
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
                  className="btn-pill text-[10px] font-mono tracking-widest uppercase font-bold bg-[#1a1a1a] text-white hover:bg-[#B76E79] flex items-center gap-2 cursor-pointer"
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
                  className="btn-pill text-[10px] font-mono tracking-widest uppercase font-bold bg-[#1a1a1a] text-white hover:bg-[#B76E79] flex items-center gap-2 cursor-pointer"
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
