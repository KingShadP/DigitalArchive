// Centralized Production SEO and Site Configuration for KingShadP Archive

export const SITE_CONFIG = {
  name: 'KingShadP',
  legalName: 'KingShadP Sanctum Archive',
  tagline: 'Everything I Make Leaves Evidence.',
  description:
    'Standalone cinematic scroll-tied audio experience, architectural visual gallery, 432 Hz discography, and permanent digital archive for KingShadP.',
  productionUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kingshadp.com',
  defaultOgImage: '/twisted-beast-cover.png',
  twitterHandle: '@kingshadp',
  author: {
    name: 'KingShadP',
    url: 'https://kingshadp.com',
    role: 'Composer, Creative Director & Multi-Disciplinary Artist',
  },
  sameAs: [
    'https://open.spotify.com/artist/KingShadP',
    'https://music.apple.com/artist/kingshadp',
    'https://youtube.com/@kingshadp',
    'https://soundcloud.com/kingshadp',
    'https://instagram.com/kingshadp',
  ],
  contact: {
    email: 'transmission@kingshadp.com',
    location: 'Tokyo // Los Angeles // Global Sanctum',
  },
};

export function getAbsoluteUrl(path = ''): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : SITE_CONFIG.productionUrl)
  ).replace(/\/$/, '');

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
