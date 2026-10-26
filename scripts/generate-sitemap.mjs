import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { LANGUAGES, PUBLIC_ROUTES, SITE_ORIGIN, languageAlternates, localizedPath } from '../routing.mjs';

export function generateSitemap() {
  const entries = PUBLIC_ROUTES.flatMap((route) => LANGUAGES.map((lang) => {
    const alternates = Object.entries(languageAlternates(route))
      .map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${href}" />`)
      .join('\n');
    return `  <url>\n    <loc>${SITE_ORIGIN}${localizedPath(route, lang)}</loc>\n${alternates}\n  </url>`;
  }));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await writeFile(new URL('../public/sitemap.xml', import.meta.url), generateSitemap(), 'utf8');
  console.log(`Generated sitemap for ${PUBLIC_ROUTES.length * LANGUAGES.length} public language URLs.`);
}
