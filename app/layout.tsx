import type {Metadata} from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles
import Cursor from '@/components/cursor';
import { AudioProvider } from '@/components/audio-provider';
import Navigation from '@/components/navigation';
import { GlobalPlayer } from '@/components/global-player';
import Footer from '@/components/footer';
import { CinematicBackground } from '@/components/cinematic-background';

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
      <body suppressHydrationWarning className=" text-foreground font-sans antialiased selection:bg-foreground selection:text-background">
        <AudioProvider>
          <Cursor />
          <CinematicBackground />
          <Navigation />
          <GlobalPlayer />
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
