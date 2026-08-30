import Link from 'next/link';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About | KingShadP',
  description: 'About KingShadP and the archival studio practice connecting music, visuals, and objects.',
  path: '/about',
  type: 'profile',
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@type': 'Person',
          name: 'KingShadP',
          url: canonicalFor('/about'),
        })}
      />
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-light">About</h1>
        <p className="mt-6 text-sm sm:text-base text-[#1a1a1a]/75 leading-relaxed">
          KingShadP is an independent artist and creative director whose work spans music composition, visual art direction, archival documentation, and immersive digital presentation.
        </p>
        <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/75 leading-relaxed">
          This site preserves major works as stable public URLs while maintaining the cinematic interactive archive experience.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/story" className="btn-pill text-[10px]">Read story</Link>
          <Link href="/music" className="btn-pill text-[10px]">Explore music</Link>
        </div>
      </article>
    </main>
  );
}
