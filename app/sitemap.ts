import type { MetadataRoute } from 'next';
import { getArchiveEntries, getMusicEntries, getVisualEntries } from '@/lib/content-routes';
import { getSiteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes = ['/', '/music', '/visuals', '/archive', '/story', '/about', '/shop'];

  const dynamicRoutes = [
    ...getMusicEntries().map(({ slug }) => `/music/${slug}`),
    ...getVisualEntries().map(({ slug }) => `/visuals/${slug}`),
    ...getArchiveEntries().map(({ slug }) => `/archive/${slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
  }));
}
