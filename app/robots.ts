import type { MetadataRoute } from 'next';
import { getSiteUrl, isProductionDeployment } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  if (!isProductionDeployment) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${siteUrl}/sitemap.xml`,
      host: new URL(siteUrl).host,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}
