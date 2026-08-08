# Audio System

## Current implementation
Global audio is managed by `components/audio-provider.tsx` and mounted once in `app/layout.tsx`.

## Track metadata shape
Defined in `lib/music-data.ts`:
- `Track`: `id`, `title`, optional `duration`, optional `audioSource`, optional `lyrics`, optional `credits`
- `Release`: release metadata, `tracks`, optional `streamingLinks`, related visual/archive references

## Player state model
`AudioProvider` state includes:
- ambient drone state: `audioActive`
- track playback state: `currentTrack`, `currentRelease`, `isPlaying`, `currentTime`, `duration`, `volume`, `isMuted`, `isLoading`
- queue state: `queue`, `queueIndex`

## Global playback behavior
- Provider is in root layout, so state persists during client-side route changes.
- `GlobalPlayer` is always mounted and switches between:
  - drone controller view (no track selected)
  - full track player view (track selected)

## Play/pause and current-track behavior
- `playTrack()` stops drone, sets active track/release, loads `audioSource` into an `HTMLAudioElement`, then plays.
- `togglePlayPause()` controls current track playback and resumes as available.
- `nextTrack()`/`prevTrack()` operate on queue context.

## Queue architecture
- Queue is optional and injected from route contexts (`music/page.tsx`).
- `queueIndex` tracks active position.
- Track end triggers `nextTrack()`.

## Browser autoplay restrictions
- Ambient drone starts only on user interaction (`toggleAudio`).
- Track playback is user-triggered from UI interactions.

## Mobile considerations
- Core controls are fixed and reachable in responsive layouts.
- Custom cursor is disabled on coarse pointers, preserving native touch interaction.

## Accessibility baseline
- Icon buttons include `aria-label`s in global player and nav.
- Time/progress and state are visually represented; keep controls keyboard-operable.

## Media Session API
- Implemented metadata and action handlers (`play`, `pause`, `previoustrack`, `nexttrack`, `seekto`) when available.

## Error recovery and loading
- Playback failures are caught and logged; player state is reset to avoid hanging “playing” UI.
- `waiting`/`canplay` and metadata listeners update loading and timing state.

## Streaming and external source considerations
- `audioSource` currently supports direct URLs.
- External streaming links exist as metadata (`streamingLinks`) but are not a full in-app streaming integration yet.
