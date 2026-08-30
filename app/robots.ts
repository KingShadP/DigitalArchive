import type { MetadataRoute } from 'next';
import { SITE_CONFIG, getAbsoluteUrl } from '../lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: getAbsoluteUrl('/sitemap.xml'),
    host: SITE_CONFIG.productionUrl,
  };
}
