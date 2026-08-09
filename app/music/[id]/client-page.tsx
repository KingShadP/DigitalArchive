'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Release } from '@/lib/music-data';
import { MonoLabel } from '@/components/system';
import Link from 'next/link';
import { ArrowLeft, Play, Square, Activity, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useAudio } from '@/components/audio-provider';

export function ReleaseDetailClient({ release }: { release: Release }) {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();

  return (
    <main className="min-h-screen text-foreground selection:bg-foreground selection:text-background pb-32">
      
      <div className="relative pt-32 pb-24 px-6 md:px-12 min-h-[60vh] flex flex-col justify-end">
        
        {release.artworkUrl && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
            <Image 
              src={release.artworkUrl} 
              alt="" 
              fill 
              className="object-cover blur-3xl scale-110 saturate-0"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link href="/music" className="inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors mb-16">
            <ArrowLeft size={12} /> BACK TO SONIC VAULT
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-end">
            <div className="w-full max-w-sm lg:w-1/3 flex-shrink-0">
              {release.artworkUrl ? (
                <div className="aspect-square bg-surface border border-border/50 relative overflow-hidden shadow-2xl">
                  <Image src={release.artworkUrl} alt={release.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" unoptimized />
                </div>
              ) : (
                <div className="aspect-square bg-surface border border-border/50 flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-widest text-foreground/20">
                  <Activity size={24} className="mb-4 opacity-50" />
                  <span>NO ARTWORK</span>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-2/3 pb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <MonoLabel className="mb-6">{release.type} &frasl;&frasl; {release.releaseDate}</MonoLabel>
                <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-8">
                  {release.title}
                </h1>
                
                {release.streamingLinks && Object.keys(release.streamingLinks).length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-12">
                    {Object.entries(release.streamingLinks).map(([platform, url]) => (
                      <a 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 border border-border font-mono text-[9px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                      >
                        {platform} <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          
          <div className="lg:col-span-7">
            <MonoLabel className="mb-12 border-b border-border/50 pb-4">SONIC FRAGMENTS</MonoLabel>
            
            <div className="space-y-1">
              {release.tracks.map((track, i) => {
                const isThisTrackActive = currentTrack?.id === track.id;
                return (
                  <div 
                    key={track.id} 
                    onClick={() => isThisTrackActive ? togglePlayPause() : playTrack(track, release, release.tracks)} 
                    className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-border/20 group hover:bg-surface/30 transition-all cursor-pointer -mx-4 px-4"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-[9px] text-foreground/30 w-4">{String(i + 1).padStart(2, '0')}</span>
                      <button className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-foreground/50 transition-colors flex-shrink-0">
                        {isThisTrackActive && isPlaying ? <Square size={10} /> : <Play size={10} className="translate-x-[1px]" />}
                      </button>
                      <span className="font-serif italic text-2xl group-hover:text-foreground/80">{track.title}</span>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4 md:mt-0 pl-14 md:pl-0">
                      {track.credits && (
                        <span className="font-mono text-[9px] text-foreground/40 hidden xl:block">
                          {track.credits.join(' / ')}
                        </span>
                      )}
                      <span className="font-mono text-[9px] text-foreground/40">{track.duration || '--:--'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            
            {release.relatedVisuals && release.relatedVisuals.length > 0 && (
              <div className="mt-32">
                <MonoLabel className="mb-12 border-b border-border/50 pb-4">CAMPAIGN VISUALS</MonoLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {release.relatedVisuals.map((img, idx) => (
                    <div key={idx} className="aspect-[4/5] bg-surface relative overflow-hidden group">
                      <Image 
                        src={img} 
                        alt={`Visual ${idx}`} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        unoptimized 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          
          <div className="lg:col-span-5 space-y-24">
            {release.description && (
              <div>
                <MonoLabel className="mb-8 text-foreground/40">EDITORIAL DESCRIPTION</MonoLabel>
                <div className="font-serif italic text-2xl leading-relaxed text-foreground/80 whitespace-pre-wrap">
                  {release.description}
                </div>
              </div>
            )}
            
            {release.notes && (
              <div className="p-8 border border-border/30 bg-surface/20">
                <MonoLabel className="mb-6 text-foreground/40">ARCHIVIST NOTES</MonoLabel>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed whitespace-pre-wrap">
                  {release.notes}
                </p>
              </div>
            )}
            
            {release.credits && release.credits.length > 0 && (
              <div>
                <MonoLabel className="mb-8 border-b border-border/50 pb-4">FULL CREDITS</MonoLabel>
                <ul className="space-y-4 font-mono text-[9px] uppercase tracking-widest text-foreground/60">
                  {release.credits.map((credit, idx) => (
                    <li key={idx}>{credit}</li>
                  ))}
                </ul>
              </div>
            )}
          
            {release.relatedArchiveEntries && release.relatedArchiveEntries.length > 0 && (
              <div className="mt-16">
                <MonoLabel className="mb-6 border-b border-border/50 pb-4">ARCHIVE ARTIFACTS</MonoLabel>
                <div className="flex flex-col gap-4 font-mono text-[9px] uppercase tracking-widest text-foreground/60">
                  {release.relatedArchiveEntries.map((artifactId, idx) => (
                    <Link key={idx} href={`/archive/${artifactId}`} className="hover:text-foreground hover:bg-surface/50 p-4 border border-border/20 transition-all flex justify-between items-center group">
                      <span>{artifactId}</span>
                      <ArrowLeft size={10} className="rotate-135 opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: 'rotate(135deg)' }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}
