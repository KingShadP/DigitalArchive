import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCanonicalHost } from '@/lib/site-config';

export function middleware(request: NextRequest) {
  const canonicalHost = getCanonicalHost();
  const host = request.headers.get('host')?.toLowerCase();
  const proto = request.headers.get('x-forwarded-proto');
  const isProduction = process.env.VERCEL_ENV === 'production';

  if (isProduction && canonicalHost && host && host !== canonicalHost) {
    const redirectUrl = new URL(request.url);
    redirectUrl.host = canonicalHost;
    redirectUrl.protocol = 'https:';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (isProduction && proto === 'http') {
    const redirectUrl = new URL(request.url);
    redirectUrl.protocol = 'https:';
    return NextResponse.redirect(redirectUrl, 308);
  }

  const response = NextResponse.next();

  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
