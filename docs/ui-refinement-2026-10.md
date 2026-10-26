# U-13 — targeted visual refinement

Preserve the owner-approved warm background, Inter/Playfair/Caveat, red accents and overall identity. This layer follows the approved demo-first navigation in PR #6; it does not redesign the brand or change the offers.

Changes:
- Replace the three institutional cards with clearly separated editorial rows. Each retains its original description, destination and call to action. Trade-off: a longer vertical offer section, with less competing decoration and no implied priority for the formerly dark organization card.
- Open up the cited statistics instead of putting every statistic in another rounded container. Keep all study wording, context and source links.
- Remove the pair of context boxes, reduce the oversized project-panel corners, and reduce desktop section gaps from 128px to 96px. Keep the dark newsletter/project panels and existing red handwritten annotations. Render the existing evidence-interpretation sentence in Caveat.
- Remove scroll-reveal observers from the homepage, research and approach pages, and the fade on the whole main element. Content is visible immediately. Keep functional demo-message animations; a global reduced-motion rule disables remaining animations/transitions when requested.
- Remove decorative button movement and research-card hover elevation; theme selection and input carets with the existing palette.

No factual text, form submission code, backend, routes or metadata were changed. Existing psychological copy still awaits the human review documented in parent PRs. The missing frontend-design skill was replaced by the available Impeccable skill. Its detector reports only Inter as an overused font; retaining Inter is an intentional exception required by the owner's approved visual identity.

Validation:
- Full build/prerender passes for all 26 CS/EN URLs, including existing metadata and consent assertions.
- Static HTML for both homepage, research and approach versions contains no scroll-reveal class or whole-main fade. The built CSS contains the reduced-motion rule; OS-level reduced-motion emulation was not available in the shared browser.
- Local browser checks at 320/390/768/1280/1440 CSS pixels across CS/EN: typography, wrapping, immediate content visibility, localized institutional links and no horizontal overflow. Institution link targets and source links are preserved.
- No production forms were submitted. Existing bundle-size warning remains. Hosted previews require owner login; these checks were local.

Review `/`, `/en`, `/#institutions`, `/en#institutions`, `/research`, `/en/research`, `/approach` and `/en/approach` on desktop and mobile. Check the preserved handwriting/dark panels, offer rows and visible content when scrolling. In OS reduced-motion mode, confirm remaining demo messages appear without animation.
