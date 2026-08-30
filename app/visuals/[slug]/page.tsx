import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { findVisualBySlug, getVisualEntries, getArchiveEntries } from '@/lib/content-routes';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return getVisualEntries().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = findVisualBySlug(params.slug);
  if (!entry) {
    return buildMetadata({
      title: 'Visual not found | KingShadP',
      description: 'The requested visual page was not found.',
      path: '/visuals',
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${entry.asset.title} | Visuals | KingShadP`,
    description: entry.asset.notes,
    path: `/visuals/${entry.slug}`,
    image: entry.asset.src,
    type: 'article',
  });
}

export default function VisualDetailPage({ params }: { params: { slug: string } }) {
  const entry = findVisualBySlug(params.slug);
  if (!entry) notFound();

  const { asset, slug } = entry;
  const relatedArchive = getArchiveEntries().filter((candidate) =>
    candidate.record.thumbnail.toLowerCase() === asset.src.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            '@type': 'WebPage',
            name: asset.title,
            url: canonicalFor(`/visuals/${slug}`),
          },
          {
            '@type': 'VisualArtwork',
            name: asset.title,
            artform: asset.medium,
            dateCreated: `${asset.year}`,
            image: canonicalFor(asset.src),
            description: asset.notes,
            url: canonicalFor(`/visuals/${slug}`),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalFor('/') },
              { '@type': 'ListItem', position: 2, name: 'Visuals', item: canonicalFor('/visuals') },
              { '@type': 'ListItem', position: 3, name: asset.title, item: canonicalFor(`/visuals/${slug}`) },
            ],
          },
        ])}
      />
      <article className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Image src={asset.src} alt={asset.title} width={1800} height={1800} priority className="w-full h-auto rounded-xl border border-[#1a1a1a]/10" />
        </div>
        <div className="lg:col-span-5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#B76E79]">Visual Artwork</p>
          <h1 className="text-4xl sm:text-5xl font-light mt-2">{asset.title}</h1>
          <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">{asset.notes}</p>
          <dl className="mt-6 space-y-2 text-sm">
            <div><dt className="text-[#1a1a1a]/50">Year</dt><dd>{asset.year}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Era</dt><dd>{asset.era}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Medium</dt><dd>{asset.medium}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/visuals" className="btn-pill text-[10px]">All visuals</Link>
            <Link href="/archive" className="btn-pill text-[10px]">Related archive</Link>
            <Link href="/music" className="btn-pill text-[10px]">Music index</Link>
          </div>
        </div>
      </article>

      {relatedArchive.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16 rounded-xl border border-[#1a1a1a]/10 bg-white p-6">
          <h2 className="text-2xl font-light">Linked archive records</h2>
          <ul className="mt-4 space-y-2">
            {relatedArchive.map(({ record, slug: archiveSlug }) => (
              <li key={record.id}>
                <Link href={`/archive/${archiveSlug}`} className="underline underline-offset-4 hover:text-[#B76E79]">
                  {record.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
