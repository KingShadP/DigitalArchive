import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';
import { getArchiveEntries } from '@/lib/content-routes';

export const metadata = buildMetadata({
  title: 'Archive | KingShadP',
  description: 'Browse archive records across music, visuals, writing, process, identity, and objects.',
  path: '/archive',
  type: 'website',
});

export default function ArchivePage() {
  const entries = getArchiveEntries();

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@type': 'WebPage',
          name: 'Archive',
          url: canonicalFor('/archive'),
        })}
      />
      <header className="max-w-6xl mx-auto border-b border-[#1a1a1a]/10 pb-8 mb-10">
        <h1 className="text-4xl sm:text-6xl font-light">Archive</h1>
        <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 max-w-3xl">
          Permanent records of releases, visuals, identity studies, and process artifacts.
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {entries.map(({ record, slug }) => (
          <article key={record.id} className="rounded-xl border border-[#1a1a1a]/10 bg-white p-4 flex gap-4">
            <Image src={record.thumbnail} alt={record.title} width={360} height={360} className="w-28 h-28 object-cover rounded-md" loading="lazy" decoding="async" />
            <div className="flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#B76E79]">{record.type} · {record.year}</p>
              <h2 className="text-xl font-light mt-1">{record.title}</h2>
              <p className="text-sm text-[#1a1a1a]/65 mt-1 line-clamp-2">{record.description}</p>
              <Link href={`/archive/${slug}`} className="btn-pill text-[10px] mt-3">Open archive record</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
