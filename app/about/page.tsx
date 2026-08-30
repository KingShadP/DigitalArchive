import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Mail, Globe, MapPin, Award } from 'lucide-react';
import { constructMetadata, generatePersonJsonLd, generateBreadcrumbJsonLd } from '../../lib/seo';
import { SITE_CONFIG } from '../../lib/siteConfig';

export const metadata: Metadata = constructMetadata({
  title: 'About KingShadP // Executive Profile & Biography',
  description:
    'Official biography, credentials, and executive profile of KingShadP—composer, spatial architect, and creative director behind the Sanctum universe.',
  path: '/about',
  ogType: 'profile',
  ogImage: '/KINGSHADP PHOTO.png',
  keywords: ['About KingShadP', 'KingShadP Bio', 'Composer', 'Creative Director', 'Sanctum Archive', 'Executive Dossier'],
});

export default function AboutPage() {
  const personSchema = generatePersonJsonLd();
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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

      <main className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#B76E79]">EXECUTIVE PROFILE</span>
        </nav>

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-b border-white/10 pb-12">
          <div className="md:col-span-5 relative aspect-[4/5] w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-950">
            <Image
              src="/KINGSHADP PHOTO.png"
              alt="KingShadP Executive Portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover"
            />
          </div>

          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold block">
                EXECUTIVE ARTIST PROFILE
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-light tracking-tight text-white">
                KingShadP
              </h1>
              <p className="text-sm font-mono text-white/60">
                Composer · Creative Director · Spatial Sound Architect
              </p>
            </div>

            <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed">
              Operating at the intersection of classical acoustics, subtractive architecture, and raytraced digital sculpture, KingShadP constructs cohesive artistic universes where music, objects, and philosophy form a permanent evidentiary lineage.
            </p>

            <div className="flex flex-col gap-2 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#B76E79]" />
                <span>Tokyo // Los Angeles // Global Sanctum</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#B76E79]" />
                <span>transmission@kingshadp.com</span>
              </div>
            </div>
          </div>
        </section>

        {/* Official Channels & Verified SameAs */}
        <section className="space-y-6">
          <h2 className="text-xl font-serif font-light text-white">
            Verified Platforms & Official Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SITE_CONFIG.sameAs.map((url) => {
              const domain = new URL(url).hostname.replace('www.', '');
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#B76E79]/50 transition-all flex items-center justify-between group"
                >
                  <span className="text-xs font-mono text-white group-hover:text-[#B76E79] uppercase">
                    {domain}
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-white" />
                </a>
              );
            })}
          </div>
        </section>

        {/* Transmission Protocol */}
        <section className="p-8 rounded-xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79]">
              COMMUNICATION CHANNEL
            </span>
            <h2 className="text-xl font-serif text-white">
              Send an Official Transmission
            </h2>
            <p className="text-xs text-white/60">
              Direct all architectural inquiries, synchronization requests, and press dispatches to the Sanctum desk.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#050505] border border-white/10 font-mono text-xs text-white/80 space-y-1">
            <p><span className="text-white/40">DESK:</span> ARCHIVAL RELATIONS</p>
            <p><span className="text-white/40">ENCRYPTION:</span> PGP 4096-BIT ACTIVE</p>
            <p><span className="text-white/40">RESPONSE TIME:</span> 24–48 ARCHIVAL HOURS</p>
          </div>
        </section>
      </main>
    </div>
  );
}
