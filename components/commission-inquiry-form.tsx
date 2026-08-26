'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MonoLabel } from '@/components/system';
import Image from 'next/image';
import {
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
  Lock,
  Send,
  X,
  Plus,
  Eye,
  Info,
  Palette,
  Compass,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useFirebase } from '@/components/firebase-provider';
import { useViewedArtifacts, ViewedArtifact } from '@/lib/viewed-artifacts';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firebase-errors';

interface CommissionInquiryFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
  initialArtifactId?: string;
  isEmbedded?: boolean;
}

const COMMISSION_MEDIUMS = [
  {
    id: 'garment',
    label: 'Bespoke Garment & Wearable Architecture',
    desc: 'Couture tailoring, custom double-weave fabrics, NFC sonic token integration, hand-finished oxblood details.',
    icon: Layers,
    suggestedBudget: '$4,500 – $12,000 USD',
  },
  {
    id: 'sonic',
    label: 'Sonic Hardware & Acoustic Artifact',
    desc: 'Custom tuned analog synth enclosures, resonant orbital drone modules, bespoke physical playback objects.',
    icon: Sliders,
    suggestedBudget: '$3,500 – $9,000 USD',
  },
  {
    id: 'sculpture',
    label: 'Mixed-Media Sculpture & Material Installation',
    desc: 'Monolithic physical works utilizing matte platinum, titanium structural spars, acrylic resin, and patinated steel.',
    icon: Compass,
    suggestedBudget: '$8,000 – $25,000 USD',
  },
  {
    id: 'cinematic',
    label: 'Cinematic Visual World & Audiovisual Piece',
    desc: 'Bespoke high-contrast generative films, motion soundscapes, private editorial lookbook productions.',
    icon: Palette,
    suggestedBudget: '$5,000 – $18,000 USD',
  },
];

const MATERIAL_PRESETS = [
  'Matte Platinum Hardware',
  'Oxblood Double-Weave Silk',
  'Titanium Structural Spars',
  'NFC-v4.9 Sonic Chip',
  'Liquid-Glass Optical Resin',
  'Champagne Analogue Enclosure',
  'Acoustic Carbon Fiber',
  'Raw Washed Indigo Cotton',
];

const BUDGET_TIERS = [
  { id: 'tier1', label: 'Studio Edition ($2,500 – $5,000 USD)', desc: 'Limited bespoke iteration or modular artifact' },
  { id: 'tier2', label: 'Collector Signature ($5,000 – $12,000 USD)', desc: 'One-of-one tailored physical or sonic piece' },
  { id: 'tier3', label: 'Archival Masterwork ($12,000 – $30,000+ USD)', desc: 'Full custom multi-medium physical & sonic installation' },
  { id: 'institutional', label: 'Institutional / Museum Installation', desc: 'Large scale public or architectural commission' },
];

