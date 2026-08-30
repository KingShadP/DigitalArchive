import { archiveRecords } from '@/data/archive';
import { products } from '@/data/products';
import { releases } from '@/data/releases';
import { visualAssets } from '@/data/visuals';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const getMusicEntries = () =>
  releases.flatMap((release) =>
    release.tracks.map((track) => ({
      release,
      track,
      slug: `${slugify(track.title)}-${track.id.toLowerCase()}`,
    }))
  );

export const getVisualEntries = () =>
  visualAssets.map((asset) => ({
    asset,
    slug: `${slugify(asset.title)}-${asset.id.toLowerCase()}`,
  }));

export const getArchiveEntries = () =>
  archiveRecords.map((record) => ({
    record,
    slug: `${slugify(record.title)}-${record.id.toLowerCase()}`,
  }));

export const getProductEntries = () =>
  products.map((product) => ({
    product,
    slug: `${slugify(product.name)}-${product.id.toLowerCase()}`,
  }));

export const findMusicBySlug = (slug: string) =>
  getMusicEntries().find((entry) => entry.slug === slug);

export const findVisualBySlug = (slug: string) =>
  getVisualEntries().find((entry) => entry.slug === slug);

export const findArchiveBySlug = (slug: string) =>
  getArchiveEntries().find((entry) => entry.slug === slug);
