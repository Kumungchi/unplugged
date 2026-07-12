// Post-build static prerender step.
//
// The app is a pure client-rendered SPA (no SSR). Non-JS crawlers and AI
// tools that don't execute JavaScript only ever see the empty <div id="root">
// shell from the built index.html. This script drives the already-built app
// in a real headless browser (so all browser-only APIs — localStorage,
// crypto.randomUUID, the Convex websocket client — work exactly as they do
// for a real visitor), waits for each route to fully render, and writes the
// resulting HTML as a static file per route. Vercel then serves that static
// file directly for the route, and the shipped JS bundle still hydrates it
// normally for interactivity.
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const viteBin = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url));

// Vercel's build container is a minimal Linux image missing the shared
// libraries (libnspr4.so etc.) real desktop Chrome needs, so `puppeteer`'s
// bundled Chrome can't launch there. On Vercel (VERCEL=1 during builds) use
// @sparticuz/chromium's build made for serverless/build containers via
// puppeteer-core instead. Locally, use the full `puppeteer` package, which
// downloads a normal Chrome build and Just Works on a dev machine.
async function launchBrowser() {
  if (process.env.VERCEL) {
    const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
      import('@sparticuz/chromium'),
      import('puppeteer-core'),
    ]);
    return puppeteerCore.launch({
      args: await puppeteerCore.defaultArgs({ args: chromium.args, headless: 'shell' }),
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    });
  }

  const { default: puppeteer } = await import('puppeteer');
  try {
    return await puppeteer.launch({ headless: true });
  } catch (err) {
    if (!String(err).includes('Could not find Chrome')) throw err;
    console.log('Local Chrome not found for `puppeteer` — installing it now...');
    await new Promise((resolve, reject) => {
      const install = spawn('npx', ['puppeteer', 'browsers', 'install', 'chrome'], {
        stdio: 'inherit',
        shell: true,
      });
      install.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`install exited with code ${code}`))));
      install.on('error', reject);
    });
    return puppeteer.launch({ headless: true });
  }
}

const OUT_DIR = 'dist';

async function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

// Public, indexable routes only. Deliberately excludes /admin/*, /facilitator,
// and /staff-access — those are Clerk-gated staff tools and must stay
// client-only and unindexed.
const ROUTES = [
  '/',
  '/schools',
  '/organizations',
  '/government',
  '/assessment',
  '/about',
  '/initiative',
  '/approach',
  '/research',
  '/psychology',
  '/demo',
  '/join',
  '/privacy',
];

const LOADING_MARKERS = ['Loading demo', 'Načítání dema'];

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await delay(300);
  }
  throw new Error(`Preview server did not respond at ${url} within ${timeoutMs}ms`);
}

function outputPathFor(route) {
  if (route === '/') return path.join(OUT_DIR, 'index.html');
  return path.join(OUT_DIR, route.replace(/^\//, ''), 'index.html');
}

async function prerenderRoute(browser, base, route) {
  const page = await browser.newPage();
  try {
    // Force a deterministic language for the snapshot (matches the default
    // <html lang="en"> already in the built index.html). Real visitors still
    // get their own language via the client-side toggle after hydration.
    await page.evaluateOnNewDocument(() => {
      window.localStorage.setItem('unplugged_lang', 'en');
    });

    // 'load' rather than 'networkidle*' — Convex keeps a persistent websocket
    // open, so network-idle conditions would never resolve.
    await page.goto(`${base}${route}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForSelector('footer', { timeout: 15000 });
    await page.waitForFunction(
      (markers) => !markers.some((m) => document.body.innerText.includes(m)),
      { timeout: 15000 },
      LOADING_MARKERS
    );
    // Small settle buffer for the SEOHead title/meta effect to commit.
    await delay(300);

    const html = await page.content();
    const outPath = outputPathFor(route);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    console.log(`prerendered ${route} -> ${outPath}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const port = await findFreePort();
  const base = `http://localhost:${port}`;
  let previewFailed = null;
  const preview = spawn(process.execPath, [viteBin, 'preview', '--port', String(port), '--strictPort'], {
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  preview.on('error', (err) => {
    previewFailed = err;
  });
  preview.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      previewFailed = new Error(`vite preview exited early with code ${code} (signal ${signal})`);
    }
  });

  try {
    await waitForServer(base);
    if (previewFailed) throw previewFailed;

    const browser = await launchBrowser();
    try {
      for (const route of ROUTES) {
        await prerenderRoute(browser, base, route);
      }
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
