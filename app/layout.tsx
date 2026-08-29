import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KingShadP — Enter the World',
  description: 'Standalone cinematic scroll-tied video experience and digital identity entrance for KingShadP.',
  openGraph: {
    title: 'KingShadP — Enter the World',
    description: 'Standalone cinematic scroll-tied video experience and digital identity entrance for KingShadP.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-[#8A0F19] selection:text-white bg-[#050505] text-[#F4F1EC]">
        {children}
      </body>
    </html>
  );
}

