# U-10 — language URLs, proposal awaiting Matias

## Intended behavior

- Czech at `/`, `/schools`, `/demo`, and the existing public paths.
- English at `/en`, `/en/schools`, `/en/demo`, and matching paths.
- The URL determines the rendered language. A saved preference must not turn a Czech URL into an English document.
- The language switch preserves the current page, query string, and hash.
- Every public page gets its own canonical and og:url. CS/EN alternatives and x-default refer to distinct actual URLs. Each pair uses Czech as x-default.
- Prerender produces both languages; sitemap contains the public pairs. Staff tools remain excluded and unindexed.

## Recommended implementation: one shared route tree with BrowserRouter basename

Determine `/en` from the initial pathname and set `BrowserRouter basename` to `/en` for English, otherwise `/`. Existing internal links such as `/schools` then resolve within the active language automatically. Pass the language derived from the URL to App instead of selecting it from localStorage or navigator.language.

The language switch performs a full navigation to the other language's URL. That is one extra document load per language change, but keeps routing simple and avoids stale provider/router state after changing the basename. All normal navigation inside either language remains client-side.

SEOHead combines the language prefix with the route pathname and emits reciprocal alternatives. Prerender uses two sets of public paths generated from the same route list, checks both languages and writes the paired HTML. EN `/en/` should consistently canonicalize to `/en` (or redirect after agreement); ordinary subpage paths keep the existing convention without a trailing slash.

## Alternative: locale-aware route tree and link helper

Define nested English routes inside one router, introduce a helper for every internal link, and switch language with client-side navigation. Language changes are smoother, but every Link, navigate call, CTA, and generated URL must use the helper. Missing one could unexpectedly send an English visitor to Czech. The larger change affects more components and needs broader regression checks.

Duplicating all page components into two separate apps would make maintenance and copy synchronization worse; it is not needed for either option.

## Acceptance checks

- Directly open CS and EN URLs in fresh browsers and with conflicting saved preferences.
- Navigate all public routes in both languages, then switch language on a page with query parameters (including demo and join).
- Inspect paired static HTML with JS disabled: actual translated text, lang, title, canonical, og:url and reciprocal hreflang.
- Check 404s, `/en` handling, mobile navigation, form source-page attribution, and staff access.
- Verify hosting fallback serves the app for both prefix forms; preserve existing deploy settings.

This document is a proposal. U-10 remains unchecked until Matias approves an option and the implementation is verified.
