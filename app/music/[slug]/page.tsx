import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TRACK_WORLDS } from '@/data/scenes';
import { getArchiveEntries, getMusicEntries, getVisualEntries, findMusicBySlug } from '@/lib/content-routes';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return getMusicEntries().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = findMusicBySlug(slug);
  if (!entry) {
    return buildMetadata({
      title: 'Recording not found | KingShadP',
      description: 'The requested recording page was not found.',
      path: '/music',
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${entry.track.title} | Music | KingShadP`,
    description: entry.track.notes ?? `Details for ${entry.track.title} by KingShadP.`,
    path: `/music/${slug}`,
    image: entry.release.artwork,
    type: 'music.song',
  });
}

export default async function MusicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findMusicBySlug(slug);
  if (!entry) notFound();

  const { track, release, slug: trackSlug } = entry;
  const world = TRACK_WORLDS[track.id];
  const archiveEntries = getArchiveEntries();
  const visualEntries = getVisualEntries();
  const relatedArchive = (world?.relatedArchiveIds ?? [])
    .map((id) => archiveEntries.find((candidate) => candidate.record.id === id))
    .filter(Boolean)
    .slice(0, 3);
  const relatedVisual = visualEntries.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            '@type': 'WebPage',
            name: track.title,
            url: canonicalFor(`/music/${trackSlug}`),
          },
          {
            '@type': 'MusicRecording',
            name: track.title,
            byArtist: {
              '@type': 'Person',
              name: 'KingShadP',
            },
            inAlbum: {
              '@type': 'MusicAlbum',
              name: release.title,
            },
            url: canonicalFor(`/music/${trackSlug}`),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalFor('/') },
              { '@type': 'ListItem', position: 2, name: 'Music', item: canonicalFor('/music') },
              { '@type': 'ListItem', position: 3, name: track.title, item: canonicalFor(`/music/${trackSlug}`) },
            ],
          },
        ])}
      />
      <article className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Image
            src={release.artwork}
            alt={`${release.title} artwork`}
            width={1200}
            height={1200}
            priority
            className="w-full h-auto rounded-xl border border-[#1a1a1a]/10"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#B76E79]">Music Recording</p>
          <h1 className="text-4xl sm:text-5xl font-light mt-2">{track.title}</h1>
          <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">
            {track.notes ?? 'Track details and production notes.'}
          </p>
          <audio className="mt-6 w-full" controls preload="metadata" src={track.audioSrc} />
          <dl className="mt-6 grid grid-cols-2 gap-3 text-xs font-mono uppercase tracking-wider">
            <div><dt className="text-[#1a1a1a]/50">Duration</dt><dd>{track.duration}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Tuning</dt><dd>{track.tuning}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Key</dt><dd>{track.key}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Tempo</dt><dd>{track.bpm} BPM</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/music" className="btn-pill text-[10px]">All music</Link>
            <Link href="/visuals" className="btn-pill text-[10px]">Related visuals</Link>
            <Link href="/archive" className="btn-pill text-[10px]">Archive records</Link>
          </div>
        </div>
      </article>

      <section className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#1a1a1a]/10 bg-white p-5">
          <h2 className="text-xl font-light">Related archive records</h2>
          <ul className="mt-4 space-y-3">
            {relatedArchive.length > 0 ? relatedArchive.map((item) => (
              <li key={item!.record.id}>
                <Link href={`/archive/${item!.slug}`} className="underline underline-offset-4 hover:text-[#B76E79]">
                  {item!.record.title}
                </Link>
              </li>
            )) : <li className="text-sm text-[#1a1a1a]/60">No linked archive records.</li>}
          </ul>
        </div>

        <div className="rounded-xl border border-[#1a1a1a]/10 bg-white p-5">
          <h2 className="text-xl font-light">Related visual works</h2>
          <ul className="mt-4 space-y-3">
            {relatedVisual.map((item) => (
              <li key={item.asset.id}>
                <Link href={`/visuals/${item.slug}`} className="underline underline-offset-4 hover:text-[#B76E79]">
                  {item.asset.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
