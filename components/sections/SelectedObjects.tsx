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
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#f8f7f4] border-b border-[#1a1a1a]/10 text-[#1a1a1a] select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1a1a1a]/10 pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#B76E79] block font-semibold">
                CHAPTER 06 / PHYSICAL MONOLITHS
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1a1a] mt-1 font-serif">
                Made <span className="font-editorial italic font-normal text-[#B76E79]">Physical.</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1a1a1a]/50">
              LIMITED EDITIONS & ARTIFACTS
            </span>
          </div>
        </Reveal>

        {/* Curated Product Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#1a1a1a]/10 bg-white overflow-hidden hover:border-[#1a1a1a]/30 transition-all shadow-sm"
            >
              {/* Product Image Stage with Crossfade on Hover */}
              <div
                onClick={() => setSelectedProduct(item)}
                data-cursor="INSPECT"
                className="relative aspect-square w-full bg-[#1a1a1a]/5 cursor-pointer overflow-hidden"
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
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B76E79] block font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-serif tracking-wide text-[#1a1a1a] mt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#1a1a1a]/60 font-light mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a1a1a]/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    data-cursor="INSPECT"
                    className="text-[10px] font-mono tracking-widest uppercase text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors cursor-pointer flex items-center gap-1"
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
                    className="btn-pill text-[10px] uppercase font-bold tracking-wider bg-[#1a1a1a] text-white hover:bg-[#B76E79] flex items-center gap-1"
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
          <div className="fixed inset-0 z-[230] flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-white border border-[#1a1a1a]/20 rounded-2xl p-6 sm:p-8 text-[#1a1a1a] flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#B76E79] font-bold">
                    ACQUISITION DISPATCH
                  </span>
                  <h3 className="text-base sm:text-lg font-serif">
                    {inquiredProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setInquiredProduct(null)}
                  className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
                >
                  <X size={14} />
                </button>
              </div>

              {inquirySent ? (
                <div className="py-8 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                    <Check size={22} />
                  </div>
                  <h4 className="text-sm font-medium tracking-widest uppercase font-serif">
                    Acquisition Inquiry Sealed
                  </h4>
                  <p className="text-xs text-[#1a1a1a]/60 max-w-sm">
                    The private executive desk will review inventory allocation and send direct routing instructions to {inquiryEmail}.
                  </p>
                  <button
                    onClick={() => setInquiredProduct(null)}
                    className="mt-4 px-5 py-2 rounded-full bg-[#1a1a1a] text-white text-[10px] font-mono font-bold tracking-widest uppercase"
                  >
                    CLOSE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                  <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-light">
                    Enter your contact coordinate to request allotment for {inquiredProduct.name} ({inquiredProduct.price}).
                  </p>

                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#1a1a1a]/5 border border-[#1a1a1a]/15 focus:border-[#1a1a1a] rounded-xl px-4 py-3 text-xs text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 outline-none transition-colors"
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]/10">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#1a1a1a]/50">
                      <ShieldCheck size={12} className="text-[#B76E79]" />
                      <span>SANCTUM PROTOCOL</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#1a1a1a] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#B76E79] transition-all"
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
