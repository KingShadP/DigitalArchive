'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ExternalLink, Pause, Play, Square } from 'lucide-react';
import { MonoLabel } from '@/components/system';
import { getAllTracks, getFeaturedRelease, RELEASES, type Release } from '@/lib/music-data';
import { useAudio } from '@/components/audio-provider';

const VIEWS = ['FEATURED', 'RELEASES', 'TRACKS', 'PROJECTS', 'CHRONOLOGY', 'ARCHIVE', 'NOW PLAYING'] as const;
type ViewMode = (typeof VIEWS)[number];

const dateSortValue = (release: Release) => {
  if (!release.releaseDate) return 0;
  const value = Date.parse(release.releaseDate);
  return Number.isNaN(value) ? 0 : value;
};

export default function SonicVault() {
  const [viewMode, setViewMode] = useState<ViewMode>('FEATURED');
  const { playTrack, currentTrack, currentRelease, isPlaying, togglePlayPause } = useAudio();

  const featured = getFeaturedRelease() || RELEASES[0] || null;
  const allTracks = useMemo(() => getAllTracks(), []);
  const chronology = useMemo(() => [...RELEASES].sort((a, b) => dateSortValue(a) - dateSortValue(b)), []);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12 bg-background text-foreground">
      <header className="mb-16 md:mb-20">
        <MonoLabel className="mb-4">KINGSHADP // SONIC VAULT</MonoLabel>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border pb-8">
          <h1 className="font-serif italic text-5xl md:text-7xl font-light tracking-tight">Sonic Vault</h1>
          <nav className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-widest">
            {VIEWS.map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-2 border transition-colors ${
                  viewMode === mode ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground/65 hover:border-foreground/50'
                }`}
                aria-pressed={viewMode === mode}
              >
                {mode}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {viewMode === 'FEATURED' && (
              <div>
                {featured ? (
                  <ReleaseHero release={featured} />
                ) : (
                  <EmptyVault message="Featured release will appear here when factual music records are added." />
                )}
              </div>
            )}

            {viewMode === 'RELEASES' &&
              (RELEASES.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {RELEASES.map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                  ))}
                </div>
              ) : (
                <EmptyVault message="Release index is ready for verified entries." />
              ))}

            {viewMode === 'TRACKS' &&
              (allTracks.length ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border/40 font-mono text-[9px] uppercase tracking-widest text-foreground/45">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Track</div>
                    <div className="col-span-4">Release</div>
                    <div className="col-span-2 text-right">Duration</div>
                  </div>
                  {allTracks.map((entry, index) => {
                    const active = currentTrack?.id === entry.id;
                    return (
                      <button
                        key={entry.id}
                        onClick={() => (active ? togglePlayPause() : playTrack(entry, entry.release, allTracks))}
                        className="w-full text-left grid grid-cols-12 gap-4 py-3 border-b border-border/20 hover:bg-surface px-2"
                      >
                        <div className="col-span-1 font-mono text-[9px] text-foreground/40">{String(index + 1).padStart(2, '0')}</div>
                        <div className="col-span-5 flex items-center gap-3 font-serif italic text-xl">
                          <span className="w-7 h-7 rounded-full border border-border/40 inline-flex items-center justify-center">
                            {active && isPlaying ? <Square size={10} /> : <Play size={10} className="translate-x-[1px]" />}
                          </span>
                          {entry.title}
                        </div>
                        <div className="col-span-4 font-mono text-[9px] uppercase tracking-widest text-foreground/55">{entry.release.title}</div>
                        <div className="col-span-2 text-right font-mono text-[9px] text-foreground/40">{entry.durationLabel || '--:--'}</div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <EmptyVault message="Track registry is currently empty." />
              ))}

            {viewMode === 'PROJECTS' &&
              (RELEASES.length ? (
                <div className="space-y-4">
                  {RELEASES.map((release) => (
                    <ProjectRow key={release.id} release={release} />
                  ))}
                </div>
              ) : (
                <EmptyVault message="Project-level catalog is prepared." />
              ))}

            {viewMode === 'CHRONOLOGY' &&
              (chronology.length ? (
                <div className="space-y-6">
                  {chronology.map((release) => (
                    <div key={release.id} className="border-l border-border pl-5 py-1">
                      <MonoLabel className="mb-2 text-foreground/50">{release.releaseDate || 'DATE UNDISCLOSED'}</MonoLabel>
                      <Link href={`/music/${release.slug}`} className="font-serif italic text-3xl hover:text-foreground/75 transition-colors">
                        {release.title}
                      </Link>
                      <div className="font-mono text-[9px] uppercase tracking-widest mt-2 text-foreground/45">{release.projectType}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyVault message="Chronology will activate when releases are dated." />
              ))}

            {viewMode === 'ARCHIVE' &&
              (RELEASES.some((release) => release.relatedArchiveEntries?.length) ? (
                <div className="space-y-6">
                  {RELEASES.filter((release) => release.relatedArchiveEntries?.length).map((release) => (
                    <div key={release.id} className="border border-border/40 p-6 bg-surface/20">
                      <h3 className="font-serif italic text-2xl mb-3">{release.title}</h3>
                      <div className="flex flex-wrap gap-3">
                        {release.relatedArchiveEntries?.map((entry) => (
                          <Link key={entry} href={`/archive/${entry}`} className="px-3 py-2 border border-border/50 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50">
                            {entry}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyVault message="No related archive links are currently mapped." />
              ))}

            {viewMode === 'NOW PLAYING' && (
              <div className="border border-border/40 bg-surface/20 p-8 md:p-12">
                {currentTrack ? (
                  <>
                    <MonoLabel className="mb-3 text-foreground/55">CURRENT TRANSMISSION</MonoLabel>
                    <h2 className="font-serif italic text-4xl md:text-5xl">{currentTrack.title}</h2>
                    <p className="font-mono text-[9px] uppercase tracking-widest mt-3 text-foreground/55">{currentRelease?.title || 'Unknown release'}</p>
                    <button
                      onClick={togglePlayPause}
                      className="mt-8 inline-flex items-center gap-3 border border-border px-5 py-3 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50"
                    >
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Pause' : 'Play'}
                    </button>
                  </>
                ) : (
                  <EmptyVault message="No active track. Start playback from the track index." />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <footer className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 font-mono text-[9px] uppercase tracking-widest text-foreground/45">
        <span>SONIC VAULT FOUNDATION</span>
        <span>
          {RELEASES.length} RELEASES // {allTracks.length} TRACKS
        </span>
      </footer>
    </main>
  );
}

function ReleaseHero({ release }: { release: Release }) {
  return (
    <article className="border border-border/40 bg-surface/20 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
      <div>
        <MonoLabel className="mb-4 text-foreground/55">FEATURED RELEASE</MonoLabel>
        <h2 className="font-serif italic text-4xl md:text-6xl leading-tight">{release.title}</h2>
        {release.subtitle && <p className="font-mono text-[10px] uppercase tracking-widest mt-4 text-foreground/55">{release.subtitle}</p>}
        {release.editorial && <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">{release.editorial}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/music/${release.slug}`} className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50">
            Open detail <ExternalLink size={12} />
          </Link>
          {release.streamingLinks?.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50">
              {link.label} <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
      <div className="border border-border/30 bg-surface-dim aspect-square flex items-center justify-center text-foreground/25 font-mono text-[9px] uppercase tracking-widest">
        {release.artwork?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={release.artwork.url} alt={release.artwork.alt || release.title} className="w-full h-full object-cover" />
        ) : (
          'Artwork pending'
        )}
      </div>
    </article>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link href={`/music/${release.slug}`} className="border border-border/40 bg-surface/20 p-6 flex flex-col gap-6 hover:border-foreground/40 transition-colors">
      <div>
        <h3 className="font-serif italic text-2xl">{release.title}</h3>
        <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-foreground/50">
          {release.projectType} {release.releaseDate ? `// ${release.releaseDate}` : ''}
        </div>
      </div>
      <p className="text-sm text-foreground/70 line-clamp-4">{release.notes || release.editorial || 'Editorial notes pending.'}</p>
      <MonoLabel className="text-foreground/45">{release.tracks.length} TRACKS</MonoLabel>
    </Link>
  );
}

function ProjectRow({ release }: { release: Release }) {
  return (
    <Link href={`/music/${release.slug}`} className="border border-border/40 bg-surface/20 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-foreground/40">
      <div>
        <h3 className="font-serif italic text-3xl">{release.title}</h3>
        <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 mt-2">{release.projectType}</p>
      </div>
      <div className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 text-left md:text-right">
        <div>{release.releaseDate || 'DATE TBD'}</div>
        <div>{release.tracks.length} TRACKS</div>
      </div>
    </Link>
  );
}

function EmptyVault({ message }: { message: string }) {
  return (
    <div className="min-h-[38vh] border border-border/30 bg-surface/10 flex flex-col items-center justify-center text-center px-8 gap-6">
      <div className="w-14 h-14 border border-border/40 rounded-full flex items-center justify-center relative">
        <Activity size={18} className="text-foreground/35" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 max-w-xl leading-relaxed">{message}</p>
      <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/35">No fabricated records are shown.</p>
    </div>
  );
}
