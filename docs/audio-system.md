# Audio System Architecture

Audio is a critical interactive and atmospheric layer of the KingShadP universe. Currently, audio is generated via the client-side Web Audio API (e.g., the atmospheric synth drone in `app/page.tsx`).

## Core Principles

### 1. Global Playback & Persistence
- **Route Persistence**: Audio must remain continuous across route changes. Future refactoring should move the AudioContext and synth engine to a global provider (e.g., `app/layout.tsx` or a dedicated `<AudioProvider>`).
- **State**: Global state (Zustand or React Context) should manage `isPlaying`, `volume`, and `currentTrack/frequency`.

### 2. User Intent & Browser Restrictions
- **Autoplay**: Browsers block uninitiated audio. Audio MUST only begin after an explicit user interaction (e.g., clicking the "ENGAGE AUDIO" magnetic button).
- **Play/Pause Behavior**: A globally accessible toggle must always be available to mute/pause the audio.

### 3. Audio Types
- **Procedural / Ambient**: (Current implementation) Oscillators, gain nodes, and filters generating drones dynamically.
- **Track Playback**: Future music vault integration will require streaming chunks or playing `.mp3`/`.wav` files via `HTMLAudioElement` or Web Audio API buffer sources.

### 4. Accessibility & Mobile Considerations
- **Mobile**: Ensure background audio playback behavior is respected. Handle OS-level interruptions (calls, switching apps).
- **Media Session API**: When playing actual tracks, integrate `navigator.mediaSession` to allow users to control playback from their lock screen or hardware media keys.

### 5. Error Recovery & Loading
- Gracefully handle audio decoding errors or network streaming failures.
- Provide clear visual telemetry (like the UI's spinning radar or pulsing dots) to indicate that audio is buffering, active, or failed.
