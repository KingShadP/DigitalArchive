'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface GiragonSculptureProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showHalo?: boolean;
  interactive?: boolean;
}

export function GiragonSculpture({
  className = '',
  size = 'hero',
  showHalo = true,
  interactive = true,
}: GiragonSculptureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dimensions based on size prop
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-80 h-80',
    hero: 'w-[320px] sm:w-[460px] md:w-[600px] lg:w-[720px] max-w-[90vw]',
  }[size];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center ${sizeClasses} ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -5 : [-10, 10],
          rotateZ: isHovered ? 0 : [-1, 1],
        }}
        transition={{
          repeat: isHovered ? 0 : Infinity,
          repeatType: 'reverse',
          duration: 6,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Subtle Ambient Radial Lighting from Rose Gold & Oxblood */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-25 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(circle, rgba(183,110,121,0.3) 0%, rgba(94,0,8,0.2) 45%, rgba(12,12,12,0) 75%)',
          }}
        />

        {/* The Master Giragon Sculpture SVG */}
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter"
          style={{ transform: 'translateZ(20px)' }}
        >
          <defs>
            {/* Metallic Gradients */}
            {/* Rose Gold Primary */}
            <linearGradient id="giragonRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAD2D7" />
              <stop offset="25%" stopColor="#C98B94" />
              <stop offset="50%" stopColor="#B76E79" />
              <stop offset="75%" stopColor="#874751" />
              <stop offset="100%" stopColor="#5E2A31" />
            </linearGradient>

            {/* Platinum Sheen */}
            <linearGradient id="giragonPlatinum" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7E8791" />
              <stop offset="30%" stopColor="#CED7DE" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#A4B0BA" />
              <stop offset="100%" stopColor="#4A525A" />
            </linearGradient>

            {/* Deep Oxblood Shadow */}
            <linearGradient id="giragonOxblood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8A0F19" />
              <stop offset="60%" stopColor="#5E0008" />
              <stop offset="100%" stopColor="#250003" />
            </linearGradient>

            {/* Bronze Accent */}
            <linearGradient id="giragonBronze" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4A76A" />
              <stop offset="40%" stopColor="#9E733E" />
              <stop offset="80%" stopColor="#67441B" />
              <stop offset="100%" stopColor="#3A240C" />
            </linearGradient>

            {/* Champagne Edge Highlight */}
            <linearGradient id="giragonChampagne" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF3E0" />
              <stop offset="50%" stopColor="#E5C79E" />
              <stop offset="100%" stopColor="#A8875B" />
            </linearGradient>

            {/* Radial Specular Light on the Halo */}
            <radialGradient id="haloSpecular" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#E5C79E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
            </radialGradient>

            {/* Drop Shadow Filter */}
            <filter id="sculptureDepth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.7" />
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#5E0008" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* BACKGROUND: RESTRAINED HALO-CROWN GEOMETRY */}
          {showHalo && (
            <g className="giragon-halo" opacity="0.85">
              {/* Outer Concentric Platinum Ring */}
              <circle
                cx="400"
                cy="250"
                r="180"
                stroke="url(#giragonPlatinum)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.4"
              />

              {/* Main Halo-Crown Elliptical Arc */}
              <ellipse
                cx="400"
                cy="235"
                rx="145"
                ry="70"
                stroke="url(#giragonRoseGold)"
                strokeWidth="3.5"
                fill="none"
                opacity="0.75"
              />

              {/* Inner Radiant Halo Ring */}
              <ellipse
                cx="400"
                cy="235"
                rx="125"
                ry="55"
                stroke="url(#giragonChampagne)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.9"
              />

              {/* Crown Apex Architectural Points (Restrained minimal geometry, no excess crowns) */}
              <path
                d="M 330 200 L 340 175 L 350 200"
                stroke="url(#giragonPlatinum)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 390 190 L 400 155 L 410 190"
                stroke="url(#giragonChampagne)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 450 200 L 460 175 L 470 200"
                stroke="url(#giragonPlatinum)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Platinum Orbital Accent Nodes */}
              <circle cx="400" cy="155" r="3.5" fill="url(#giragonPlatinum)" />
              <circle cx="340" cy="175" r="2.5" fill="url(#giragonRoseGold)" />
              <circle cx="460" cy="175" r="2.5" fill="url(#giragonRoseGold)" />
            </g>
          )}

          {/* ============================================================ */}
          {/* MAIN SCULPTURE BODY: THE GIRAGON (GIRAFFE-DRAGON HYBRID)      */}
          {/* ============================================================ */}
          <g filter="url(#sculptureDepth)">
            {/* 1. LEFT WING (Regal Dragon Wing - Wing 1 of 2) */}
            <g id="left-wing" className="transition-transform duration-500 origin-[380px_430px]">
              {/* Back Wing Bone Struts */}
              <path
                d="M 380 430 C 330 380 240 310 140 290 C 110 284 90 295 105 315 C 135 355 210 405 280 470 C 330 515 370 510 380 430 Z"
                fill="url(#giragonOxblood)"
                opacity="0.8"
              />
              {/* Main Articulated Wing Bone & Ribs */}
              <path
                d="M 380 420 C 300 340 210 260 90 250 C 70 248 65 270 85 285 C 160 340 250 430 340 500 C 370 525 385 470 380 420 Z"
                fill="url(#giragonRoseGold)"
              />
              {/* Wing Primary Feather Blades */}
              <path
                d="M 90 250 C 130 220 180 200 240 190 C 255 188 260 205 245 215 C 190 250 140 300 95 360 C 85 375 75 365 80 345 Z"
                fill="url(#giragonChampagne)"
                opacity="0.85"
              />
              <path
                d="M 140 290 C 180 260 230 240 290 230 C 305 228 310 242 295 252 C 240 285 190 335 155 390 Z"
                fill="url(#giragonPlatinum)"
                opacity="0.75"
              />
              {/* Left Wing Bevel Highlight Line */}
              <path
                d="M 380 420 C 300 340 210 260 90 250"
                stroke="url(#giragonPlatinum)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* 2. RIGHT WING (Regal Dragon Wing - Wing 2 of 2) */}
            <g id="right-wing" className="transition-transform duration-500 origin-[420px_430px]">
              {/* Back Wing Bone Struts */}
              <path
                d="M 420 430 C 470 380 560 310 660 290 C 690 284 710 295 695 315 C 665 355 590 405 520 470 C 470 515 430 510 420 430 Z"
                fill="url(#giragonOxblood)"
                opacity="0.8"
              />
              {/* Main Articulated Wing Bone & Ribs */}
              <path
                d="M 420 420 C 500 340 590 260 710 250 C 730 248 735 270 715 285 C 640 340 550 430 460 500 C 430 525 415 470 420 420 Z"
                fill="url(#giragonRoseGold)"
              />
              {/* Wing Primary Feather Blades */}
              <path
                d="M 710 250 C 670 220 620 200 560 190 C 545 188 540 205 555 215 C 610 250 660 300 705 360 C 715 375 725 365 720 345 Z"
                fill="url(#giragonChampagne)"
                opacity="0.85"
              />
              <path
                d="M 660 290 C 620 260 570 240 510 230 C 495 228 490 242 505 252 C 560 285 610 335 645 390 Z"
                fill="url(#giragonPlatinum)"
                opacity="0.75"
              />
              {/* Right Wing Bevel Highlight Line */}
              <path
                d="M 420 420 C 500 340 590 260 710 250"
                stroke="url(#giragonPlatinum)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* 3. CURVED SERPENTINE TAIL (Curling with sculptural grace) */}
            <g id="curved-tail">
              {/* Tail Base & Coil Path */}
              <path
                d="M 380 570 C 370 640 340 700 290 730 C 250 754 210 740 215 690 C 220 640 280 620 330 635 C 370 647 400 690 380 735 C 365 770 310 780 270 765"
                stroke="url(#giragonRoseGold)"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              {/* Tail Spine Armor Ridges */}
              <path
                d="M 380 570 C 370 640 340 700 290 730 C 250 754 210 740 215 690"
                stroke="url(#giragonPlatinum)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 12"
                fill="none"
                opacity="0.9"
              />
              {/* Tail Tip Sculpture Finial */}
              <polygon
                points="270,765 250,785 240,755 260,745"
                fill="url(#giragonChampagne)"
              />
            </g>

            {/* 4. MAIN TORSO & SCULPTED CHEST PLATES */}
            <g id="torso">
              {/* Deep Shadow Under-Torso */}
              <path
                d="M 360 440 C 360 380 440 380 440 440 C 445 510 425 580 400 610 C 375 580 355 510 360 440 Z"
                fill="url(#giragonOxblood)"
              />
              {/* Segmented Muscle / Metal Armor Plates */}
              <path
                d="M 370 420 C 385 410 415 410 430 420 C 435 460 430 500 400 520 C 370 500 365 460 370 420 Z"
                fill="url(#giragonRoseGold)"
              />
              <path
                d="M 375 510 C 388 500 412 500 425 510 C 425 545 415 570 400 585 C 385 570 375 545 375 510 Z"
                fill="url(#giragonBronze)"
              />
              {/* Centerline Platinum Inlay & Crest Alignment */}
              <path
                d="M 400 400 L 400 590"
                stroke="url(#giragonPlatinum)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* 5. LONG GRACEFUL GIRAFFE NECK */}
            <g id="graceful-neck">
              {/* Slender Arched Neck Structure */}
              <path
                d="M 372 430 C 370 350 365 260 385 160 L 415 160 C 435 260 430 350 428 430 Z"
                fill="url(#giragonRoseGold)"
              />
              {/* Neck Shadow Core */}
              <path
                d="M 378 420 C 375 350 372 260 390 170 L 400 170 C 390 260 390 350 392 420 Z"
                fill="url(#giragonOxblood)"
                opacity="0.6"
              />
              {/* Segmented Neck Ring Ribs (Architectural Jewelry Motif) */}
              {[200, 235, 270, 305, 340, 375].map((yPos, i) => (
                <g key={`neck-rib-${i}`}>
                  <ellipse
                    cx="400"
                    cy={yPos}
                    rx={14 + i * 2.5}
                    ry="5"
                    stroke="url(#giragonPlatinum)"
                    strokeWidth="1.8"
                    fill="none"
                    opacity="0.8"
                  />
                  <circle
                    cx="400"
                    cy={yPos}
                    r="2"
                    fill="url(#giragonChampagne)"
                  />
                </g>
              ))}
            </g>

            {/* 6. REFINED GIRAFFE HEAD & OSSICONES */}
            <g id="head-sculpture">
              {/* Twin Elegant Ossicones (Restrained horns) */}
              <g id="ossicones">
                {/* Left Ossicone */}
                <line
                  x1="388"
                  y1="155"
                  x2="378"
                  y2="105"
                  stroke="url(#giragonPlatinum)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="377" cy="102" r="5" fill="url(#giragonChampagne)" />

                {/* Right Ossicone */}
                <line
                  x1="412"
                  y1="155"
                  x2="422"
                  y2="105"
                  stroke="url(#giragonPlatinum)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="423" cy="102" r="5" fill="url(#giragonChampagne)" />
              </g>

              {/* Sculptural Ears (Graceful leaf curvature) */}
              <path
                d="M 378 150 C 345 145 320 160 325 175 C 335 185 365 175 380 160 Z"
                fill="url(#giragonRoseGold)"
              />
              <path
                d="M 422 150 C 455 145 480 160 475 175 C 465 185 435 175 420 160 Z"
                fill="url(#giragonRoseGold)"
              />

              {/* Main Skull & Facial Planes */}
              <path
                d="M 382 155 C 382 135 418 135 418 155 C 424 175 420 200 400 230 C 380 200 376 175 382 155 Z"
                fill="url(#giragonRoseGold)"
              />
              {/* Muzzle & Jawline (Sleek, architectural) */}
              <path
                d="M 390 195 C 390 185 410 185 410 195 L 406 225 C 404 232 396 232 394 225 Z"
                fill="url(#giragonChampagne)"
              />

              {/* Almond Eye Sculpting in Platinum */}
              <ellipse cx="388" cy="165" rx="3.5" ry="2" fill="url(#giragonPlatinum)" transform="rotate(-15 388 165)" />
              <ellipse cx="412" cy="165" rx="3.5" ry="2" fill="url(#giragonPlatinum)" transform="rotate(15 412 165)" />

              {/* Forehead Crest Accent - Subtle KSP Geometry */}
              <polygon
                points="400,140 404,148 400,154 396,148"
                fill="url(#giragonPlatinum)"
              />
            </g>
          </g>

          {/* SUBTLE BRAND SIGNATURE / PLAQUE ENGRAVING AT BASE */}
          <g id="base-plaque" opacity="0.7">
            <line x1="330" y1="770" x2="470" y2="770" stroke="url(#giragonPlatinum)" strokeWidth="1" />
            <text
              x="400"
              y="784"
              textAnchor="middle"
              fill="#D7E2EA"
              fontSize="9"
              letterSpacing="0.35em"
              fontFamily="'Kanit', sans-serif"
              fontWeight="600"
              opacity="0.8"
            >
              GIRAGON  KINGSHADP
            </text>
          </g>
        </svg>

        {/* Ambient Specular Highlight following mouse cursor */}
        {interactive && (
          <motion.div
            className="absolute w-44 h-44 pointer-events-none rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
            style={{
              left: `${lightX.get()}%`,
              top: `${lightY.get()}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,243,224,0.4) 0%, rgba(183,110,121,0) 70%)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default GiragonSculpture;
