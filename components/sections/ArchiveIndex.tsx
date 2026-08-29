'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Disc,
  Eye,
  Package,
  ArrowUpRight,
  Search,
  Shuffle,
  Bookmark,
  Layers,
  Grid,
  Link2,
} from 'lucide-react';
import { archiveRecords, ArchiveRecord } from '../../data/archive';
import { Reveal } from '../motion/Reveal';
import { ArchiveDossierModal } from '../ui/ArchiveDossierModal';
import { soundEngine } from '../../lib/soundEngine';

interface ArchiveIndexProps {
  onPlayTrack?: (trackId: string) => void;
  onOpenViewer?: (assetId: string) => void;
}

export function ArchiveIndex({ onPlayTrack, onOpenViewer }: ArchiveIndexProps) {
  const [viewMode, setViewMode] = useState<'MATRIX' | 'MEMORY'>('MATRIX');
  const [activeType, setActiveType] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [hoveredRecord, setHoveredRecord] = useState<ArchiveRecord | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ArchiveRecord | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('ksp_saved_archive');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [onlySaved, setOnlySaved] = useState(false);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedIds.includes(id)) {
      updated = savedIds.filter((item) => item !== id);
    } else {
      updated = [...savedIds, id];
      soundEngine.playHarmonicChime(528);
    }
    setSavedIds(updated);
    try {
      localStorage.setItem('ksp_saved_archive', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const categories = ['ALL', 'MUSIC', 'VISUAL', 'WRITING', 'PROCESS', 'OBJECT'];

  const filteredRecords = archiveRecords.filter((rec) => {
    const matchesCategory = activeType === 'ALL' || rec.type === activeType;
    const matchesSaved = !onlySaved || savedIds.includes(rec.id);
    const matchesSearch =
      !searchFilter.trim() ||
      rec.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rec.era.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch && matchesSaved;
  });

  const handleRandomDiscovery = () => {
    const randomIndex = Math.floor(Math.random() * archiveRecords.length);
    setSelectedRecord(archiveRecords[randomIndex]);
    soundEngine.playHarmonicChime(432);
  };

  return (
    <section
      id="archive-index"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#f8f7f4] text-[#1a1a1a] select-none border-b border-[#1a1a1a]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1a1a1a]/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block font-semibold">
                CHAPTER 05 / ARCHIVE INDEX
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1a1a] mt-1 font-serif">
                Evidence & <span className="font-editorial italic font-normal text-[#B76E79]">Fragments.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Random Discovery Button */}
              <button
                onClick={handleRandomDiscovery}
                data-cursor="SURPRISE"
                className="px-3.5 py-1.5 rounded-full border border-[#1a1a1a]/15 bg-white text-[9px] font-mono tracking-widest uppercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Shuffle size={11} className="text-[#B76E79]" />
                <span>SURPRISE ME</span>
              </button>

              {/* View Mode Switcher (Matrix Table vs Memory Fragments) */}
              <div className="flex items-center gap-1 bg-[#1a1a1a]/5 p-1 rounded-full border border-[#1a1a1a]/10">
                <button
                  onClick={() => {
                    setViewMode('MATRIX');
                    soundEngine.playClick(600, 0.02);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                    viewMode === 'MATRIX'
                      ? 'bg-[#1a1a1a] text-white font-bold'
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
                  }`}
                >
                  <Grid size={10} />
                  <span>MATRIX</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode('MEMORY');
                    soundEngine.playClick(700, 0.02);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                    viewMode === 'MEMORY'
                      ? 'bg-[#1a1a1a] text-white font-bold'
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
                  }`}
                >
                  <Layers size={10} />
                  <span>MEMORY</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveType(cat);
                  setOnlySaved(false);
                }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase transition-all cursor-pointer ${
                  activeType === cat && !onlySaved
                    ? 'bg-[#1a1a1a] text-white font-semibold shadow-sm'
                    : 'border border-[#1a1a1a]/10 bg-white text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/30'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Saved Items Filter Pill */}
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                onlySaved
                  ? 'bg-[#B76E79] text-white font-bold'
                  : 'border border-[#1a1a1a]/10 bg-white text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
              }`}
            >
              <Bookmark size={11} className={onlySaved ? 'fill-current' : ''} />
              <span>SAVED ({savedIds.length})</span>
            </button>
          </div>

          <div className="relative flex items-center min-w-[220px]">
            <Search size={14} className="absolute left-3 text-[#1a1a1a]/40 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter archive codex..."
              className="w-full bg-white border border-[#1a1a1a]/15 focus:border-[#1a1a1a] rounded-full pl-9 pr-4 py-2 text-xs text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* MATRIX VIEW */}
        {viewMode === 'MATRIX' ? (
          <div className="relative bg-white rounded-2xl border border-[#1a1a1a]/10 p-2 sm:p-4 shadow-sm">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 border-b border-[#1a1a1a]/10">
              <span className="col-span-1">YEAR</span>
              <span className="col-span-2">TYPE</span>
              <span className="col-span-5">TITLE / EVIDENCE</span>
              <span className="col-span-2">ERA</span>
              <span className="col-span-2 text-right">STATUS</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#1a1a1a]/5">
              {filteredRecords.map((rec) => {
                const isSaved = savedIds.includes(rec.id);
                return (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecord(rec)}
                    onMouseEnter={() => setHoveredRecord(rec)}
                    onMouseLeave={() => setHoveredRecord(null)}
                    data-cursor="DOSSIER"
                    className="archive-item group py-4 px-4 hover:bg-[#1a1a1a]/[0.02] transition-colors cursor-pointer flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center rounded-xl"
                  >
                    <div className="md:col-span-1 text-xs font-mono text-[#1a1a1a]/60 group-hover:text-[#B76E79] transition-colors font-medium">
                      {rec.year}
                    </div>

                    <div className="md:col-span-2 text-[10px] font-mono tracking-wider uppercase text-[#1a1a1a]/50 font-medium">
                      {rec.type}
                    </div>

                    <div className="md:col-span-5 flex flex-col">
                      <span className="text-sm sm:text-base font-serif text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                        {rec.title}
                      </span>
                      <span className="text-xs text-[#1a1a1a]/50 line-clamp-1 font-light">
                        {rec.description}
                      </span>
                    </div>

                    <div className="md:col-span-2 text-[10px] font-mono text-[#1a1a1a]/50 tracking-wider">
                      {rec.era}
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2.5 pt-2 md:pt-0">
                      <button
                        onClick={(e) => toggleSave(rec.id, e)}
                        title={isSaved ? 'Remove from saved' : 'Save record'}
                        className={`p-1.5 rounded-full hover:bg-black/5 transition-colors ${
                          isSaved ? 'text-[#B76E79]' : 'text-[#1a1a1a]/30 hover:text-[#1a1a1a]'
                        }`}
                      >
                        <Bookmark size={13} className={isSaved ? 'fill-current' : ''} />
                      </button>

                      <span
                        className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${
                          rec.status === 'CURRENT'
                            ? 'border-emerald-500/30 bg-emerald-50 text-emerald-700 font-semibold'
                            : 'border-[#1a1a1a]/10 bg-[#1a1a1a]/[0.02] text-[#1a1a1a]/50'
                        }`}
                      >
                        {rec.status}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="text-[#1a1a1a]/30 group-hover:text-[#B76E79] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Hover Thumbnail */}
            <AnimatePresence>
              {hoveredRecord && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="hidden xl:block fixed pointer-events-none z-40 right-16 bottom-24 w-64 aspect-square rounded-xl overflow-hidden border border-[#1a1a1a]/20 shadow-2xl bg-white"
                >
                  <Image
                    src={hoveredRecord.thumbnail}
                    alt={hoveredRecord.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[8px] font-mono tracking-widest uppercase text-[#B76E79] font-bold">
                      {hoveredRecord.type}
                    </span>
                    <span className="text-[11px] font-light text-white truncate">
                      {hoveredRecord.title}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((rec, i) => (
              <motion.div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-cursor="FRAGMENT"
                className="group relative rounded-2xl border border-[#1a1a1a]/10 bg-white p-5 hover:border-[#1a1a1a]/30 shadow-sm transition-all cursor-pointer flex flex-col justify-between gap-4 overflow-hidden"
              >
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#1a1a1a]/50 uppercase">
                  <span>{rec.year} {'//'} {rec.type}</span>
                  <button
                    onClick={(e) => toggleSave(rec.id, e)}
                    className={savedIds.includes(rec.id) ? 'text-[#B76E79]' : 'text-[#1a1a1a]/30 hover:text-[#1a1a1a]'}
                  >
                    <Bookmark size={13} className={savedIds.includes(rec.id) ? 'fill-current' : ''} />
                  </button>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/5 border border-[#1a1a1a]/10">
                  <Image
                    src={rec.thumbnail}
                    alt={rec.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-serif text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-xs font-light text-[#1a1a1a]/60 line-clamp-2">
                    {rec.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]/10 text-[9px] font-mono tracking-wider text-[#1a1a1a]/50">
                  <span>ERA: {rec.era}</span>
                  <span className="flex items-center gap-1 group-hover:text-[#B76E79] transition-colors font-semibold">
                    OPEN <ArrowUpRight size={10} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dossier Download Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl border border-[#1a1a1a]/10 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-[#B76E79]" />
            <div>
              <h4 className="text-xs sm:text-sm font-medium tracking-wide uppercase text-[#1a1a1a]">
                EXECUTIVE PROFILE & PORTFOLIO DOSSIER (PDF)
              </h4>
              <p className="text-[10px] text-[#1a1a1a]/50 font-mono tracking-wider">
                KINGSHADP PROFESSIONAL PROFILE AND HISTORIC CURATION
              </p>
            </div>
          </div>

          <a
            href="/KingShadP_MLA_Professional_Profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="DOWNLOAD"
            className="btn-pill text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all flex items-center gap-2 border border-[#1a1a1a]/20"
          >
            <span>ACCESS DOCUMENT</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>


      {/* Archival Dossier Modal */}
      <ArchiveDossierModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onPlayTrack={onPlayTrack}
        onOpenViewer={onOpenViewer}
      />
    </section>
  );
}
