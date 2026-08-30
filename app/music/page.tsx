import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Play, Disc, ArrowUpRight, Music, Radio, Volume2, ShieldCheck, Sparkles } from 'lucide-react';
import { releases, Track } from '../../data/releases';
import { constructMetadata, generateMusicAlbumJsonLd, generateBreadcrumbJsonLd } from '../../lib/seo';
import { Navbar } from '../../components/navigation/Navbar';

export const metadata: Metadata = constructMetadata({
  title: 'Music & Sonic Architecture // 432 Hz Discography',
  description:
    'Explore KingShadP’s sonic discography, featuring Behold the Twisted Beast, Ice King Shit, PRIVATE GOD, DoubleShift, and Neon Fog engineered in 432 Hz Pythagorean tuning.',
  path: '/music',
  ogType: 'music.album',
  ogImage: '/twisted-beast-cover.png',
  keywords: ['KingShadP Music', '432 Hz Tuning', 'Behold the Twisted Beast', 'Sub-Bass 28Hz', 'Cathedral Regal Choir'],
});

export default function MusicIndexPage() {
  const release = releases[0];
  const albumSchema = generateMusicAlbumJsonLd(release);
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Music', path: '/music' },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(albumSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-sm border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold group-hover:border-[#B76E79] transition-colors">
            KSP
          </div>
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white font-semibold">
            KINGSHADP // SANCTUM
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/visuals" className="text-white/60 hover:text-[#B76E79] transition-colors">
            VISUALS
          </Link>
          <Link href="/archive" className="text-white/60 hover:text-[#B76E79] transition-colors">
            ARCHIVE
          </Link>
          <Link href="/story" className="text-white/60 hover:text-[#B76E79] transition-colors">
            STORY
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-[#B76E79] transition-colors">
            SHOP
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#B76E79]">MUSIC DISCIPLINES</span>
        </nav>

        {/* Hero Release Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-white/10 pb-16">
          <div className="lg:col-span-5 relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden border border-white/15 shadow-2xl bg-neutral-950">
            <Image
              src={release.artwork}
              alt="Behold the Twisted Beast Cover Artwork by KingShadP"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[9px] font-mono tracking-widest text-[#B76E79] uppercase">
              {release.era}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block font-bold">
                FLAGSHIP COMPOSITION // {release.catalogNumber}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-white">
                {release.title}
              </h1>
              <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed max-w-xl">
                {release.subtitle}. Engineered in 432 Hz Pythagorean tuning with sub-harmonic 28Hz foundation, cathedral regal choir arrangements, and staccato brass.
              </p>
            </div>

            {/* Technical Matrix Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] font-mono">
              <div>
                <span className="text-white/40 block">TUNING</span>
                <span className="text-white font-semibold">{release.technicalSpecs.tuning}</span>
              </div>
              <div>
                <span className="text-white/40 block">MASTERING</span>
                <span className="text-white font-semibold">{release.technicalSpecs.mastering}</span>
              </div>
              <div>
                <span className="text-white/40 block">DYNAMIC RANGE</span>
                <span className="text-white font-semibold">{release.technicalSpecs.dynamicRange}</span>
              </div>
              <div>
                <span className="text-white/40 block">FREQUENCY</span>
                <span className="text-white font-semibold">{release.technicalSpecs.frequencyRange}</span>
              </div>
            </div>

            {/* Streaming Platform Outlinks */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={release.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#1DB954] hover:text-black transition-all text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 border border-white/10"
              >
                <span>SPOTIFY</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href={release.links.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#FA243C] hover:text-white transition-all text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 border border-white/10"
              >
                <span>APPLE MUSIC</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href={release.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#FF0000] hover:text-white transition-all text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 border border-white/10"
              >
                <span>YOUTUBE</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* Tracklist & Indexable Deep Links */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-serif font-light text-white flex items-center gap-3">
              <Disc size={20} className="text-[#B76E79]" />
              <span>Sanctum Opus 01 Tracklist</span>
            </h2>
            <span className="text-[10px] font-mono tracking-widest text-white/50">
              {release.tracks.length} RECORDINGS
            </span>
          </div>

          <div className="flex flex-col divide-y divide-white/10">
            {release.tracks.map((track) => (
              <article
                key={track.id}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-4 rounded-lg transition-all"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="text-xs font-mono text-[#B76E79] font-bold">
                    {track.number}
                  </span>
                  <div className="flex flex-col">
                    <Link
                      href={`/music/${track.id}`}
                      className="text-lg sm:text-xl font-serif text-white group-hover:text-[#B76E79] transition-colors flex items-center gap-2"
                    >
                      <span>{track.title}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#B76E79]" />
                    </Link>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-white/50 tracking-wider">
                      <span>{track.artist}</span>
                      <span>·</span>
                      <span>{track.duration}</span>
                      <span>·</span>
                      <span>{track.tuning}</span>
                      <span>·</span>
                      <span>{track.key}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <Link
                    href={`/music/${track.id}`}
                    className="px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                  >
                    VIEW TRACK ANALYSIS & LYRICS
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contextual Disciplinary Cross-Links */}
        <section className="p-8 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79]">
              CONNECTED ARCHIVE CODEX
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-white">
              Explore 28Hz Acoustic Manuscripts and Visual Monoliths
            </h3>
            <p className="text-xs text-white/60">
              Cross-reference frequency notes, score manuscripts, and 3D sculptures that accompany this release.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/archive/arch-001"
              className="px-5 py-2.5 rounded-full bg-[#1a1a1a] text-white border border-white/20 text-[10px] font-mono tracking-widest uppercase hover:bg-[#B76E79] transition-all"
            >
              ARCHIVE RECORD
            </Link>
            <Link
              href="/visuals/twisted-beast-art"
              className="px-5 py-2.5 rounded-full bg-white text-black text-[10px] font-mono tracking-widest uppercase hover:bg-white/80 transition-all font-semibold"
            >
              COVER ART
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
