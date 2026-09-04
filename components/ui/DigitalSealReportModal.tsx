'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Shield,
  Stamp,
  Printer,
  Copy,
  Check,
  Download,
  Sparkles,
  Sliders,
  Eye,
  EyeOff,
  RotateCw,
  Layers,
  FileText,
  FileCheck,
  Bookmark,
  Share2,
  Trash2,
  Plus,
  Compass,
  Music,
  Calendar,
} from 'lucide-react';
import {
  DigitalSeal,
  DigitalSealConfig,
  SealEmblem,
  SealFinish,
} from './DigitalSeal';
import { archiveRecords, ArchiveRecord } from '../../data/archive';
import { soundEngine } from '../../lib/soundEngine';

interface DigitalSealReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
}

const DEFAULT_SEAL_CONFIG: DigitalSealConfig = {
  emblem: 'GIRAGON_CREST',
  finish: 'ROSE_GOLD',
  curatorName: 'KINGSHADP ARCHIVE FELLOW',
  clearanceLevel: 'LEVEL 5 SANCTUM CLASSIFIED',
  referenceCode: 'KSP-DOC-2026-X9',
  issueDate: 'AUGUST 2026',
  rotation: -8,
  showWatermarkUnderlay: true,
  watermarkOpacity: 0.12,
  embossed: true,
  watermarkStyle: 'FULL_SUITE',
};

const EMBLEM_OPTIONS: { id: SealEmblem; label: string; desc: string }[] = [
  {
    id: 'GIRAGON_CREST',
    label: 'Giragon Monolith',
    desc: 'Imperial sovereign dragon & giraffe hybrid crest',
  },
  {
    id: 'SOLFEGGIO_432HZ',
    label: '432 Hz Solfeggio',
    desc: 'Pythagorean sacred harmonic resonance geometry',
  },
  {
    id: 'SANCTUM_CORONET',
    label: 'Sanctum Coronet',
    desc: 'Classical regalia coronet with Latinate motto',
  },
  {
    id: 'ARCHIVAL_WAX',
    label: 'Archival Codex Wax',
    desc: 'Historic calligraphic insignia with wax seal rim',
  },
  {
    id: 'CRYPTIC_MONOLITH',
    label: 'Cryptic Verification',
    desc: 'Modernist barcode stamp with cryptographic hash',
  },
];

const FINISH_OPTIONS: { id: SealFinish; label: string; color: string }[] = [
  { id: 'ROSE_GOLD', label: 'Rose Gold', color: '#B76E79' },
  { id: 'PLATINUM', label: 'Sanctum Platinum', color: '#64748B' },
  { id: 'OBSIDIAN', label: 'Imperial Obsidian', color: '#18181B' },
  { id: 'WAX_CRIMSON', label: 'Wax Crimson', color: '#991B1B' },
  { id: 'EMERALD', label: 'Archival Emerald', color: '#065F46' },
];

const CLEARANCE_PRESETS = [
  'LEVEL 5 SANCTUM CLASSIFIED',
  'CERTIFIED RESEARCH DOSSIER',
  'OFFICIAL MASTER CITATION',
  'SCHOLARLY CURATOR DISPATCH',
  'PUBLIC AUDIT CODEX',
];

