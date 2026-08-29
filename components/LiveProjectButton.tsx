'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function LiveProjectButton({
  href,
  onClick,
  className = '',
  label = 'Live Project',
}: LiveProjectButtonProps) {
  const content = (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </span>
  );

  const baseClasses = `group inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors hover:bg-[#D7E2EA]/10 cursor-pointer ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}

export default LiveProjectButton;
