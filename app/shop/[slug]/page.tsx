import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Box, Package, Truck, Sparkles } from 'lucide-react';
import { products, Product } from '../../../data/products';
import { constructMetadata, generateProductJsonLd, generateBreadcrumbJsonLd } from '../../../lib/seo';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function findProductBySlug(slug: string): Product | null {
  const normalized = slug.toLowerCase().trim();
  return (
    products.find(
      (p) =>
        p.id.toLowerCase() === normalized ||
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === normalized
    ) || null
  );
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.id,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: 'Product Not Found',
      description: 'The requested physical artifact does not exist in the KingShadP shop.',
      path: `/shop/${slug}`,
      noindex: true,
    });
  }

  return constructMetadata({
    title: `${product.name} (${product.price}) // KingShadP Objects`,
    description: product.description || `${product.name} - Physical artifact by KingShadP.`,
    path: `/shop/${product.id}`,
    ogImage: product.primaryImage,
    keywords: [
      product.name,
      'KingShadP Shop',
      product.category,
      product.specs.material,
      'Physical Artifact',
      'Limited Edition',
    ],
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductJsonLd(product);
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: product.name, path: `/shop/${product.id}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EC] font-sans antialiased selection:bg-[#B76E79] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link
          href="/shop"
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO OBJECTS</span>
        </Link>

        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
          <Link href="/music" className="text-white/60 hover:text-[#B76E79] transition-colors">
            MUSIC
          </Link>
          <Link href="/visuals" className="text-white/60 hover:text-[#B76E79] transition-colors">
            VISUALS
          </Link>
          <Link href="/archive" className="text-white/60 hover:text-[#B76E79] transition-colors">
            ARCHIVE
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex flex-col gap-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-[#B76E79]">{product.name}</span>
        </nav>

        {/* Product Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Images Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl">
              <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono tracking-widest uppercase text-[#B76E79]">
                {product.availability}
              </div>
            </div>

            {product.detailImage && (
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 bg-neutral-950">
                <Image
                  src={product.detailImage}
                  alt={`${product.name} detail view`}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Details & Acquisition Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="space-y-3 border-b border-white/10 pb-6">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] font-bold block">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-white/50 tracking-wider">
                {product.subtitle}
              </p>
              <div className="text-2xl font-mono text-white font-bold pt-2">
                {product.price}
              </div>
            </div>

            <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Specifications */}
            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-4 text-xs font-mono">
              <h2 className="text-sm font-serif font-light text-white border-b border-white/10 pb-2">
                Architectural & Material Specifications
              </h2>
              <div>
                <span className="text-white/40 block text-[9px]">MATERIAL</span>
                <span className="text-white font-semibold">{product.specs.material}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px]">EDITION SPEC</span>
                <span className="text-white font-semibold">{product.specs.edition}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px]">DIMENSIONS & WEIGHT</span>
                <span className="text-white font-semibold">{product.specs.dimensions}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px]">FABRICATION ORIGIN</span>
                <span className="text-white font-semibold">{product.specs.origin}</span>
              </div>
            </div>

            {/* Acquisition CTA */}
            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="w-full py-4 rounded-xl bg-white text-black font-mono text-xs tracking-widest font-bold uppercase text-center hover:bg-[#B76E79] hover:text-white transition-all shadow-lg"
              >
                REQUEST ACQUISITION / PRE-ORDER
              </Link>
              <span className="text-[9px] font-mono text-white/40 text-center tracking-wider">
                WORLDWIDE INSURED WHITE-GLOVE COURIER DISPATCH
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
