'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Package, ArrowUpRight, Check, X, ShieldCheck, Eye, Layers } from 'lucide-react';
import { products, Product } from '../../data/products';
import { Reveal } from '../motion/Reveal';
import { ArtifactInspectorModal } from '../ui/ArtifactInspectorModal';

interface SelectedObjectsProps {
  onOpenTransmission?: () => void;
}

export function SelectedObjects({ onOpenTransmission }: SelectedObjectsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiredProduct, setInquiredProduct] = useState<Product | null>(null);
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail.trim()) return;
    setInquirySent(true);
  };

  return (
    <section
      id="selected-objects"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-16 bg-[#080808] border-t border-white/5 text-[#F4F1EC] select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block">
                &#47;&#47; CHAPTER 06: PHYSICAL MONOLITHS
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight uppercase text-white mt-1">
                MADE <span className="font-editorial italic font-normal text-white/90">PHYSICAL.</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
              LIMITED EDITIONS & ARTIFACTS
            </span>
          </div>
        </Reveal>

        {/* Curated Product Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-black/60 overflow-hidden hover:border-white/30 transition-all shadow-2xl"
            >
              {/* Product Image Stage with Crossfade on Hover */}
              <div
                onClick={() => setSelectedProduct(item)}
                data-cursor="INSPECT"
                className="relative aspect-square w-full bg-black cursor-pointer overflow-hidden"
              >
                <Image
                  src={item.primaryImage}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 group-hover:opacity-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <Image
                  src={item.detailImage}
                  alt={`${item.name} detail`}
                  fill
                  className="object-cover scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Price & Availability Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-white">
                    {item.availability}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider text-white bg-black/80 px-2.5 py-0.5 rounded-full border border-white/15">
                    {item.price}
                  </span>
                </div>

                {/* 360 Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2.5 py-1 rounded-full border border-white/20 text-[9px] font-mono tracking-wider text-white flex items-center gap-1.5 pointer-events-none">
                  <Layers size={11} className="text-[#B76E79]" />
                  <span>360° INSPECTOR</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 sm:p-7 flex flex-col gap-4">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B76E79] block">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-light tracking-wide uppercase text-white mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-white/50 font-light mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    data-cursor="INSPECT"
                    className="text-[10px] font-mono tracking-widest uppercase text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>INSPECT 3D</span>
                    <Eye size={12} />
                  </button>

                  <button
                    onClick={() => {
                      setInquiredProduct(item);
                      setInquirySent(false);
                      setInquiryEmail('');
                    }}
                    data-cursor="ORDER"
                    className="px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-[#F4F1EC] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>ACQUIRE</span>
                    <ArrowUpRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 360 Spatial Inspector Modal */}
      <ArtifactInspectorModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenTransmission={onOpenTransmission}
      />

      {/* Inquiry / Acquisition Dialog */}
      <AnimatePresence>
        {inquiredProduct && (
          <div className="fixed inset-0 z-[230] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-[#080808] border border-white/20 rounded-2xl p-6 sm:p-8 text-white flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79]">
                    ACQUISITION DISPATCH
                  </span>
                  <h3 className="text-base sm:text-lg font-light uppercase tracking-wide">
                    {inquiredProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setInquiredProduct(null)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {inquirySent ? (
                <div className="py-8 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={22} />
                  </div>
                  <h4 className="text-sm font-medium tracking-widest uppercase">
                    ACQUISITION INQUIRY SEALED
                  </h4>
                  <p className="text-xs text-white/50 max-w-sm">
                    The private executive desk will review inventory allocation and send direct routing instructions to {inquiryEmail}.
                  </p>
                  <button
                    onClick={() => setInquiredProduct(null)}
                    className="mt-4 px-5 py-2 rounded-full bg-white text-black text-[10px] font-mono font-bold tracking-widest uppercase"
                  >
                    CLOSE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    Enter your contact coordinate to request allotment for {inquiredProduct.name} ({inquiredProduct.price}).
                  </p>

                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-white/[0.03] border border-white/15 focus:border-white rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 outline-none transition-colors"
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40">
                      <ShieldCheck size={12} className="text-[#B76E79]" />
                      <span>SANCTUM PROTOCOL</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#F4F1EC] transition-all"
                    >
                      TRANSMIT INQUIRY
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
