# Web

Package: `@mastercookvn/web`. Read `docs/DESIGN_GUIDELINES.md` for UI conventions and `README.md` for setup.

## Structure

```text
src/
  app/                         Thin routes, layouts, metadata and route handlers
    (storefront)/              Customer-facing routes
    admin/                     Staff workspace
    globals.css                Design tokens and stylesheet imports
  features/<feature>/
    pages/                     Screen composition
    components/<group>/        Panels, forms and tables
    lib/                       Feature-specific logic
    <feature>.css              Feature styling
  components/
    ui/                        Shared controls and domain UI
    layout/                    Site and workspace shells
    icons/                     Custom SVG icons
    brand/                     Logo and mascot
    motion/                    Shared motion components
  constants/                   Routes, roles, permissions, states and labels
  config/                      Site metadata
  hooks/                       Shared client hooks
  models/                      Domain types and pure helpers shared across features
  lib/                         Shared logic, auth, environment, media helpers, demoStore
  test/setup.ts                Vitest DOM setup
  proxy.ts                     Optimistic session redirects
```

## Conventions

- Organize by feature, not role. Route pages delegate to feature pages; feature pages compose panels. Move components to shared UI only when used across features.
- Use `@/` for `src/` imports and PascalCase component filenames. Default to Server Components; add `"use client"` only when needed. Preserve Suspense boundaries with Cache Components.
- No sample data. Records start empty and live in `lib/demoStore.ts` (localStorage) until the API exists: read with `useDemoState`, write with `updateDemoState`, and wait for `useDemoLoaded` before treating saved records as missing.
- Server-side lookups without an API yet (`features/*/lib/*Repository.ts`, `listOperationMeals`, report placeholders) return empty results; replace them with API calls rather than adding fixtures. Test fixtures stay inside test files.
- Read the current date with `hooks/useToday` in client components; Cache Components rejects reading the time during prerender.
- Keep routes, roles and labels in `constants/`. Workspace visibility uses `constants/permissions.ts`; tabs use `?tab=` and `useQueryParam`.
- Demo sessions (dev admin in `features/auth/devAccount.ts`) and `proxy.ts` redirects are not production authorization. Keep secrets and server-only modules out of client code.
- Reuse shared UI, custom icons and motion components. Forms use React Hook Form, Zod, `zodResolver` and shared validation from `lib/validation.ts`.
- Use design tokens, `cn()` and `cva`. Keep feature CSS local and import it through `globals.css`; update `lib/utils.ts` when adding typography tokens.
- Desktop support is sufficient. Verify changed UI in a desktop browser; mobile layouts and multi-viewport checks are not required.
- Store image `MediaKey` values, not URLs. Use `MediaImage` and media helpers; keep content photos out of Git and S3 credentials server-only.

## Scripts and Tests

Package scripts: `dev`, `build`, `start`, `lint`, `lint:fix`, `format`, `format:check`, `typecheck`, `test`, `test:run`, `test:coverage`.

- `typecheck` generates Next.js route types before checking TypeScript.
- Colocate `*.test.ts` and `*.test.tsx` tests. Use Vitest, jsdom and Testing Library.
