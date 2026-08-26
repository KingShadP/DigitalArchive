'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { ARCHIVE_ARTIFACTS, ArchiveArtifact } from './archive-data';

export interface ViewedArtifact {
  id: string;
  title: string;
  subtitle?: string;
  artifactClass: string;
  date?: string;
  project?: string;
  collection?: string;
  thumbnailUrl?: string;
  description?: string;
  viewedAt: number;
}

const STORAGE_KEY = 'ksp_viewed_artifacts';
const EVENT_NAME = 'ksp_viewed_artifacts_updated';

let memoryCache: ViewedArtifact[] = [];
let lastRawString: string | null = null;

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): ViewedArtifact[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== lastRawString) {
      lastRawString = raw;
      memoryCache = raw ? JSON.parse(raw) : [];
    }
    return memoryCache;
  } catch {
    return [];
  }
}

function getServerSnapshot(): ViewedArtifact[] {
  return [];
}

export function recordViewedArtifact(artifact: Partial<ArchiveArtifact> & { id: string; title: string }) {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: ViewedArtifact[] = raw ? JSON.parse(raw) : [];

    const existingIdx = list.findIndex((item) => item.id === artifact.id);
    const thumbnail =
      artifact.media && artifact.media.length > 0
        ? artifact.media[0].thumbnailUrl
        : (artifact as any).thumbnailUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop';

    const entry: ViewedArtifact = {
      id: artifact.id,
      title: artifact.title,
      subtitle: artifact.subtitle,
      artifactClass: (artifact.artifactClass as string) || 'Archive item',
      date: artifact.date,
      project: artifact.project,
      collection: artifact.collection,
      thumbnailUrl: thumbnail,
      description: artifact.description,
      viewedAt: Date.now(),
    };

    if (existingIdx >= 0) {
      list.splice(existingIdx, 1);
    }
    list.unshift(entry);
    list = list.slice(0, 20); // Keep 20 most recent

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch (err) {
    console.warn('Could not record viewed artifact:', err);
  }
}

export function getViewedArtifacts(): ViewedArtifact[] {
  return getSnapshot();
}

export function getBenchmarkArtifacts(): ViewedArtifact[] {
  return ARCHIVE_ARTIFACTS.slice(0, 3).map((a) => ({
    id: a.id,
    title: a.title,
    subtitle: a.subtitle,
    artifactClass: a.artifactClass,
    date: a.date,
    project: a.project,
    collection: a.collection,
    thumbnailUrl: a.media?.[0]?.thumbnailUrl,
    description: a.description,
    viewedAt: Date.now(),
  }));
}

export function useViewedArtifacts() {
  const viewedArtifacts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addArtifact = useCallback((artifact: ArchiveArtifact) => {
    recordViewedArtifact(artifact);
  }, []);

  const removeArtifact = useCallback((artifactId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const current = getSnapshot().filter((item) => item.id !== artifactId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return {
    viewedArtifacts,
    isLoaded: true,
    addArtifact,
    removeArtifact,
    benchmarkArtifacts: getBenchmarkArtifacts(),
  };
}
