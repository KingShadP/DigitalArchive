import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KingShadP — Enter the World',
  description: 'KingShadP — Cinematic visual identity and sound experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#8A0F19] selection:text-white bg-black">
        {children}
      </body>
    </html>
  );
}

