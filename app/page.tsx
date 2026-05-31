'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, VolumeX, Volume2, ArrowDown } from 'lucide-react';
import Image from 'next/image';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, subtitle, number }: { children: React.ReactNode, subtitle?: string, number: string }) => (
  <div className="mb-24 md:mb-32">
    <FadeIn>
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-xs text-[#444444] tracking-widest">{number}</span>
        <h2 className="font-display text-2xl md:text-4xl tracking-tight text-[#E5E5E5] uppercase tracking-widest">{children}</h2>
      </div>
      {subtitle && <p className="text-[#444444] font-mono max-w-xl text-xs md:text-sm uppercase tracking-widest leading-relaxed mt-2">{subtitle}</p>}
    </FadeIn>
  </div>
);

const RuleList = ({ title, items, isNegative = false }: { title: string, items: string[], isNegative?: boolean }) => (
  <div className="mb-12">
    <h3 className={`font-mono text-xs uppercase tracking-widest mb-6 ${isNegative ? 'text-[#444444]/70' : 'text-[#444444]'}`}>[{title}]</h3>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-4 ${isNegative ? 'text-[#444444]/80' : 'text-[#E5E5E5]'}`}>
          <span className="font-mono text-xs mt-1 text-[#444444]">{i < 9 ? `0${i + 1}` : i + 1}</span>
          <span className="text-sm md:text-base tracking-wide leading-relaxed font-sans">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function Page() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 100]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#E5E5E5] selection:text-[#050505]">
      {/* Background Elements from Immersive UI */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#1a1a1a_0%,_transparent_60%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(#444444_1px,_transparent_1px)] [background-size:60px_60px] opacity-20" />
      </div>
      <div className="fixed top-5 bottom-5 left-5 right-5 border border-white/[0.03] pointer-events-none z-50" />

      {/* Navigation (Abstract, Minimal) */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-50 mix-blend-difference">
        <div className="font-display tracking-[0.2em] text-xs font-bold uppercase text-[#E5E5E5]">
          KingShadP
        </div>
        <div className="font-mono text-xs text-[#444444] tracking-widest hidden md:block">
          ARCHIVE / 2026
        </div>
      </nav>

      <ul className="fixed bottom-0 left-0 p-6 md:p-12 z-50 font-mono text-[10px] tracking-widest text-[#444444] uppercase space-y-1 hidden md:block mix-blend-difference">
        <li>LAT: 34.0522° N</li>
        <li>LONG: 118.2437° W</li>
        <li>ORBIT: STABLE</li>
      </ul>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8 relative"
          >
             <div className="w-[1px] h-24 bg-[#E5E5E5]/20 mx-auto mb-8 origin-bottom object-cover" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-7xl lg:text-8xl tracking-widest uppercase text-[#E5E5E5] mb-8"
          >
            Digital <br className="md:hidden" />Archive
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-mono text-[#444444] max-w-xl mx-auto text-xs md:text-sm uppercase tracking-[0.3em] leading-relaxed"
          >
            A manifesto for the KingShadP universe. Exploring minimalism, futuristic atmosphere, and negative-space storytelling. Unveiling the intersection of sound, artifact, and identity.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">Descend</span>
          <ArrowDown className="w-4 h-4 text-[#444444] animate-bounce" />
        </motion.div>
      </section>

      {/* Core Brand Concept */}
      <section className="py-32 md:py-48 px-6 md:px-12 mx-auto max-w-5xl">
        <SectionHeading number="01" subtitle="The universe is quiet. The architecture is deliberate.">
          Core Identity
        </SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl font-display leading-snug text-[#E5E5E5] uppercase tracking-wide">
              KingShadP is more than apparel. It is a creative portal, an identity artifact, and a quiet futuristic universe.
            </p>
            <p className="mt-8 text-[#444444] font-sans leading-relaxed text-sm md:text-base">
              The brand world must feel restrained, mysterious, intelligent, and iconic. We rely on space as a storytelling device. The emptiness is important. The silence is intentional.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 gap-12">
             <FadeIn delay={0.2}>
               <h3 className="font-mono text-xs tracking-widest text-[#444444] mb-4 uppercase">Design Principles</h3>
               <div className="w-full h-[1px] bg-[#444444]/30 mb-6" />
               <ul className="space-y-4 font-sans text-sm text-[#E5E5E5]">
                 <li className="flex justify-between border-b border-[#444444]/20 pb-2"><span>Architecture & Restraint</span> <span className="text-[#444444] font-mono">01</span></li>
                 <li className="flex justify-between border-b border-[#444444]/20 pb-2"><span>Expansive Negative Space</span> <span className="text-[#444444] font-mono">02</span></li>
                 <li className="flex justify-between border-b border-[#444444]/20 pb-2"><span>Command Through Silence</span> <span className="text-[#444444] font-mono">03</span></li>
                 <li className="flex justify-between border-b border-[#444444]/20 pb-2"><span>Artifact over Product</span> <span className="text-[#444444] font-mono">04</span></li>
               </ul>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Visual Language & Symbolism */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-transparent">
        <div className="mx-auto max-w-5xl">
          <SectionHeading number="02" subtitle="Orbit, distance, gravity, shadow, light, and scale.">
            Visual & Symbolic System
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
            <div className="md:col-span-5 relative aspect-[3/4] w-full bg-[#050505] overflow-hidden">
               <Image 
                 src="https://picsum.photos/seed/monolith/800/1200?grayscale" 
                 alt="Monolith representation" 
                 fill
                 className="object-cover opacity-30 mix-blend-luminosity hover:opacity-100 transition-opacity duration-1000"
               />
               <div className="absolute inset-0 border border-[#444444]/30 m-4 pointer-events-none" />
               <div className="absolute bottom-8 left-8 font-mono text-[10px] tracking-widest text-[#444444]">FIG. 1 — SCALE</div>
            </div>

            <div className="md:col-span-1" />

            <div className="md:col-span-6 space-y-16">
              <FadeIn>
                <h4 className="font-display text-[#E5E5E5] text-lg mb-4 uppercase tracking-widest">Negative-Space Meaning</h4>
                <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed">
                  Space suggests hidden meaning, distance, orbit, absence, memory, and possibility. The layout should not explain everything at once. Large areas of open composition allow the visitor to breathe and interpret.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h4 className="font-display text-[#E5E5E5] text-lg mb-4 uppercase tracking-widest">Futuristic / Cosmic Direction</h4>
                <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed">
                  Refined and architectural rather than cliché sci-fi. No loud neon, no obvious galaxy backgrounds. Instead, we use monochromatic palettes, sharp typographic scales, and high-fidelity micro-interactions to convey advanced technology and world-building.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <h4 className="font-display text-[#E5E5E5] text-lg mb-4 uppercase tracking-widest">Color & Texture</h4>
                <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed">
                  Strictly monochromatic. Deep voids of #000000, off-blacks, stark pure whites for focal points, and concrete/neutral grays serving as connective tissue. Textures should simulate brushed metals, matte finishes, and glass over glossy digital renders.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Website Experience & Motion */}
      <section className="py-32 md:py-48 px-6 md:px-12 mx-auto max-w-5xl">
        <SectionHeading number="03" subtitle="A digital archive behaving like an architectural space.">
          Interactive Direction
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
           <FadeIn>
             <RuleList 
               title="Motion & Behavior"
               items={[
                 "Quiet visual movement. Avoid random animations or 'bounce' effects.",
                 "Fade-ins should be long, calculated, and smooth (easing curves like [0.16, 1, 0.3, 1]).",
                 "Scroll triggers should reveal content as if stepping into a new room.",
                 "Hover states should be subtle sub-pixel opacity shifts, not aggressive scale changes."
               ]}
             />
           </FadeIn>

           <FadeIn delay={0.2}>
             <RuleList 
               title="Website Structure"
               items={[
                 "Homepage: Hero expanse, cryptic index, scrolling manifesto.",
                 "Image Gallery: Cinematic, edge-to-edge or hyper-contained. Minimal grid framing.",
                 "Product Presentation: Treated as 'artifacts'. Data-driven specs alongside poetic descriptions.",
                 "Mobile Layout: Mobile-first. Stacking logic remains extremely spacious. Never cramped."
               ]}
             />
           </FadeIn>
        </div>
      </section>

      {/* Music & Artifact Integration */}
      <section className="relative py-48 px-6 md:px-12 overflow-hidden border-t border-b border-[#444444]/20">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_transparent_60%)] opacity-30 -z-10" />
         
         <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <span className="font-mono text-xs tracking-widest text-[#444444] mb-8 block uppercase">04 / AUDIO & ARTIFACT</span>
              <h2 className="font-display text-3xl md:text-5xl tracking-widest uppercase text-[#E5E5E5] mb-8">
                Sound as Architecture
              </h2>
              <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed mb-12 max-w-xl mx-auto">
                Music and visuals are connected organically. A subtle, ambient soundscape could exist upon entry, or individual artifacts (clothing) are paired with conceptual audio scores. The clothes are not &quot;drops&quot; — they are fragments of a larger narrative.
              </p>
              
              <div className="flex justify-center items-center gap-6">
                <button className="h-16 w-16 rounded-full border border-[#444444] flex items-center justify-center text-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-[#050505] transition-colors duration-500 group">
                  <Play className="w-5 h-5 ml-1" />
                </button>
                <div className="font-mono text-[10px] tracking-widest text-[#444444] text-left">
                  <span className="block text-[#E5E5E5] mb-1">TRANSMISSION_01.WAV</span>
                  <span>02:45 / 00:00</span>
                </div>
              </div>
            </FadeIn>
         </div>
      </section>

      {/* Lexicon & Vocabulary */}
      <section className="py-32 md:py-48 px-6 md:px-12 mx-auto max-w-5xl">
        <SectionHeading number="05" subtitle="The language constructs the world.">
          Lexicon & Tone
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <FadeIn>
            <RuleList 
              title="Words to Use"
              items={[
                "Expansive, Restrained",
                "Mysterious, Future-facing",
                "Symbolic, Quiet",
                "Commanding, Cinematic",
                "Architectural, Original",
                "World-building, Archive, Artifact"
              ]}
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <RuleList 
              title="Words / Concepts to Avoid"
              isNegative={true}
              items={[
                "Generic luxury branding & obvious king/royal clichés.",
                "Stacked crown obsession or basic streetwear language.",
                "Trendy sci-fi visuals or 'fake' mythology.",
                "Overdecorated crests and empty motivational phrases.",
                "Basic 'brand movement' language.",
                "Anything that feels copied from a standard Shopify template."
              ]}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="mt-24 pt-24 border-t border-[#444444]/20">
           <h3 className="font-display text-xl text-[#E5E5E5] mb-6 tracking-widest uppercase">Future Expansion Ideas</h3>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
             <div className="border border-[#444444]/30 p-8 hover:border-[#444444] transition-colors duration-500 bg-[#050505]">
               <span className="font-mono text-[10px] text-[#444444] tracking-widest mb-4 block">EXP-01</span>
               <h4 className="font-display text-[#E5E5E5] mb-2 uppercase tracking-wide">Sonic Artifacts</h4>
               <p className="text-xs text-[#444444] leading-relaxed font-sans mt-4">NFC tags embedded in physical apparel that link directly to specific audio transmissions or unreleased tracks within the archive.</p>
             </div>
             <div className="border border-[#444444]/30 p-8 hover:border-[#444444] transition-colors duration-500 bg-[#050505]">
               <span className="font-mono text-[10px] text-[#444444] tracking-widest mb-4 block">EXP-02</span>
               <h4 className="font-display text-[#E5E5E5] mb-2 uppercase tracking-wide">Architectural Scenography</h4>
               <p className="text-xs text-[#444444] leading-relaxed font-sans mt-4">Lookbooks presented as architectural blueprints. Utilizing CGI modeling to place garments within impossible, infinite concrete rooms.</p>
             </div>
             <div className="border border-[#444444]/30 p-8 hover:border-[#444444] transition-colors duration-500 bg-[#050505]">
               <span className="font-mono text-[10px] text-[#444444] tracking-widest mb-4 block">EXP-03</span>
               <h4 className="font-display text-[#E5E5E5] mb-2 uppercase tracking-wide">Encrypted Drops</h4>
               <p className="text-xs text-[#444444] leading-relaxed font-sans mt-4">Password-protected directories on the website unlocked only via deciphering minimal typographic clues hidden in previous collections.</p>
             </div>
           </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center border-t border-[#444444]/20 border-opacity-50">
         <div className="w-12 h-12 border border-[#444444] rounded-full flex items-center justify-center mb-8 relative overflow-hidden group hover:border-[#E5E5E5] transition-colors duration-700">
            <div className="w-1 h-1 bg-[#E5E5E5] rounded-full group-hover:scale-[5] transition-transform duration-700 ease-out" />
         </div>
         <div className="font-mono text-[10px] tracking-[0.3em] text-[#444444] uppercase text-center">
            <p className="text-[#E5E5E5]">End of Transmission // KingShadP Archive</p>
            <p className="mt-4 opacity-50">© 2026 // ALL ORBITS CALCULATED</p>
         </div>
      </footer>
    </main>
  );
}
