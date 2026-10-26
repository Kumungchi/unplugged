# Local web fonts

Downloaded on 26 October 2026 from the Google Fonts CSS2 API and its WOFF2 distribution. Visitors receive the files from this website's own `/fonts/` paths; no runtime Google font request is needed.

- Inter: normal, variable weights 300–900.
- Playfair Display: normal and italic, variable weights 400–900.
- Caveat: normal, variable weights 400–700.

Each style includes **Latin** and **Latin Extended** subsets. Keep the API-supplied `unicode-range` definitions in `styles/global.css`; both subsets are needed for Czech text. All faces use `font-display: swap`. Only normal Playfair Display, used in the hero and logo, is preloaded.

`manifest.json` records each original WOFF2 URL, CSS request, byte count and SHA-256 checksum. License files are copied from the corresponding family directories in the official [google/fonts repository](https://github.com/google/fonts/tree/main/ofl). Retain the copyright notices and SIL Open Font License files with the fonts.
