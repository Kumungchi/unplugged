import React from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';

const Psychology: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <article className="max-w-3xl mx-auto py-8 md:py-12 space-y-10 text-stone-700 leading-relaxed">
      <header className="space-y-5">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-stone-900">{t.psych_hero_title}</h1>
        <p className="text-lg">{t.psych_hero_sub}</p>
      </header>
      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">{t.psych_observed_title}</h2>
        <p>{t.psych_observed_text}</p>
        <a className="block underline underline-offset-4 text-sm hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700" href="https://arxiv.org/html/2503.17473v2">{t.psych_study_source}</a>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">{t.psych_limits_title}</h2>
        <p>{t.psych_limits_text}</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">{t.psych_interpretation_title}</h2>
        <p>{t.psych_interpretation_text}</p>
        <p>{t.psych_support_text}</p>
      </section>
      <Link to="/demo" className="inline-block underline underline-offset-4 text-red-700 hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700">{t.psych_cta_demo}</Link>
    </article>
  );
};

export default Psychology;
