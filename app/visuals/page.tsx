import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, ArrowUpRight, Sparkles, Layers, Box } from 'lucide-react';
import { visualAssets } from '../../data/visuals';
import { constructMetadata, generateBreadcrumbJsonLd } from '../../lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Visual Monoliths & Spatial Renders // KingShadP',
  description:
    'Explore KingShadP’s visual archive of raytraced sculptures, volumetric lighting studies, obsidian monoliths, and photographic monographs.',
  path: '/visuals',
  ogImage: '/THE GIRAGON.png',
  keywords: ['KingShadP Visuals', 'Giragon Sculpture', 'Raytraced Monoliths', 'Obsidian Composite', 'Spatial Studies'],
});

export default function VisualsIndexPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Visuals', path: '/visuals' },
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
            KINGSHADP // SANCTUM
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/music" className="text-white/60 hover:text-[#B76E79] transition-colors">
            MUSIC
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

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#B76E79]">VISUAL MONOLITHS</span>
        </nav>

        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold">
            SPATIAL ARTIFACTS & STUDIES
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-white">
            Visual Archive
          </h1>
          <p className="text-sm sm:text-base font-light text-white/70 max-w-2xl leading-relaxed">
            Raytraced sculptures, volumetric obsidian environments, and identity monographs translating acoustic frequency into physical and virtual matter.
          </p>
        </div>

        {/* Grid of Visual Artworks */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visualAssets.map((asset, idx) => (
            <article
              key={asset.id}
              className="flex flex-col rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all group"
            >
              <Link href={`/visuals/${asset.id}`} className="relative aspect-square w-full overflow-hidden bg-black/40">
                <Image
                  src={asset.src}
                  alt={asset.title}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono tracking-widest uppercase text-[#B76E79]">
                  {asset.era}
                </div>
              </Link>

              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                    {asset.medium}
                  </span>
                  <Link href={`/visuals/${asset.id}`}>
                    <h2 className="text-xl font-serif font-light text-white group-hover:text-[#B76E79] transition-colors">
                      {asset.title}
                    </h2>
                  </Link>
                  <p className="text-xs font-light text-white/60 line-clamp-2 leading-relaxed">
                    {asset.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/40 tracking-wider">
                    {asset.dimensions || '4K Digital Master'}
                  </span>
                  <Link
                    href={`/visuals/${asset.id}`}
                    className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79] font-bold flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>STUDY SPEC</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
