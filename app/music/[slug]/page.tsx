import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Play, ArrowUpRight, Music2, Disc, Volume2, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { releases, Track } from '../../../data/releases';
import { constructMetadata, generateMusicRecordingJsonLd, generateBreadcrumbJsonLd } from '../../../lib/seo';

interface MusicTrackPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function findTrackBySlug(slug: string): { track: Track; releaseIndex: number } | null {
  const release = releases[0];
  // Match by track id (e.g. 'track-01', 'track-02') or title slug
  const normalizedSlug = slug.toLowerCase().trim();
  const track = release.tracks.find(
    (t) =>
      t.id.toLowerCase() === normalizedSlug ||
      t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === normalizedSlug
  );

  if (!track) return null;
  return { track, releaseIndex: 0 };
}

export async function generateStaticParams() {
  return releases[0].tracks.map((track) => ({
    slug: track.id,
  }));
}

export async function generateMetadata({ params }: MusicTrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = findTrackBySlug(slug);

  if (!result) {
    return constructMetadata({
      title: 'Track Not Found',
      description: 'The requested musical recording does not exist in the KingShadP archive.',
      path: `/music/${slug}`,
      noindex: true,
    });
  }

  const { track } = result;
  const release = releases[0];

  return constructMetadata({
    title: `${track.title} (${track.tuning}) // KingShadP`,
    description:
      track.notes ||
      `Official audio recording for ${track.title} by ${track.artist}, composed in ${track.tuning} tuning and ${track.key}.`,
    path: `/music/${track.id}`,
    ogType: 'music.song',
    ogImage: release.artwork,
    keywords: [
      track.title,
      'KingShadP',
      track.tuning,
      track.key,
      '432 Hz Pythagorean',
      'Sanctum Opus 01',
      'Sub-Bass 28Hz',
    ],
  });
}

export default async function MusicTrackPage({ params }: MusicTrackPageProps) {
  const { slug } = await params;
  const result = findTrackBySlug(slug);

  if (!result) {
    notFound();
  }

  const { track } = result;
  const release = releases[0];
  const recordingSchema = generateMusicRecordingJsonLd(track, release);
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Music', path: '/music' },
    { name: track.title, path: `/music/${track.id}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recordingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link
          href="/music"
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO DISCOGRAPHY</span>
        </Link>

        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/visuals" className="text-white/60 hover:text-[#B76E79] transition-colors">
            VISUALS
          </Link>
          <Link href="/archive" className="text-white/60 hover:text-[#B76E79] transition-colors">
            ARCHIVE
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-[#B76E79] transition-colors">
            SHOP
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/music" className="hover:text-white transition-colors">MUSIC</Link>
          <span>/</span>
          <span className="text-[#B76E79]">{track.title}</span>
        </nav>

        {/* Track Title and Hero Header */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#B76E79]/20 text-[#B76E79] text-[9px] font-mono tracking-widest uppercase font-bold">
                TRACK {track.number} // {release.catalogNumber}
              </span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                {track.tuning} TUNING
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
              {track.title}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-white/60 tracking-wider">
              {track.artist} · {track.duration} · {track.bpm} BPM · {track.key}
            </p>
          </div>

          {/* Album Mini Artwork Link */}
          <Link
            href="/visuals/twisted-beast-art"
            className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-white/15 shrink-0 shadow-lg"
          >
            <Image
              src={release.artwork}
              alt="Behold the Twisted Beast cover"
              fill
              sizes="112px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-mono text-white tracking-widest uppercase">
              ARTWORK
            </div>
          </Link>
        </section>

        {/* Dedicated Audio Player Stream */}
        <section className="p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-white/80">
              <Volume2 size={16} className="text-[#B76E79]" />
              <span>HIGH-FIDELITY AUDIO STREAM</span>
            </div>
            <span className="text-[10px] font-mono text-white/40">24-BIT / 96KHZ LOSSLESS</span>
          </div>

          <audio
            controls
            preload="metadata"
            src={track.audioSrc}
            className="w-full h-12 rounded-lg accent-[#B76E79]"
          >
            Your browser does not support audio playback.
          </audio>
        </section>

        {/* Composition Notes & Frequency Vectors */}
        {track.notes && (
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-light text-white flex items-center gap-2">
              <FileText size={16} className="text-[#B76E79]" />
              <span>Acoustic Engineering & Composition Notes</span>
            </h2>
            <p className="text-sm font-light text-white/70 leading-relaxed max-w-3xl bg-white/[0.02] p-6 rounded-lg border border-white/10">
              {track.notes}
            </p>
          </section>
        )}

        {/* Analytics Profile (if present) */}
        {track.analytics && (
          <section className="space-y-6">
            <h2 className="text-lg font-serif font-light text-white">
              Spectral Frequency & Sonic Analytics
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[9px] font-mono text-white/40 block">MELODICNESS</span>
                <span className="text-xl font-mono text-[#B76E79] font-bold">{track.analytics.melodicness}%</span>
              </div>
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[9px] font-mono text-white/40 block">ACOUSTICNESS</span>
                <span className="text-xl font-mono text-[#B76E79] font-bold">{track.analytics.acousticness}%</span>
              </div>
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[9px] font-mono text-white/40 block">ENERGY</span>
                <span className="text-xl font-mono text-[#B76E79] font-bold">{track.analytics.energy}%</span>
              </div>
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[9px] font-mono text-white/40 block">DANCEABILITY</span>
                <span className="text-xl font-mono text-[#B76E79] font-bold">{track.analytics.danceability}%</span>
              </div>
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-center col-span-2 sm:col-span-1">
                <span className="text-[9px] font-mono text-white/40 block">TEMPO</span>
                <span className="text-xl font-mono text-[#B76E79] font-bold">{track.analytics.bpm} BPM</span>
              </div>
            </div>

            {track.analytics.analysisSummary && (
              <p className="text-xs font-mono text-white/60 leading-relaxed bg-white/[0.02] p-4 rounded border border-white/10">
                {track.analytics.analysisSummary}
              </p>
            )}
          </section>
        )}

        {/* Lyrics (if present) */}
        {track.lyrics && track.lyrics.length > 0 && (
          <section className="space-y-4 border-t border-white/10 pt-8">
            <h2 className="text-lg font-serif font-light text-white">
              Official Lyrics & Chants
            </h2>
            <div className="bg-white/[0.02] p-8 rounded-lg border border-white/10 font-serif italic text-base sm:text-lg text-white/80 space-y-3 leading-relaxed">
              {track.lyrics.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </section>
        )}

        {/* Contextual Disciplinary Outlinks */}
        <section className="border-t border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/archive/arch-006"
            className="p-5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">ARCHIVE DOSSIER</span>
            <h3 className="text-sm font-serif text-white group-hover:text-[#B76E79] mt-2">
              Sub-Harmonic 28Hz Frequency Vector Notes
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>READ MANUSCRIPT</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <Link
            href="/visuals/giragon-glory"
            className="p-5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">VISUAL MONOLITH</span>
            <h3 className="text-sm font-serif text-white group-hover:text-[#B76E79] mt-2">
              The Giragon: Sanctum Glory Edition
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>VIEW SCULPTURE</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <Link
            href="/shop/twisted-beast-vinyl-edition"
            className="p-5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">PHYSICAL EDITION</span>
            <h3 className="text-sm font-serif text-white group-hover:text-[#B76E79] mt-2">
              Behold the Twisted Beast 180g Vinyl
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>PRE-ORDER VINYL ($65)</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
