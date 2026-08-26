'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'visuals' | 'vision' | 'archive';
}

const ARCHIVE_ITEMS = [
  {
    title: 'Giragon Sculpture (Sanctum Edition)',
    category: 'Visual Monolith',
    src: '/girgonglory.png',
    desc: 'The iconic hybrid signature of KingShadP, fusing serpentine elegance, giraffe silhouette, and dragon wing architecture.',
  },
  {
    title: 'Behold the Twisted Beast',
    category: 'Original Music & Key Art',
    src: '/twisted-beast-cover.png',
    desc: 'Flagship composition visual identity, rendered with dark cinematic atmosphere and deep crimson undertones.',
  },
  {
    title: 'KingShadP Visual Identity Key',
    category: 'Digital Identity',
    src: '/background ksp.png',
    desc: 'Primary atmospheric environment keyframe detailing architectural lighting and platinum accents.',
  },
  {
    title: 'Sanctum 3D World Keyframe I',
    category: 'Worldbuilding',
    src: '/hf_20260807_160838_54049bc3-26a4-4b97-9c76-4259cb8d00aa.png',
    desc: 'Atmospheric volumetric lighting studies exploring the convergence of sound, geometry, and identity.',
  },
  {
    title: 'Sanctum 3D World Keyframe II',
    category: 'Worldbuilding',
    src: '/hf_20260808_023117_962b19e0-88eb-4e4e-88b4-5b773a65f702.png',
    desc: 'High-altitude cloudscape perspective capturing the physical scale of the current creative era.',
  },
  {
    title: 'Cinematic Visual Exploration I',
    category: 'Archive Artwork',
    src: '/ChatGPT Image Aug 7, 2026, 09_53_55 PM.png',
    desc: 'Experimental character design and sculptural form development from the KingShadP design archive.',
  },
  {
    title: 'Cinematic Visual Exploration II',
    category: 'Archive Artwork',
    src: '/ChatGPT Image Aug 7, 2026, 09_54_02 PM.png',
    desc: 'Exploration of metallic textures, brushed rose gold, and deep shadow contrasts.',
  },
  {
    title: 'Atmospheric Sanctum Study',
    category: 'Archive Artwork',
    src: '/ChatGPT Image Aug 7, 2026, 10_29_51 PM.png',
    desc: 'Atmospheric light and mist interaction studies for the cinematic sequence timeline.',
  },
];

export function ArchiveModal({ isOpen, onClose, initialTab = 'archive' }: ArchiveModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'visuals' | 'art'>(
    initialTab === 'visuals' ? 'visuals' : 'all'
  );
  const [selectedItem, setSelectedItem] = useState<(typeof ARCHIVE_ITEMS)[0] | null>(null);

  if (!isOpen) return null;

  const filteredItems = ARCHIVE_ITEMS.filter((item) => {
    if (activeTab === 'visuals') return item.category.includes('Visual') || item.category.includes('Worldbuilding');
    if (activeTab === 'art') return item.category.includes('Archive') || item.category.includes('Music');
    return true;
  });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B76E79] block font-medium">
                KINGSHADP ARCHIVE
              </span>
              <h3 className="text-lg sm:text-xl font-light tracking-wide uppercase text-white mt-0.5">
                VISUALS & MEDIA VAULT
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  activeTab === 'all' ? 'bg-white text-black font-medium' : 'text-white/60 hover:text-white'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setActiveTab('visuals')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  activeTab === 'visuals' ? 'bg-white text-black font-medium' : 'text-white/60 hover:text-white'
                }`}
              >
                VISUALS
              </button>
              <button
                onClick={() => setActiveTab('art')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  activeTab === 'art' ? 'bg-white text-black font-medium' : 'text-white/60 hover:text-white'
                }`}
              >
                ARTWORKS
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/KingShadP_MLA_Professional_Profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-white border border-white/20 px-3 py-1.5 rounded-full transition-colors"
            >
              <span>PROFILE PDF</span>
              <ExternalLink size={12} />
            </a>

            <button
              onClick={onClose}
              aria-label="Close archive modal"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-black">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-white/80 pointer-events-none">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-medium tracking-wide uppercase text-white group-hover:text-[#ECE9E4] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-[10px] tracking-[0.2em] uppercase text-[#B76E79] font-medium">
                  <span>VIEW FULL MEDIA</span>
                  <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info banner */}
        <div className="px-6 sm:px-8 py-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 tracking-wider uppercase">
          <span>8 ASSETS IN CURATED ARCHIVE</span>
          <span className="hidden sm:inline">ORIGINAL MEDIA © KINGSHADP</span>
        </div>
      </div>

      {/* Lightbox Modal for Selected Image */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-[130] bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative w-[85vw] max-w-2xl h-[55vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={selectedItem.src}
                alt={selectedItem.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B76E79] font-mono">
                {selectedItem.category}
              </span>
              <h4 className="text-lg font-light tracking-wide uppercase text-white mt-1">
                {selectedItem.title}
              </h4>
              <p className="text-xs text-white/60 mt-1 max-w-lg mx-auto">
                {selectedItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
