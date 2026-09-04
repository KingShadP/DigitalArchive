// Web Audio API Micro-Synthesizer & Audio Analyser Engine

class SoundEngine {
  private ctx: AudioContext | null = null;
  private subOsc: OscillatorNode | null = null;
  private subGain: GainNode | null = null;
  private isSubActive: boolean = false;
  private isMuted: boolean = false;

  private analyser: AnalyserNode | null = null;
  private mediaSource: MediaElementAudioSourceNode | null = null;
  private connectedMediaElement: HTMLMediaElement | null = null;
  private animationFrameId: number | null = null;
  private frequencyData: Uint8Array<ArrayBuffer> | null = null;

  public initCtx() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Connect Master Audio element to analyser node for reactive ambient depth
  public connectAudioElement(audioElement: HTMLMediaElement) {
    if (typeof window === 'undefined') return;
    if (this.connectedMediaElement === audioElement) return;

    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      if (!this.analyser) {
        this.analyser = ctx.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.85;
        this.frequencyData = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
      }

      if (!this.mediaSource) {
        this.mediaSource = ctx.createMediaElementSource(audioElement);
        this.mediaSource.connect(this.analyser);
        this.analyser.connect(ctx.destination);
        this.connectedMediaElement = audioElement;
      }

      this.startAnalyserLoop();
    } catch {
      // Audio element cross-origin or already connected safely handled
      this.startSimulatedAnalyserLoop();
    }
  }

  private startAnalyserLoop() {
    if (typeof window === 'undefined') return;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    const update = () => {
      if (this.analyser && this.frequencyData) {
        this.analyser.getByteFrequencyData(this.frequencyData);

        let sum = 0;
        let lowSum = 0;
        const lowCutoff = Math.floor(this.frequencyData.length * 0.2);

        for (let i = 0; i < this.frequencyData.length; i++) {
          const val = this.frequencyData[i] / 255;
          sum += val;
          if (i < lowCutoff) {
            lowSum += val;
          }
        }

        const energy = sum / this.frequencyData.length;
        const low = lowSum / Math.max(1, lowCutoff);

        document.documentElement.style.setProperty('--audio-energy', energy.toFixed(4));
        document.documentElement.style.setProperty('--audio-low', low.toFixed(4));
      }
      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  private startSimulatedAnalyserLoop() {
    if (typeof window === 'undefined') return;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    let phase = 0;
    const update = () => {
      phase += 0.05;
      const energy = 0.2 + 0.15 * Math.sin(phase);
      const low = 0.3 + 0.2 * Math.cos(phase * 0.7);

      document.documentElement.style.setProperty('--audio-energy', energy.toFixed(4));
      document.documentElement.style.setProperty('--audio-low', low.toFixed(4));

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  // Play subtle luxury interface haptic tone
  public playClick(freq = 880, duration = 0.04, gainVal = 0.015) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        freq * 0.5,
        ctx.currentTime + duration
      );

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext gracefully ignored
    }
  }

  // Play 432 Hz Pythagorean harmonic resonance chime
  public playHarmonicChime(frequency = 432) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(frequency, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(frequency * 2, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch {
      // Graceful
    }
  }

  // Toggle 28 Hz Sub-Harmonic Binaural Grounding Hum
  public toggleSubHarmonic(): boolean {
    const ctx = this.initCtx();
    if (!ctx) return false;

    if (this.isSubActive) {
      if (this.subGain) {
        this.subGain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + 0.5
        );
        setTimeout(() => {
          this.subOsc?.stop();
          this.subOsc?.disconnect();
          this.subGain?.disconnect();
          this.subOsc = null;
          this.subGain = null;
        }, 500);
      }
      this.isSubActive = false;
      return false;
    } else {
      const now = ctx.currentTime;
      this.subOsc = ctx.createOscillator();
      this.subGain = ctx.createGain();

      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(28, now); // 28 Hz infrasound resonance

      this.subGain.gain.setValueAtTime(0.0001, now);
      this.subGain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);

      this.subOsc.connect(this.subGain);
      this.subGain.connect(ctx.destination);

      this.subOsc.start(now);
      this.isSubActive = true;
      return true;
    }
  }

  public getIsSubActive() {
    return this.isSubActive;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
  }

  // Harmonic Calibration Tone Generator (432 Hz vs 440 Hz / Solfeggio)
  private testToneOsc: OscillatorNode | null = null;
  private testToneGain: GainNode | null = null;
  private currentTestFreq: number | null = null;

  public playContinuousTone(freq: number, gainLevel = 0.05): number {
    const ctx = this.initCtx();
    if (!ctx) return 0;
    const now = ctx.currentTime;

    if (this.testToneOsc && this.testToneGain) {
      if (this.currentTestFreq === freq) {
        this.stopContinuousTone();
        return 0;
      } else {
        this.testToneOsc.frequency.exponentialRampToValueAtTime(freq, now + 0.15);
        this.currentTestFreq = freq;
        return freq;
      }
    }

    this.testToneOsc = ctx.createOscillator();
    this.testToneGain = ctx.createGain();

    this.testToneOsc.type = 'sine';
    this.testToneOsc.frequency.setValueAtTime(freq, now);

    this.testToneGain.gain.setValueAtTime(0.0001, now);
    this.testToneGain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.2);

    this.testToneOsc.connect(this.testToneGain);
    this.testToneGain.connect(ctx.destination);

    this.testToneOsc.start(now);
    this.currentTestFreq = freq;
    return freq;
  }

  public stopContinuousTone() {
    if (this.testToneGain && this.ctx) {
      try {
        this.testToneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);
        setTimeout(() => {
          this.testToneOsc?.stop();
          this.testToneOsc?.disconnect();
          this.testToneGain?.disconnect();
          this.testToneOsc = null;
          this.testToneGain = null;
          this.currentTestFreq = null;
        }, 250);
      } catch {
        this.testToneOsc = null;
        this.testToneGain = null;
        this.currentTestFreq = null;
      }
    }
  }

  public getCurrentTestFreq(): number | null {
    return this.currentTestFreq;
  }
}

export const soundEngine = new SoundEngine();
