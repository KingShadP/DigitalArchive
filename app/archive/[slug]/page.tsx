import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ShieldCheck, FileText, Download, Hash, BookOpen } from 'lucide-react';
import { archiveRecords, ArchiveRecord } from '../../../data/archive';
import { constructMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '../../../lib/seo';

interface ArchiveDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function findRecordBySlug(slug: string): ArchiveRecord | null {
  const normalized = slug.toLowerCase().trim();
  return (
    archiveRecords.find(
      (r) =>
        r.id.toLowerCase() === normalized ||
        r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === normalized
    ) || null
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return archiveRecords.map((r) => ({
    slug: r.id,
  }));
}

export async function generateMetadata({ params }: ArchiveDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = findRecordBySlug(slug);

  if (!record) {
    return constructMetadata({
      title: 'Archive Record Not Found',
      description: 'The requested archival document does not exist in the KingShadP codex.',
      path: `/archive/${slug}`,
      noindex: true,
    });
  }

  return constructMetadata({
    title: `${record.title} // Archive Codex`,
    description: record.description || `Archival record: ${record.title} by KingShadP.`,
    path: `/archive/${record.id}`,
    ogType: 'article',
    ogImage: record.thumbnail,
    keywords: [
      record.title,
      'KingShadP Archive',
      record.type,
      record.meta,
      'Sanctum Dossier',
      'Codex Entry',
    ],
  });
}

export default async function ArchiveDetailPage({ params }: ArchiveDetailPageProps) {
  const { slug } = await params;
  const record = findRecordBySlug(slug);

  if (!record) {
    notFound();
  }

  const articleSchema = generateArticleJsonLd(record);
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Archive', path: '/archive' },
    { name: record.title, path: `/archive/${record.id}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link
          href="/archive"
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO CODEX</span>
        </Link>

        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/music" className="text-white/60 hover:text-[#B76E79] transition-colors">
            MUSIC
          </Link>
          <Link href="/visuals" className="text-white/60 hover:text-[#B76E79] transition-colors">
            VISUALS
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-[#B76E79] transition-colors">
            SHOP
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/archive" className="hover:text-white transition-colors">ARCHIVE</Link>
          <span>/</span>
          <span className="text-[#B76E79]">{record.title}</span>
        </nav>

        {/* Record Header */}
        <section className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#B76E79]/20 text-[#B76E79] text-[9px] font-mono tracking-widest uppercase font-bold">
              RECORD {record.id.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
              {record.type} {'//'} {record.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
            {record.title}
          </h1>

          <p className="text-sm font-light text-white/70 leading-relaxed">
            {record.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-[10px] font-mono text-white/40">
            <span>FORMAT: {record.meta}</span>
            <span>·</span>
            <span>SECURITY: CRYPTOGRAPHICALLY AUTHENTICATED</span>
          </div>
        </section>

        {/* Thumbnail Preview Stage */}
        <section className="relative w-full aspect-video max-h-[480px] rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-xl">
          <Image
            src={record.thumbnail}
            alt={record.title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            className="object-cover"
          />
        </section>

        {/* Full Manuscript Body */}
        {record.manuscriptText && (
          <section className="space-y-4">
            <h2 className="text-lg font-serif font-light text-white flex items-center gap-2">
              <FileText size={16} className="text-[#B76E79]" />
              <span>Archival Manuscript & Transcribed Evidence</span>
            </h2>
            <div 
              id="archival-manuscript-box"
              className="p-8 rounded-xl bg-white/[0.02] border border-white/10 text-sm font-light text-white/80 leading-relaxed whitespace-pre-wrap font-sans animate-fade-in animate-in fade-in duration-700 ease-out"
            >
              {record.manuscriptText}
            </div>
          </section>
        )}



        {/* Cross-Link Routing */}
        <section className="border-t border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/music"
            className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">ACOUSTIC LINK</span>
            <h3 className="text-base font-serif text-white group-hover:text-[#B76E79] mt-2">
              Listen to Related 432 Hz Master Recordings
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>EXPLORE MUSIC</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <Link
            href="/visuals"
            className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">SPATIAL LINK</span>
            <h3 className="text-base font-serif text-white group-hover:text-[#B76E79] mt-2">
              Inspect Raytraced Visual Artifacts
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>EXPLORE VISUALS</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
