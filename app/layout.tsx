import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KingShadP — Enter the World',
  description: 'Everything I make leaves evidence. Standalone cinematic scroll-tied audio experience and digital archive for KingShadP.',
  openGraph: {
    title: 'KingShadP — Enter the World',
    description: 'Everything I make leaves evidence. Standalone cinematic scroll-tied audio experience and digital archive for KingShadP.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#B76E79] selection:text-white bg-[#f8f7f4] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}

