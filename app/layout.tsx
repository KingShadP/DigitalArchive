import type { Metadata } from 'next';
import './globals.css';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';
import { SEO_DEFAULTS } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata({
  title: 'KingShadP — Enter the World',
  description:
    'Everything I make leaves evidence. Standalone cinematic scroll-tied audio experience and digital archive for KingShadP.',
  path: '/',
  image: SEO_DEFAULTS.defaultOgImage,
  type: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#B76E79] selection:text-white bg-[#f8f7f4] text-[#1a1a1a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([
            {
              '@type': 'WebSite',
              name: 'KingShadP',
              url: canonicalFor('/'),
            },
            {
              '@type': 'WebPage',
              name: 'KingShadP — Enter the World',
              url: canonicalFor('/'),
            },
            {
              '@type': 'Person',
              name: 'KingShadP',
              url: canonicalFor('/about'),
            },
          ])}
        />
        {children}
      </body>
    </html>
  );
}
