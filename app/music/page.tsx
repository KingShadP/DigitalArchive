'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MonoLabel } from '@/components/system';
import { RELEASES, Release, Track } from '@/lib/music-data';
import { Play, Square, Headphones, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAudio } from '@/components/audio-provider';

type ViewMode = 'CHRONOLOGY' | 'PROJECTS' | 'TRACKS';

export default function SonicVault() {
  const [viewMode, setViewMode] = useState<ViewMode>('CHRONOLOGY');
  const [activeRelease, setActiveRelease] = useState<string | null>(null);
  const { audioActive, toggleAudio, playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();

  const emptyStateMessage = "NO AUDIO FRAGMENTS DETECTED IN VAULT.";

  // Derived data
  const allTracks = RELEASES.flatMap(r => r.tracks.map(t => ({ ...t, release: r })));
  
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 text-foreground">
      {/* Header / Navigation */}
      <header className="mb-24">
        <MonoLabel className="mb-4">KINGSHADP // SONIC VAULT</MonoLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-8">
          <h1 className="font-serif italic text-5xl md:text-7xl font-light tracking-tight">
            The Listening Room
          </h1>
          
          <nav className="flex flex-wrap gap-4 font-mono text-[9px] uppercase tracking-widest">
            {(['CHRONOLOGY', 'PROJECTS', 'TRACKS'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 border transition-all duration-300 ${
                  viewMode === mode 
                    ? 'border-foreground bg-foreground text-background' 
                    : 'border-border text-foreground/70 hover:border-foreground/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          {RELEASES.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-16 h-16 border border-border/50 rounded-full flex items-center justify-center relative">
                <div className="w-8 h-8 border border-foreground/20 rounded-full animate-ping absolute" />
                <Activity size={20} className="text-foreground/40" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 max-w-sm leading-relaxed">
                {emptyStateMessage}
                <br /><br />
                DATA ARCHITECTURE PREPARED.<br />
                AWAITING ARTIST TRANSMISSION.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {viewMode === 'CHRONOLOGY' && (
                <div className="space-y-16">
                  {/* Sorting releases by date if we had real dates, assumed pre-sorted for now */}
                  {RELEASES.map((release, idx) => (
                    <ReleaseBlock key={release.id} release={release} index={idx} isActive={activeRelease === release.id} onToggle={() => setActiveRelease(activeRelease === release.id ? null : release.id)} />
                  ))}
                </div>
              )}

              {viewMode === 'PROJECTS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {RELEASES.map((release) => (
                    <ProjectCard key={release.id} release={release} />
                  ))}
                </div>
              )}

              {viewMode === 'TRACKS' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border/50 font-mono text-[9px] uppercase tracking-widest text-foreground/50">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-6">TRACK TITLE</div>
                    <div className="col-span-3">PROJECT</div>
                    <div className="col-span-2 text-right">TIME</div>
                  </div>
                  {allTracks.map((track, idx) => {
    const isThisTrackActive = currentTrack?.id === track.id;
    return (
                    <div key={track.id} onClick={() => { if(isThisTrackActive) { togglePlayPause(); } else { playTrack(track, track.release, allTracks); } }} className="grid grid-cols-12 gap-4 py-4 border-b border-border/20 hover:bg-surface transition-colors items-center group cursor-pointer">
                      <div className="col-span-1 font-mono text-[9px] text-foreground/40">{String(idx + 1).padStart(3, '0')}</div>
                      <div className="col-span-6 font-serif italic text-xl group-hover:text-foreground/80 transition-colors flex items-center gap-4">
                        <button className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-foreground/50 transition-colors">
                          {isThisTrackActive && isPlaying ? <Square size={10} /> : <Play size={10} className="translate-x-[1px]" />}
                        </button>
                        {track.title}
                      </div>
                      <div className="col-span-3 font-mono text-[10px] uppercase tracking-widest text-foreground/60">{track.release.title}</div>
                      <div className="col-span-2 text-right font-mono text-[10px] text-foreground/40">{track.duration || '--:--'}</div>
                    </div>
                  );})}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Vault Stats Footer */}
      <footer className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-foreground/40">
        <div>SYS: SONIC ARCHITECTURE V1.0</div>
        <div className="flex gap-8">
          <span>{RELEASES.length} RELEASES</span>
          <span>{allTracks.length} TRACKS</span>
        </div>
      </footer>
    </main>
  );
}

