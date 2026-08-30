import Link from 'next/link';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Story | KingShadP',
  description: 'KingShadP manifesto and creative philosophy across sound, image, and archive.',
  path: '/story',
  type: 'article',
});

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@type': 'Article',
          headline: 'Create it. Document it. Push it further.',
          description: 'KingShadP manifesto and archival philosophy.',
          author: { '@type': 'Person', name: 'KingShadP' },
          url: canonicalFor('/story'),
        })}
      />
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-light">Story</h1>
        <p className="mt-8 text-lg sm:text-2xl font-light leading-relaxed">
          Create it. Document it. <span className="italic text-[#B76E79]">Push it further.</span>
        </p>
        <p className="mt-6 text-sm sm:text-base text-[#1a1a1a]/75 leading-relaxed">
          KingShadP is an evolving creative identity constructed through sound, image, experimentation, and lived experience. This is not simply a portfolio of finished objects. It is evidence of creation in motion.
        </p>
        <blockquote className="mt-10 border-l-2 border-[#B76E79] pl-4 text-xl sm:text-3xl font-light">
          “Everything I make is part of the same conversation.”
        </blockquote>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/music" className="btn-pill text-[10px]">Music</Link>
          <Link href="/visuals" className="btn-pill text-[10px]">Visuals</Link>
          <Link href="/archive" className="btn-pill text-[10px]">Archive</Link>
        </div>
      </article>
    </main>
  );
}
