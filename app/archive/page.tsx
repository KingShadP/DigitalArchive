import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, BookOpen, FileText, Database, ShieldCheck, Download, Search } from 'lucide-react';
import { archiveRecords } from '../../data/archive';
import { constructMetadata, generateBreadcrumbJsonLd } from '../../lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Codex & Archive Matrix // Permanent Records',
  description:
    'Browse the KingShadP archive codex: authenticated manuscripts, acoustic frequency studies, executive dossiers, and structural schematics.',
  path: '/archive',
  ogImage: '/KINGSHADP PHOTO.png',
  keywords: ['KingShadP Archive', 'Sanctum Codex', 'Acoustic Frequency Notes', 'MLA Executive Dossier', 'Subtractive Architecture'],
});

export default function ArchiveIndexPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Archive', path: '/archive' },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
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
            KINGSHADP // CODEX
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/music" className="text-white/60 hover:text-[#B76E79] transition-colors">
            MUSIC
          </Link>
          <Link href="/visuals" className="text-white/60 hover:text-[#B76E79] transition-colors">
            VISUALS
          </Link>
          <Link href="/story" className="text-white/60 hover:text-[#B76E79] transition-colors">
            STORY
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-[#B76E79] transition-colors">
            SHOP
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#B76E79]">ARCHIVE CODEX</span>
        </nav>

        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold">
            DOCUMENTARY RECORDS & MANUSCRIPTS
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-white">
            The Codex Matrix
          </h1>
          <p className="text-sm sm:text-base font-light text-white/70 max-w-2xl leading-relaxed">
            The complete documentary ledger across music, visual keyframes, executive credentials, and philosophy. Every file is indexed with cryptographic verification.
          </p>
        </div>

        {/* List of Archive Records */}
        <section className="flex flex-col divide-y divide-white/10">
          {archiveRecords.map((record) => (
            <article
              key={record.id}
              className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white/[0.02] px-4 rounded-xl transition-all"
            >
              <div className="flex items-start gap-6">
                <Link
                  href={`/archive/${record.id}`}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-black border border-white/15 shrink-0"
                >
                  <Image
                    src={record.thumbnail}
                    alt={record.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-[#B76E79] font-bold uppercase">
                      {record.id.toUpperCase()} {'//'} {record.type}
                    </span>
                    <span className="text-[9px] font-mono text-white/40">
                      {record.year} · {record.meta}
                    </span>
                  </div>

                  <Link href={`/archive/${record.id}`}>
                    <h2 className="text-xl sm:text-2xl font-serif font-light text-white group-hover:text-[#B76E79] transition-colors">
                      {record.title}
                    </h2>
                  </Link>

                  <p className="text-xs font-light text-white/60 max-w-xl line-clamp-2">
                    {record.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <Link
                  href={`/archive/${record.id}`}
                  className="px-4 py-2 rounded-full border border-white/20 text-[10px] font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
                >
                  <span>ACCESS DOSSIER</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
