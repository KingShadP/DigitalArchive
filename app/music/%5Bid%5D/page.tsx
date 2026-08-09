import React from 'react';
import { notFound } from 'next/navigation';
import { RELEASES } from '@/lib/music-data';
import { MonoLabel } from '@/components/system';
import Link from 'next/link';
import { ArrowLeft, Play, Square, Activity } from 'lucide-react';
import Image from 'next/image';
import { ReleaseDetailClient } from './client-page';

// Pre-render all known releases
export function generateStaticParams() {
  return RELEASES.map((r) => ({
    id: r.id,
  }));
}

export default async function ReleasePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const release = RELEASES.find(r => r.id === resolvedParams.id);

  if (!release) {
    notFound();
  }

  return <ReleaseDetailClient release={release} />;
}
