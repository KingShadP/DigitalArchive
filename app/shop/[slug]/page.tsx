import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { findProductBySlug, getProductEntries } from '@/lib/content-routes';
import { buildMetadata, canonicalFor, jsonLd } from '@/lib/seo';

const toNumericPrice = (price: string) => price.replace(/[^\d.]/g, '');

export function generateStaticParams() {
  return getProductEntries().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = findProductBySlug(slug);
  if (!entry) {
    return buildMetadata({
      title: 'Product not found | KingShadP',
      description: 'The requested product page was not found.',
      path: '/shop',
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${entry.product.name} | Shop | KingShadP`,
    description: entry.product.description,
    path: `/shop/${slug}`,
    image: entry.product.primaryImage,
    type: 'website',
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findProductBySlug(slug);
  if (!entry) notFound();

  const { product, slug: productSlug } = entry;

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] px-6 sm:px-12 md:px-16 py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            '@type': 'WebPage',
            name: product.name,
            url: canonicalFor(`/shop/${productSlug}`),
          },
          {
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: canonicalFor(product.primaryImage),
            category: product.category,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: toNumericPrice(product.price),
              availability:
                product.availability === 'AVAILABLE'
                  ? 'https://schema.org/InStock'
                  : product.availability === 'PRE-ORDER'
                    ? 'https://schema.org/PreOrder'
                    : 'https://schema.org/LimitedAvailability',
            },
            url: canonicalFor(`/shop/${productSlug}`),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalFor('/') },
              { '@type': 'ListItem', position: 2, name: 'Shop', item: canonicalFor('/shop') },
              { '@type': 'ListItem', position: 3, name: product.name, item: canonicalFor(`/shop/${productSlug}`) },
            ],
          },
        ])}
      />
      <article className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <Image src={product.primaryImage} alt={product.name} width={1400} height={1400} priority className="w-full h-auto rounded-xl border border-[#1a1a1a]/10" />
        </div>
        <div className="lg:col-span-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#B76E79]">Product</p>
          <h1 className="text-4xl sm:text-5xl font-light mt-2">{product.name}</h1>
          <p className="mt-4 text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">{product.description}</p>
          <p className="mt-4 text-xl font-mono">{product.price}</p>
          <p className="mt-2 text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a]/60">{product.availability}</p>
          <dl className="mt-6 space-y-2 text-sm">
            <div><dt className="text-[#1a1a1a]/50">Material</dt><dd>{product.specs.material}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Edition</dt><dd>{product.specs.edition}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Dimensions</dt><dd>{product.specs.dimensions}</dd></div>
            <div><dt className="text-[#1a1a1a]/50">Origin</dt><dd>{product.specs.origin}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-pill text-[10px]">All products</Link>
            <Link href="/archive" className="btn-pill text-[10px]">Related archive</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
