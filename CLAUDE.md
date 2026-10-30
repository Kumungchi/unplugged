> Před začátkem práce si přečti HANDOFF.md — aktuální stav, pravidla a backlog.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Unplugged is an educational web platform about healthy AI use and human-AI boundaries. It helps users understand when AI use becomes emotionally dependent or replaces human connection. The brand tagline is "AI is a tool. Not a relationship."

The project targets individuals, schools, and organizations — with a Czech/European focus.

## Commands

- `npm run dev` — Start dev server on port 3000 (Vite)
- `npm run build` — Production build
- `npm run preview` — Preview production build

No test framework is configured.

## Architecture

Single-page React 19 app with Vite, TypeScript, Tailwind CSS v4 (via PostCSS), and React Router. Deployed as a static SPA on Vercel (see `vercel.json`).

`vercel.json`'s `buildCommand` runs `npx convex deploy --cmd 'npm run build'` on production builds only (checked via the `VERCEL_ENV` system env var; preview builds just run `npm run build` directly). This pushes the current `convex/` schema and functions to the production Convex deployment (`acoustic-pony-467`) before every production build, so the frontend and backend can no longer drift apart the way they did before this was added — previously, Convex changes only ever reached the dev deployment via `npx convex dev`, and production silently fell behind until a manual `npx convex deploy`. **Requires** `CONVEX_DEPLOY_KEY` (a **production** deploy key from the Convex dashboard, Production deployment → Settings → Deploy Key) set as a Vercel environment variable scoped to Production. Without it, production builds will fail at the `npx convex deploy` step.

`npm run build` runs `vite build` followed by `scripts/prerender.mjs`, which drives the built app in a headless browser and snapshots each public route's fully-rendered HTML into `dist/<route>/index.html`. This exists because the app itself is CSR-only (no SSR/hydration entry) — without this step, crawlers and AI tools that don't execute JavaScript only see an empty `<div id="root">`. Admin/staff routes (`/admin/*`, `/facilitator`, `/staff-access`) are deliberately excluded from prerendering and the sitemap. Use `npm run build:client-only` to skip the prerender step during local debugging.

### Routes (managed by React Router in App.tsx)

- `/` — Landing page with mission/problem framing and scroll animations
- `/demo` — MirrorDemo: scripted fake chatbot demonstrating manipulative AI conversation patterns with a side panel exposing psychological mechanisms
- `/approach` — Movement: manifesto/approach page
- `/research` — Boundaries: educational content about psychological risks of AI companionship
- `*` — 404 catch-all

### Key patterns

- **i18n**: All UI strings live in `translations.ts` with `en` and `cs` locales. Components receive `lang` prop and look up `translations[lang]`.
- **Styling**: Tailwind v4 via PostCSS (`postcss.config.js`). Inter, Playfair Display, and Caveat are self-hosted WOFF2 files in `public/fonts/`, with Latin and Latin Extended subsets, licenses and a source manifest. Their `@font-face` rules in `styles/global.css` use `font-display: swap`; only the hero display face is preloaded. Custom CSS classes (`notebook-lines`, `fade-in`, `scroll-fade`, `font-handwritten`) also live in that stylesheet. Uses a warm stone/cream color palette with red accents.
- **Routing**: React Router with `<BrowserRouter>` in `index.tsx`. SPA fallback routing handled by `vercel.json`'s rewrite (`/(.*) → /index.html`) for any route not covered by a prerendered static file.
- **Mobile**: Hamburger menu in `App.tsx` with full-screen overlay for mobile navigation.
- **Editable content**: Sector page and About copy can be overridden from `/admin/content` (`components/ContentEditor.tsx`, staff-gated like `/facilitator`) without a code deploy. Overrides live in the Convex `siteContent` table (`convex/siteContent.ts`) and are merged over the hardcoded defaults in `SectorPage.tsx`/`About.tsx` at render time (see `components/siteContentHelpers.ts`). Because the public site is prerendered at build time (see above), a published edit only reaches crawlable HTML after a rebuild — `publishContent` schedules `convex/siteContentActions.ts`'s `triggerRebuild` action, which POSTs to a Vercel Deploy Hook. **One-time manual setup required**: create a Deploy Hook in the Vercel dashboard (Project Settings → Git → Deploy Hooks) and run `npx convex env set VERCEL_DEPLOY_HOOK_URL <hook-url>`. Without it, publishing still works (content shows up via the live Convex query immediately) but the static prerendered HTML won't update until the next manual deploy.

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->
