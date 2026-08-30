import type { MetadataRoute } from 'next';
import { getArchiveEntries, getMusicEntries, getProductEntries, getVisualEntries } from '@/lib/content-routes';
import { getSiteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticRoutes = ['/', '/music', '/visuals', '/archive', '/story', '/about', '/shop'];

  const dynamicRoutes = [
    ...getMusicEntries().map(({ slug }) => `/music/${slug}`),
    ...getVisualEntries().map(({ slug }) => `/visuals/${slug}`),
    ...getArchiveEntries().map(({ slug }) => `/archive/${slug}`),
    ...getProductEntries().map(({ slug }) => `/shop/${slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({ url: `${base}${route}` }));
}
