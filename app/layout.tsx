import type { Metadata, Viewport } from 'next';
import './globals.css';
import { constructMetadata, generateWebSiteJsonLd, generatePersonJsonLd } from '../lib/seo';
import { SITE_CONFIG } from '../lib/siteConfig';

export const metadata: Metadata = constructMetadata({
  title: 'KingShadP — Sanctum Archive & Audio Experience',
  description:
    'Everything I make leaves evidence. Standalone cinematic scroll-tied audio experience, architectural visual gallery, 432 Hz discography, and permanent digital archive for KingShadP.',
  path: '/',
  ogType: 'website',
  ogImage: '/twisted-beast-cover.png',
});

export const viewport: Viewport = {
  themeColor: '#f5f2ed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebSiteJsonLd();
  const personSchema = generatePersonJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#b76e79] selection:text-[#f5f2ed] bg-[#f5f2ed] text-[#121212]">
        {children}
      </body>
    </html>
  );
}


