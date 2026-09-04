import React from 'react';
import { ReturnToSurface } from '../../components/ui/ReturnToSurface';

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ReturnToSurface thresholdVh={0.5} />
    </>
  );
}