export function CommissionInquiryForm({
  onClose,
  onSuccess,
  initialArtifactId,
  isEmbedded = false,
}: CommissionInquiryFormProps) {
  const { user, profile, signInWithGoogle } = useFirebase();
  const { viewedArtifacts, benchmarkArtifacts } = useViewedArtifacts();

  // Pool of available reference artifacts (viewed artifacts + benchmarks fallback)
  const availableArtifacts = useMemo(() => {
    const map = new Map<string, ViewedArtifact>();
    viewedArtifacts.forEach((a) => map.set(a.id, a));
    
    // If fewer than 2 viewed, add benchmark artifacts
    if (map.size < 3) {
      benchmarkArtifacts.forEach((a) => {
        if (!map.has(a.id)) map.set(a.id, a);
      });
    }

    return Array.from(map.values());
  }, [viewedArtifacts, benchmarkArtifacts]);

  // Selected reference artifacts initial computation
  const defaultSelectedIds = useMemo(() => {
    if (initialArtifactId) return [initialArtifactId];
    if (viewedArtifacts.length > 0) return viewedArtifacts.slice(0, 2).map((a) => a.id);
    if (benchmarkArtifacts.length > 0) return [benchmarkArtifacts[0].id];
    return [];
  }, [initialArtifactId, viewedArtifacts, benchmarkArtifacts]);

  const [selectedArtifactIds, setSelectedArtifactIds] = useState<string[]>(defaultSelectedIds);
  
  // Commission specific parameters
  const [mediumId, setMediumId] = useState<string>('garment');
  const [customTitleInput, setCustomTitleInput] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    'Matte Platinum Hardware',
    'Oxblood Double-Weave Silk',
  ]);
  const [dimensions, setDimensions] = useState<string>('Standard Tailored Sizing (Custom measurements provided upon confirmation)');
  const [budgetTier, setBudgetTier] = useState<string>('tier2');
  const [deliveryHorizon, setDeliveryHorizon] = useState<string>('Q4 2026 / Archival Showcase');
  const [customVisionInput, setCustomVisionInput] = useState<string>('');
  
  // Author information
  const [authorNameInput, setAuthorNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');

  // Status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Selected artifact objects
  const selectedArtifacts = useMemo(() => {
    const ids = selectedArtifactIds.length > 0 ? selectedArtifactIds : defaultSelectedIds;
    return availableArtifacts.filter((a) => ids.includes(a.id));
  }, [availableArtifacts, selectedArtifactIds, defaultSelectedIds]);

  // Derived Title and Brief
  const synthesizedTitle = useMemo(() => {
    const medium = COMMISSION_MEDIUMS.find((m) => m.id === mediumId)?.label.split('&')[0].trim() || 'Piece';
    if (selectedArtifacts.length > 0) {
      return `Bespoke ${medium}: In Reference to [${selectedArtifacts[0].title.slice(0, 45)}]`;
    }
    return `Bespoke ${medium} Commission (01-of-01)`;
  }, [mediumId, selectedArtifacts]);

  const synthesizedVision = useMemo(() => {
    const refsText = selectedArtifacts.length > 0
      ? selectedArtifacts.map((a) => `${a.title} (${a.artifactClass})`).join(', ')
      : 'KingShadP Archive aesthetic language';
    
    return `Aesthetic synthesis based on previously viewed archive artifacts: ${refsText}.\n\nIntent: Seeking a tailored physical-sonic piece that merges structural silhouette geometry with KingShadP sonic frequencies. Looking to incorporate custom materiality with private NFC authentication.`;
  }, [selectedArtifacts]);

  // Effective values
  const effectiveTitle = customTitleInput || synthesizedTitle;
  const effectiveVision = customVisionInput || synthesizedVision;
  const effectiveAuthorName = authorNameInput || profile?.displayName || user?.displayName || '';
  const effectiveEmail = emailInput || profile?.email || user?.email || '';

  const toggleArtifactSelection = (id: string) => {
    const current = selectedArtifactIds.length > 0 ? selectedArtifactIds : defaultSelectedIds;
    setSelectedArtifactIds(
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!user) {
      try {
        await signInWithGoogle();
      } catch {
        setFormError('Authentication required to encrypt and register commission inquiry.');
        return;
      }
      return;
    }

    const finalName = effectiveAuthorName.trim() || 'Archival Patron';
    const finalEmail = effectiveEmail.trim() || user.email || '';

    if (!finalName || !finalEmail || !effectiveTitle.trim()) {
      setFormError('Please verify contact details and commission designation.');
      return;
    }

    setIsSubmitting(true);

    const mediumObj = COMMISSION_MEDIUMS.find((m) => m.id === mediumId);
    const budgetObj = BUDGET_TIERS.find((b) => b.id === budgetTier);
    const refTitles = selectedArtifacts.map((a) => `${a.title} [${a.id}]`).join(', ');

    // Construct structured commission payload (strictly <= 2000 chars for Firestore rules)
    const structuredMessage = [
      `=== KINGSHADP BESPOKE COMMISSION INQUIRY ===`,
      `MEDIUM: ${mediumObj?.label || mediumId}`,
      `REFERENCED ARTIFACTS: ${refTitles || 'General Archive Benchmarks'}`,
      `MATERIALS & FINISHES: ${selectedMaterials.join(', ') || 'Studio Discretion'}`,
      `SCALE / DIMENSIONS: ${dimensions.trim() || 'Custom'}`,
      `BUDGET TIER: ${budgetObj?.label || budgetTier}`,
      `TARGET HORIZON: ${deliveryHorizon.trim() || 'Flexible'}`,
      `PATRON TIER: ${(profile?.collectorTier || 'Initiate').toUpperCase()}`,
      `\n--- PROJECT BRIEF & LORE ---`,
      effectiveVision.trim(),
    ]
      .join('\n')
      .slice(0, 1980);

    const subjectLine = `[COMMISSION] ${effectiveTitle.trim()}`.slice(0, 195);

    const path = 'transmissions';
    try {
      const docRef = await addDoc(collection(db, path), {
        userId: user.uid,
        authorName: finalName.slice(0, 100),
        email: finalEmail.slice(0, 256),
        category: 'acquisition',
        subject: subjectLine,
        message: structuredMessage,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setSubmissionRef(docRef.id);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative bg-background border border-border/80 text-foreground ${
        isEmbedded ? 'p-6 md:p-10 shadow-2xl' : 'p-6 md:p-12 max-w-4xl mx-auto'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-ksp-oxblood/20 text-ksp-oxblood border border-ksp-oxblood/40 font-mono text-[9px] uppercase tracking-widest font-semibold">
              <Sparkles size={10} /> COMMISSION CONCIERGE PROTOCOL
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">
              {'// BESPOKE ACQUISITION SPECIFICATION'}
            </span>
          </div>
          <h2 className="font-serif italic text-3xl md:text-5xl tracking-tight text-foreground">
            Commission a Bespoke Piece
          </h2>
          <p className="font-sans text-xs md:text-sm text-foreground/70 mt-2 max-w-2xl leading-relaxed">
            Direct collaboration with KingShadP Studio. Your inquiry is pre-filled with context synthesized from your previously viewed archive artifacts.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border/50 text-foreground/50 hover:text-foreground hover:border-foreground transition-colors"
            aria-label="Close Commission Form"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 px-6 md:px-12 text-center space-y-6 border border-border/60 bg-surface/30"
          >
            <div className="w-16 h-16 rounded-full border border-ksp-oxblood text-ksp-oxblood flex items-center justify-center mx-auto bg-ksp-oxblood/10">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <MonoLabel className="text-ksp-oxblood">COMMISSION RECORD REGISTERED</MonoLabel>
              <h3 className="font-serif italic text-3xl md:text-4xl text-foreground">
                Inquiry Encrypted & Logged
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 max-w-md mx-auto leading-relaxed">
                Ref ID: <span className="text-foreground font-bold">{submissionRef || 'TX-ACQ-ARCHIVE'}</span>
                <br />
                KingShadP Studio archivists will evaluate your reference packet and reach out via encrypted transmission channel.
              </p>
            </div>

            {/* Summary of what was commissioned */}
            <div className="max-w-md mx-auto p-4 border border-border/40 bg-surface/20 text-left font-mono text-[9px] space-y-2 text-foreground/80">
              <div className="flex justify-between border-b border-border/20 pb-1">
                <span className="text-foreground/40">DESIGNATION:</span>
                <span className="truncate max-w-[240px] font-bold">{effectiveTitle}</span>
              </div>
              <div className="flex justify-between border-b border-border/20 pb-1">
                <span className="text-foreground/40">REFERENCED PIECES:</span>
                <span>{selectedArtifacts.length} Selected</span>
              </div>
              <div className="flex justify-between border-b border-border/20 pb-1">
                <span className="text-foreground/40">BUDGET TIER:</span>
                <span>{BUDGET_TIERS.find((b) => b.id === budgetTier)?.label.split('(')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">ESTIMATED RESPONSE:</span>
                <span className="text-emerald-400">Within 24–48 Hours</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  if (onClose) onClose();
                }}
                className="px-6 py-3 bg-foreground text-background font-mono text-[9px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
              >
                RETURN TO CONCIERGE
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {formError && (
              <div className="p-4 border border-red-500/40 bg-red-950/20 text-red-300 font-mono text-[10px] uppercase tracking-wider flex items-center gap-3">
                <Info size={14} className="flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* SECTION 1: PRE-FILLED CONTEXT FROM PREVIOUSLY VIEWED ARTIFACTS */}
            <div className="border border-border/60 bg-surface/20 p-6 md:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-ksp-oxblood" />
                  <MonoLabel className="text-foreground">
                    PRE-FILLED CONTEXT // PREVIOUSLY VIEWED ARTIFACTS ({selectedArtifacts.length}/{availableArtifacts.length} REFERENCED)
                  </MonoLabel>
                </div>
                <span className="font-mono text-[9px] text-foreground/40 uppercase tracking-widest">
                  {viewedArtifacts.length > 0 ? 'SYNCHRONIZED FROM USER SESSION' : 'HIGHLIGHTED ARCHIVE BENCHMARKS'}
                </span>
              </div>

              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Select which artifacts from your archive session should inform the aesthetics, materiality, or sonic mechanics of your custom commission:
              </p>

              {/* Artifact Selector Carousel / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {availableArtifacts.slice(0, 6).map((artifact) => {
                  const isSelected = (selectedArtifactIds.length > 0 ? selectedArtifactIds : defaultSelectedIds).includes(artifact.id);
                  return (
                    <div
                      key={artifact.id}
                      onClick={() => toggleArtifactSelection(artifact.id)}
                      className={`cursor-pointer group relative p-3 border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-ksp-oxblood bg-ksp-oxblood/10 shadow-sm'
                          : 'border-border/40 bg-background/50 hover:border-foreground/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 bg-surface border border-border/50 overflow-hidden">
                        {artifact.thumbnailUrl ? (
                          <Image
                            src={artifact.thumbnailUrl}
                            alt={artifact.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono text-[8px] text-foreground/30">
                            IMG
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/40">
                            {artifact.id}
                          </span>
                          <div
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              isSelected
                                ? 'border-ksp-oxblood bg-ksp-oxblood text-white'
                                : 'border-border text-transparent'
                            }`}
                          >
                            <CheckCircle2 size={10} />
                          </div>
                        </div>
                        <h4 className="font-serif italic text-xs truncate text-foreground font-semibold">
                          {artifact.title}
                        </h4>
                        <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/50 truncate block">
                          {artifact.artifactClass}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedArtifacts.length > 0 && (
                <div className="p-3 bg-surface/40 border border-border/30 font-mono text-[9px] text-foreground/70 flex items-center justify-between gap-4">
                  <span className="truncate">
                    ACTIVE REFERENCES: <strong className="text-foreground">{selectedArtifacts.map((a) => a.title).join(' • ')}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArtifactIds(availableArtifacts.map((a) => a.id))}
                    className="text-ksp-oxblood hover:underline flex-shrink-0 text-[8px] uppercase tracking-wider"
                  >
                    Select All
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 2: COMMISSION MEDIUM & DISCIPLINE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-foreground/60" />
                <MonoLabel className="text-foreground">01 // SELECT COMMISSION DISCIPLINE & MEDIUM *</MonoLabel>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMMISSION_MEDIUMS.map((med) => {
                  const Icon = med.icon;
                  const isSelected = mediumId === med.id;
                  return (
                    <div
                      key={med.id}
                      onClick={() => setMediumId(med.id)}
                      className={`cursor-pointer p-5 border transition-all space-y-2 ${
                        isSelected
                          ? 'border-foreground bg-surface/50 shadow-md ring-1 ring-foreground/20'
                          : 'border-border/50 bg-surface/10 hover:border-foreground/30 hover:bg-surface/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} className={isSelected ? 'text-ksp-oxblood' : 'text-foreground/50'} />
                          <h4 className="font-serif italic text-base text-foreground font-bold">{med.label}</h4>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-foreground bg-foreground text-background' : 'border-border'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
                        </div>
                      </div>
                      <p className="font-sans text-xs text-foreground/60 leading-relaxed">{med.desc}</p>
                      <div className="pt-2 font-mono text-[8px] uppercase tracking-widest text-foreground/40 flex justify-between">
                        <span>GUIDELINE:</span>
                        <span className="text-foreground/70">{med.suggestedBudget}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: COMMISSION DESIGNATION & SPECIFICATIONS */}
            <div className="border border-border/50 bg-surface/10 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Sliders size={14} className="text-foreground/60" />
                <MonoLabel className="text-foreground">02 // COMMISSION DESIGNATION & TECHNICAL SPECS</MonoLabel>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                    WORKING COMMISSION TITLE / DESIGNATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={effectiveTitle}
                    onChange={(e) => setCustomTitleInput(e.target.value)}
                    placeholder="e.g. Bespoke Sonic Weaving Monolith #01"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                  />
                  <span className="text-[8px] font-mono text-foreground/40 block">
                    Pre-synthesized based on active reference artifacts.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                    ESTIMATED BUDGET TIER *
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 font-mono text-xs uppercase text-foreground focus:outline-none focus:border-foreground"
                  >
                    {BUDGET_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-[8px] font-mono text-foreground/40 block">
                    {BUDGET_TIERS.find((b) => b.id === budgetTier)?.desc}
                  </span>
                </div>
              </div>

              {/* Material Selector Chips */}
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                  MATERIALITY & FINISH PREFERENCES
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {MATERIAL_PRESETS.map((mat) => {
                    const isSelected = selectedMaterials.includes(mat);
                    return (
                      <button
                        type="button"
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'border-foreground bg-foreground text-background font-semibold'
                            : 'border-border/60 bg-background/40 text-foreground/60 hover:text-foreground hover:border-foreground/40'
                        }`}
                      >
                        {isSelected ? <CheckCircle2 size={10} /> : <Plus size={10} />}
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                    SCALE / SIZING / DISPLAY SPECIFICATIONS
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g. Sizing 42R / Tailored Oversized, 120cm wall mount"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                    TARGET HORIZON / EXHIBITION WINDOW
                  </label>
                  <input
                    type="text"
                    value={deliveryHorizon}
                    onChange={(e) => setDeliveryHorizon(e.target.value)}
                    placeholder="e.g. Q4 2026 / Archival Showcase, 3-6 Months"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: PROJECT VISION & CREATIVE BRIEF */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette size={14} className="text-foreground/60" />
                  <MonoLabel className="text-foreground">03 // COMMISSION BRIEF & AESTHETIC SYNTHESIS *</MonoLabel>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomVisionInput('');
                    setCustomTitleInput('');
                  }}
                  className="font-mono text-[8px] uppercase tracking-widest text-ksp-oxblood hover:underline flex items-center gap-1"
                >
                  <RefreshCw size={10} /> Reset to Auto Synthesis
                </button>
              </div>

              <textarea
                required
                rows={6}
                value={effectiveVision}
                onChange={(e) => setCustomVisionInput(e.target.value)}
                placeholder="Describe your vision, lore parameters, spatial requirements, or intended gallery environment..."
                className="w-full bg-background border border-border p-4 font-sans text-sm text-foreground focus:outline-none focus:border-foreground leading-relaxed"
              />
              <span className="font-mono text-[8px] text-foreground/40 block">
                Pre-filled automatically with synthesis derived from your viewed pieces. You may freely tailor or expand this brief.
              </span>
            </div>

            {/* SECTION 5: PATRON IDENTITY & SUBMIT */}
            <div className="border-t border-border/60 pt-8 space-y-6">
              <div className="flex items-center justify-between">
                <MonoLabel className="text-foreground/70">PATRON VERIFICATION & DISPATCH</MonoLabel>
                {user ? (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck size={12} /> AUTHENTICATED // {(profile?.collectorTier || 'INITIATE').toUpperCase()}
                  </span>
                ) : (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50">
                    SIGN-IN REQUIRED FOR ENCRYPTION
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                    PATRON NAME / CALLSIGN *
                  </label>
                  <input
                    type="text"
                    required
                    value={effectiveAuthorName}
                    onChange={(e) => setAuthorNameInput(e.target.value)}
                    placeholder="e.g. Rashad / Patron #104"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/70">
                    CONTACT EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={effectiveEmail}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[9px] text-foreground/40 flex items-center gap-2">
                  <Lock size={11} /> RECORDED TO FIRESTORE SECURE DB // TRANSMISSIONS LOG
                </span>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {onClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-6 py-4 border border-border font-mono text-[10px] uppercase tracking-widest hover:border-foreground text-foreground/70 hover:text-foreground transition-colors"
                    >
                      CANCEL
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-ksp-oxblood text-white font-mono text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>ENCRYPTING & DISPATCHING...</>
                    ) : user ? (
                      <>
                        <Send size={12} /> DISPATCH BESPOKE COMMISSION INQUIRY
                      </>
                    ) : (
                      <>
                        <Lock size={12} /> SIGN IN WITH GOOGLE & DISPATCH
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