// Subcomponents for the Vault Architecture

function ReleaseBlock({ release, index, isActive, onToggle }: { release: Release; index: number, isActive: boolean, onToggle: () => void }) {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();
  return (
    <div className="border border-border/50 bg-surface/30 group">
      <div 
        className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer hover:bg-surface transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-8">
          <span className="font-mono text-[10px] text-foreground/30">VOL.{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="font-serif italic text-3xl md:text-4xl">{release.title}</h3>
            <div className="flex gap-4 mt-2 font-mono text-[9px] uppercase tracking-widest text-foreground/50">
              <span>{release.type}</span>
              <span>{release.releaseDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="font-mono text-[9px] text-foreground/40">{release.tracks.length} TRACKS</div>
          </div>
          <button className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'border-foreground bg-foreground text-background' : 'border-border group-hover:border-foreground/50'}`}>
            <div className={`transition-transform duration-500 ${isActive ? 'rotate-45' : 'rotate-0'}`}>
              +
            </div>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50"
          >
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-12 mb-4">
                <Link href={`/music/${release.id}`} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors border border-border/50 px-4 py-2 hover:border-foreground/50">
                  VIEW FULL EDITORIAL <ArrowRight size={10} />
                </Link>
              </div>
              <div className="lg:col-span-4 space-y-8">
                {release.artworkUrl ? (
                  <div className="aspect-square bg-surface border border-border/50 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={release.artworkUrl} alt={release.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-square bg-surface border border-border/50 flex flex-col items-center justify-center text-foreground/20 font-mono text-[9px] uppercase tracking-widest">
                    <span>NO ARTWORK</span>
                    <span>PROVIDED</span>
                  </div>
                )}
                
                {release.description && (
                  <div className="font-serif italic text-lg leading-relaxed text-foreground/80">
                    &quot;{release.description}&quot;
                  </div>
                )}
                
                {release.streamingLinks && (
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(release.streamingLinks).map(([platform, url]) => (
                      <a key={platform} href={url} target="_blank" rel="noreferrer" className="px-4 py-2 border border-border/50 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50 transition-colors">
                        {platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-8">
                <div className="space-y-1">
                  {release.tracks.map((track, i) => {

    const isThisTrackActive = currentTrack?.id === track.id;
    return (
    <div key={track.id} onClick={() => isThisTrackActive ? togglePlayPause() : playTrack(track, release, release.tracks)} className="flex items-center justify-between py-3 border-b border-border/20 group hover:px-2 transition-all cursor-pointer">
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-[9px] text-foreground/30">{String(i + 1).padStart(2, '0')}</span>
                        <span className="font-serif italic text-xl group-hover:text-foreground/80">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-[9px] text-foreground/30">{track.duration || '--:--'}</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-white">
                          {isThisTrackActive && isPlaying ? <Square size={12} /> : <Play size={12} />}
                        </button>
                      </div>
                    </div>
                  )})}
                </div>
                
                {release.notes && (
                  <div className="mt-12 p-6 border border-border/30 bg-surface/20">
                    <MonoLabel className="mb-4 text-foreground/40">EDITORIAL NOTES</MonoLabel>
                    <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-2xl">
                      {release.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ release }: { release: Release }) {
  return (
    <Link href={`/music/${release.id}`} className="border border-border/50 bg-surface/30 flex flex-col group cursor-pointer hover:border-foreground/30 transition-colors">
      {release.artworkUrl ? (
        <div className="aspect-square bg-surface border-b border-border/50 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={release.artworkUrl} alt={release.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>
      ) : (
        <div className="aspect-square bg-surface border-b border-border/50 flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-widest text-foreground/20 group-hover:text-foreground/40 transition-colors">
          <Activity size={24} className="mb-4 opacity-50" />
          <span>PROJECT FILE</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif italic text-2xl mb-2 group-hover:text-foreground transition-colors text-foreground/90">{release.title}</h3>
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-foreground/50">
          <span>{release.type}</span>
          <span>{release.releaseDate}</span>
        </div>
      </div>
    </Link>
  );
}