'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ARCHIVE_ARTIFACTS, ArchiveArtifact, ArtifactClass } from '@/lib/archive-data';
import { MonoLabel } from '@/components/system';
import Link from 'next/link';
import Image from 'next/image';
import { ArtifactImage } from '@/components/artifact-image';
import { Search, Filter, Grid2X2, Calendar, Folder, Layers, Link2 } from 'lucide-react';

type NavModel = 'Chronological' | 'Category' | 'Collection' | 'Project' | 'Relationship' | 'Search';

export function ArchiveClient() {
  const [navModel, setNavModel] = useState<NavModel>('Category');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Derived state based on NavModel
  const processedData = useMemo(() => {
    let data = [...ARCHIVE_ARTIFACTS];

    if (navModel === 'Search' && searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.subtitle?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.artifactClass.toLowerCase().includes(q)
      );
    }

    if (activeFilter) {
      if (navModel === 'Category') data = data.filter(a => a.artifactClass === activeFilter);
      if (navModel === 'Collection') data = data.filter(a => a.collection === activeFilter);
      if (navModel === 'Project') data = data.filter(a => a.project === activeFilter);
    }

    if (navModel === 'Chronological') {
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return data;
  }, [navModel, searchQuery, activeFilter]);

  // Extract unique filters
  const filterOptions = useMemo(() => {
    if (navModel === 'Category') return Array.from(new Set(ARCHIVE_ARTIFACTS.map(a => a.artifactClass))).filter(Boolean);
    if (navModel === 'Collection') return Array.from(new Set(ARCHIVE_ARTIFACTS.map(a => a.collection))).filter(Boolean) as string[];
    if (navModel === 'Project') return Array.from(new Set(ARCHIVE_ARTIFACTS.map(a => a.project))).filter(Boolean) as string[];
    return [];
  }, [navModel]);

  const handleNavChange = (model: NavModel) => {
    setNavModel(model);
    setActiveFilter(null);
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen pt-32 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header & Controls */}
        <div className="mb-16">
          <MonoLabel className="mb-4 block text-foreground/50">SYSTEM DIRECTORY</MonoLabel>
          <h1 className="font-serif italic text-5xl md:text-7xl font-light tracking-tight leading-none mb-12">
            The Living Archive
          </h1>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-y border-border/50 py-6">
            <div className="flex flex-wrap gap-4">
              <NavButton active={navModel === 'Category'} onClick={() => handleNavChange('Category')} icon={<Grid2X2 size={12} />} label="Category" />
              <NavButton active={navModel === 'Chronological'} onClick={() => handleNavChange('Chronological')} icon={<Calendar size={12} />} label="Chronological" />
              <NavButton active={navModel === 'Project'} onClick={() => handleNavChange('Project')} icon={<Folder size={12} />} label="Project" />
              <NavButton active={navModel === 'Collection'} onClick={() => handleNavChange('Collection')} icon={<Layers size={12} />} label="Collection" />
              {/* Relationship map view might be too complex for a standard list, let's keep it simple or represent as lists */}
              <NavButton active={navModel === 'Search'} onClick={() => handleNavChange('Search')} icon={<Search size={12} />} label="Search" />
            </div>

            {navModel === 'Search' && (
              <div className="relative w-full lg:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                <input 
                  type="text" 
                  placeholder="SEARCH ARTIFACTS..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface/30 border border-border/50 rounded-none py-2 pl-9 pr-4 font-mono text-[10px] uppercase tracking-widest focus:outline-none focus:border-foreground/50 transition-colors"
                />
              </div>
            )}
          </div>

          {/* Sub-filters based on NavModel */}
          <AnimatePresence mode="wait">
            {filterOptions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                <button 
                  onClick={() => setActiveFilter(null)}
                  className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest border transition-colors ${activeFilter === null ? 'bg-foreground text-background border-foreground' : 'bg-transparent border-border/50 text-foreground/60 hover:border-foreground/50'}`}
                >
                  ALL
                </button>
                {filterOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setActiveFilter(opt)}
                    className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest border transition-colors ${activeFilter === opt ? 'bg-foreground text-background border-foreground' : 'bg-transparent border-border/50 text-foreground/60 hover:border-foreground/50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Masonry or Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-max">
          <AnimatePresence>
            {processedData.map((artifact, index) => (
              <ArtifactCard key={artifact.id} artifact={artifact} index={index} />
            ))}
          </AnimatePresence>
          {processedData.length === 0 && (
            <div className="col-span-full py-24 text-center font-mono text-xs text-foreground/40 uppercase tracking-widest border border-dashed border-border/50">
              NO ARTIFACTS FOUND MATCHING CURRENT PARAMETERS
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 font-mono text-[9px] uppercase tracking-widest border transition-colors ${
        active ? 'border-foreground bg-foreground text-background' : 'border-border/50 bg-transparent text-foreground/60 hover:border-foreground/50 hover:text-foreground'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function ArtifactCard({ artifact, index }: { artifact: ArchiveArtifact, index: number }) {
  // Compute aspect ratio class
  const media = artifact.media[0];
  let aspectClass = "aspect-square";
  if (media?.aspectRatio === '16:9') aspectClass = "aspect-video";
  else if (media?.aspectRatio === '3:4') aspectClass = "aspect-[3/4]";
  else if (media?.aspectRatio === '4:3') aspectClass = "aspect-[4/3]";
  else if (media?.aspectRatio === '9:16') aspectClass = "aspect-[9/16]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/archive/${artifact.id}`} className="group block h-full flex flex-col bg-surface/20 border border-border/30 hover:border-foreground/40 hover:bg-surface/40 transition-all duration-500">
        <div className={`relative w-full ${aspectClass} overflow-hidden bg-surface/50`}>
          {media ? (
            <Image 
              src={media.thumbnailUrl} 
              alt={artifact.title} 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-foreground/20">
              NO MEDIA
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-background/80 backdrop-blur-sm border border-border px-2 py-1 font-mono text-[8px] uppercase tracking-widest">
              {artifact.artifactClass}
            </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <MonoLabel className="text-foreground/40">{artifact.date.split('-')[0]}</MonoLabel>
            <MonoLabel className="text-foreground/40">{artifact.id.split('-').pop()}</MonoLabel>
          </div>
          <h3 className="font-serif italic text-xl md:text-2xl mb-1 group-hover:text-foreground transition-colors text-foreground/90">{artifact.title}</h3>
          {artifact.subtitle && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50">{artifact.subtitle}</span>
          )}
          
          <div className="mt-auto pt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/60">ACCESS RECORD</span>
            <span className="text-foreground/60">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