export function DigitalSealReportModal({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
}: DigitalSealReportModalProps) {
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'CUSTOMIZE' | 'ITEMS'>('PREVIEW');
  const [copied, setCopied] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Load custom seal configuration from localStorage or default
  const [sealConfig, setSealConfig] = useState<DigitalSealConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_SEAL_CONFIG;
    try {
      const stored = localStorage.getItem('ksp_digital_seal_config');
      return stored ? { ...DEFAULT_SEAL_CONFIG, ...JSON.parse(stored) } : DEFAULT_SEAL_CONFIG;
    } catch {
      return DEFAULT_SEAL_CONFIG;
    }
  });

  // Selected records for the report
  const [includedIds, setIncludedIds] = useState<string[]>(() => {
    if (savedIds.length > 0) return savedIds;
    return archiveRecords.slice(0, 4).map((r) => r.id);
  });

  // Save changes to localStorage
  const updateSealConfig = (updates: Partial<DigitalSealConfig>) => {
    const updated = { ...sealConfig, ...updates };
    setSealConfig(updated);
    try {
      localStorage.setItem('ksp_digital_seal_config', JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  if (!isOpen) return null;

  const currentRecords = archiveRecords.filter((r) => includedIds.includes(r.id));

  const toggleIncludeRecord = (id: string) => {
    soundEngine.playClick(600, 0.02);
    if (includedIds.includes(id)) {
      if (includedIds.length <= 1) return; // keep at least 1
      setIncludedIds(includedIds.filter((item) => item !== id));
    } else {
      setIncludedIds([...includedIds, id]);
    }
  };

  const handlePrint = () => {
    soundEngine.playHarmonicChime(528);
    setPrintLoading(true);
    setTimeout(() => {
      window.print();
      setPrintLoading(false);
    }, 250);
  };

  const handleCopyMarkdown = () => {
    soundEngine.playClick(800, 0.03);
    const mdHeader = `# KINGSHADP ARCHIVAL DOSSIER & VERIFIED FINDINGS\n`;
    const mdMeta = `**Reference Code:** ${sealConfig.referenceCode} | **Clearance:** ${sealConfig.clearanceLevel}\n**Curated by:** ${sealConfig.curatorName} | **Date:** ${sealConfig.issueDate}\n**Seal Classification:** ${sealConfig.emblem} [${sealConfig.finish}]\n\n---\n\n`;
    const mdBody = currentRecords
      .map(
        (r, i) =>
          `### ${i + 1}. ${r.title} (${r.year})\n- **Type:** ${r.type} | **Era:** ${r.era}\n- **Classification:** ${r.status}\n- **Metadata:** ${r.meta}\n- **Summary:** ${r.description}\n${
            r.manuscriptText ? `\n> *Manuscript Extract:* ${r.manuscriptText}\n` : ''
          }\n`
      )
      .join('\n');
    const mdFooter = `\n---\n*Digitally Authenticated by KingShadP Archive System — 432 Hz Pythagorean Verification*`;

    navigator.clipboard.writeText(mdHeader + mdMeta + mdBody + mdFooter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleResetDefaults = () => {
    soundEngine.playClick(400, 0.03);
    setSealConfig(DEFAULT_SEAL_CONFIG);
    try {
      localStorage.removeItem('ksp_digital_seal_config');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] bg-[#f8f7f4] border border-[#1a1a1a]/15 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-[#1a1a1a]">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-white border-b border-[#1a1a1a]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#B76E79]/10 text-[#B76E79]">
              <Stamp size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                  ARCHIVAL TOOLKIT
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a1a1a]/5 text-[#1a1a1a]/70 font-mono">
                  DIGITAL SEAL & WATERMARK
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif text-[#1a1a1a] leading-tight">
                Dossier Findings Report Generator
              </h2>
            </div>
          </div>

          {/* Navigation View Toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-[#1a1a1a]/5 rounded-lg border border-[#1a1a1a]/10">
              <button
                onClick={() => {
                  soundEngine.playClick(700, 0.02);
                  setActiveTab('PREVIEW');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === 'PREVIEW'
                    ? 'bg-white text-[#1a1a1a] shadow-sm font-semibold'
                    : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                }`}
              >
                <FileCheck size={14} />
                <span>REPORT PREVIEW</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick(700, 0.02);
                  setActiveTab('CUSTOMIZE');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === 'CUSTOMIZE'
                    ? 'bg-white text-[#1a1a1a] shadow-sm font-semibold'
                    : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                }`}
              >
                <Sliders size={14} />
                <span>SEAL STUDIO</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick(700, 0.02);
                  setActiveTab('ITEMS');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === 'ITEMS'
                    ? 'bg-white text-[#1a1a1a] shadow-sm font-semibold'
                    : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                }`}
              >
                <Bookmark size={14} />
                <span>FINDINGS ({currentRecords.length})</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                soundEngine.playClick(400, 0.03);
                onClose();
              }}
              className="p-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 rounded-full transition-colors ml-2"
              title="Close Generator"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col md:flex-row">
          
          {/* Quick Controls Sidebar in PREVIEW mode */}
          {activeTab === 'PREVIEW' && (
            <div className="w-full md:w-80 p-6 bg-white border-r border-[#1a1a1a]/10 flex flex-col gap-6 shrink-0 print:hidden overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a]/50 mb-3">
                  WATERMARK CONTROLS
                </h4>

                {/* Main Watermark Toggle */}
                <div className="p-4 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1a1a1a]">
                      Enable Digital Seal Watermark
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playClick(sealConfig.showWatermarkUnderlay ? 450 : 750, 0.03);
                        updateSealConfig({
                          showWatermarkUnderlay: !sealConfig.showWatermarkUnderlay,
                        });
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        sealConfig.showWatermarkUnderlay ? 'bg-[#B76E79]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          sealConfig.showWatermarkUnderlay ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#1a1a1a]/60 font-sans leading-relaxed">
                    Toggles the background security watermark and official authenticity stamp on the printed or exported report.
                  </p>
                </div>
              </div>

              {/* Watermark Placement Style */}
              {sealConfig.showWatermarkUnderlay && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a]/60">
                    Watermark Placement Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'FULL_SUITE', label: 'Full Suite', desc: 'Central + Stamp' },
                      { id: 'CENTER', label: 'Central Underlay', desc: 'Large Center' },
                      { id: 'DIAGONAL_REPEAT', label: 'Tiled Pattern', desc: 'Repeated Angle' },
                      { id: 'CORNER_STAMP', label: 'Header Stamp', desc: 'Top Certificate' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          soundEngine.playClick(650, 0.02);
                          updateSealConfig({
                            watermarkStyle: mode.id as DigitalSealConfig['watermarkStyle'],
                          });
                        }}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          sealConfig.watermarkStyle === mode.id
                            ? 'border-[#B76E79] bg-[#B76E79]/5 text-[#1a1a1a] font-medium'
                            : 'border-[#1a1a1a]/10 bg-white text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5'
                        }`}
                      >
                        <div className="text-xs">{mode.label}</div>
                        <div className="text-[9px] text-[#1a1a1a]/50">{mode.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Watermark Opacity Slider */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between text-[11px] font-mono text-[#1a1a1a]/70">
                      <span>Watermark Opacity</span>
                      <span>{Math.round((sealConfig.watermarkOpacity || 0.12) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.04"
                      max="0.35"
                      step="0.01"
                      value={sealConfig.watermarkOpacity || 0.12}
                      onChange={(e) =>
                        updateSealConfig({ watermarkOpacity: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#B76E79] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Quick Seal Customizer Trigger */}
              <div className="p-4 rounded-xl border border-[#1a1a1a]/10 bg-[#f8f7f4] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="scale-75 origin-center">
                    <DigitalSeal config={sealConfig} size="sm" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#1a1a1a]">
                      Active Seal Profile
                    </h5>
                    <p className="text-[10px] font-mono text-[#1a1a1a]/60">
                      {sealConfig.emblem} · {sealConfig.finish}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    soundEngine.playClick(700, 0.02);
                    setActiveTab('CUSTOMIZE');
                  }}
                  className="w-full py-2 px-3 text-xs font-mono uppercase tracking-wider text-[#1a1a1a] bg-white hover:bg-[#1a1a1a] hover:text-white rounded-lg border border-[#1a1a1a]/15 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sliders size={13} />
                  <span>CUSTOMIZE EMBLEM & TEXT</span>
                </button>
              </div>

              {/* Report Actions */}
              <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-[#1a1a1a]/10">
                <button
                  onClick={handlePrint}
                  disabled={printLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1a] text-white hover:bg-[#B76E79] transition-colors text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
                >
                  <Printer size={15} />
                  <span>PRINT / EXPORT REPORT (PDF)</span>
                </button>

                <button
                  onClick={handleCopyMarkdown}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-colors text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-green-600" />
                      <span className="text-green-600 font-bold">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span>COPY MARKDOWN SUMMARY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: REPORT PREVIEW CANVAS */}
          {activeTab === 'PREVIEW' && (
            <div className="flex-1 p-4 sm:p-8 overflow-y-auto bg-[#e5e4e0] flex justify-center">
              <div
                ref={reportRef}
                id="printable-archive-report"
                className="relative w-full max-w-3xl min-h-[850px] bg-[#ffffff] p-8 sm:p-12 border border-[#1a1a1a]/15 shadow-xl rounded-none flex flex-col justify-between overflow-hidden text-[#1a1a1a] print:shadow-none print:border-none print:p-6 print:m-0"
              >
                {/* WATERMARK UNDERLAY LAYER */}
                <AnimatePresence>
                  {sealConfig.showWatermarkUnderlay && (
                    <motion.div
                      key={`watermark-${sealConfig.emblem}-${sealConfig.finish}-${sealConfig.watermarkStyle}`}
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{
                        opacity: sealConfig.watermarkOpacity || 0.12,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
                    >
                      {sealConfig.watermarkStyle === 'DIAGONAL_REPEAT' ? (
                        <motion.div
                          initial={{ opacity: 0, rotate: -35, scale: 0.9 }}
                          animate={{ opacity: 1, rotate: -25, scale: 1.25 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.55 }}
                          className="absolute inset-0 flex flex-wrap gap-12 items-center justify-center select-none"
                        >
                          {Array.from({ length: 8 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="text-center font-mono font-black text-2xl tracking-[0.4em] text-[#1a1a1a] border-2 border-dashed border-[#1a1a1a]/40 p-4 rounded-lg"
                            >
                              <div>KINGSHADP SANCTUM ARCHIVE</div>
                              <div className="text-sm tracking-[0.2em] font-normal">
                                VERIFIED FINDINGS // {sealConfig.referenceCode}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.35 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          className="transform sm:scale-150"
                        >
                          <DigitalSeal
                            config={sealConfig}
                            size="watermark"
                            embossed={false}
                            animateEntrance={false}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* REPORT CONTENT (z-index 10 to sit above watermark) */}
                <div className="relative z-10 flex flex-col gap-6">
                  
                  {/* Official Header Strip */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#1a1a1a] pb-6">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#B76E79] font-bold">
                        <span>KINGSHADP DISPATCH</span>
                        <span>·</span>
                        <span>DOCUMENT SERIES 01</span>
                      </div>
                      <h1 className="text-2xl sm:text-4xl font-serif tracking-tight font-normal text-[#1a1a1a] mt-1">
                        Curated Archival Findings Report
                      </h1>
                      <div className="text-xs font-mono text-[#1a1a1a]/60 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        <span>REF: {sealConfig.referenceCode}</span>
                        <span>·</span>
                        <span>ISSUED: {sealConfig.issueDate}</span>
                        <span>·</span>
                        <span>CLEARANCE: {sealConfig.clearanceLevel}</span>
                      </div>
                    </div>

                    {/* Header Stamp Seal if enabled */}
                    <AnimatePresence>
                      {sealConfig.showWatermarkUnderlay &&
                        (sealConfig.watermarkStyle === 'CORNER_STAMP' ||
                          sealConfig.watermarkStyle === 'FULL_SUITE') && (
                          <motion.div
                            key="header-stamp"
                            initial={{ opacity: 0, scale: 0.65, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: sealConfig.rotation || 0 }}
                            exit={{ opacity: 0, scale: 0.7, rotate: -20, transition: { duration: 0.25 } }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="shrink-0 self-end sm:self-auto"
                          >
                            <DigitalSeal config={sealConfig} size="sm" animateEntrance={false} />
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>

                  {/* Executive Brief */}
                  <div className="p-4 rounded-lg bg-[#1a1a1a]/[0.03] border border-[#1a1a1a]/10 text-xs text-[#1a1a1a]/80 leading-relaxed">
                    <span className="font-mono font-bold uppercase text-[10px] tracking-wider text-[#B76E79] block mb-1">
                      EXECUTIVE DOSSIER SUMMARY
                    </span>
                    This synthesized report compiles verified records and artifacts from the KingShadP vault. All musical components adhere to 432 Hz natural resonance and rigorous acoustic discipline. Authenticated under curator signature <strong>{sealConfig.curatorName}</strong>.
                  </div>

                  {/* Findings Breakdown Matrix */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-[#1a1a1a]/15 pb-2 text-[11px] font-mono tracking-wider text-[#1a1a1a]/60 uppercase">
                      <span>INCLUDED ARTIFACTS ({currentRecords.length})</span>
                      <span>TAXONOMY / STATUS</span>
                    </div>

                    <div className="space-y-4">
                      {currentRecords.map((rec, idx) => (
                        <div
                          key={rec.id}
                          className="p-4 rounded-lg border border-[#1a1a1a]/10 bg-white/70 backdrop-blur-xs flex flex-col gap-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-[#B76E79]">
                                #{String(idx + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-base font-serif text-[#1a1a1a] font-medium">
                                {rec.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded bg-[#1a1a1a]/5 text-[#1a1a1a]/80">
                                {rec.type}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#B76E79]/10 text-[#B76E79] font-semibold">
                                {rec.era}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#1a1a1a]/70 font-sans leading-relaxed">
                            {rec.description}
                          </p>

                          {rec.manuscriptText && (
                            <div className="text-[11px] font-serif italic text-[#1a1a1a]/80 bg-[#1a1a1a]/[0.02] p-2.5 rounded border-l-2 border-[#B76E79]">
                              &ldquo;{rec.manuscriptText}&rdquo;
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1a1a1a]/5 text-[10px] font-mono text-[#1a1a1a]/50">
                            <span>META: {rec.meta}</span>
                            <span>STATUS: {rec.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Official Sign-off & Certification Footer */}
                <div className="relative z-10 pt-8 mt-8 border-t-2 border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col gap-1 text-center sm:text-left">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1a1a]/60">
                      CERTIFIED & SEALED BY
                    </div>
                    <div className="font-serif italic text-lg font-bold text-[#1a1a1a]">
                      {sealConfig.curatorName}
                    </div>
                    <div className="text-[9px] font-mono text-[#1a1a1a]/40 tracking-wider">
                      SANCTUM HISTORIC REGISTRY · 432 HZ PYTHAGOREAN CODE
                    </div>
                  </div>

                  {/* Bottom Verification Seal */}
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-[9px] font-mono tracking-widest text-[#B76E79] uppercase font-bold">
                        AUTHENTICATED RECORD
                      </div>
                      <div className="text-[9px] font-mono text-[#1a1a1a]/50">
                        HASH: 0x432F9A8E2
                      </div>
                    </div>
                    <DigitalSeal config={sealConfig} size="md" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEAL STUDIO & CUSTOMIZATION */}
          {activeTab === 'CUSTOMIZE' && (
            <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-white flex flex-col lg:flex-row gap-8">
              
              {/* Left Column: Live 3D Interactive Seal Showcase */}
              <div className="w-full lg:w-96 flex flex-col items-center justify-center p-8 bg-[#f8f7f4] rounded-2xl border border-[#1a1a1a]/10 relative">
                <div className="absolute top-4 left-4 text-[10px] font-mono text-[#1a1a1a]/50 uppercase tracking-widest">
                  LIVE SEAL RENDERING
                </div>

                <div className="my-8 flex items-center justify-center">
                  <DigitalSeal config={sealConfig} size="xl" />
                </div>

                <div className="w-full flex flex-col gap-2 mt-4 text-center">
                  <span className="text-xs font-serif font-bold text-[#1a1a1a]">
                    {sealConfig.curatorName}
                  </span>
                  <span className="text-[10px] font-mono text-[#B76E79]">
                    {sealConfig.clearanceLevel}
                  </span>
                  <span className="text-[9px] font-mono text-[#1a1a1a]/40">
                    {sealConfig.referenceCode} · {sealConfig.issueDate}
                  </span>
                </div>

                {/* Rotation Slider */}
                <div className="w-full mt-6 pt-4 border-t border-[#1a1a1a]/10 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-[#1a1a1a]/70">
                    <span>Seal Rotation Angle</span>
                    <span>{sealConfig.rotation || 0}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    step="1"
                    value={sealConfig.rotation || 0}
                    onChange={(e) =>
                      updateSealConfig({ rotation: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-[#B76E79] cursor-pointer"
                  />
                </div>
              </div>

              {/* Right Column: Customization Fields */}
              <div className="flex-1 flex flex-col gap-6">
                
                {/* 1. Emblem Selector */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a]/50 mb-3">
                    1. SELECT SEAL EMBLEM & ICONOGRAPHY
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EMBLEM_OPTIONS.map((emb) => (
                      <button
                        key={emb.id}
                        onClick={() => {
                          soundEngine.playHarmonicChime(528);
                          updateSealConfig({ emblem: emb.id });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          sealConfig.emblem === emb.id
                            ? 'border-[#B76E79] bg-[#B76E79]/5 shadow-sm'
                            : 'border-[#1a1a1a]/10 bg-[#f8f7f4] hover:bg-[#1a1a1a]/5'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            sealConfig.emblem === emb.id
                              ? 'bg-[#B76E79] text-white'
                              : 'bg-[#1a1a1a]/5 text-[#1a1a1a]'
                          }`}
                        >
                          <Shield size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#1a1a1a]">
                            {emb.label}
                          </div>
                          <div className="text-[10px] text-[#1a1a1a]/60 font-sans mt-0.5">
                            {emb.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Color Finish Selector */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a]/50 mb-3">
                    2. METALLIC & WAX FINISH TONE
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {FINISH_OPTIONS.map((fin) => (
                      <button
                        key={fin.id}
                        onClick={() => {
                          soundEngine.playClick(650, 0.02);
                          updateSealConfig({ finish: fin.id });
                        }}
                        className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                          sealConfig.finish === fin.id
                            ? 'border-[#B76E79] bg-white shadow-sm font-semibold'
                            : 'border-[#1a1a1a]/10 bg-[#f8f7f4] text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: fin.color }}
                        />
                        <span>{fin.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Inscription & Nomenclature */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a]/50 mb-3">
                    3. PERSONALIZED INSCRIPTION & NOMENCLATURE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Curator Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-[#1a1a1a]/70">
                        Curator / User Name
                      </label>
                      <input
                        type="text"
                        value={sealConfig.curatorName}
                        onChange={(e) => updateSealConfig({ curatorName: e.target.value })}
                        placeholder="e.g. ALEX MORGAN / ARCHIVIST"
                        className="px-3.5 py-2.5 rounded-xl border border-[#1a1a1a]/20 bg-[#f8f7f4] text-xs font-mono focus:outline-none focus:border-[#B76E79]"
                      />
                    </div>

                    {/* Reference Code */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-[#1a1a1a]/70">
                        Reference / Serial Code
                      </label>
                      <input
                        type="text"
                        value={sealConfig.referenceCode}
                        onChange={(e) => updateSealConfig({ referenceCode: e.target.value })}
                        placeholder="e.g. KSP-DOC-2026-X9"
                        className="px-3.5 py-2.5 rounded-xl border border-[#1a1a1a]/20 bg-[#f8f7f4] text-xs font-mono focus:outline-none focus:border-[#B76E79]"
                      />
                    </div>

                    {/* Clearance Level Presets */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[11px] font-mono text-[#1a1a1a]/70">
                        Classification & Clearance Inscription
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {CLEARANCE_PRESETS.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => {
                              soundEngine.playClick(600, 0.02);
                              updateSealConfig({ clearanceLevel: preset });
                            }}
                            className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-all ${
                              sealConfig.clearanceLevel === preset
                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                : 'bg-[#f8f7f4] text-[#1a1a1a]/70 border-[#1a1a1a]/10 hover:bg-[#1a1a1a]/10'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={sealConfig.clearanceLevel}
                        onChange={(e) => updateSealConfig({ clearanceLevel: e.target.value })}
                        className="px-3.5 py-2.5 rounded-xl border border-[#1a1a1a]/20 bg-[#f8f7f4] text-xs font-mono focus:outline-none focus:border-[#B76E79]"
                      />
                    </div>

                    {/* Issue Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-[#1a1a1a]/70">
                        Issue Date / Roman Era
                      </label>
                      <input
                        type="text"
                        value={sealConfig.issueDate}
                        onChange={(e) => updateSealConfig({ issueDate: e.target.value })}
                        placeholder="e.g. AUGUST 2026 // MMXXVI"
                        className="px-3.5 py-2.5 rounded-xl border border-[#1a1a1a]/20 bg-[#f8f7f4] text-xs font-mono focus:outline-none focus:border-[#B76E79]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex items-center justify-between pt-6 border-t border-[#1a1a1a]/10 mt-auto">
                  <button
                    onClick={handleResetDefaults}
                    className="text-xs font-mono text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
                  >
                    Reset to Default Seal
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playHarmonicChime(432);
                      setActiveTab('PREVIEW');
                    }}
                    className="py-2.5 px-6 rounded-xl bg-[#1a1a1a] text-white hover:bg-[#B76E79] transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2"
                  >
                    <span>VIEW SEALED REPORT</span>
                    <FileCheck size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE INCLUDED FINDINGS */}
          {activeTab === 'ITEMS' && (
            <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-white flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a]/10 pb-4">
                <div>
                  <h3 className="text-lg font-serif text-[#1a1a1a]">
                    Select Findings for the Sealed Report
                  </h3>
                  <p className="text-xs text-[#1a1a1a]/60 font-sans">
                    Toggle individual archival entries to include or exclude from your generated dossier.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick(700, 0.02);
                      setIncludedIds(archiveRecords.map((r) => r.id));
                    }}
                    className="px-3 py-1.5 rounded-lg border border-[#1a1a1a]/15 text-xs font-mono hover:bg-[#1a1a1a]/5 transition-all"
                  >
                    INCLUDE ALL ({archiveRecords.length})
                  </button>

                  {savedIds.length > 0 && (
                    <button
                      onClick={() => {
                        soundEngine.playClick(700, 0.02);
                        setIncludedIds(savedIds);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#B76E79]/10 text-[#B76E79] border border-[#B76E79]/30 text-xs font-mono font-medium hover:bg-[#B76E79]/20 transition-all"
                    >
                      SAVED BOOKMARKS ONLY ({savedIds.length})
                    </button>
                  )}
                </div>
              </div>

              {/* Records Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {archiveRecords.map((rec) => {
                  const isIncluded = includedIds.includes(rec.id);
                  const isSaved = savedIds.includes(rec.id);

                  return (
                    <div
                      key={rec.id}
                      onClick={() => toggleIncludeRecord(rec.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isIncluded
                          ? 'border-[#B76E79] bg-[#B76E79]/5 shadow-sm'
                          : 'border-[#1a1a1a]/10 bg-[#f8f7f4] opacity-60 hover:opacity-90'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center text-xs font-mono ${
                              isIncluded
                                ? 'bg-[#B76E79] text-white'
                                : 'bg-[#1a1a1a]/10 text-[#1a1a1a]/50'
                            }`}
                          >
                            {isIncluded ? '✓' : ''}
                          </span>
                          <span className="text-[10px] font-mono text-[#1a1a1a]/50">
                            {rec.era}
                          </span>
                        </div>
                        {isSaved && (
                          <span className="text-[9px] font-mono text-[#B76E79] bg-[#B76E79]/10 px-1.5 py-0.5 rounded">
                            BOOKMARKED
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-serif text-[#1a1a1a] font-medium line-clamp-1">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-[#1a1a1a]/60 line-clamp-2 mt-1">
                          {rec.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]/10 text-[9px] font-mono text-[#1a1a1a]/50">
                        <span>{rec.type}</span>
                        <span>{rec.year}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Done Button */}
              <div className="flex justify-end pt-4 border-t border-[#1a1a1a]/10 mt-auto">
                <button
                  onClick={() => {
                    soundEngine.playHarmonicChime(432);
                    setActiveTab('PREVIEW');
                  }}
                  className="py-2.5 px-6 rounded-xl bg-[#1a1a1a] text-white hover:bg-[#B76E79] transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2"
                >
                  <span>RETURN TO PREVIEW</span>
                  <FileCheck size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
