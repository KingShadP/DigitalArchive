'use client';

import React from 'react';

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-background">
      {/* Deep Atmospheric Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface to-background opacity-80" />
      
      {/* Subtle Glow / Spotlight - Static for performance */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Performant static grain (Base64 WebP/PNG noise instead of SVG) */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.02] pointer-events-none bg-repeat bg-[length:128px_128px]"
        style={{ 
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAD1BMVEUAAAAAAAABAwMEBQYHCAi17B0XAAAAcElEQVR42u3XQQ2AMAxEUYYZ+v/N7E8RBA8kZ1P3l+RsyZmZnQ957+zsvMh7Z2fnRd47OzsP8t7Z2XmR987Ozou8d3Z2HuS9s7PzIu+dnZ0Xee/s7DzIe2dn50XeOzs7L/Le2dl5kPfOzs6LvHd2dt7l2Xf4n+pMQQAAAABJRU5ErkJggg==")' 
        }}
      />
    </div>
  );
}
