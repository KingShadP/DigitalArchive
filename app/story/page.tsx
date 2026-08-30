import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Compass, Sparkles, Feather } from 'lucide-react';
import { constructMetadata, generateBreadcrumbJsonLd } from '../../lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Story & Manifesto // Subtractive Architecture',
  description:
    'The creative philosophy and manifesto of KingShadP: subtractive architecture, sovereign presence, subterranean acoustics, and permanent evidence.',
  path: '/story',
  ogImage: '/KINGSHADP PHOTO.png',
  keywords: ['KingShadP Story', 'Sanctum Manifesto', 'Subtractive Architecture', 'Creative Codex', 'Sovereign Presence'],
});

export default function StoryPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Story', path: '/story' },
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
          <Link href="/visuals" className="text-white/60 hover:text-[#B76E79] transition-colors">
            VISUALS
          </Link>
          <Link href="/archive" className="text-white/60 hover:text-[#B76E79] transition-colors">
            ARCHIVE
          </Link>
          <Link href="/shop" className="text-white/60 hover:text-[#B76E79] transition-colors">
            SHOP
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#B76E79]">MANIFESTO & STORY</span>
        </nav>

        {/* Hero Manifesto Header */}
        <section className="space-y-4 border-b border-white/10 pb-10">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold block">
            SANCTUM MANIFESTO // VOL 01
          </span>
          <h1 className="text-3xl sm:text-6xl font-serif font-light text-white tracking-tight leading-tight">
            Subtractive Architecture <br />
            <span className="italic font-editorial text-[#B76E79]">& Subterranean Grace.</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-white/70 max-w-2xl leading-relaxed">
            Everything I make leaves evidence. Art is not merely the addition of ornament—it is the deliberate subtraction of noise until only sovereign resonance remains.
          </p>
        </section>

        {/* Editorial Text Essay */}
        <article className="space-y-8 font-light text-base sm:text-lg text-white/80 leading-relaxed font-sans">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-white font-light">
              I. The Principle of Subtraction
            </h2>
            <p>
              In contemporary culture, sound and vision are overwhelmed by saturation. Every frequency is compressed into loudness; every frame is crowded with hyper-stimulation. KingShadP operates on an inverted ethos: <em>subtractive architecture</em>. By carving away unnecessary frequencies and geometric distractions, what remains is endowed with immense spatial gravity.
            </p>
            <p>
              When a 28Hz sub-bass harmonic resonates in an acoustic chamber, it does not seek attention through volume—it asserts presence through foundational weight. The same holds true for spatial monoliths and physical maquettes.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-2xl font-serif text-white font-light">
              II. The Pythagorean 432 Hz Cadence
            </h2>
            <p>
              Standard commercial music is tuned to 440 Hz—a frequency that produces tension and cognitive fatigue over extended exposure. Every composition within the KingShadP Sanctum is tuned directly to 432 Hz Pythagorean harmonic ratios. This creates natural overtone alignments that mirror biological rhythms and celestial geometry.
            </p>
            <p>
              In <em>Behold the Twisted Beast</em>, cathedral brass meets heavy low-end decay intervals, constructing an environment where regal dignity and raw emotional truth coexist without compromise.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-2xl font-serif text-white font-light">
              III. The Physical & Virtual Continuity
            </h2>
            <p>
              The digital realm is not distinct from physical matter. A song, a 3D raytraced sculpture, a 180g virgin vinyl pressing, and a 312-page monograph are all expressions of the same unified creative lineage. Nothing is disposable; every release is permanently archived and cryptographically documented.
            </p>
          </section>
        </article>

        {/* Cross-Link Routing */}
        <section className="border-t border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/music"
            className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">DISCOGRAPHY</span>
            <h3 className="text-base font-serif text-white group-hover:text-[#B76E79] mt-2">
              Listen to the 432 Hz Compositions
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>EXPLORE MUSIC</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <Link
            href="/about"
            className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex flex-col justify-between group"
          >
            <span className="text-[9px] font-mono text-[#B76E79] uppercase">EXECUTIVE PROFILE</span>
            <h3 className="text-base font-serif text-white group-hover:text-[#B76E79] mt-2">
              Read KingShadP’s Profile & Credentials
            </h3>
            <span className="text-[10px] font-mono text-white/40 mt-4 flex items-center gap-1">
              <span>ABOUT KINGSHADP</span>
              <ArrowUpRight size={12} />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
