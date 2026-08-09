'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export function ArtifactImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-surface/50 ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover duration-700 ease-in-out group-hover:opacity-100 ${
          isLoading ? 'scale-110 opacity-0 grayscale' : 'scale-100 opacity-100 grayscale group-hover:grayscale-0'
        }`}
        onLoad={() => setIsLoading(false)}
        unoptimized
      />
    </div>
  );
}
