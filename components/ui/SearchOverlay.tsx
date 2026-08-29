'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Disc, Image as ImageIcon, FileText, Package, ArrowUpRight } from 'lucide-react';
import { releases } from '../../data/releases';
import { visualAssets } from '../../data/visuals';
import { archiveRecords } from '../../data/archive';
import { products } from '../../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (assetId: string) => void;
  onPlayTrack?: (trackId: string) => void;
  onSelectProduct?: (productId: string) => void;
  onScrollTo?: (id: string) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  onSelectMedia,
  onPlayTrack,
  onSelectProduct,
  onScrollTo,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'music' | 'visuals' | 'archive' | 'objects'>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allItems = [
    // Music
    ...releases.flatMap((r) =>
      r.tracks.map((t) => ({
        id: t.id,
        category: 'music' as const,
        type: 'Track // Music',
        title: t.title,
        subtitle: `${r.artist} — ${t.duration} (${t.tuning})`,
        meta: t.notes || 'Original Composition',
        action: () => {
          onPlayTrack?.(t.id);
          onClose();
        },
      }))
    ),
    // Visuals
    ...visualAssets.map((v) => ({
      id: v.id,
      category: 'visuals' as const,
      type: 'Visual // Artwork',
      title: v.title,
      subtitle: `${v.era} — ${v.medium}`,
      meta: v.notes,
      action: () => {
        onSelectMedia?.(v.id);
        onClose();
      },
    })),
    // Archive
    ...archiveRecords.map((a) => ({
      id: a.id,
      category: 'archive' as const,
      type: `${a.type} // Archive`,
      title: a.title,
      subtitle: `${a.year} — ${a.era} [${a.status}]`,
      meta: a.description,
      action: () => {
        if (a.downloadUrl) {
          window.open(a.downloadUrl, '_blank');
        } else {
          onScrollTo?.('archive-index');
        }
        onClose();
      },
    })),
    // Products / Objects
    ...products.map((p) => ({
      id: p.id,
      category: 'objects' as const,
      type: 'Physical Object // Artifact',
      title: p.name,
      subtitle: `${p.category} — ${p.price}`,
      meta: p.description,
      action: () => {
        onSelectProduct?.(p.id);
        onClose();
      },
    })),
  ];

  const filtered = allItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      !query.trim() ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#f8f7f4]/98 backdrop-blur-2xl text-[#1a1a1a] p-6 sm:p-12 overflow-y-auto">
      {/* Top Controls */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between border-b border-[#1a1a1a]/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B76E79] font-bold">
            SEARCH INDEX
          </span>
          <span className="text-[9px] font-mono text-[#1a1a1a]/40 tracking-wider">
            [ESC TO CLOSE]
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close search overlay"
          className="w-9 h-9 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Input Stage */}
      <div className="max-w-4xl w-full mx-auto mt-8 flex flex-col gap-6">
        <div className="relative flex items-center">
          <Search size={22} className="absolute left-0 text-[#1a1a1a]/40 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search KingShadP archive..."
            className="w-full bg-transparent border-b border-[#1a1a1a]/20 focus:border-[#1a1a1a] pl-10 pr-4 py-4 text-2xl sm:text-4xl font-serif text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(['all', 'music', 'visuals', 'archive', 'objects'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1a1a1a] text-white font-semibold shadow-md'
                  : 'border border-[#1a1a1a]/15 bg-white text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="mt-6 flex flex-col divide-y divide-[#1a1a1a]/10">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={item.action}
                className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/60 px-3 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 rounded-lg border border-[#1a1a1a]/10 bg-white text-[#B76E79] shrink-0 mt-0.5 sm:mt-0 shadow-sm">
                    {item.category === 'music' && <Disc size={16} />}
                    {item.category === 'visuals' && <ImageIcon size={16} />}
                    {item.category === 'archive' && <FileText size={16} />}
                    {item.category === 'objects' && <Package size={16} />}
                  </div>

                  <div>
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50 block">
                      {item.type}
                    </span>
                    <h4 className="text-base sm:text-lg font-serif text-[#1a1a1a] group-hover:text-[#B76E79] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#1a1a1a]/60 line-clamp-1 mt-0.5">
                      {item.subtitle} — {item.meta}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-auto flex items-center gap-1 text-[10px] font-mono tracking-[0.2em] uppercase text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors">
                  <span>ENTER</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-xs font-mono tracking-[0.2em] uppercase text-[#1a1a1a]/40">
              NO EVIDENCE LOCATED FOR &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
