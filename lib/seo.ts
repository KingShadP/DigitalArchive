import type { Metadata } from 'next';
import { SITE_CONFIG, getAbsoluteUrl } from './siteConfig';
import { Release, Track } from '../data/releases';
import { VisualAsset } from '../data/visuals';
import { ArchiveRecord } from '../data/archive';
import { Product } from '../data/products';

export interface PageSeoProps {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article' | 'music.song' | 'music.album' | 'profile';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
}

export function constructMetadata({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = SITE_CONFIG.defaultOgImage,
  publishedTime,
  modifiedTime,
  noindex = false,
  keywords = [],
}: PageSeoProps): Metadata {
  const canonicalUrl = getAbsoluteUrl(path);
  const fullTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${title} | ${SITE_CONFIG.name}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : getAbsoluteUrl(ogImage);

  const defaultKeywords = [
    'KingShadP',
    'Behold the Twisted Beast',
    '432 Hz Music',
    'Sanctum Archive',
    'Acoustic Engineering',
    'Giragon',
    'Subtractive Architecture',
    'Orchestral Pop',
    'Sub-Bass 28Hz',
    'Digital Archive',
    'Visual Monolith',
    'MLA Professional Profile',
  ];

  return {
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...keywords, ...defaultKeywords])),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_CONFIG.name}`,
        },
      ],
      locale: 'en_US',
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: SITE_CONFIG.twitterHandle,
      images: [imageUrl],
    },
    metadataBase: new URL(SITE_CONFIG.productionUrl),
  };
}

/* ========================================================================= */
/* STRUCTURED DATA (JSON-LD) GENERATORS                                      */
/* ========================================================================= */

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: ['KingShadP Archive', 'KingShadP Sanctum Codex'],
    url: getAbsoluteUrl('/'),
    description: SITE_CONFIG.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: getAbsoluteUrl('/about'),
      sameAs: SITE_CONFIG.sameAs,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${getAbsoluteUrl('/archive')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'KingShadP',
    url: getAbsoluteUrl('/about'),
    image: getAbsoluteUrl('/KINGSHADP PHOTO.png'),
    jobTitle: 'Composer, Creative Director & Multi-Disciplinary Artist',
    description:
      'KingShadP is an artist and sound architect known for subtractive architecture, 432 Hz Pythagorean compositions, and the Sanctum multi-disciplinary universe.',
    sameAs: SITE_CONFIG.sameAs,
    worksFor: {
      '@type': 'Organization',
      name: 'KingShadP Sanctum Archive',
      url: getAbsoluteUrl('/'),
    },
  };
}

export function generateMusicAlbumJsonLd(release: Release) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: release.title,
    byArtist: {
      '@type': 'MusicGroup',
      name: release.artist,
      url: getAbsoluteUrl('/about'),
    },
    genre: release.genre,
    datePublished: release.releaseDate || `${release.year}-06-19`,
    image: getAbsoluteUrl(release.artwork),
    url: getAbsoluteUrl('/music'),
    numTracks: release.tracks.length,
    track: release.tracks.map((t, idx) => ({
      '@type': 'MusicRecording',
      name: t.title,
      position: idx + 1,
      duration: `PT${t.duration.replace(':', 'M')}S`,
      url: getAbsoluteUrl(`/music/${t.id}`),
    })),
  };
}

export function generateMusicRecordingJsonLd(track: Track, release: Release) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: track.title,
    byArtist: {
      '@type': 'MusicGroup',
      name: track.artist,
      url: getAbsoluteUrl('/about'),
    },
    inAlbum: {
      '@type': 'MusicAlbum',
      name: release.title,
      url: getAbsoluteUrl('/music'),
    },
    duration: `PT${track.duration.replace(':', 'M')}S`,
    audio: getAbsoluteUrl(track.audioSrc),
    url: getAbsoluteUrl(`/music/${track.id}`),
    image: getAbsoluteUrl(release.artwork),
    genre: release.genre,
    datePublished: release.releaseDate || `${release.year}-06-19`,
    description: track.notes || `${track.title} recorded in ${track.tuning} tuning by ${track.artist}.`,
  };
}

export function generateVisualArtworkJsonLd(asset: VisualAsset) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: asset.title,
    creator: {
      '@type': 'Person',
      name: 'KingShadP',
      url: getAbsoluteUrl('/about'),
    },
    artform: asset.category,
    artMedium: asset.materials || asset.medium,
    dateCreated: `${asset.year}`,
    image: getAbsoluteUrl(asset.src),
    url: getAbsoluteUrl(`/visuals/${asset.id}`),
    description: asset.notes,
  };
}

export function generateArticleJsonLd(record: ArchiveRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: record.title,
    description: record.description,
    author: {
      '@type': 'Person',
      name: record.author || 'KingShadP',
      url: getAbsoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/KINGSHADP-logos_transparent.png'),
      },
    },
    image: getAbsoluteUrl(record.thumbnail),
    datePublished: `${record.year}-01-01`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getAbsoluteUrl(`/archive/${record.id}`),
    },
    articleBody: record.manuscriptText || record.description,
  };
}

export function generateProductJsonLd(product: Product) {
  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [getAbsoluteUrl(product.primaryImage), getAbsoluteUrl(product.detailImage)],
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      url: getAbsoluteUrl(`/shop/${product.id}`),
      priceCurrency: 'USD',
      price: numericPrice,
      availability:
        product.availability === 'AVAILABLE'
          ? 'https://schema.org/InStock'
          : product.availability === 'PRE-ORDER'
          ? 'https://schema.org/PreOrder'
          : 'https://schema.org/SoldOut',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}
