import type { MetadataRoute } from 'next';
import { getAbsoluteUrl } from '../lib/siteConfig';
import { releases } from '../data/releases';
import { visualAssets } from '../data/visuals';
import { archiveRecords } from '../data/archive';
import { products } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl('/'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: getAbsoluteUrl('/music'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/visuals'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: getAbsoluteUrl('/archive'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/story'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/about'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/shop'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  // Dynamic Music Track Routes
  const musicRoutes: MetadataRoute.Sitemap = releases[0].tracks.map((track) => ({
    url: getAbsoluteUrl(`/music/${track.id}`),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic Visual Asset Routes
  const visualRoutes: MetadataRoute.Sitemap = visualAssets.map((asset) => ({
    url: getAbsoluteUrl(`/visuals/${asset.id}`),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Dynamic Archive Record Routes
  const archiveItemRoutes: MetadataRoute.Sitemap = archiveRecords.map((record) => ({
    url: getAbsoluteUrl(`/archive/${record.id}`),
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Dynamic Product Routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: getAbsoluteUrl(`/shop/${product.id}`),
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...musicRoutes,
    ...visualRoutes,
    ...archiveItemRoutes,
    ...productRoutes,
  ];
}
