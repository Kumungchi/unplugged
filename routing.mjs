export const SITE_ORIGIN = 'https://www.unplugged.cz';

/** @type {readonly ('cs' | 'en')[]} */
export const LANGUAGES = ['cs', 'en'];

// Shared by metadata, sitemap generation and prerendering. Staff routes stay out.
export const PUBLIC_ROUTES = [
  '/', '/schools', '/organizations', '/government', '/assessment', '/about',
  '/initiative', '/approach', '/research', '/psychology', '/demo', '/join', '/privacy',
];

/** @param {string} pathname */
export function normalizePathname(pathname) {
  // Keep generated hrefs origin-relative, even for a malformed double-slash URL.
  return '/' + pathname.replace(/^\/+|\/+$/g, '');
}

/** @param {string} pathname @returns {'cs' | 'en'} */
export function languageFromPathname(pathname) {
  return /^\/en(?:\/|$)/i.test(pathname) ? 'en' : 'cs';
}

/** @param {string} pathname */
export function routeFromPathname(pathname) {
  return normalizePathname(languageFromPathname(pathname) === 'en' ? pathname.slice(3) : pathname);
}

/** @param {string} route @param {'cs' | 'en'} lang */
export function localizedPath(route, lang) {
  const path = normalizePathname(route);
  return lang === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

/** @param {{pathname: string, search?: string, hash?: string}} location @param {'cs' | 'en'} lang */
export function languageSwitchHref(location, lang) {
  return localizedPath(routeFromPathname(location.pathname), lang) + (location.search || '') + (location.hash || '');
}

/** @param {string} route */
export function languageAlternates(route) {
  return {
    cs: SITE_ORIGIN + localizedPath(route, 'cs'),
    en: SITE_ORIGIN + localizedPath(route, 'en'),
    'x-default': SITE_ORIGIN + localizedPath(route, 'cs'),
  };
}
