'use client';

import Link from 'next/link';
import { Play, Pause, Square, ExternalLink } from 'lucide-react';
import { MonoLabel } from '@/components/system';
import { useAudio } from '@/components/audio-provider';
import { formatDurationLabel, RELEASES, type Release } from '@/lib/music-data';

export function ReleaseDetailClient({ release }: { release: Release }) {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-14">
        <header className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start border-b border-border pb-10">
          <div>
            <MonoLabel className="mb-4 text-foreground/50">SONIC VAULT // RELEASE</MonoLabel>
            <h1 className="font-serif italic text-5xl md:text-7xl leading-tight">{release.title}</h1>
            {release.subtitle && <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground/55">{release.subtitle}</p>}
            <div className="mt-6 flex flex-wrap gap-5 font-mono text-[9px] uppercase tracking-widest text-foreground/55">
              <span>{release.projectType}</span>
              {release.releaseDate && <span>{release.releaseDate}</span>}
              <span>{release.tracks.length} tracks</span>
            </div>
          </div>
          <div className="aspect-square border border-border/30 bg-surface-dim flex items-center justify-center text-foreground/25 font-mono text-[9px] uppercase tracking-widest">
            {release.artwork?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={release.artwork.url} alt={release.artwork.alt || release.title} className="w-full h-full object-cover" />
            ) : (
              'Artwork pending'
            )}
          </div>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-[1.8fr_1fr] gap-10">
          <article className="space-y-10">
            {(release.editorial || release.notes) && (
              <div className="space-y-5">
                {release.editorial && <p className="text-base md:text-lg leading-relaxed text-foreground/80">{release.editorial}</p>}
                {release.notes && <p className="text-sm leading-relaxed text-foreground/65">{release.notes}</p>}
              </div>
            )}

            <div className="border border-border/30 bg-surface/20">
              <div className="px-5 py-4 border-b border-border/30 font-mono text-[9px] uppercase tracking-widest text-foreground/55">Track listing</div>
              <div className="p-4 md:p-5 space-y-1">
                {release.tracks.length ? (
                  release.tracks.map((track, index) => {
                    const active = currentTrack?.id === track.id;
                    return (
                      <button
                        key={track.id}
                        onClick={() => (active ? togglePlayPause() : playTrack(track, release, release.tracks))}
                        className="w-full text-left flex items-center justify-between gap-4 px-2 py-3 border-b border-border/15 hover:bg-surface"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[9px] text-foreground/40">{String(index + 1).padStart(2, '0')}</span>
                          <span className="w-7 h-7 rounded-full border border-border/40 inline-flex items-center justify-center">
                            {active && isPlaying ? <Square size={10} /> : <Play size={10} className="translate-x-[1px]" />}
                          </span>
                          <span className="font-serif italic text-xl">{track.title}</span>
                        </div>
                        <span className="font-mono text-[9px] text-foreground/45">{formatDurationLabel(track.durationSeconds, track.durationLabel) || '--:--'}</span>
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-6 font-mono text-[9px] uppercase tracking-widest text-foreground/40">No tracks published for this release.</p>
                )}
              </div>
            </div>

            {release.relatedVisuals?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {release.relatedVisuals.map((visual, index) => (
                  <div key={`${visual.url}-${index}`} className="border border-border/25 aspect-[4/3] bg-surface-dim overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={visual.url} alt={visual.alt || release.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="space-y-6">
            {release.streamingLinks?.length ? (
              <div className="border border-border/30 bg-surface/20 p-5 space-y-3">
                <MonoLabel className="text-foreground/50">Streaming destinations</MonoLabel>
                {release.streamingLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between border border-border/25 px-3 py-2 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            ) : null}

            {release.credits?.length ? (
              <div className="border border-border/30 bg-surface/20 p-5 space-y-3">
                <MonoLabel className="text-foreground/50">Credits</MonoLabel>
                {release.credits.map((credit, index) => (
                  <div key={`${credit.name}-${index}`} className="flex justify-between gap-3 font-mono text-[9px] uppercase tracking-widest text-foreground/60 border-b border-border/15 pb-2">
                    <span>{credit.role}</span>
                    <span>{credit.name}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {release.relatedArchiveEntries?.length ? (
              <div className="border border-border/30 bg-surface/20 p-5 space-y-3">
                <MonoLabel className="text-foreground/50">Related archive</MonoLabel>
                <div className="flex flex-wrap gap-2">
                  {release.relatedArchiveEntries.map((entryId) => (
                    <Link key={entryId} href={`/archive/${entryId}`} className="px-3 py-2 border border-border/25 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50">
                      {entryId}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {release.relatedReleases?.length ? (
              <div className="border border-border/30 bg-surface/20 p-5 space-y-3">
                <MonoLabel className="text-foreground/50">Related releases</MonoLabel>
                <div className="space-y-2">
                  {release.relatedReleases.map((related) => {
                    const relatedRelease = related.type === 'release' ? RELEASES.find((entry) => entry.id === related.id) : null;
                    return (
                      <Link
                        key={related.id}
                        href={relatedRelease ? `/music/${relatedRelease.slug}` : '/music'}
                        className="block border border-border/25 px-3 py-2 font-mono text-[9px] uppercase tracking-widest hover:border-foreground/50"
                      >
                        {related.label || related.id}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
