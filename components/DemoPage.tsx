import React, { lazy, Suspense } from 'react';
import { Language, translations } from '../translations';
import { localizedPath } from '../routing.mjs';

const MirrorDemo = lazy(() => import('./MirrorDemo'));
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!);

const DemoPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  // React omits JSX children of noscript during client rendering. Store escaped
  // markup as text so the prerender snapshot preserves it for a no-JS parser.
  const noScriptHtml = `<style>.demo-interactive { display: none !important; }</style>
    <div class="max-w-3xl mx-auto border-t border-stone-300 pt-6 space-y-4" data-demo-noscript="true">
      <p>${escapeHtml(t.demo_nojs)}</p>
      <a href="${escapeHtml(localizedPath('/research', lang))}" class="inline-flex items-center min-h-11 text-red-700 underline underline-offset-4">${escapeHtml(t.nav_why)}</a>
    </div>`;
  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-6 lg:py-12 space-y-4 sm:space-y-6 lg:space-y-8">
      <section aria-labelledby="demo-intro-title" className="text-center space-y-3 lg:space-y-5">
        <h1 id="demo-intro-title" className="text-2xl sm:text-3xl lg:text-5xl font-serif italic text-stone-900 font-black tracking-tighter">{t.demo_title}</h1>
        <p id="demo-intro-description" className="text-stone-600 text-sm lg:text-lg max-w-3xl mx-auto leading-relaxed">{t.demo_intro_description}</p>
      </section>
      <noscript dangerouslySetInnerHTML={{ __html: noScriptHtml }} />
      <div className="demo-interactive">
        <Suspense fallback={<p role="status" className="text-center py-8 min-h-[100vh] text-stone-600">{t.demo_loading}</p>}>
          <MirrorDemo lang={lang} />
        </Suspense>
      </div>
    </div>
  );
};

export default DemoPage;
