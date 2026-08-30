'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Activity,
  CheckSquare,
  Square,
  Layers,
  Sparkles,
  Volume2,
  Sliders,
  CheckCircle2,
  Pause,
} from 'lucide-react';
import { STUDENT_PRIMER_DATA } from '../../data/scenes';
import { soundEngine } from '../../lib/soundEngine';
import { speechEngine, SpeechState } from '../../lib/speechEngine';

interface StudentPrimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack?: (trackId: string) => void;
}

export function StudentPrimerModal({
  isOpen,
  onClose,
  onSelectTrack,
}: StudentPrimerModalProps) {
  const [completedChecklist, setCompletedChecklist] = useState<number[]>([0, 1, 2, 3]);
  const [speechState, setSpeechState] = useState<SpeechState>(speechEngine.getState());

  useEffect(() => {
    const unsub = speechEngine.subscribe((st) => {
      setSpeechState(st);
    });
    return () => unsub();
  }, []);

  if (!isOpen) return null;

  const isPrimerNarrating =
    speechState.isPlaying && speechState.id === 'student-primer';
  const isPaused = isPrimerNarrating && speechState.isPaused;

  const primerFullText = `Decoding the Vibe: A Student’s Primer on Musical Analytics.

Introduction: The Science Behind the Sound.
As musicologists navigating a digital-first landscape, modern listening is no longer a passive act. It is a process of data-driven discovery. Musical analytics provide the map for this journey, offering a rigorous science of discovery that elevates music from a mere audio file into a multidimensional narrative entry point.

The 6 Pillars of Musical Data:
Pillar One: Melodicness. Measures memorability, pitch contour, and liturgical chant elements. High melodicness creates instant emotional resonance.
Pillar Two: Acousticness. The ratio of raw physical instruments such as brass and strings against synthetic elements.
Pillar Three: Valence. The musical positiveness transmitted by a track, differentiating euphoric celebration from dark royal introspection.
Pillar Four: Danceability. How suitable a track is for movement based on tempo stability and beat strength.
Pillar Five: Energy. A perceptual measure of intensity, activity, volume, and timbre density.
Pillar Six: Tempo in Beats Per Minute. The pace and pulse of the composition.

Comparative Case Study:
Behold the Twisted Beast features 92% Energy, 88% Melodicness, and an 82% Acoustic orchestral score, evoking royal sovereign majesty. In contrast, Ice King Shit features 78% Danceability and 84% Energy, delivering an aggressive 808 Miami trap atmosphere.

Audio Analysis Architecture:
Step One: Audio Decoding via Web Audio API. Step Two: Real-time Fast Fourier Transform and spectral feature extraction. Step Three: Multi-sensory synchronization binding audio data to reactive visuals.`;

  const toggleNarrate = () => {
    soundEngine.playClick(isPrimerNarrating && !isPaused ? 450 : 750, 0.03);
    if (isPrimerNarrating) {
      speechEngine.togglePlay();
    } else {
      speechEngine.speak({
        id: 'student-primer',
        title: 'Decoding the Vibe: Musical Analytics',
        subtitle: 'STUDENT CURRICULUM // PRIMER',
        category: 'CURRICULUM',
        text: primerFullText,
      });
    }
  };

  const toggleCheck = (idx: number) => {
    if (completedChecklist.includes(idx)) {
      setCompletedChecklist(completedChecklist.filter((i) => i !== idx));
    } else {
      setCompletedChecklist([...completedChecklist, idx]);
      soundEngine.playHarmonicChime(528);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0c0c0c]/80 backdrop-blur-xl"
      />

      {/* Main Modal Shell (Editorial Warm White) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-white text-[#1a1a1a] rounded-3xl border border-[#1a1a1a]/15 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#1a1a1a]/10 bg-white/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen size={16} className="text-[#B76E79]" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B76E79] block font-bold">
                CURRICULUM SPECIFICATION
              </span>
              <h3 className="text-base font-serif tracking-wide text-[#1a1a1a]">
                Decoding the Vibe: A Student’s Primer on Musical Analytics
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Listen button in header */}
            <button
              onClick={toggleNarrate}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                isPrimerNarrating && !isPaused
                  ? 'bg-[#B76E79] text-white animate-pulse'
                  : 'bg-[#1a1a1a] text-white hover:bg-[#B76E79]'
              }`}
            >
              {isPrimerNarrating && !isPaused ? <Pause size={12} /> : <Volume2 size={12} />}
              <span>{isPrimerNarrating && !isPaused ? 'PAUSE TTS' : 'LISTEN TO PRIMER'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close primer modal"
              className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Scrollable Curriculum Body */}
        <div className="overflow-y-auto p-6 sm:p-10 flex flex-col gap-10 text-[#1a1a1a]">
          
          {/* TTS Active Banner */}
          {isPrimerNarrating && (
            <div className="p-3.5 rounded-2xl bg-[#B76E79]/10 border border-[#B76E79]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Volume2 size={14} className="text-[#B76E79] animate-bounce" />
                <span className="text-xs font-mono text-[#1a1a1a]">
                  <strong>TTS Reading:</strong> {speechState.currentWord ? `"${speechState.currentWord}"` : 'Curriculum in progress'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#B76E79] font-bold">
                CONTINUES IN GLOBAL MEDIA DOCK
              </span>
            </div>
          )}

          {/* SECTION 1: Introduction */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
              1. INTRODUCTION: THE SCIENCE BEHIND THE SOUND
            </span>
            <p className="text-sm sm:text-base font-light text-[#1a1a1a]/85 leading-relaxed">
              As musicologists navigating a digital-first landscape, we must recognize that modern listening is no longer a passive act. It is a process of data-driven discovery. Musical analytics provide the map for this journey, offering a rigorous &ldquo;science of discovery&rdquo; that elevates music from a mere MP3 file into a multidimensional narrative entry point where audio data dictates visual and atmospheric reality.
            </p>
          </div>

          {/* SECTION 2: The 6 Pillars of Musical Data Glossary */}
          <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                2. THE ANALYTICS GLOSSARY: THE 6 PILLARS OF MUSICAL DATA
              </span>
              <span className="text-[9px] font-mono text-[#1a1a1a]/50 uppercase">TELEMETRY MATRIX</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STUDENT_PRIMER_DATA.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#f8f7f4] border border-[#1a1a1a]/10 flex flex-col justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B76E79]">
                      {idx + 1}. {pillar.name}
                    </span>
                    <Activity size={12} className="text-[#1a1a1a]/30" />
                  </div>
                  <p className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                    <strong className="text-[#1a1a1a] font-medium">Technical Definition: </strong>
                    {pillar.definition}
                  </p>
                  <p className="text-[11px] text-[#1a1a1a]/60 leading-relaxed italic bg-white p-2.5 rounded-lg border border-[#1a1a1a]/5">
                    <strong>Emotional Impact: </strong>
                    {pillar.emotionalImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 & 4: Case Studies Comparison */}
          <div className="flex flex-col gap-5 border-t border-[#1a1a1a]/10 pt-8">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
              3 & 4. CASE STUDIES & THE VIBE SHIFT
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Study 1 */}
              <div className="p-6 rounded-2xl bg-[#f8f7f4] border border-[#1a1a1a]/10 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#B76E79] uppercase font-bold">
                    OPUS 01 // SANCTUM ERA
                  </span>
                  <h4 className="text-lg font-serif font-medium text-[#1a1a1a]">
                    {STUDENT_PRIMER_DATA.caseStudies[0].title}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#1a1a1a]/60 my-1">
                    <span>GENRE: {STUDENT_PRIMER_DATA.caseStudies[0].genre}</span>
                    <span>·</span>
                    <span>BPM: {STUDENT_PRIMER_DATA.caseStudies[0].bpm}</span>
                    <span>·</span>
                    <span>ENERGY: {STUDENT_PRIMER_DATA.caseStudies[0].energy}%</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                    {STUDENT_PRIMER_DATA.caseStudies[0].highlights.map((hl, hidx) => (
                      <li key={hidx} className="flex items-start gap-1.5">
                        <span className="text-[#B76E79] font-bold">›</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {onSelectTrack && (
                  <button
                    onClick={() => {
                      onSelectTrack('track-01');
                      onClose();
                    }}
                    className="self-start px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-[#1a1a1a] text-white hover:bg-[#B76E79] transition-colors cursor-pointer"
                  >
                    LISTEN TO MASTER CUT (432Hz)
                  </button>
                )}
              </div>

              {/* Case Study 2 */}
              <div className="p-6 rounded-2xl bg-[#f8f7f4] border border-[#1a1a1a]/10 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#B76E79] uppercase font-bold">
                    SINGLE // GENESIS ERA
                  </span>
                  <h4 className="text-lg font-serif font-medium text-[#1a1a1a]">
                    {STUDENT_PRIMER_DATA.caseStudies[1].title}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#1a1a1a]/60 my-1">
                    <span>GENRE: {STUDENT_PRIMER_DATA.caseStudies[1].genre}</span>
                    <span>·</span>
                    <span>BPM: {STUDENT_PRIMER_DATA.caseStudies[1].bpm}</span>
                    <span>·</span>
                    <span>ENERGY: {STUDENT_PRIMER_DATA.caseStudies[1].energy}%</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
                    {STUDENT_PRIMER_DATA.caseStudies[1].highlights.map((hl, hidx) => (
                      <li key={hidx} className="flex items-start gap-1.5">
                        <span className="text-[#B76E79] font-bold">›</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {onSelectTrack && (
                  <button
                    onClick={() => {
                      onSelectTrack('track-02');
                      onClose();
                    }}
                    className="self-start px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-[#1a1a1a] text-white hover:bg-[#B76E79] transition-colors cursor-pointer"
                  >
                    LISTEN TO MIAMI CUT
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 5: Audio Analysis Architecture */}
          <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
              5. UNDER THE HOOD: AUDIO ANALYSIS ARCHITECTURE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STUDENT_PRIMER_DATA.audioAnalysisArchitecture.steps.map((s) => (
                <div key={s.step} className="p-4 rounded-xl bg-[#f8f7f4] border border-[#1a1a1a]/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1a1a1a] text-white text-[10px] font-mono flex items-center justify-center font-bold">
                      {s.step}
                    </span>
                    <h5 className="text-xs font-mono font-bold text-[#1a1a1a] uppercase">{s.title}</h5>
                  </div>
                  <p className="text-xs text-[#1a1a1a]/75 leading-relaxed font-sans">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: Student Takeaway Checklist */}
          <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 pt-8 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B76E79] font-bold">
                6. STUDENT TAKEAWAY CHECKLIST
              </span>
              <span className="text-[9px] font-mono text-[#1a1a1a]/50">
                COMPLETED {completedChecklist.length} / {STUDENT_PRIMER_DATA.takeaways.length}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {STUDENT_PRIMER_DATA.takeaways.map((takeaway, idx) => {
                const isChecked = completedChecklist.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="p-3.5 rounded-xl border border-[#1a1a1a]/10 bg-white hover:bg-[#f8f7f4] transition-colors flex items-center gap-3 cursor-pointer shadow-sm"
                  >
                    {isChecked ? (
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    ) : (
                      <Square size={16} className="text-[#1a1a1a]/30 shrink-0" />
                    )}
                    <span className={`text-xs ${isChecked ? 'text-[#1a1a1a] font-medium' : 'text-[#1a1a1a]/60'}`}>
                      {takeaway}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-[#1a1a1a]/10 bg-[#f8f7f4] flex items-center justify-between text-[9px] font-mono text-[#1a1a1a]/60 uppercase tracking-widest shrink-0">
          <span>KINGSHADP CURRICULUM ARCHIVE</span>
          <span>PRESS [ESC] TO CLOSE</span>
        </div>
      </motion.div>
    </div>
  );
}
