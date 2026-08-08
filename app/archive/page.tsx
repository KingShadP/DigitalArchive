import React from 'react';
import { ArchiveClient } from './client-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive | KingShadP',
  description: 'The Living Archive - A comprehensive exploratory system of the digital and physical manifestations of the KingShadP universe.',
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
