import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';
import { getVisualEntries } from '@/lib/content-routes';

export const metadata = buildMetadata({
  title: 'Visuals | KingShadP',
  description: 'Explore visual works, sculpture studies, and identity artifacts by KingShadP.',
  path: '/visuals',
  type: 'website',
});

export default function VisualsPage() {
  const items = getVisualEntries();

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@type': 'WebPage',
          name: 'Visuals',
          url: canonicalFor('/visuals'),
        })}
      />
      <header className="max-w-6xl mx-auto border-b border-[#1a1a1a]/10 pb-8 mb-10">
        <h1 className="text-4xl sm:text-6xl font-light">Visuals</h1>
        <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 max-w-3xl">
          A crawlable index of visual artwork and spatial studies.
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ asset, slug }) => (
          <article key={asset.id} className="rounded-xl border border-[#1a1a1a]/10 bg-white overflow-hidden">
            <Image src={asset.src} alt={asset.title} width={1200} height={1200} className="w-full h-auto" loading="lazy" decoding="async" />
            <div className="p-4">
              <h2 className="text-xl font-light">{asset.title}</h2>
              <p className="text-sm text-[#1a1a1a]/65 mt-2">{asset.notes}</p>
              <Link href={`/visuals/${slug}`} className="btn-pill text-[10px] mt-4">Open visual page</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
