# Deployment

## Current Stack
- Framework: Next.js 15
- Runtime: Node.js / Containerized (e.g., Google Cloud Run)

## Build Process
The application relies on the standard Next.js build pipeline.

1. **Install Dependencies**: `npm install`
2. **Type Checking & Linting**: `npm run lint` (ESLint) and TypeScript compiler checks during build.
3. **Build**: `npm run build`
   - Generates optimized client and server bundles.
   - Compiles Tailwind CSS.
4. **Start**: `npm run start`

## Quality Gates & Commands
- `npm run dev`: Local development server.
- `npm run build`: Production build (includes typecheck and linting step natively in Next.js).
- `npm run lint`: Static code analysis.

## Architectural Constraints for Deployment
- **Port**: The application MUST run on port `3000` in the deployed container environment.
- **Environment Variables**: Must be configured in the deployment environment matching `.env.example`.
- **Node Environment**: Runs in standard Node.js (not Edge runtime by default, though specific routes can opt-in).
