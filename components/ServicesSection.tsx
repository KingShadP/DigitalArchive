'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
            }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Service Items List */}
        <div className="w-full flex flex-col">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className={`w-full py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-12 ${
                index !== 0 ? 'border-t border-[#0C0C0C]/15' : ''
              }`}
            >
              {/* Number on left */}
              <div
                className="font-black text-[#0C0C0C] leading-none shrink-0 select-none"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                }}
              >
                {service.number}
              </div>

              {/* Name + Description on right */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1 md:pl-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light text-[#0C0C0C]/60 leading-relaxed max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
