import test from 'node:test';
import assert from 'node:assert/strict';
import { languageFromPathname, routeFromPathname, localizedPath, languageSwitchHref, languageAlternates, PUBLIC_ROUTES } from '../routing.mjs';
import { generateSitemap } from './generate-sitemap.mjs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Link, StaticRouter } from 'react-router';

test('only the complete /en prefix selects English', () => {
  for (const path of ['/en', '/en/', '/en/schools', '/EN/demo']) assert.equal(languageFromPathname(path), 'en', path);
  for (const path of ['/', '/schools', '/enough', '/english/demo', '/schools/en']) assert.equal(languageFromPathname(path), 'cs', path);
});

test('localized paths use one shared route tree and canonical home paths', () => {
  assert.equal(localizedPath('/', 'cs'), '/');
  assert.equal(localizedPath('/', 'en'), '/en');
  assert.equal(routeFromPathname('/en/'), '/');
  assert.equal(routeFromPathname('/en/schools/'), '/schools');
  for (const route of PUBLIC_ROUTES) {
    assert.equal(routeFromPathname(localizedPath(route, 'cs')), route);
    assert.equal(routeFromPathname(localizedPath(route, 'en')), route);
  }
});

test('language switching preserves query values and fragments exactly', () => {
  const search = '?demo=therapy&audience=schools&note=a%2Fb%20c';
  assert.equal(languageSwitchHref({ pathname: '/demo', search, hash: '#analysis' }, 'en'), `/en/demo${search}#analysis`);
  assert.equal(languageSwitchHref({ pathname: '/en/join', search: '?segment=government', hash: '#form' }, 'cs'), '/join?segment=government#form');
  assert.equal(languageSwitchHref({ pathname: '/en' }, 'cs'), '/');
  assert.equal(languageSwitchHref({ pathname: '/' }, 'en'), '/en');
  assert.equal(languageSwitchHref({ pathname: '/en//outside.example' }, 'cs'), '/outside.example');
});

test('sitemap has unique public pairs and reciprocal language alternatives', () => {
  const xml = generateSitemap();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(urls.length, 26);
  assert.equal(new Set(urls).size, 26);
  assert(!/admin|facilitator|staff-access/.test(xml));
  for (const route of PUBLIC_ROUTES) {
    const alternatives = languageAlternates(route);
    assert.equal(alternatives['x-default'], alternatives.cs);
    for (const [lang, href] of Object.entries(alternatives)) {
      assert.equal(xml.split(`hreflang="${lang}" href="${href}"`).length - 1, 2);
    }
  }
});

test('React Router links respect the English basename for home and query paths', () => {
  const html = renderToStaticMarkup(createElement(StaticRouter, { basename: '/en', location: '/en/schools' },
    createElement('nav', null,
      createElement(Link, { to: '/' }, 'Home'),
      createElement(Link, { to: '/join?segment=schools#form' }, 'Contact'),
    ),
  ));
  assert(html.includes('href="/en"'));
  assert(html.includes('href="/en/join?segment=schools#form"'));
});
