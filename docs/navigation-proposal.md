# U-12 — navigation and action priorities, awaiting approval

## Agreed visual direction

Matias wants to keep the current warm background, Inter/Playfair/Caveat typography, red details and overall UI character. Improve hierarchy and clarity through targeted changes. This is refinement of the existing site, not a new visual identity.

## Recommended variant: demo first

Desktop header, in order:

1. **Proč na tom záleží / Why it matters** → `/research`.
2. **Newsletter / Newsletter** → localized homepage `#newsletter`.
3. **Pro instituce / For institutions** → an accessible expandable list: Školy / Schools (`/schools`), Organizace / Organizations (`/organizations`), Veřejný sektor / Government (`/government`), Sebereflexe / Assessment (`/assessment`).
4. **O projektu / About** → `/about`.
5. One prominent action: **Vyzkoušet demo / Try the demo** → `/demo`.
6. Language switch, preserving the current page and parameters.

The hero keeps demo as the main public action and the existing institutional path as secondary. The early newsletter section provides another clear way to stay involved without adding a competing header button. Repeating the same demo action in the header and hero does not introduce a new decision.

Trade-off: an interactive demo asks for attention but lets someone experience the topic before leaving an email. The newsletter is one section below the hero rather than the first requested action.

## Alternative: newsletter first

Keep the same structure, but replace the Newsletter text link with **Demo** and make **Odebírat newsletter / Subscribe** the prominent header/hero action. The institutional hero action stays secondary.

Trade-off: this foregrounds the active publishing channel and asks less interaction time. Visitors are asked for an email before trying the educational demonstration; the demo remains available as a normal navigation link.

## Existing routes and mobile behavior

- Preserve all three institutional offers and both CS/EN URLs.
- `/research` becomes the clear public entry point to the existing evidence content, with contextual links to `/psychology` and `/approach`; no article is silently deleted or merged.
- `/join` stays the inquiry form reached from institutional offers. `/initiative` stays the volunteer/contributor route, linked from About and the footer instead of competing with Work With Us in the header.
- Preserve secondary navigation, privacy and cookie settings in the footer.
- Mobile uses the same hierarchy. The institution group expands by explicit activation, works by keyboard and touch, exposes its state and does not depend on hover.
- Newsletter anchors must scroll and focus the section after both same-page navigation and a jump from another language-localized page. This needs explicit verification with the current SPA scroll behavior.
- A link labeled For institutions should open the institutional group or lead to relevant offers. Do not create a new generic institutional landing page just for navigation.

Neither variant settles O-8 (the primary analytics metric). That remains a separate owner decision.

## Approval and acceptance

This is a proposal. U-12 remains unchecked until Matias selects a variant and implementation is verified on desktop/mobile, CS/EN, keyboard, and cross-page newsletter anchors. No navigation items or destinations are changed by the U-11 hero update.
