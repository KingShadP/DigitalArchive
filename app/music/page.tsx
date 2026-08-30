import Link from 'next/link';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';
import { getMusicEntries } from '@/lib/content-routes';

export const metadata = buildMetadata({
  title: 'Music | KingShadP',
  description:
    'Explore KingShadP music recordings with production notes, track details, and direct links to related visuals and archive evidence.',
  path: '/music',
  type: 'website',
});

export default function MusicPage() {
  const tracks = getMusicEntries();

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            '@type': 'WebPage',
            name: 'Music',
            url: canonicalFor('/music'),
            description: 'KingShadP music index.',
          },
          {
            '@type': 'MusicPlaylist',
            name: 'KingShadP Music Catalogue',
            numTracks: tracks.length,
            track: tracks.map(({ track, slug }) => ({
              '@type': 'MusicRecording',
              name: track.title,
              url: canonicalFor(`/music/${slug}`),
            })),
          },
        ])}
      />
      <header className="max-w-5xl mx-auto border-b border-[#1a1a1a]/10 pb-8 mb-10">
        <h1 className="text-4xl sm:text-6xl font-light">Music</h1>
        <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 max-w-3xl">
          A crawlable index of recordings, notes, and related visual/archive artifacts.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid gap-5">
        {tracks.map(({ track, release, slug }) => (
          <article key={track.id} className="rounded-xl border border-[#1a1a1a]/10 bg-white p-5">
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#B76E79]">{release.title}</p>
            <h2 className="text-2xl font-light mt-1">{track.title}</h2>
            <p className="text-sm text-[#1a1a1a]/65 mt-2">{track.notes ?? 'Track detail and production information.'}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-wider font-mono">
              <span>{track.duration}</span>
              <span>{track.tuning}</span>
              <span>{track.key}</span>
              <span>{track.bpm} BPM</span>
            </div>
            <div className="mt-5">
              <Link className="btn-pill text-[10px]" href={`/music/${slug}`}>
                Open recording page
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
