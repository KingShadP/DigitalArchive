import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles
import Cursor from '@/components/cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kingshadp.com'),
  title: {
    default: 'KingShadP | Digital Archive',
    template: '%s | KingShadP',
  },
  description:
    'The creative universe, archive, and brand identity of KingShadP. An immersive digital experience exploring avant-garde fashion, cosmic aesthetics, and wearable technology artifacts.',
  keywords: [
    'KingShadP',
    'digital archive',
    'avant-garde fashion',
    'futuristic streetwear',
    'immersive brand experience',
    'wearable technology',
    'NFC fashion',
    'minimalist fashion',
    'cosmic streetwear',
    'architectural fashion',
    'tech fashion',
    'monochromatic fashion',
    'digital fashion',
    'creative brand identity',
    'immersive UI',
  ],
  authors: [{ name: 'KingShadP' }],
  creator: 'KingShadP',
  publisher: 'KingShadP',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kingshadp.com',
    siteName: 'KingShadP Digital Archive',
    title: 'KingShadP | Digital Archive',
    description:
      'An immersive digital archive and brand experience. Explore avant-garde fashion artifacts, cosmic aesthetics, and wearable technology through cinematic interaction.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KingShadP Digital Archive — Immersive Brand Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KingShadP | Digital Archive',
    description:
      'An immersive digital archive and brand experience. Explore avant-garde fashion artifacts, cosmic aesthetics, and wearable technology.',
    creator: '@KingShadP',
    images: ['/og-image.png'],
  },
  category: 'fashion',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://kingshadp.com/#website',
      url: 'https://kingshadp.com',
      name: 'KingShadP Digital Archive',
      description:
        'The creative universe, archive, and brand identity of KingShadP — avant-garde fashion meets immersive digital experience.',
      publisher: { '@id': 'https://kingshadp.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://kingshadp.com/#organization',
      name: 'KingShadP',
      url: 'https://kingshadp.com',
      description:
        'KingShadP is an avant-garde fashion brand and creative archive exploring wearable technology, cosmic aesthetics, and architectural garment design.',
      sameAs: ['https://twitter.com/KingShadP'],
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-[#E5E5E5] font-sans antialiased selection:bg-[#E5E5E5] selection:text-[#050505]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#E5E5E5] focus:text-[#050505] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
