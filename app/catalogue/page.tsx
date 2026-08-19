import React from 'react';
import { CatalogueClient } from './client-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue & Biography | KingShadP',
  description: 'KingShadP: Projects, Biography, Credits, and Verified Article Data. An extensive, source-verified dossier on Rashad Anthony Perry, the Giragon, discography, and creative universe.',
};

export default function CataloguePage() {
  return <CatalogueClient />;
}
