import React from 'react';
import { notFound } from 'next/navigation';
import { ARTIFACTS } from '@/lib/data';
import { PageContainer, Grid, Surface, Heading, Text, MonoLabel, TelemetryBadge, FrameBorder, Link } from '@/components/system';

export async function generateStaticParams() {
  return ARTIFACTS.map((artifact) => ({
    id: artifact.id,
  }));
}

export default async function ArtifactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artifact = ARTIFACTS.find((a) => a.id === id);

  if (!artifact) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24">
      <PageContainer>
        <div className="mb-12">
          <Link href="/archive" variant="secondary" className="inline-flex items-center gap-2 mb-8 font-mono text-[9px] uppercase tracking-widest">
            <span>[←]</span> RETURN TO ARCHIVE
          </Link>
          
          <div className="flex justify-between items-end border-b border-border pb-6">
            <div>
              <MonoLabel className="text-accent mb-2 block">{artifact.entry}</MonoLabel>
              <Heading variant="display">{artifact.title}</Heading>
              <MonoLabel className="text-sm mt-2 block">{artifact.subtitle}</MonoLabel>
            </div>
            <div className="text-right hidden md:block">
              <MonoLabel className="block opacity-60">STATUS: {artifact.status}</MonoLabel>
              <MonoLabel className="block opacity-60 mt-1">HASH: {artifact.hash}</MonoLabel>
            </div>
          </div>
        </div>

        <Grid columns={12} gap="lg">
          <div className="col-span-12 lg:col-span-8">
            <FrameBorder className="p-6 md:p-12 min-h-[40vh] flex items-center justify-center bg-surface-dim">
               <MonoLabel className="opacity-30">NO VISUAL RECORD FOUND</MonoLabel>
            </FrameBorder>

            <div className="mt-12 space-y-8">
              <div>
                <MonoLabel className="mb-4 block">DESCRIPTION</MonoLabel>
                <Text variant="lead">{artifact.description}</Text>
              </div>
              
              <div>
                <MonoLabel className="mb-4 block">EXTENDED LORE // SECURE</MonoLabel>
                <Text>{artifact.lore}</Text>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Surface variant="secondary" className="p-6 md:p-8 space-y-6">
              <MonoLabel className="text-foreground">TECHNICAL SPECIFICATIONS</MonoLabel>
              <div className="space-y-4 pt-4 border-t border-border">
                {artifact.specs.map((spec, i) => (
                  <TelemetryBadge key={i} label={spec.label} value={spec.val} />
                ))}
                <TelemetryBadge label="COORDINATES" value={artifact.coords} />
                <TelemetryBadge label="FREQUENCY" value={artifact.frequency} />
              </div>
            </Surface>
          </div>
        </Grid>
      </PageContainer>
    </main>
  );
}
