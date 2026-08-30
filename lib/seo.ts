import type { Metadata } from 'next';
import { SEO_DEFAULTS, getSiteUrl, isProductionDeployment } from '@/lib/site-config';

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'music.song' | 'profile';
  noindex?: boolean;
};

const toAbsolute = (path: string) => {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

export const canonicalFor = (path: string) => toAbsolute(path);

export const buildMetadata = ({
  title,
  description,
  path,
  image = SEO_DEFAULTS.defaultOgImage,
  type = 'website',
  noindex,
}: MetadataInput): Metadata => {
  const canonical = toAbsolute(path);
  const robotsNoindex = noindex ?? !isProductionDeployment;

  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical },
    robots: {
      index: !robotsNoindex,
      follow: !robotsNoindex,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName: SEO_DEFAULTS.siteName,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
};

export const jsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
  const graph = Array.isArray(data) ? data : [data];
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }),
  };
};
