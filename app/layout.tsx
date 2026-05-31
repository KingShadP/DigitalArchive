import type {Metadata} from 'next';
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

export const metadata: Metadata = {
  title: 'KingShadP | Digital Archive',
  description: 'The creative universe, archive, and brand identity of KingShadP.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} dark`}>
      <body suppressHydrationWarning className="bg-[#050505] text-[#E5E5E5] font-sans antialiased selection:bg-[#E5E5E5] selection:text-[#050505]">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
