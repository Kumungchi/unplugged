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

Single-page React 19 app with Vite, TypeScript, Tailwind CSS v4 (via PostCSS), and React Router. Deployed as a static SPA on Cloudflare Pages.

### Routes (managed by React Router in App.tsx)

- `/` — Landing page with mission/problem framing and scroll animations
- `/demo` — MirrorDemo: scripted fake chatbot demonstrating manipulative AI conversation patterns with a side panel exposing psychological mechanisms
- `/approach` — Movement: manifesto/approach page
- `/research` — Boundaries: educational content about psychological risks of AI companionship
- `*` — 404 catch-all

### Key patterns

- **i18n**: All UI strings live in `translations.ts` with `en` and `cs` locales. Components receive `lang` prop and look up `translations[lang]`.
- **Styling**: Tailwind v4 via PostCSS (`postcss.config.js`). Custom fonts (Inter, Playfair Display, Caveat) loaded from Google Fonts. Custom CSS classes (`notebook-lines`, `fade-in`, `scroll-fade`, `font-handwritten`) defined in `styles/global.css`. Uses a warm stone/cream color palette with red accents.
- **Routing**: React Router with `<BrowserRouter>` in `index.tsx`. SPA routing handled by `public/_redirects` for Cloudflare Pages.
- **Mobile**: Hamburger menu in `App.tsx` with full-screen overlay for mobile navigation.

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->
