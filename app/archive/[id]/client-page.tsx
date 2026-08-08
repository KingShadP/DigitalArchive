'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArchiveArtifact, ARCHIVE_ARTIFACTS } from '@/lib/archive-data';
import { MonoLabel } from '@/components/system';
import Link from 'next/link';
import Image from 'next/image';
import { ArtifactImage } from '@/components/artifact-image';
import { ArrowLeft, ExternalLink, Hash, Clock, Folder, Package, Link2 } from 'lucide-react';

export function ArchiveDetailClient({ artifact }: { artifact: ArchiveArtifact }) {
  const relatedArtifacts = artifact.relatedIds 
    ? ARCHIVE_ARTIFACTS.filter(a => artifact.relatedIds!.includes(a.id))
    : [];

  return (
    <main className="min-h-screen text-foreground pb-32 pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link href="/archive" className="inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={12} /> BACK TO DIRECTORY
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border/50 pb-8 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-foreground text-background px-3 py-1 font-mono text-[9px] uppercase tracking-widest">
                  {artifact.artifactClass}
                </span>
                <span className="font-mono text-[9px] text-foreground/50 uppercase tracking-widest">
                  ID: {artifact.id}
                </span>
                <span className="font-mono text-[9px] text-foreground/50 uppercase tracking-widest">
                  DATE: {artifact.date}
                </span>
              </div>
              <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none mb-4">
                {artifact.title}
              </h1>
              {artifact.subtitle && (
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/60">
                  {artifact.subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Layout based on media presence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Main Media Column */}
          <div className="lg:col-span-8">
            {artifact.media && artifact.media.length > 0 ? (
              <div className="space-y-8">
                {artifact.media.map((m, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1) }}
                    className="w-full bg-surface/20 border border-border/30 p-2"
                  >
                    {m.type === 'image' ? (
                      <div className="relative w-full h-auto flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image src={m.masterUrl} alt={artifact.title} width={1920} height={1080} className="w-full h-auto object-contain max-h-[80vh]" unoptimized />
                      </div>
                    ) : (
                      <div className="aspect-video bg-surface/50 flex items-center justify-center font-mono text-xs text-foreground/40">
                        [MEDIA TYPE NOT RENDERABLE: {m.type}]
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="w-full aspect-video bg-surface/10 border border-border/20 flex flex-col items-center justify-center text-foreground/30 font-mono text-[10px] uppercase tracking-widest">
                <Package size={24} className="mb-4 opacity-30" />
                <span>NO MASTER MEDIA ON FILE</span>
              </div>
            )}

            {/* Description & Lore */}
            <div className="mt-16 space-y-16 max-w-3xl">
              {artifact.description && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <MonoLabel className="mb-6 text-foreground/40">DESCRIPTION</MonoLabel>
                  <div className="font-serif italic text-2xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {artifact.description}
                  </div>
                </motion.div>
              )}

              {artifact.lore && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="p-8 border border-border/30 bg-surface/20"
                >
                  <MonoLabel className="mb-6 text-foreground/40 text-accent">EXTENDED LORE // SECURE</MonoLabel>
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">
                    {artifact.lore}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-32 space-y-12"
            >
              {/* Classification Info */}
              <div className="space-y-6">
                <MonoLabel className="border-b border-border/50 pb-4 block">CLASSIFICATION</MonoLabel>
                <div className="space-y-4">
                  {artifact.project && (
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40 flex items-center gap-2"><Folder size={10} /> PROJECT</span>
                      <span className="font-mono text-[11px] uppercase tracking-widest">{artifact.project}</span>
                    </div>
                  )}
                  {artifact.collection && (
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40 flex items-center gap-2"><Hash size={10} /> COLLECTION</span>
                      <span className="font-mono text-[11px] uppercase tracking-widest">{artifact.collection}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40 flex items-center gap-2"><Clock size={10} /> ORIGIN DATE</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest">{artifact.date}</span>
                  </div>
                </div>
              </div>

              {/* Technical Specs / Metadata */}
              {artifact.metadata && Object.keys(artifact.metadata).length > 0 && (
                <div className="space-y-6">
                  <MonoLabel className="border-b border-border/50 pb-4 block">TECHNICAL SPECIFICATIONS</MonoLabel>
                  <div className="space-y-4 pt-2">
                    {Object.entries(artifact.metadata).map(([key, value]) => (
                      <div key={key} className="flex flex-col md:flex-row md:items-start justify-between gap-2 border-b border-border/20 pb-3">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 w-1/3 flex-shrink-0">{key}</span>
                        <span className="font-mono text-[10px] text-right md:w-2/3">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Relationships */}
              {relatedArtifacts.length > 0 && (
                <div className="space-y-6">
                  <MonoLabel className="border-b border-border/50 pb-4 block">RELATED ARTIFACTS</MonoLabel>
                  <div className="flex flex-col gap-3">
                    {relatedArtifacts.map(related => (
                      <Link 
                        key={related.id} 
                        href={`/archive/${related.id}`}
                        className="group flex items-center gap-4 p-3 border border-border/30 hover:border-foreground/50 bg-surface/10 hover:bg-surface/30 transition-all"
                      >
                        <div className="w-12 h-12 relative flex-shrink-0 bg-surface border border-border/50">
                          {related.media && related.media.length > 0 && (
                            <ArtifactImage src={related.media[0].thumbnailUrl} alt="" className="w-full h-full" />
                          )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-mono text-[9px] text-foreground/40 uppercase tracking-widest mb-1">{related.artifactClass}</span>
                          <span className="font-serif italic text-sm truncate group-hover:text-foreground/80">{related.title}</span>
                        </div>
                        <Link2 size={12} className="ml-auto text-foreground/20 group-hover:text-foreground/60 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
