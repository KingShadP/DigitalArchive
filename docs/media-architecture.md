# Media Architecture

The KingShadP universe requires a sophisticated approach to media handling, ensuring high-fidelity presentation while maintaining performance.

## Asset Types & Handling

### 1. Images
- **Original Masters**: Must be stored in a secure, non-public vault (e.g., Cloud Storage). They must never be destructively overwritten by web derivatives.
- **Web Delivery**: Use Next.js `<Image>` component for automatic formatting (WebP/AVIF), resizing, and optimization.
- **Styling**: Images often use `mix-blend-luminosity`, `grayscale`, or `opacity` adjustments in CSS to integrate into the dark atmospheric UI.

### 2. 3D Assets & WebGL
- Complex models (e.g., `.gltf`, `.glb`) should be heavily optimized.
- Serve via CDN, dynamically loaded only when the user enters the active WebGL scene to preserve initial page load.

### 3. Audio / Video
- Ambient or interface audio (like the 48Hz synth drone) can be generated client-side via Web Audio API when appropriate.
- Video should be streamed (HLS/DASH) or served as heavily compressed, muted, looping `.mp4` / `.webm` files for background atmospheres.

### 4. Downloadable Media / Archives
- Served via signed URLs or a dedicated API route to protect high-value assets and track telemetry/access.

## Metadata Management
Every media asset should ideally be associated with technical and narrative metadata, echoing the "Artifact" structure (e.g., Hash, Coordinates, Frequency, Specs).

## Responsive Sources
- Art direction changes significantly between mobile and desktop (e.g., the Art Direction Showcase uses different parallax depths and layouts). Media sources must adapt via `srcset` or dynamic conditional loading to fit these distinct container ratios.
