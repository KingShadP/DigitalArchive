'use client';

// Web Speech API Text-to-Speech Engine for KingShadP Literature & Archival Codices

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  id?: string;
  title: string;
  subtitle?: string;
  category?: string;
  fullText: string;
  currentParagraphIndex: number;
  totalParagraphs: number;
  currentChunkText: string;
  currentWord: string;
  progress: number; // 0 to 1
  rate: number; // 0.8 to 1.5
  voiceName: string;
  availableVoices: string[];
}

type SpeechListener = (state: SpeechState) => void;

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;

  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    title: '',
    subtitle: '',
    category: 'LITERATURE',
    fullText: '',
    currentParagraphIndex: 0,
    totalParagraphs: 0,
    currentChunkText: '',
    currentWord: '',
    progress: 0,
    rate: 1.0,
    voiceName: '',
    availableVoices: [],
  };

  private paragraphs: string[] = [];
  private currentParagraphIdx: number = 0;
  private isManuallyStopped: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const loadedVoices = this.synth.getVoices();
    this.voices = loadedVoices;

    // Prefer English natural/neural or clear voices
    const preferredVoices = this.voices.filter(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Daniel') ||
          v.name.includes('Aaron') ||
          v.name.includes('Premium') ||
          v.name.includes('Enhanced'))
    );

    const defaultEnglish = this.voices.filter((v) => v.lang.startsWith('en'));
    this.selectedVoice =
      preferredVoices[0] || defaultEnglish[0] || this.voices[0] || null;

    this.state.availableVoices = this.voices
      .filter((v) => v.lang.startsWith('en'))
      .map((v) => v.name);
    this.state.voiceName = this.selectedVoice ? this.selectedVoice.name : 'Default Voice';
    this.notify();
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const cloned = { ...this.state };
    this.listeners.forEach((l) => l(cloned));
  }

  public getState(): SpeechState {
    return { ...this.state };
  }

  /**
   * Start reading a literature document or excerpt
   */
  public speak(options: {
    id?: string;
    title: string;
    subtitle?: string;
    category?: string;
    text: string;
    startParagraphIndex?: number;
  }) {
    if (typeof window === 'undefined' || !this.synth) return;

    this.stop();
    this.isManuallyStopped = false;

    // Split text into meaningful paragraphs / sentences for reliable speech chunking
    const rawParagraphs = options.text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    this.paragraphs = rawParagraphs.length > 0 ? rawParagraphs : [options.text.trim()];
    this.currentParagraphIdx = options.startParagraphIndex || 0;

    this.state = {
      ...this.state,
      isPlaying: true,
      isPaused: false,
      id: options.id,
      title: options.title,
      subtitle: options.subtitle || '',
      category: options.category || 'LITERATURE',
      fullText: options.text,
      currentParagraphIndex: this.currentParagraphIdx,
      totalParagraphs: this.paragraphs.length,
      currentChunkText: this.paragraphs[this.currentParagraphIdx] || '',
      currentWord: '',
      progress: this.paragraphs.length > 0 ? this.currentParagraphIdx / this.paragraphs.length : 0,
    };

    this.notify();
    this.playCurrentParagraph();
  }

  private playCurrentParagraph() {
    if (!this.synth || this.isManuallyStopped) return;
    if (this.currentParagraphIdx >= this.paragraphs.length) {
      this.finish();
      return;
    }

    const chunk = this.paragraphs[this.currentParagraphIdx];
    if (!chunk) {
      this.finish();
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(chunk);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.state.rate;
    utterance.pitch = 1.0;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIdx = event.charIndex;
        const textFromIdx = chunk.substring(charIdx);
        const nextSpace = textFromIdx.search(/\s|[.,;!?]/);
        const word = nextSpace === -1 ? textFromIdx : textFromIdx.substring(0, nextSpace);
        
        const paragraphProgress = chunk.length > 0 ? charIdx / chunk.length : 0;
        const overallProgress =
          (this.currentParagraphIdx + paragraphProgress) / Math.max(1, this.paragraphs.length);

        this.state.currentWord = word;
        this.state.progress = Math.min(0.99, Math.max(0, overallProgress));
        this.notify();
      }
    };

    utterance.onend = () => {
      if (this.isManuallyStopped) return;
      this.currentParagraphIdx++;
      if (this.currentParagraphIdx < this.paragraphs.length) {
        this.state.currentParagraphIndex = this.currentParagraphIdx;
        this.state.currentChunkText = this.paragraphs[this.currentParagraphIdx];
        this.state.progress = this.currentParagraphIdx / this.paragraphs.length;
        this.notify();
        // Short natural breath pause between paragraphs
        setTimeout(() => {
          if (!this.isManuallyStopped && this.state.isPlaying && !this.state.isPaused) {
            this.playCurrentParagraph();
          }
        }, 220);
      } else {
        this.finish();
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn('TTS Utterance error:', e);
      this.finish();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (!this.synth || !this.state.isPlaying) return;
    this.synth.pause();
    this.state.isPaused = true;
    this.notify();
  }

  public resume() {
    if (!this.synth || !this.state.isPlaying) return;
    this.synth.resume();
    this.state.isPaused = false;
    this.notify();
  }

  public togglePlay() {
    if (!this.state.isPlaying) {
      if (this.state.fullText) {
        this.speak({
          id: this.state.id,
          title: this.state.title,
          subtitle: this.state.subtitle,
          category: this.state.category,
          text: this.state.fullText,
          startParagraphIndex: this.state.currentParagraphIndex,
        });
      }
      return;
    }

    if (this.state.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  public stop() {
    this.isManuallyStopped = true;
    if (this.synth) {
      this.synth.cancel();
    }
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.currentWord = '';
    this.notify();
  }

  public nextParagraph() {
    if (this.currentParagraphIdx < this.paragraphs.length - 1) {
      this.currentParagraphIdx++;
      this.state.currentParagraphIndex = this.currentParagraphIdx;
      this.state.currentChunkText = this.paragraphs[this.currentParagraphIdx];
      this.notify();
      this.playCurrentParagraph();
    }
  }

  public prevParagraph() {
    if (this.currentParagraphIdx > 0) {
      this.currentParagraphIdx--;
      this.state.currentParagraphIndex = this.currentParagraphIdx;
      this.state.currentChunkText = this.paragraphs[this.currentParagraphIdx];
      this.notify();
      this.playCurrentParagraph();
    }
  }

  public setRate(rate: number) {
    this.state.rate = rate;
    this.notify();
    if (this.state.isPlaying && !this.state.isPaused) {
      this.playCurrentParagraph();
    }
  }

  public setVoiceByName(voiceName: string) {
    const found = this.voices.find((v) => v.name === voiceName);
    if (found) {
      this.selectedVoice = found;
      this.state.voiceName = found.name;
      this.notify();
      if (this.state.isPlaying && !this.state.isPaused) {
        this.playCurrentParagraph();
      }
    }
  }

  private finish() {
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.progress = 1.0;
    this.state.currentWord = '';
    this.notify();
  }
}

export const speechEngine = new SpeechEngine();
