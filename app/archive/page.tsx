import React from 'react';
import { ARTIFACTS } from '@/lib/data';
import { PageContainer, Section, Grid, Surface, Heading, Text, MonoLabel, Link, SystemImage } from '@/components/system';

export default function ArchivePage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <PageContainer>
        <div className="mb-16 md:mb-24">
          <MonoLabel className="mb-4 block">INDEX // 2026</MonoLabel>
          <Heading variant="display">The Living Archive</Heading>
          <Text variant="lead" className="mt-6 max-w-2xl">
            A comprehensive record of the digital and physical manifestations of the KingShadP universe.
          </Text>
        </div>

        <Grid columns={3} gap="md">
          {ARTIFACTS.map((artifact) => (
            <Link key={artifact.id} href={`/archive/${artifact.id}`} className="block group">
              <Surface variant="secondary" interactive className="h-full flex flex-col p-6">
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <MonoLabel className="text-accent">{artifact.entry}</MonoLabel>
                    <MonoLabel className="opacity-50">{artifact.status}</MonoLabel>
                  </div>
                  <Heading variant="sans-bold" className="text-xl mb-2 group-hover:text-accent transition-colors">{artifact.title}</Heading>
                  <MonoLabel className="text-xs">{artifact.subtitle}</MonoLabel>
                </div>
                
                <div className="mt-auto pt-6 border-t border-border">
                  <Text variant="muted" className="line-clamp-3">
                    {artifact.description}
                  </Text>
                  <div className="mt-4 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <MonoLabel>{artifact.hash}</MonoLabel>
                    <MonoLabel>ACCESS [→]</MonoLabel>
                  </div>
                </div>
              </Surface>
            </Link>
          ))}
        </Grid>
      </PageContainer>
    </main>
  );
}
