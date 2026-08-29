'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc, Waves, Sparkles } from 'lucide-react';

interface SoundResonanceBarProps {
  onOpenTrackModal?: () => void;
}

type DroneMode = 'off' | '432hz' | '528hz' | 'subbass';

export function SoundResonanceBar({ onOpenTrackModal }: SoundResonanceBarProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [droneMode, setDroneMode] = useState<DroneMode>('off');
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio Synth for ambient drones
  const initSynth = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const stopDrone = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.8);
      setTimeout(() => {
        try {
          oscillator1Ref.current?.stop();
          oscillator2Ref.current?.stop();
          oscillator1Ref.current?.disconnect();
          oscillator2Ref.current?.disconnect();
          oscillator1Ref.current = null;
          oscillator2Ref.current = null;
        } catch {
          // ignore already stopped
        }
      }, 800);
    }
  };

  const startDrone = (mode: DroneMode) => {
    initSynth();
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    stopDrone();

    if (mode === 'off') {
      setDroneMode('off');
      return;
    }

    setTimeout(() => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 1.2);

      let freq1 = 432;
      let freq2 = 216;

      if (mode === '528hz') {
        freq1 = 528;
        freq2 = 264;
      } else if (mode === 'subbass') {
        freq1 = 55; // A1
        freq2 = 27.5; // Sub A0
      }

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      oscillator1Ref.current = osc1;
      oscillator2Ref.current = osc2;
      gainNodeRef.current = gain;
      setDroneMode(mode);
    }, 200);
  };

  const toggleTrack = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      // Stop drone if starting track
      if (droneMode !== 'off') {
        stopDrone();
        setDroneMode('off');
      }
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    }
  };

  useEffect(() => {
    return () => {
      stopDrone();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-2 text-white font-mono select-none">
      <audio
        ref={audioRef}
        src="/music/behold-the-twisted-beast.mp3"
        loop
        onEnded={() => setIsPlayingMusic(false)}
      />

      {/* Main Pill */}
      <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all">
        {/* Track Play/Pause */}
        <button
          onClick={toggleTrack}
          aria-label={isPlayingMusic ? 'Pause Behold the Twisted Beast' : 'Play Behold the Twisted Beast'}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
        >
          {isPlayingMusic ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
        </button>

        {/* Current Audio State */}
        <div 
          onClick={onOpenTrackModal}
          className="flex flex-col cursor-pointer group pr-2"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
              {isPlayingMusic ? 'NOW PLAYING' : droneMode !== 'off' ? 'ATMOSPHERE SYNTH' : 'SONIC ARCHITECTURE'}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isPlayingMusic || droneMode !== 'off' ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
          </div>
          <span className="text-[10px] tracking-[0.1em] text-white/90 group-hover:text-[#B76E79] transition-colors truncate max-w-[140px] sm:max-w-[180px]">
            {isPlayingMusic ? 'Behold the Twisted Beast' : droneMode === '432hz' ? '432 Hz Sanctum Harmonic' : droneMode === '528hz' ? '528 Hz Miracle Tone' : droneMode === 'subbass' ? '28 Hz Subterranean' : 'Restrained Silence'}
          </span>
        </div>

        {/* Minimal Spectrum Visualizer */}
        <div className="hidden sm:flex items-center gap-1 h-3 px-1 border-l border-white/10">
          {[40, 80, 50, 100, 60, 30].map((h, i) => (
            <div
              key={i}
              className={`w-[2px] rounded-full transition-all duration-300 ${
                isPlayingMusic || droneMode !== 'off' 
                  ? 'bg-white/80 animate-pulse' 
                  : 'bg-white/20 h-1'
              }`}
              style={{
                height: isPlayingMusic || droneMode !== 'off' ? `${h}%` : '2px',
                animationDelay: `${i * 120}ms`
              }}
            />
          ))}
        </div>

        {/* Tone Generator Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
            droneMode !== 'off' 
              ? 'border-[#B76E79] text-[#B76E79] bg-[#B76E79]/10' 
              : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
          }`}
          title="Atmospheric Drone Synthesizer"
        >
          <Waves size={13} />
        </button>
      </div>

      {/* Expanded Synthesizer Controls */}
      {isExpanded && (
        <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-xl p-3 flex flex-col gap-2.5 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between text-[8px] tracking-[0.25em] uppercase text-white/50 border-b border-white/10 pb-1.5">
            <span>ATMOSPHERIC RESONANCE</span>
            <span>WEB AUDIO</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => startDrone(droneMode === '432hz' ? 'off' : '432hz')}
              className={`px-2 py-1.5 rounded text-[8px] tracking-wider uppercase transition-all cursor-pointer ${
                droneMode === '432hz'
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              432 Hz Sanctum
            </button>

            <button
              onClick={() => startDrone(droneMode === '528hz' ? 'off' : '528hz')}
              className={`px-2 py-1.5 rounded text-[8px] tracking-wider uppercase transition-all cursor-pointer ${
                droneMode === '528hz'
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              528 Hz Solfeggio
            </button>

            <button
              onClick={() => startDrone(droneMode === 'subbass' ? 'off' : 'subbass')}
              className={`px-2 py-1.5 rounded text-[8px] tracking-wider uppercase transition-all cursor-pointer ${
                droneMode === 'subbass'
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              28 Hz Sub-Bass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
