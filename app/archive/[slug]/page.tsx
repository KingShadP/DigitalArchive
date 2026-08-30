import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { findArchiveBySlug, getArchiveEntries } from '@/lib/content-routes';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return getArchiveEntries().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = findArchiveBySlug(params.slug);
  if (!entry) {
    return buildMetadata({
      title: 'Archive record not found | KingShadP',
      description: 'The requested archive record page was not found.',
      path: '/archive',
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${entry.record.title} | Archive | KingShadP`,
    description: entry.record.description,
    path: `/archive/${entry.slug}`,
    image: entry.record.thumbnail,
    type: 'article',
  });
}

export default function ArchiveDetailPage({ params }: { params: { slug: string } }) {
  const entry = findArchiveBySlug(params.slug);
  if (!entry) notFound();

  const { record, slug } = entry;

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            '@type': 'WebPage',
            name: record.title,
            url: canonicalFor(`/archive/${slug}`),
          },
          {
            '@type': record.type === 'WRITING' ? 'Article' : 'CreativeWork',
            headline: record.title,
            datePublished: `${record.year}`,
            image: canonicalFor(record.thumbnail),
            description: record.description,
            url: canonicalFor(`/archive/${slug}`),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalFor('/') },
              { '@type': 'ListItem', position: 2, name: 'Archive', item: canonicalFor('/archive') },
              { '@type': 'ListItem', position: 3, name: record.title, item: canonicalFor(`/archive/${slug}`) },
            ],
          },
        ])}
      />
      <article className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Image src={record.thumbnail} alt={record.title} width={1200} height={1200} priority className="w-full h-auto rounded-xl border border-[#1a1a1a]/10" />
        </div>
        <div className="lg:col-span-7">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#B76E79]">Archive Record</p>
          <h1 className="text-4xl sm:text-5xl font-light mt-2">{record.title}</h1>
          <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">{record.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-xs font-mono uppercase tracking-wider">
            <div><dt className="text-[#1a1a1a]/50">Type</dt><dd>{record.type}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Status</dt><dd>{record.status}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Era</dt><dd>{record.era}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Year</dt><dd>{record.year}</dd></div>
          </dl>
          {record.downloadUrl && (
            <a href={record.downloadUrl} target="_blank" rel="noopener noreferrer" className="btn-pill text-[10px] mt-6">
              Open source document
            </a>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/archive" className="btn-pill text-[10px]">All archive records</Link>
            <Link href="/music" className="btn-pill text-[10px]">Music index</Link>
            <Link href="/visuals" className="btn-pill text-[10px]">Visual index</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
