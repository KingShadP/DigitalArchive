import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Box, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { visualAssets, VisualAsset } from '../../../data/visuals';
import { constructMetadata, generateVisualArtworkJsonLd, generateBreadcrumbJsonLd } from '../../../lib/seo';

interface VisualDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function findVisualBySlug(slug: string): VisualAsset | null {
  const normalized = slug.toLowerCase().trim();
  return (
    visualAssets.find(
      (v) =>
        v.id.toLowerCase() === normalized ||
        v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === normalized
    ) || null
  );
}

export async function generateStaticParams() {
  return visualAssets.map((v) => ({
    slug: v.id,
  }));
}

export async function generateMetadata({ params }: VisualDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const asset = findVisualBySlug(slug);

  if (!asset) {
    return constructMetadata({
      title: 'Visual Asset Not Found',
      description: 'The requested artwork or spatial render does not exist in the KingShadP archive.',
      path: `/visuals/${slug}`,
      noindex: true,
    });
  }

  return constructMetadata({
    title: `${asset.title} // KingShadP Visuals`,
    description: asset.notes || `Spatial visual study and artwork: ${asset.title} by KingShadP.`,
    path: `/visuals/${asset.id}`,
    ogImage: asset.src,
    keywords: [
      asset.title,
      'KingShadP',
      asset.medium,
      asset.category,
      asset.era,
      'Spatial Study',
      'Raytraced Monolith',
    ],
  });
}

export default async function VisualDetailPage({ params }: VisualDetailPageProps) {
  const { slug } = await params;
  const asset = findVisualBySlug(slug);

  if (!asset) {
    notFound();
  }

  const artworkSchema = generateVisualArtworkJsonLd(asset);
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Visuals', path: '/visuals' },
    { name: asset.title, path: `/visuals/${asset.id}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artworkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link
          href="/visuals"
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO VISUALS</span>
        </Link>

        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/music" className="text-white/60 hover:text-[#B76E79] transition-colors">
            MUSIC
          </Link>
          <Link href="/archive" className="text-white/60 hover:text-[#B76E79] transition-colors">
            ARCHIVE
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-[#B76E79] transition-colors">
            SHOP
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/visuals" className="hover:text-white transition-colors">VISUALS</Link>
          <span>/</span>
          <span className="text-[#B76E79]">{asset.title}</span>
        </nav>

        {/* High-Resolution Artwork Stage */}
        <section className="relative w-full aspect-square sm:aspect-[16/10] max-h-[700px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-950">
          <Image
            src={asset.src}
            alt={asset.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain sm:object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] font-mono tracking-widest text-[#B76E79] uppercase">
            {asset.era} // {asset.year}
          </div>
        </section>

        {/* Study Details and Architectural Notes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold block">
                {asset.medium}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
                {asset.title}
              </h1>
            </div>

            <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed bg-white/[0.02] p-6 rounded-lg border border-white/10">
              {asset.notes}
            </p>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-4 text-xs font-mono">
              <h2 className="text-sm font-serif font-light text-white border-b border-white/10 pb-2">
                Physical & Virtual Specs
              </h2>
              <div>
                <span className="text-white/40 block text-[9px]">DIMENSIONS</span>
                <span className="text-white font-semibold">{asset.dimensions || '4K Master Keyframe'}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px]">MATERIALS</span>
                <span className="text-white font-semibold">{asset.materials || asset.medium}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px]">DISCIPLINARY CATEGORY</span>
                <span className="text-[#B76E79] uppercase font-bold">{asset.category}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Disciplinary Cross-Links */}
        <section className="border-t border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/music/track-01"
            className="p-5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">ACOUSTIC KEY</span>
            <h3 className="text-sm font-serif text-white group-hover:text-[#B76E79] mt-2">
              Behold the Twisted Beast (432 Hz)
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>LISTEN TO AUDIO</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <Link
            href="/archive/arch-002"
            className="p-5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">ARCHIVE MANUSCRIPT</span>
            <h3 className="text-sm font-serif text-white group-hover:text-[#B76E79] mt-2">
              Giragon Sculpture Study Dossier
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>VIEW DOSSIER</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <Link
            href="/shop/giragon-sculpture-maquette"
            className="p-5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">PHYSICAL MONOLITH</span>
            <h3 className="text-sm font-serif text-white group-hover:text-[#B76E79] mt-2">
              Giragon Obsidian Maquette ($850)
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>VIEW SHOP ITEM</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
