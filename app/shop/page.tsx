import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Shop | KingShadP',
  description: 'Browse physical artifacts and limited editions from the KingShadP archive.',
  path: '/shop',
  type: 'website',
});

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@type': 'CollectionPage',
          name: 'Shop',
          url: canonicalFor('/shop'),
        })}
      />
      <header className="max-w-6xl mx-auto border-b border-[#1a1a1a]/10 pb-8 mb-10">
        <h1 className="text-4xl sm:text-6xl font-light">Shop</h1>
        <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 max-w-3xl">
          Physical and editorial objects from the archive.
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border border-[#1a1a1a]/10 bg-white overflow-hidden">
            <Image src={product.primaryImage} alt={product.name} width={1200} height={1200} className="w-full h-auto" loading="lazy" decoding="async" />
            <div className="p-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#B76E79]">{product.availability}</p>
              <h2 className="text-xl font-light mt-1">{product.name}</h2>
              <p className="text-sm text-[#1a1a1a]/65 mt-2">{product.description}</p>
              <p className="text-sm font-mono mt-3">{product.price}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/archive" className="btn-pill text-[10px]">Related archive</Link>
                <Link href="/about" className="btn-pill text-[10px]">Contact pathway</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
