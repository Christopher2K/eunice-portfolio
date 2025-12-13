# Agent Guidelines for eunice-portfolio

## Build, Lint, Test Commands

### Portfolio App (React + TanStack)
- `pnpm -C apps/portfolio build` - Build production bundle
- `pnpm -C apps/portfolio dev` - Start dev server (port 3000)
- `pnpm -C apps/portfolio test` - Run all tests with vitest
- `pnpm -C apps/portfolio test src/features/home/components/projects-desktop-carousel.tsx` - Run specific test
- `pnpm format` - Format code with Biome (root level)

### CMS App (Next.js + Payload)
- `pnpm -C apps/cms build` - Build production bundle
- `pnpm -C apps/cms dev` - Start dev server (port 3001)
- `pnpm -C apps/cms devsafe` - Clean .next and start dev
- `pnpm -C apps/cms generate:types` - Generate Payload types

## Code Style Guidelines

**Formatting & Imports:**
- Use Biome for all formatting (2-space indent, double quotes)
- Biome auto-organizes imports; follow its conventions
- Files in routeTree.gen.ts, payload-types.ts, styled-system/, importMap.js, migrations/*.json are excluded from linting

**Type System:**
- Enable strict TypeScript (strict: true, noUnusedLocals/Parameters, noFallthroughCasesInSwitch)
- Use const/type assertions where appropriate (verbatimModuleSyntax: false allows flexibility)
- Path aliases: `@/*` → `./src/*`, `styled/*` → `./styled-system/*`

**Naming & Structure:**
- React components use PascalCase with .tsx extension
- Use barrel exports (index.ts files) for cleaner imports
- Collocate components with their types (e.g., media.types.ts)

**CSS & Styling:**
- Use Panda CSS + CSS-in-JS for styling (no traditional CSS files except global index.css)
- Recipes: button.ts, text.ts in ui/recipes/ for reusable component styles
- Global theme in panda.config.ts with TWK Lausanne & Space Mono fonts

**Error Handling:**
- Use Zod for runtime validation (schemas in env.ts)
- Biome's recommended linter rules enabled; ban untyped errors
- Follow React error boundaries pattern (not-found.tsx, error components)

**Project Structure:**
- apps/portfolio - React SPA with TanStack Router, React Query, Vitest
- apps/cms - Next.js + Payload CMS for content management
- Monorepo with pnpm workspaces; use pnpm -C flag to run scripts in specific apps
