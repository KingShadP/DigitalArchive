import type { MetadataRoute } from 'next';
import { SITE_CONFIG, getAbsoluteUrl } from '../lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development';

  if (isPreview) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

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
