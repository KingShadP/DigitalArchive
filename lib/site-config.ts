const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getSiteUrl = () => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return stripTrailingSlash(configured);

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionUrl) return `https://${stripTrailingSlash(productionUrl)}`;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${stripTrailingSlash(vercelUrl)}`;

  return 'http://localhost:3000';
};

export const getCanonicalHost = () => {
  const configured = process.env.NEXT_PUBLIC_CANONICAL_HOST;
  if (configured) return configured.toLowerCase();

  const fromSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromSiteUrl) {
    try {
      return new URL(fromSiteUrl).host.toLowerCase();
    } catch {
      return undefined;
    }
  }

  return undefined;
};

export const isProductionDeployment =
  process.env.VERCEL_ENV === 'production' ||
  (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview');

export const SEO_DEFAULTS = {
  siteName: 'KingShadP',
  defaultOgImage: '/THE GIRAGON.png',
};
