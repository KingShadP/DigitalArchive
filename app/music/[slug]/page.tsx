import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getReleaseBySlug, RELEASES } from '@/lib/music-data';
import { ReleaseDetailClient } from '@/components/music/release-detail-client';

export async function generateStaticParams() {
  return RELEASES.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    return {
      title: 'Sonic Vault | KingShadP',
      description: 'Release not found in the Sonic Vault archive.',
    };
  }

  const description = release.editorial || release.notes || `Explore ${release.title} in the KingShadP Sonic Vault.`;

  return {
    title: `${release.title} | KingShadP Sonic Vault`,
    description,
    openGraph: {
      title: `${release.title} | KingShadP Sonic Vault`,
      description,
      images: release.artwork?.url ? [{ url: release.artwork.url, alt: release.artwork.alt || release.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${release.title} | KingShadP Sonic Vault`,
      description,
      images: release.artwork?.url ? [release.artwork.url] : undefined,
    },
  };
}

export default async function ReleaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  return <ReleaseDetailClient release={release} />;
}
