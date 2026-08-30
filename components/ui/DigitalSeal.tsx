'use client';

import React from 'react';
import { motion } from 'motion/react';

export type SealEmblem =
  | 'GIRAGON_CREST'
  | 'SOLFEGGIO_432HZ'
  | 'SANCTUM_CORONET'
  | 'ARCHIVAL_WAX'
  | 'CRYPTIC_MONOLITH';

export type SealFinish =
  | 'ROSE_GOLD'
  | 'PLATINUM'
  | 'OBSIDIAN'
  | 'WAX_CRIMSON'
  | 'EMERALD';

export interface DigitalSealConfig {
  emblem: SealEmblem;
  finish: SealFinish;
  curatorName: string;
  clearanceLevel: string;
  referenceCode: string;
  issueDate: string;
  rotation?: number; // degrees
  showWatermarkUnderlay?: boolean;
  watermarkOpacity?: number; // 0.05 - 0.4
  embossed?: boolean;
  watermarkStyle?: 'CENTER' | 'DIAGONAL_REPEAT' | 'CORNER_STAMP' | 'FULL_SUITE';
}

interface DigitalSealProps {
  config: DigitalSealConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'watermark';
  className?: string;
  interactive?: boolean;
  embossed?: boolean;
  animateEntrance?: boolean;
}

