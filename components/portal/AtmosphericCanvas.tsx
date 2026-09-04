'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  depth: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
}

export function AtmosphericCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, smoothX: -1000, smoothY: -1000 });
  const mouseRef = useRef({ x: -1000, y: -1000, smoothX: -1000, smoothY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize celestial particles
    const particleCount = Math.min(85, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random() * 0.8 + 0.2;
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35 * depth,
        vy: (Math.random() - 0.5) * 0.35 * depth - 0.1 * depth, // gentle upward cosmic drift
        size: (Math.random() * 1.8 + 0.6) * depth,
        alpha: baseAlpha,
        baseAlpha,
        depth,
        orbitRadius: Math.random() * 40 + 10,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.smoothX += (mouseRef.current.x - mouseRef.current.smoothX) * 0.08;
      mouseRef.current.smoothY += (mouseRef.current.y - mouseRef.current.smoothY) * 0.08;
      const mx = mouseRef.current.smoothX;
      const my = mouseRef.current.smoothY;

      // Draw interactive radial ambient glow centered on cursor
      if (mx > -500 && my > -500) {
        const glowRadius = Math.max(300, Math.min(width * 0.4, 550));
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
        gradient.addColorStop(0, 'rgba(183, 110, 121, 0.09)'); // Rose gold whisper
        gradient.addColorStop(0.4, 'rgba(183, 110, 121, 0.03)');
        gradient.addColorStop(0.8, 'rgba(244, 241, 236, 0.01)');
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw celestial particles and spatial constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.orbitAngle += p.orbitSpeed;
        p.x += p.vx + Math.cos(p.orbitAngle) * 0.15;
        p.y += p.vy + Math.sin(p.orbitAngle) * 0.15;

        // Boundary wrapping
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Cursor proximity reaction
        const dx = mx - p.x;
        const dy = my - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        let cursorInfluence = 0;

        if (distToMouse < 220) {
          cursorInfluence = (1 - distToMouse / 220);
          p.x -= (dx / distToMouse) * cursorInfluence * 0.8;
          p.y -= (dy / distToMouse) * cursorInfluence * 0.8;
          p.alpha = Math.min(0.95, p.baseAlpha + cursorInfluence * 0.5);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + cursorInfluence * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.depth > 0.6 
          ? `rgba(244, 241, 236, ${p.alpha})` 
          : `rgba(183, 110, 121, ${p.alpha * 0.85})`;
        ctx.fill();

        // Connect near neighbors with faint architectural filaments
        if (p.depth > 0.45) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.depth > 0.45) {
              const ndx = p.x - p2.x;
              const ndy = p.y - p2.y;
              const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

              if (nDist < 95) {
                const lineAlpha = (1 - nDist / 95) * 0.12 * Math.min(p.alpha, p2.alpha);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(183, 110, 121, ${lineAlpha})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Subtle organic film dust noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(rgba(244, 241, 236, 0.4) 1px, transparent 0)',
          backgroundSize: '3px 3px',
        }}
      />
    </div>
  );
}
