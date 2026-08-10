'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MonoLabel } from '@/components/system';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, Music, Shield, User, FileText, ChevronRight, 
  Search, ArrowUpRight, Award, Disc, CheckCircle2, Sparkles, Layers,
  Printer
} from 'lucide-react';

type SectionId = 'overview' | 'biography' | 'musical-direction' | 'discography' | 'credits' | 'giragon-identity' | 'faqs';

export function CatalogueClient() {
  const [activeTab, setActiveTab] = useState<SectionId>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: { id: SectionId; label: string; count?: string }[] = [
    { id: 'overview', label: '00 // AT A GLANCE' },
    { id: 'biography', label: '01 // BIOGRAPHY' },
    { id: 'musical-direction', label: '02 // SONIC DIRECTION' },
    { id: 'discography', label: '03 // DISCOGRAPHY' },
    { id: 'credits', label: '04 // CREDITS MATRIX' },
    { id: 'giragon-identity', label: '05 // GIRAGON MYTHOS' },
    { id: 'faqs', label: '06 // VERIFIED FAQS' },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-32 px-4 sm:px-8 md:px-12 selection:bg-[#93000a] selection:text-foreground">
      {/* Background Subtle Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#93000a_0%,_transparent_45%)]" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle_at_bottom_left,_#dcc57b_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <header className="mb-16 border-b border-border-strong pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-[#93000a] animate-pulse" />
                <MonoLabel className="text-accent tracking-[0.25em]">VERIFIED DOSSIER // ARTICLE CATALOGUE</MonoLabel>
              </div>
              <h1 className="font-serif italic text-4xl sm:text-5xl md:text-blackxl font-light tracking-tight text-foreground leading-none">
                KingShadP Catalogue
              </h1>
              <p className="font-serif text-lg md:text-xl text-foreground/60 mt-3 italic max-w-2xl">
                Projects, Biography, Credits, and Source-Verified Article Data for Rashad Anthony Perry & KingShadP Studio.
              </p>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-widest text-foreground/40 border border-border-strong p-4 bg-surface-dim flex flex-col gap-1 min-w-[220px]">
              <div className="flex justify-between"><span className="text-foreground/60">CANONICAL:</span> <span className="text-accent">KingShadP.com</span></div>
              <div className="flex justify-between"><span className="text-foreground/60">PRONUNCIATION:</span> <span className="text-foreground font-bold">KING SHAHD PEE</span></div>
              <div className="flex justify-between"><span className="text-foreground/60">AUTHOR:</span> <span className="text-foreground">Rashad Anthony Perry</span></div>
              <div className="flex justify-between"><span className="text-foreground/60">ORIGIN:</span> <span className="text-foreground">Miami, FL</span></div>
            </div>
          </div>

          {/* Navigation Bar Tabs & Print Trigger */}
          <nav aria-label="Catalogue sections" className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                    activeTab === item.id
                      ? 'border-[#c9c6c5] bg-foreground text-black font-bold shadow-[0_0_20px_rgba(201,198,197,0.2)]'
                      : 'border-border-strong text-foreground/50 hover:border-border-strong hover:text-foreground bg-surface-dim/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest border border-[#dcc57b] text-accent hover:bg-[#dcc57b] hover:text-black transition-all duration-300 bg-surface-dim flex items-center gap-2 font-semibold shadow-sm ml-auto cursor-pointer"
              title="Print formatted catalogue or save as PDF"
            >
              <Printer size={13} />
              <span>PRINT DOSSIER / EXPORT PDF</span>
            </button>
          </nav>
        </header>

        {/* Tab Content Display (Screen Only) */}
        <div className="screen-only">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >

            {/* 00 // AT A GLANCE */}
            {activeTab === 'overview' && (
              <div className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Summary */}
                  <div className="lg:col-span-7 space-y-6">
                    <MonoLabel className="text-accent">EXECUTIVE SUMMARY</MonoLabel>
                    <h2 className="font-serif italic text-3xl sm:text-4xl text-foreground leading-snug">
                      An independent Miami-born recording artist building a connected system of music, visual symbolism, editorial writing, digital design, and limited apparel.
                    </h2>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">
                      KingShadP is an independent recording artist whose work expands beyond traditional music publishing into an integrated creative archive. The music remains the primary creative source, accompanied by the Giragon guardian symbol, a formal visual identity, an official digital archive, and physical product collections.
                    </p>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">
                      Apple Music identifies KingShadP as a Miami, Florida hip-hop and rap artist, while official studio records describe the name as both an independent recording artist and the creative identity behind music, artwork, symbols, garments, and narrative projects.
                    </p>

                    <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="border border-border-strong p-4 bg-surface">
                        <MonoLabel className="text-foreground/50">LATEST RELEASE</MonoLabel>
                        <div className="font-serif italic text-lg text-foreground mt-1">Summons and Supper</div>
                        <div className="font-mono text-[9px] text-accent mt-1">July 14, 2026</div>
                      </div>
                      <div className="border border-border-strong p-4 bg-surface">
                        <MonoLabel className="text-foreground/50">FEATURED SINGLE</MonoLabel>
                        <div className="font-serif italic text-lg text-foreground mt-1">Twisted Beast</div>
                        <div className="font-mono text-[9px] text-accent mt-1">June 19, 2026</div>
                      </div>
                      <div className="border border-border-strong p-4 bg-surface col-span-2 sm:col-span-1">
                        <MonoLabel className="text-foreground/50">MAJOR ALBUM</MonoLabel>
                        <div className="font-serif italic text-lg text-foreground mt-1">Regal Echoes of God</div>
                        <div className="font-mono text-[9px] text-accent mt-1">Feb 15, 2024</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Data Table */}
                  <div className="lg:col-span-5 border border-border-strong bg-surface p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-border-strong pb-4">
                      <MonoLabel className="text-foreground">VERIFIED DATA MATRIX</MonoLabel>
                      <span className="font-mono text-[9px] text-accent px-2 py-0.5 border border-[#93000a]/50">CONFIRMED</span>
                    </div>

                    <div className="space-y-3 font-mono text-[10px]">
                      {[
                        { key: "Artist Name", val: "KingShadP" },
                        { key: "Pronunciation", val: "KING SHAHD PEE" },
                        { key: "Credited Legal Name", val: "Rashad Anthony Perry" },
                        { key: "Origin / Foundation", val: "Miami, Florida, USA" },
                        { key: "Primary Genre", val: "Hip-hop / Rap / Orchestral" },
                        { key: "Current Latest Release", val: "Summons and Supper (July 2026)" },
                        { key: "Major 2023 EP", val: "Unfinished. Unedited. Untitled." },
                        { key: "Major Full Album", val: "Regal Echoes of God (13 tracks)" },
                        { key: "Official Guardian Symbol", val: "The Giragon (Giraffe-Dragon)" },
                        { key: "Official Website", val: "KingShadP.com" },
                        { key: "Spotify Artist ID", val: "7ElnjDMg4TCtoXJPv8nRQS" },
                        { key: "Apple Music ID", val: "1554804908" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1.5 border-b border-border last:border-0">
                          <span className="text-foreground/40 uppercase">{item.key}</span>
                          <span className="text-foreground text-right font-semibold">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Banner / Visual Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
                  <div className="relative aspect-[4/3] border border-border-strong overflow-hidden group">
                    <Image src="/girgonglory.png" alt="Giragon Glory" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                      <MonoLabel className="text-accent">01 // THE GUARDIAN</MonoLabel>
                      <h3 className="font-serif italic text-2xl text-foreground">The Giragon Emblem</h3>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] border border-border-strong overflow-hidden group">
                    <Image src="/twisted-beast-cover.png" alt="Twisted Beast Cover" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                      <MonoLabel className="text-accent">02 // CHOIR SCALE</MonoLabel>
                      <h3 className="font-serif italic text-2xl text-foreground">Behold, the Twisted Beast</h3>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] border border-border-strong overflow-hidden group">
                    <Image src="/background ksp.png" alt="KSP Architecture" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                      <MonoLabel className="text-accent">03 // ALBUM STATEMENT</MonoLabel>
                      <h3 className="font-serif italic text-2xl text-foreground">Regal Echoes of God</h3>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 01 // BIOGRAPHY */}
            {activeTab === 'biography' && (
              <div className="max-w-4xl space-y-12">
                <div>
                  <MonoLabel className="text-accent mb-2 block">SECTION 01</MonoLabel>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-foreground mb-6">
                    Biography: The Person Behind the Artist Name
                  </h2>
                  <p className="font-serif text-xl text-accent italic mb-8 leading-relaxed">
                    Rashad Anthony Perry records and releases music under the name KingShadP, maintaining a distinct boundary between the human author and the public creative brand.
                  </p>
                </div>

                <div className="space-y-8 font-sans text-sm text-foreground/70 leading-relaxed">
                  <div className="border-l-2 border-[#93000a] pl-6 py-2 bg-surface">
                    <h3 className="font-serif italic text-2xl text-foreground mb-3">Miami Origins and Cultural Foundation</h3>
                    <p className="mb-4">
                      Apple Music and Audiomack identify KingShadP as being from Miami, Florida. That origin provides more than a geographic tag. Miami’s musical identity is built from collision: Southern rap, Caribbean rhythm, electronic club culture, bass-heavy production, luxury imagery, immigrant influence, theatrical nightlife, and blunt self-invention all exist within the same city.
                    </p>
                    <p>
                      Miami functions as a foundation rather than a cage. It supplies color, confidence, heat, contradiction, and scale, while later work reaches toward choirs, mythology, sculpture, editorial design, and digital architecture.
                    </p>
                  </div>

                  <div className="border-l-2 border-border-strong pl-6 py-2">
                    <h3 className="font-serif italic text-2xl text-foreground mb-3">From Independent Uploads to a Unified Creative Identity</h3>
                    <p className="mb-4">
                      KingShadP’s early platform history reflects the reality of independent digital music: projects exist across Audiomack, SoundCloud, YouTube, Spotify, and Apple Music. Older songs have been remastered, retitled, or grouped into new collections, as seen in the 24-track archival release <em className="text-foreground">LET’S GET HIGH & MAKE MUSIC</em>.
                    </p>
                    <p>
                      Instead of abandoning early experiments, KingShadP organizes them into a larger living archive. The official studio now separates permanent identity assets—such as the Giragon, halo crown, SP Crest, KSP monogram, and signature wordmark—from ordinary promotional noise.
                    </p>
                  </div>
                </div>

                <div className="border border-border-strong p-8 bg-surface mt-12">
                  <MonoLabel className="text-foreground/50 mb-3 block">AUTHORSHIP STATEMENT</MonoLabel>
                  <blockquote className="font-serif italic text-2xl text-foreground leading-relaxed">
                    &quot;Music is the source. Apparel, campaign imagery, symbols, and archive entries extend that source into other physical and digital forms. A song influences a garment, a garment introduces a symbol, and a symbol becomes an editorial image or written archive subject.&quot;
                  </blockquote>
                  <div className="font-mono text-[10px] text-accent mt-4 uppercase tracking-widest">— KingShadP Studio Archives</div>
                </div>
              </div>
            )}

            {/* 02 // SONIC DIRECTION */}
            {activeTab === 'musical-direction' && (
              <div className="max-w-4xl space-y-12">
                <div>
                  <MonoLabel className="text-accent mb-2 block">SECTION 02</MonoLabel>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-foreground mb-6">
                    Musical Identity & Artistic Direction
                  </h2>
                  <p className="font-serif text-xl text-foreground italic mb-8 leading-relaxed">
                    A sound shaped by cinematic composition, orchestral tension, experimental sound design, melodic contrast, and choir-scale arrangements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-border-strong p-6 bg-surface">
                    <MonoLabel className="text-accent mb-3 block">01 // CINEMATIC SCALE</MonoLabel>
                    <h3 className="font-serif italic text-2xl text-foreground mb-4">Architectural Soundscapes</h3>
                    <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                      Cinematic scale in KingShadP’s catalog appears through pacing, dramatic titles, choirs, orchestral textures, monologue-like delivery, and visual storytelling. Releases like <em className="text-foreground">Behold, the Twisted Beast</em> feature KSP’s Cathedral Regal Choir, while <em className="text-foreground">Summons and Supper</em> carries credits for conducting, producing, composition, lyric writing, and mastering.
                    </p>
                  </div>

                  <div className="border border-border-strong p-6 bg-surface">
                    <MonoLabel className="text-accent mb-3 block">02 // RECURRING THEMES</MonoLabel>
                    <h3 className="font-serif italic text-2xl text-foreground mb-4">Identity, Pressure & Ambition</h3>
                    <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                      The songs examine self-invention, survival, and the tension between public presence and private experience. Ambition is dramatized through titles reaching for authority, luxury, divinity, and spectacle (<em className="text-foreground">Regal Echoes of God</em>, <em className="text-foreground">Ice King Shit</em>, <em className="text-foreground">Sacred</em>, <em className="text-foreground">Luxury Shit</em>).
                    </p>
                  </div>
                </div>

                <div className="border border-border-strong p-8 bg-surface">
                  <MonoLabel className="text-foreground/50 mb-4 block">TONAL DIVERSITY IN THE CATALOGUE</MonoLabel>
                  <div className="space-y-4 font-sans text-sm text-foreground/70">
                    <p>
                      The catalog intentionally embraces mood contrasts: a 5-minute piece like <em className="text-foreground">High Like This (Life on Mars)</em> sits directly beside a 23-second interlude (<em className="text-foreground">She&apos;s a Killer, Psychopath Bitchhhhh</em>). This sequencing rejects standard streaming algorithm homogenization in favor of a cinematic sequence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 03 // DISCOGRAPHY */}
            {activeTab === 'discography' && (
              <div className="space-y-12">
                <div>
                  <MonoLabel className="text-accent mb-2 block">SECTION 03</MonoLabel>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-foreground mb-4">
                    Canonical Discography & Release Timeline
                  </h2>
                  <p className="font-serif text-lg text-foreground/70 italic">
                    Mapping the three primary layers of KingShadP&apos;s recording history from 2022 to 2026.
                  </p>
                </div>

                {/* Discography Cards */}
                <div className="space-y-8">
                  {[
                    {
                      title: "Summons and Supper",
                      type: "SINGLE",
                      date: "July 14, 2026",
                      img: "/girgonglory.png",
                      desc: "The latest verified major-platform release. Conducted, produced, and mastered by KingShadP. Composed and written by Rashad Anthony Perry.",
                      details: "Features ceremonial invitation soundscapes, choir structures, and orchestral tension.",
                      href: "/music/summons-and-supper"
                    },
                    {
                      title: "Behold, the Twisted Beast",
                      type: "SINGLE",
                      date: "June 19, 2026",
                      img: "/twisted-beast-cover.png",
                      desc: "Features KSP's Cathedral Regal Choir. Experimental generative synthesis and brutalist sonic architecture.",
                      details: "Accompanied by custom hardware analogue distortion chain and visualizers.",
                      href: "/music/behold-the-twisted-beast"
                    },
                    {
                      title: "Regal Echoes of God",
                      type: "ALBUM (13 TRACKS / 36M 07S)",
                      date: "February 15, 2024",
                      img: "/background ksp.png",
                      desc: "The primary album-length statement containing 13 tracks.",
                      details: "Tracks: Oh You Looking for a Seat?, High Like This (Life on Mars), Sacred, Famous Famous (Famous Amos), Luxury Shit, Jurassic Park, Fu.Th.Bi, Unfortunately Bitches Can't Relax, She's a Killer, A Lil Freestyle, This Is Why I Can't Have Nice Things, Don't, The King Kong and I.",
                      href: "/music/regal-echoes-of-god"
                    },
                    {
                      title: "Unfinished. Unedited. Untitled.",
                      type: "EP (5 TRACKS / ~16 MIN)",
                      date: "September 19, 2023",
                      img: "/hf_20260808_023117_962b19e0-88eb-4e4e-88b4-5b773a65f702.png",
                      desc: "Five-track breakthrough EP embracing raw process in public.",
                      details: "Tracks: Two Things!, Ksp God Flow, Ice King Shit, KingShit, Reality.",
                      href: "/music/unfinished-unedited-untitled"
                    },
                    {
                      title: "LET'S GET HIGH & MAKE MUSIC",
                      type: "ARCHIVAL MIX (24 TRACKS)",
                      date: "August 13, 2022",
                      img: "/hf_20260807_160838_54049bc3-26a4-4b97-9c76-4259cb8d00aa.png",
                      desc: "The foundational Miami digital catalog, remastered and preserved on Audiomack and digital platforms.",
                      details: "Key tracks: MIAMI, 4AM in Miami Freestyle, TRAVEL THE WORLD, ICON, I HAVE A PURPOSE, Apple of my Eye, That Ass!.",
                      href: "/music/lets-get-high-and-make-music"
                    }
                  ].map((rel, idx) => (
                    <div key={idx} className="border border-border-strong bg-surface p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start hover:border-border-strong transition-colors">
                      <div className="relative w-full md:w-48 aspect-square flex-shrink-0 border border-border-strong overflow-hidden">
                        <Image src={rel.img} alt={rel.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap justify-between items-center gap-2 border-b border-border pb-3">
                          <span className="font-mono text-[9px] text-accent tracking-widest">{rel.type}</span>
                          <span className="font-mono text-[9px] text-accent">{rel.date}</span>
                        </div>

                        <h3 className="font-serif italic text-3xl text-foreground">{rel.title}</h3>
                        <p className="font-sans text-sm text-foreground/70 leading-relaxed">{rel.desc}</p>
                        <p className="font-mono text-[10px] text-foreground/40 leading-relaxed">{rel.details}</p>

                        <div className="pt-2">
                          <Link href={rel.href} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-foreground border border-border-strong px-4 py-2 hover:bg-foreground hover:text-black transition-colors">
                            LISTEN IN SONIC VAULT <ArrowUpRight size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 04 // CREDITS MATRIX */}
            {activeTab === 'credits' && (
              <div className="max-w-4xl space-y-12">
                <div>
                  <MonoLabel className="text-accent mb-2 block">SECTION 04</MonoLabel>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-foreground mb-4">
                    Verified Credits & Authorship Matrix
                  </h2>
                  <p className="font-serif text-lg text-foreground/70 italic">
                    Exact breakdown of legal writing credits (Rashad Anthony Perry) and performance/technical roles (KingShadP).
                  </p>
                </div>

                <div className="border border-border-strong bg-surface p-6 space-y-6">
                  <MonoLabel className="text-foreground block border-b border-border-strong pb-3">RECORDING-BY-RECORDING CREDITS</MonoLabel>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead>
                        <tr className="border-b border-border-strong text-foreground/50 uppercase">
                          <th className="py-3 px-2">Work Title</th>
                          <th className="py-3 px-2">Performance</th>
                          <th className="py-3 px-2">Songwriting / Composition</th>
                          <th className="py-3 px-2">Production & Technical</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#141414] text-foreground">
                        <tr>
                          <td className="py-3 px-2 font-bold italic font-serif text-base text-foreground">Summons and Supper</td>
                          <td className="py-3 px-2">KingShadP</td>
                          <td className="py-3 px-2 text-accent">Rashad Anthony Perry</td>
                          <td className="py-3 px-2">Conductor, Producer, Mastering (KingShadP)</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-bold italic font-serif text-base text-foreground">Behold, the Twisted Beast</td>
                          <td className="py-3 px-2">KingShadP ft. Cathedral Regal Choir</td>
                          <td className="py-3 px-2 text-accent">Rashad Anthony Perry</td>
                          <td className="py-3 px-2">Producer, Mix, Mastering (KingShadP)</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-bold italic font-serif text-base text-foreground">Regal Echoes of God (Album)</td>
                          <td className="py-3 px-2">KingShadP</td>
                          <td className="py-3 px-2 text-accent">Rashad Anthony Perry</td>
                          <td className="py-3 px-2">Executive Producer (KingShadP)</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-bold italic font-serif text-base text-foreground">Two Things! / Ice King Shit</td>
                          <td className="py-3 px-2">KingShadP</td>
                          <td className="py-3 px-2 text-accent">Rashad Anthony Perry</td>
                          <td className="py-3 px-2">KingShadP Studio</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-bold italic font-serif text-base text-foreground">Apple of my Eye</td>
                          <td className="py-3 px-2">KingShadP</td>
                          <td className="py-3 px-2 text-foreground/40">Archival Metadata</td>
                          <td className="py-3 px-2">Producer: KingShadP</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-bold italic font-serif text-base text-foreground">That Ass!</td>
                          <td className="py-3 px-2">KingShadP</td>
                          <td className="py-3 px-2 text-foreground/40">Archival Metadata</td>
                          <td className="py-3 px-2">Producer: beatdemons</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 border border-border-strong bg-surface-dim space-y-3 font-sans text-xs text-foreground/70">
                  <MonoLabel className="text-accent block">METHODOLOGY NOTE</MonoLabel>
                  <p>
                    Stage names, legal names, distributor metadata, and platform formatting can make the same author appear under different labels. Legal composition rights are registered to <strong className="text-foreground">Rashad Anthony Perry</strong>, while performance, conducting, mastering, and studio production are credited under <strong className="text-foreground">KingShadP</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* 05 // GIRAGON MYTHOS */}
            {activeTab === 'giragon-identity' && (
              <div className="max-w-4xl space-y-12">
                <div>
                  <MonoLabel className="text-accent mb-2 block">SECTION 05</MonoLabel>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-foreground mb-4">
                    The Giragon & Studio Identity System
                  </h2>
                  <p className="font-serif text-xl text-accent italic">
                    The official guardian symbol and visual brand hierarchy of KingShadP Studio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-border-strong bg-surface p-8">
                  <div className="md:col-span-5 relative aspect-square border border-border-strong overflow-hidden">
                    <Image src="/girgonglory.png" alt="Giragon Emblem" fill className="object-cover" />
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <MonoLabel className="text-accent">GUARDIAN SYMBOL</MonoLabel>
                    <h3 className="font-serif italic text-3xl text-foreground">The Giragon Mythology</h3>
                    <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                      The Giragon is the official guardian symbol of KingShadP Studio. It combines the height and long-range vision of a giraffe with the wings, memory, and defensive force of a dragon. Official descriptions associate the figure with vision, survival, restraint, elegance, transformation, and identity under pressure.
                    </p>
                    <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                      It is explicitly presented as an emblem, witness, and protector of the living archive rather than a disposable mascot.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-border-strong p-5 bg-surface">
                    <MonoLabel className="text-foreground/50">MARK 01</MonoLabel>
                    <div className="font-serif italic text-xl text-foreground mt-2">The Giragon</div>
                    <div className="font-mono text-[9px] text-foreground/40 mt-1">Guardian Emblem</div>
                  </div>
                  <div className="border border-border-strong p-5 bg-surface">
                    <MonoLabel className="text-foreground/50">MARK 02</MonoLabel>
                    <div className="font-serif italic text-xl text-foreground mt-2">Halo Crown</div>
                    <div className="font-mono text-[9px] text-foreground/40 mt-1">Regal Monolith</div>
                  </div>
                  <div className="border border-border-strong p-5 bg-surface">
                    <MonoLabel className="text-foreground/50">MARK 03</MonoLabel>
                    <div className="font-serif italic text-xl text-foreground mt-2">SP Crest</div>
                    <div className="font-mono text-[9px] text-foreground/40 mt-1">Apparel Insignia</div>
                  </div>
                  <div className="border border-border-strong p-5 bg-surface">
                    <MonoLabel className="text-foreground/50">MARK 04</MonoLabel>
                    <div className="font-serif italic text-xl text-foreground mt-2">KSP Monogram</div>
                    <div className="font-mono text-[9px] text-foreground/40 mt-1">Signature Wordmark</div>
                  </div>
                </div>

                <div className="border-t border-border pt-8 font-mono text-[10px] text-foreground/50 flex flex-col sm:flex-row justify-between gap-4">
                  <div>STUDIO MOTTO: <span className="text-foreground">&quot;Originality is the new royalty.&quot;</span></div>
                  <div>OFFICIAL DOMAIN: <span className="text-accent">KingShadP.com</span></div>
                </div>
              </div>
            )}

            {/* 06 // VERIFIED FAQS */}
            {activeTab === 'faqs' && (
              <div className="max-w-4xl space-y-8">
                <div>
                  <MonoLabel className="text-accent mb-2 block">SECTION 06</MonoLabel>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-foreground mb-4">
                    Verified Frequently Asked Questions
                  </h2>
                  <p className="font-serif text-lg text-foreground/70 italic">
                    Source-verified facts and answers directly from the KingShadP dossier.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      q: "Who is KingShadP?",
                      a: "KingShadP (pronounced 'KING SHAHD PEE') is an independent Miami-born hip-hop and rap artist and the recording identity connected to songwriter Rashad Anthony Perry. The name also represents a broader multidisciplinary project involving visual storytelling, original symbols, editorial content, digital experiences, and limited apparel."
                    },
                    {
                      q: "What is KingShadP's latest song?",
                      a: "As of August 2026, the latest verified major-platform release is 'Summons and Supper', released July 14, 2026. It followed 'Behold, the Twisted Beast', which was released June 19, 2026 and features KSP's Cathedral Regal Choir."
                    },
                    {
                      q: "What albums and projects has KingShadP released?",
                      a: "Notable releases include the archival Audiomack collection LET'S GET HIGH & MAKE MUSIC (2022), the five-track EP Unfinished. Unedited. Untitled. (2023), the 13-track album Regal Echoes of God (2024), and the 2026 singles 'Behold, the Twisted Beast' and 'Summons and Supper'."
                    },
                    {
                      q: "What is the Giragon?",
                      a: "The Giragon is the official guardian symbol of KingShadP Studio. It is a giraffe-dragon hybrid representing vision, survival, restraint, elegance, transformation, and identity under pressure. It serves as the emblem and protector of the archive."
                    },
                    {
                      q: "What credits does Rashad Anthony Perry have?",
                      a: "Rashad Anthony Perry is credited in official music metadata as a songwriter, composer, and lyricist on KingShadP releases. KingShadP is also credited in performance and selected technical roles, including producing, conducting, and mastering 'Summons and Supper'."
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="border border-border-strong bg-surface p-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-accent font-bold">Q{idx + 1}.</span>
                        <h3 className="font-serif italic text-2xl text-foreground">{faq.q}</h3>
                      </div>
                      <p className="font-sans text-xs text-foreground/70 leading-relaxed pl-7">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Footer info banner */}
        <footer className="mt-32 pt-8 border-t border-border-strong flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-foreground/30">
          <div>DOSSIER SOURCE: KINGSHADP.COM VERIFIED ARCHIVE</div>
          <div className="flex gap-6">
            <Link href="/music" className="hover:text-foreground transition-colors">SONIC VAULT</Link>
            <Link href="/archive" className="hover:text-foreground transition-colors">LIVING ARCHIVE</Link>
            <a href="https://open.spotify.com/artist/7ElnjDMg4TCtoXJPv8nRQS" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">SPOTIFY</a>
            <a href="https://music.apple.com/artist/1554804908" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">APPLE MUSIC</a>
          </div>
        </footer>
        </div>

        {/* =========================================================================
            PRINT-ONLY COMPREHENSIVE DOSSIER DOCUMENT (Rendered on window.print())
           ========================================================================= */}
        <div className="hidden print-only text-black bg-white p-0 space-y-8 font-serif leading-relaxed">
          {/* Document Header */}
          <div className="border-b-2 border-black pb-4 mb-6">
            <div className="flex justify-between items-baseline font-mono text-xs uppercase tracking-widest text-black">
              <span>KINGSHADP STUDIO // OFFICIAL VERIFIED DOSSIER</span>
              <span>DATE: AUGUST 2026</span>
            </div>
            <h1 className="text-3xl font-bold font-serif italic mt-2 text-black">
              KingShadP Catalogue & Complete Article Data
            </h1>
            <p className="text-sm italic font-serif mt-1 text-black">
              Projects, Biography, Credits, and Source-Verified Data for Rashad Anthony Perry & KingShadP Studio.
            </p>
            <div className="mt-3 pt-3 border-t border-black/30 font-mono text-[9pt] flex justify-between">
              <span>CANONICAL SOURCE: KingShadP.com</span>
              <span>CREDITED AUTHOR: Rashad Anthony Perry</span>
              <span>ORIGIN: Miami, FL</span>
            </div>
          </div>

          {/* Section 00: At a Glance */}
          <section className="print-avoid-break border-b border-black/40 pb-6 space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">00 // AT A GLANCE</div>
            <h2 className="text-xl font-bold italic font-serif text-black">Executive Summary</h2>
            <p className="text-sm text-black leading-relaxed">
              KingShadP is an independent Miami-born hip-hop and rap artist whose work expands into a connected system of music, visual symbolism, editorial writing, digital design, and limited apparel. The credited legal name behind the writing and composition is Rashad Anthony Perry. His Miami roots supply color, confidence, heat, contradiction, and scale, while the later work reaches toward choirs, mythology, sculpture, editorial design, and digital architecture.
            </p>

            <table className="w-full text-xs font-mono border-collapse border border-black my-4">
              <thead>
                <tr className="bg-gray-200 border-b border-black">
                  <th className="p-2 border-r border-black text-left">FIELD</th>
                  <th className="p-2 text-left">VERIFIED DATA</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Artist Name</td><td className="p-1.5">KingShadP (Pronounced &quot;KING SHAHD PEE&quot;)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Credited Legal Name</td><td className="p-1.5">Rashad Anthony Perry</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Origin</td><td className="p-1.5">Miami, Florida, United States</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Primary Genre</td><td className="p-1.5">Hip-hop / Rap / Orchestral Cinematic</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Latest Release</td><td className="p-1.5">Summons and Supper (July 14, 2026)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Featured Choir Single</td><td className="p-1.5">Behold, the Twisted Beast (June 19, 2026)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Major Album</td><td className="p-1.5">Regal Echoes of God (February 15, 2024 - 13 Tracks)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Breakthrough EP</td><td className="p-1.5">Unfinished. Unedited. Untitled. (September 19, 2023)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Archival Mix</td><td className="p-1.5">LET&apos;S GET HIGH & MAKE MUSIC (August 13, 2022 - 24 Tracks)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Guardian Emblem</td><td className="p-1.5">The Giragon (Giraffe-Dragon Hybrid)</td></tr>
              </tbody>
            </table>
          </section>

          {/* Section 01: Biography */}
          <section className="print-avoid-break border-b border-black/40 pb-6 space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">01 // BIOGRAPHY</div>
            <h2 className="text-xl font-bold italic font-serif text-black">Miami Origins & Unified Identity</h2>
            <p className="text-sm text-black leading-relaxed">
              The person behind KingShadP is Rashad Anthony Perry. His name appears in official music metadata as songwriter, composer, and lyricist, while KingShadP appears as the performer and, on selected releases, as producer, conductor, and mastering engineer. That distinction connects the stage identity to the human author without confusing the two.
            </p>
            <p className="text-sm text-black leading-relaxed">
              Miami&apos;s musical identity has long been built from collision: Southern rap, Caribbean rhythm, electronic club culture, bass-heavy production, luxury imagery, immigrant influence, theatrical nightlife, and blunt self-invention all exist within the same city. KingShadP&apos;s catalog uses Miami as a foundation rather than a cage, moving toward choirs, mythology, sculpture, editorial design, and digital architecture.
            </p>
          </section>

          {/* Section 02: Sonic Direction */}
          <section className="print-avoid-break border-b border-black/40 pb-6 space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">02 // SONIC DIRECTION</div>
            <h2 className="text-xl font-bold italic font-serif text-black">Cinematic Scale & Tonal Diversity</h2>
            <p className="text-sm text-black leading-relaxed">
              KingShadP&apos;s music is shaped by cinematic composition, orchestral tension, experimental sound design, melodic contrast, and choir-scale arrangements. Recent releases feature KSP&apos;s Cathedral Regal Choir on &quot;Behold, the Twisted Beast&quot; and formal conducting, production, composition, and mastering credits on &quot;Summons and Supper&quot;. The catalog intentionally embraces mood contrasts: a 5-minute piece sits beside a 23-second interlude, creating a cinematic sequence rather than playlist homogenization.
            </p>
          </section>

          {/* Section 03: Discography */}
          <section className="print-avoid-break border-b border-black/40 pb-6 space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">03 // CANONICAL DISCOGRAPHY</div>
            <h2 className="text-xl font-bold italic font-serif text-black">Release Timeline (2022 – 2026)</h2>

            <div className="space-y-3 text-xs">
              <div className="border border-black p-3">
                <div className="font-bold font-mono uppercase flex justify-between">
                  <span>1. Summons and Supper (Single)</span>
                  <span>July 14, 2026</span>
                </div>
                <p className="mt-1">Latest verified major-platform release. Conducted, produced, and mastered by KingShadP. Composed and written by Rashad Anthony Perry.</p>
              </div>

              <div className="border border-black p-3">
                <div className="font-bold font-mono uppercase flex justify-between">
                  <span>2. Behold, the Twisted Beast (Single)</span>
                  <span>June 19, 2026</span>
                </div>
                <p className="mt-1">Features KSP&apos;s Cathedral Regal Choir. Experimental generative synthesis and brutalist sonic architecture.</p>
              </div>

              <div className="border border-black p-3">
                <div className="font-bold font-mono uppercase flex justify-between">
                  <span>3. Regal Echoes of God (Album - 13 Tracks)</span>
                  <span>February 15, 2024</span>
                </div>
                <p className="mt-1">Primary album-length statement. Contains &apos;High Like This (Life on Mars)&apos;, &apos;Sacred&apos;, &apos;Luxury Shit&apos;, &apos;The King Kong and I&apos;.</p>
              </div>

              <div className="border border-black p-3">
                <div className="font-bold font-mono uppercase flex justify-between">
                  <span>4. Unfinished. Unedited. Untitled. (EP - 5 Tracks)</span>
                  <span>September 19, 2023</span>
                </div>
                <p className="mt-1">Five-track EP: &apos;Two Things!&apos;, &apos;Ksp God Flow&apos;, &apos;Ice King Shit&apos;, &apos;KingShit&apos;, &apos;Reality&apos;.</p>
              </div>

              <div className="border border-black p-3">
                <div className="font-bold font-mono uppercase flex justify-between">
                  <span>5. LET&apos;S GET HIGH & MAKE MUSIC (Archival Mix - 24 Tracks)</span>
                  <span>August 13, 2022</span>
                </div>
                <p className="mt-1">Foundational Miami digital catalog, remastered and preserved on Audiomack. Includes &apos;MIAMI&apos;, &apos;4AM in Miami Freestyle&apos;, &apos;ICON&apos;, &apos;I HAVE A PURPOSE&apos;.</p>
              </div>
            </div>
          </section>

          {/* Section 04: Credits Matrix */}
          <section className="print-avoid-break border-b border-black/40 pb-6 space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">04 // CREDITS MATRIX</div>
            <h2 className="text-xl font-bold italic font-serif text-black">Verified Authorship & Production Roles</h2>

            <table className="w-full text-xs font-mono border-collapse border border-black my-2">
              <thead>
                <tr className="bg-gray-200 border-b border-black">
                  <th className="p-2 border-r border-black text-left">Work Title</th>
                  <th className="p-2 border-r border-black text-left">Performance</th>
                  <th className="p-2 border-r border-black text-left">Songwriting / Composition</th>
                  <th className="p-2 text-left">Production / Engineering</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Summons and Supper</td><td className="p-1.5 border-r border-black">KingShadP</td><td className="p-1.5 border-r border-black">Rashad Anthony Perry</td><td className="p-1.5">Conductor, Producer, Mastering (KingShadP)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Behold, the Twisted Beast</td><td className="p-1.5 border-r border-black">KingShadP ft. Choir</td><td className="p-1.5 border-r border-black">Rashad Anthony Perry</td><td className="p-1.5">Producer, Mix, Mastering (KingShadP)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Regal Echoes of God</td><td className="p-1.5 border-r border-black">KingShadP</td><td className="p-1.5 border-r border-black">Rashad Anthony Perry</td><td className="p-1.5">Executive Producer (KingShadP)</td></tr>
                <tr className="border-b border-black"><td className="p-1.5 border-r border-black font-semibold">Unfinished. Unedited. Untitled.</td><td className="p-1.5 border-r border-black">KingShadP</td><td className="p-1.5 border-r border-black">Rashad Anthony Perry</td><td className="p-1.5">KingShadP Studio</td></tr>
              </tbody>
            </table>
          </section>

          {/* Section 05: Giragon & Mythos */}
          <section className="print-avoid-break border-b border-black/40 pb-6 space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">05 // GIRAGON MYTHOS</div>
            <h2 className="text-xl font-bold italic font-serif text-black">The Guardian Emblem & Brand Hierarchy</h2>
            <p className="text-sm text-black leading-relaxed">
              The Giragon is the official guardian symbol of KingShadP Studio. It combines the height and long-range vision of a giraffe with the wings, memory, and defensive force of a dragon. Official descriptions associate the figure with vision, survival, restraint, elegance, transformation, and identity under pressure.
            </p>
            <div className="font-mono text-xs border border-black p-3 bg-gray-50 flex justify-between">
              <span>OFFICIAL MARKS: Giragon / Halo Crown / SP Crest / KSP Monogram</span>
              <span>MOTTO: &quot;Originality is the new royalty.&quot;</span>
            </div>
          </section>

          {/* Section 06: Verified FAQs */}
          <section className="print-avoid-break space-y-3">
            <div className="font-mono text-[9pt] font-bold uppercase tracking-widest text-black">06 // VERIFIED FAQS</div>
            <h2 className="text-xl font-bold italic font-serif text-black">Key Reference Questions</h2>

            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-black pl-3 py-1">
                <strong>Q: Who is KingShadP?</strong>
                <p>Independent Miami-born hip-hop/rap artist and recording identity connected to songwriter Rashad Anthony Perry.</p>
              </div>
              <div className="border-l-2 border-black pl-3 py-1">
                <strong>Q: What is KingShadP&apos;s latest song?</strong>
                <p>&quot;Summons and Supper&quot;, released July 14, 2026, following &quot;Behold, the Twisted Beast&quot; (June 19, 2026).</p>
              </div>
              <div className="border-l-2 border-black pl-3 py-1">
                <strong>Q: What is the Giragon?</strong>
                <p>The giraffe-dragon guardian symbol representing vision, survival, and identity under pressure for KingShadP Studio.</p>
              </div>
            </div>
          </section>

          {/* Print Document Sign-Off */}
          <div className="pt-8 border-t-2 border-black font-mono text-[9pt] flex justify-between items-end text-black">
            <div>
              <div>OFFICIAL ARCHIVE DOSSIER // KINGSHADP STUDIO</div>
              <div>VERIFIED CANONICAL DOCUMENT: KINGSHADP.COM</div>
            </div>
            <div className="text-right">
              <div>CREDITED AUTHOR: RASHAD ANTHONY PERRY</div>
              <div className="font-bold italic font-serif text-sm">KingShadP</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