export function DigitalSeal({
  config,
  size = 'md',
  className = '',
  embossed: embossedProp,
  animateEntrance = true,
}: DigitalSealProps) {
  const {
    emblem,
    finish,
    curatorName,
    clearanceLevel,
    referenceCode,
    issueDate,
    rotation = 0,
    embossed = true,
  } = config;

  const isEmbossed = embossedProp !== undefined ? embossedProp : embossed;

  // Finish Color Palettes
  const getColors = () => {
    switch (finish) {
      case 'ROSE_GOLD':
        return {
          primary: '#B76E79',
          secondary: '#E8C5C8',
          accent: '#7D3E47',
          bg: '#FFF8F8',
          glow: 'rgba(183, 110, 121, 0.25)',
          border: '#B76E79',
        };
      case 'PLATINUM':
        return {
          primary: '#64748B',
          secondary: '#CBD5E1',
          accent: '#334155',
          bg: '#F8FAFC',
          glow: 'rgba(100, 116, 139, 0.2)',
          border: '#94A3B8',
        };
      case 'OBSIDIAN':
        return {
          primary: '#18181B',
          secondary: '#71717A',
          accent: '#09090B',
          bg: '#FAFAFA',
          glow: 'rgba(24, 24, 27, 0.15)',
          border: '#27272A',
        };
      case 'WAX_CRIMSON':
        return {
          primary: '#991B1B',
          secondary: '#F87171',
          accent: '#7F1D1D',
          bg: '#FEF2F2',
          glow: 'rgba(153, 27, 27, 0.25)',
          border: '#991B1B',
        };
      case 'EMERALD':
        return {
          primary: '#065F46',
          secondary: '#6EE7B7',
          accent: '#064E3B',
          bg: '#ECFDF5',
          glow: 'rgba(6, 95, 70, 0.2)',
          border: '#047857',
        };
      default:
        return {
          primary: '#B76E79',
          secondary: '#E8C5C8',
          accent: '#7D3E47',
          bg: '#FFF8F8',
          glow: 'rgba(183, 110, 121, 0.25)',
          border: '#B76E79',
        };
    }
  };

  const colors = getColors();

  const dimensions = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56',
    watermark: 'w-72 h-72 sm:w-96 sm:h-96',
  }[size];

  const curatorText = (curatorName || 'KINGSHADP ARCHIVIST').toUpperCase();
  const clearanceText = (clearanceLevel || 'SANCTUM CLASSIFIED').toUpperCase();
  const dateText = (issueDate || 'MMXXVI').toUpperCase();
  const codeText = (referenceCode || 'KSP-ARCHIVE').toUpperCase();

  return (
    <motion.div
      initial={animateEntrance ? { opacity: 0, scale: 0.78, rotate: rotation - 8 } : false}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1], // fluid cubic ease-out
      }}
      className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}
    >
      <svg
        viewBox="0 0 300 300"
        className={`w-full h-full ${
          isEmbossed ? 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]' : ''
        }`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Circular Text Path for Inscriptions */}
          <path
            id="curatorTextPath"
            d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
          />
          <path
            id="clearanceTextPath"
            d="M 150, 150 m -95, 0 a 95,95 0 1,0 190,0 a 95,95 0 1,0 -190,0"
          />

          {/* Gradients */}
          <radialGradient id={`seal-grad-${finish}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.bg} stopOpacity="0.95" />
            <stop offset="70%" stopColor={colors.bg} stopOpacity="0.75" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.4" />
          </radialGradient>

          <linearGradient id={`gold-ring-${finish}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
        </defs>

        {/* Outer Guilloche / Notched Rim */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill={`url(#seal-grad-${finish})`}
          stroke={colors.primary}
          strokeWidth="3.5"
          strokeDasharray="4 2"
        />

        {/* Concentric Double Border */}
        <circle
          cx="150"
          cy="150"
          r="134"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
        />
        <circle
          cx="150"
          cy="150"
          r="126"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1"
          strokeDasharray="8 4"
        />

        {/* Circular Outer Inscription: Curator Name & Reference */}
        <text
          fill={colors.primary}
          fontSize="9.5"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="3"
        >
          <textPath
            href="#curatorTextPath"
            startOffset="50%"
            textAnchor="middle"
          >
            ★ {curatorText} ★ SEAL VERIFIED {codeText} ★
          </textPath>
        </text>

        {/* Inner Border Ring */}
        <circle
          cx="150"
          cy="150"
          r="86"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
        />
        <circle
          cx="150"
          cy="150"
          r="80"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Circular Inner Inscription: Clearance Level & Issue Date */}
        <text
          fill={colors.accent}
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="2.5"
        >
          <textPath
            href="#clearanceTextPath"
            startOffset="50%"
            textAnchor="middle"
          >
            • {clearanceText} • {dateText} •
          </textPath>
        </text>

        {/* CENTER EMBLEM ICONOGRAPHY */}
        <g transform="translate(150, 150)">
          {emblem === 'GIRAGON_CREST' && (
            <g className="animate-in zoom-in-50 duration-300">
              {/* Sovereign Giragon Monolith Iconography */}
              <circle r="60" fill="none" stroke={colors.secondary} strokeWidth="1" />
              {/* Dragon wings and giraffe silhouette glyph */}
              <path
                d="M -30,-15 C -25,-40 0,-45 0,-45 C 0,-45 25,-40 30,-15 C 38,-5 42,15 30,35 C 20,25 15,10 0,15 C -15,10 -20,25 -30,35 C -42,15 -38,-5 -30,-15 Z"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M 0,-45 L 0,38 M -15,-10 L 15,-10 M -20,10 L 20,10"
                stroke={colors.primary}
                strokeWidth="1.5"
              />
              {/* Crown / Horn points */}
              <polygon
                points="0,-48 -6,-36 0,-38 6,-36"
                fill={colors.accent}
              />
              <circle cx="-12" cy="-4" r="2" fill={colors.primary} />
              <circle cx="12" cy="-4" r="2" fill={colors.primary} />
              <circle cx="0" cy="-20" r="3" fill={colors.accent} />
            </g>
          )}

          {emblem === 'SOLFEGGIO_432HZ' && (
            <g className="animate-in zoom-in-50 duration-300">
              {/* 432 Hz Sacred Harmonic Geometry */}
              <circle r="55" fill="none" stroke={colors.secondary} strokeWidth="1" strokeDasharray="4 2" />
              <polygon
                points="0,-45 39,-22 39,22 0,45 -39,22 -39,-22"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2"
              />
              <polygon
                points="0,45 39,22 39,-22 0,-45 -39,-22 -39,22"
                fill="none"
                stroke={colors.secondary}
                strokeWidth="1.5"
                transform="rotate(30)"
              />
              <circle r="22" fill="none" stroke={colors.primary} strokeWidth="1.5" />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="900"
                fill={colors.primary}
                letterSpacing="1"
              >
                432Hz
              </text>
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
                fill={colors.accent}
                letterSpacing="2"
              >
                SOLFEGGIO
              </text>
            </g>
          )}

          {emblem === 'SANCTUM_CORONET' && (
            <g className="animate-in zoom-in-50 duration-300">
              {/* Imperial Sanctum Coronet */}
              <path
                d="M -35,20 L -40,-15 L -20,-5 L 0,-25 L 20,-5 L 40,-15 L 35,20 Z"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="-40" cy="-17" r="3.5" fill={colors.accent} />
              <circle cx="-20" cy="-7" r="3" fill={colors.primary} />
              <circle cx="0" cy="-28" r="4.5" fill={colors.accent} />
              <circle cx="20" cy="-7" r="3" fill={colors.primary} />
              <circle cx="40" cy="-17" r="3.5" fill={colors.accent} />
              <line x1="-35" y1="20" x2="35" y2="20" stroke={colors.primary} strokeWidth="3" />
              <text
                x="0"
                y="36"
                textAnchor="middle"
                fontSize="8"
                fontFamily="serif"
                fontStyle="italic"
                fontWeight="bold"
                fill={colors.primary}
                letterSpacing="2"
              >
                SANCTUM
              </text>
            </g>
          )}

          {emblem === 'ARCHIVAL_WAX' && (
            <g className="animate-in zoom-in-50 duration-300">
              {/* Intricate Calligraphic KSP Monogram */}
              <circle r="52" fill="none" stroke={colors.primary} strokeWidth="2" strokeDasharray="6 3" />
              <path
                d="M -24,-30 L -24,30 M -24,-2 L 20,-30 M -5,-12 L 22,30"
                stroke={colors.primary}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 5,-15 C 25,-15 25,-30 5,-30 M 5,0 C 25,0 25,25 5,25"
                fill="none"
                stroke={colors.accent}
                strokeWidth="2"
              />
              <text
                x="0"
                y="-35"
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fill={colors.primary}
                letterSpacing="2"
              >
                AUTHENTIC
              </text>
              <text
                x="0"
                y="43"
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fill={colors.accent}
                letterSpacing="2"
              >
                CODEX
              </text>
            </g>
          )}

          {emblem === 'CRYPTIC_MONOLITH' && (
            <g className="animate-in zoom-in-50 duration-300">
              {/* Modernist Brutalist Cryptic Stamp */}
              <rect
                x="-36"
                y="-36"
                width="72"
                height="72"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
              />
              <rect
                x="-28"
                y="-28"
                width="56"
                height="56"
                fill="none"
                stroke={colors.secondary}
                strokeWidth="1"
              />
              {/* Mini barcode lines */}
              <g transform="translate(-20, -18)">
                <line x1="0" y1="0" x2="0" y2="16" stroke={colors.primary} strokeWidth="2" />
                <line x1="4" y1="0" x2="4" y2="16" stroke={colors.primary} strokeWidth="1" />
                <line x1="7" y1="0" x2="7" y2="16" stroke={colors.primary} strokeWidth="3" />
                <line x1="13" y1="0" x2="13" y2="16" stroke={colors.primary} strokeWidth="1" />
                <line x1="17" y1="0" x2="17" y2="16" stroke={colors.primary} strokeWidth="2" />
                <line x1="22" y1="0" x2="22" y2="16" stroke={colors.primary} strokeWidth="1.5" />
                <line x1="27" y1="0" x2="27" y2="16" stroke={colors.primary} strokeWidth="3" />
                <line x1="34" y1="0" x2="34" y2="16" stroke={colors.primary} strokeWidth="2" />
                <line x1="39" y1="0" x2="39" y2="16" stroke={colors.primary} strokeWidth="1" />
              </g>
              <text
                x="0"
                y="14"
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="900"
                fill={colors.primary}
                letterSpacing="1"
              >
                VERIFIED
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
                fill={colors.accent}
                letterSpacing="2"
              >
                HASH 0x9F4C
              </text>
            </g>
          )}

          {/* Micro Rosette Star Accents */}
          <polygon
            points="0,-72 3,-64 10,-64 5,-59 7,-52 0,-56 -7,-52 -5,-59 -10,-64 -3,-64"
            fill={colors.primary}
          />
          <polygon
            points="0,72 3,64 10,64 5,59 7,52 0,56 -7,52 -5,59 -10,64 -3,64"
            fill={colors.primary}
          />
          <polygon
            points="-72,0 -64,3 -64,10 -59,5 -52,7 -56,0 -52,-7 -59,-5 -64,-10 -64,-3"
            fill={colors.primary}
          />
          <polygon
            points="72,0 64,3 64,10 59,5 52,7 56,0 52,-7 59,-5 64,-10 64,-3"
            fill={colors.primary}
          />
        </g>
      </svg>
    </motion.div>
  );
}
