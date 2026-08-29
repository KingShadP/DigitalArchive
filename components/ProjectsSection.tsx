'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  liveUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    liveUrl: 'https://nextlevelstudio.design',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    liveUrl: 'https://aurabrand.art',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    liveUrl: 'https://solarisdigital.io',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onImageClick: (src: string, title: string) => void;
  onLiveClick: (project: ProjectData) => void;
}

function ProjectCard({
  project,
  index,
  totalCards,
  onImageClick,
  onLiveClick,
}: CardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky h-[85vh] w-full flex items-start justify-center"
      style={{
        top: `calc(5.5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          willChange: 'transform',
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* TOP ROW: Number, Category label, Project Name, Live Project button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 110px)',
              }}
            >
              {project.number}
            </span>

            {/* Category badge + Project Name */}
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Live Project Ghost Button */}
          <LiveProjectButton onClick={() => onLiveClick(project)} />
        </div>

        {/* BOTTOM ROW: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 w-full items-stretch">
          {/* Left column (40% width -> md:col-span-5) has 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-6 justify-between">
            {/* Left Top Image */}
            <div
              onClick={() => onImageClick(project.col1Image1, `${project.name} - Detail 01`)}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/10 cursor-pointer group relative"
              style={{
                height: 'clamp(130px, 16vw, 230px)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover:scale-105 transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center">
                <span className="text-xs uppercase tracking-wider font-semibold text-white px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                  View Render
                </span>
              </div>
            </div>

            {/* Left Bottom Image */}
            <div
              onClick={() => onImageClick(project.col1Image2, `${project.name} - Detail 02`)}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/10 cursor-pointer group relative"
              style={{
                height: 'clamp(160px, 22vw, 340px)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover:scale-105 transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center">
                <span className="text-xs uppercase tracking-wider font-semibold text-white px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                  View Render
                </span>
              </div>
            </div>
          </div>

          {/* Right column (60% width -> md:col-span-7) has 1 tall image */}
          <div
            onClick={() => onImageClick(project.col2Image, `${project.name} - Hero Shot`)}
            className="md:col-span-7 w-full h-[260px] sm:h-[340px] md:h-full min-h-[260px] sm:min-h-[340px] md:min-h-[440px] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/10 cursor-pointer group relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col2Image}
              alt={`${project.name} main showcase`}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover:scale-105 transition-transform duration-500"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-white px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm">
                Inspect 3D Scene
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectData | null>(null);

  const handleImageClick = (src: string, title: string) => {
    setSelectedImage({ src, title });
  };

  const handleLiveClick = (project: ProjectData) => {
    setActiveProjectModal(project);
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" (singular) with .hero-heading gradient */}
        <FadeIn delay={0} y={30} className="mb-16 sm:mb-20 md:mb-24 text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
            }}
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 Sticky-Stacking Project Cards */}
        <div className="relative w-full flex flex-col gap-16 pb-20">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onImageClick={handleImageClick}
              onLiveClick={handleLiveClick}
            />
          ))}
        </div>
      </div>

      {/* Image Preview Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg cursor-zoom-out"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center z-10"
            >
              <div className="w-full flex items-center justify-between mb-3 px-2">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]">
                  {selectedImage.title}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-[70vh] rounded-[32px] overflow-hidden border border-white/20 bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Project Info / Demo Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProjectModal(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              className="relative w-full max-w-2xl rounded-[36px] p-6 sm:p-8 md:p-10 border-2 border-[#D7E2EA] bg-[#0C0C0C] text-[#D7E2EA] shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]">
                  {activeProjectModal.category} Case Study
                </span>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="w-8 h-8 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-[#D7E2EA]">
                  {activeProjectModal.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                  {activeProjectModal.name}
                </h3>
              </div>

              <p className="text-sm text-[#D7E2EA]/80 font-light leading-relaxed mb-6">
                A custom 3D design engagement encompassing spatial asset construction, dynamic lighting passes, motion loops, and visual identity. Designed and rendered by KingShadP.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-2xl bg-[#161616] p-3 text-center border border-white/5">
                  <span className="block text-[10px] uppercase text-[#D7E2EA]/60 font-semibold">Engine</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">Blender / Octane</span>
                </div>
                <div className="rounded-2xl bg-[#161616] p-3 text-center border border-white/5">
                  <span className="block text-[10px] uppercase text-[#D7E2EA]/60 font-semibold">Output</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">8K HDR / WebGL</span>
                </div>
                <div className="rounded-2xl bg-[#161616] p-3 text-center border border-white/5">
                  <span className="block text-[10px] uppercase text-[#D7E2EA]/60 font-semibold">Scope</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">Full 3D Suite</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D7E2EA]/30 text-xs uppercase font-medium tracking-wider text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={activeProjectModal.liveUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3 rounded-full text-xs uppercase font-medium tracking-widest text-white inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid #FFFFFF',
                    outlineOffset: '-3px',
                  }}
                >
                  <span>Launch Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsSection;
