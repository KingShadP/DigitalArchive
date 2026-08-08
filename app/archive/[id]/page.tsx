import React from 'react';
import { notFound } from 'next/navigation';
import { ARCHIVE_ARTIFACTS } from '@/lib/archive-data';
import { ArchiveDetailClient } from './client-page';
import { Metadata } from 'next';

export function generateStaticParams() {
  return ARCHIVE_ARTIFACTS.map((artifact) => ({
    id: artifact.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const artifact = ARCHIVE_ARTIFACTS.find((a) => a.id === resolvedParams.id);
  
  if (!artifact) {
    return {
      title: 'Artifact Not Found | KingShadP',
    };
  }

  return {
    title: `${artifact.title} | Archive | KingShadP`,
    description: artifact.description || `View ${artifact.title} in the KingShadP Living Archive.`,
    openGraph: {
      title: `${artifact.title} | Archive | KingShadP`,
      description: artifact.description || `View ${artifact.title} in the KingShadP Living Archive.`,
      images: artifact.media && artifact.media.length > 0 ? [{ url: artifact.media[0].masterUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artifact.title} | Archive | KingShadP`,
      description: artifact.description || `View ${artifact.title} in the KingShadP Living Archive.`,
      images: artifact.media && artifact.media.length > 0 ? [artifact.media[0].masterUrl] : [],
    }
  };
}

export default async function ArtifactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artifact = ARCHIVE_ARTIFACTS.find((a) => a.id === id);

  if (!artifact) {
    notFound();
  }

  return <ArchiveDetailClient artifact={artifact} />;
}
