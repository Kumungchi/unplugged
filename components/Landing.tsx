import React from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';
import Newsletter from './Newsletter';

interface LandingProps {
  lang: Language;
}

const Landing: React.FC<LandingProps> = ({ lang }) => {
  const t = translations[lang];


  const stats = [
    { number: t.stat_1_number, label: t.stat_1_label, source: t.stat_1_source, page: 6 },
    { number: t.stat_2_number, label: t.stat_2_label, source: t.stat_2_source, page: 12 },
    { number: t.stat_3_number, label: t.stat_3_label, source: t.stat_3_source, page: 9 },
  ];
  const surveyUrl = 'https://www.commonsensemedia.org/sites/default/files/research/report/talk-trust-and-trade-offs_2025_web.pdf';

  const audiences = [
    {
      label: lang === 'en' ? 'Schools' : 'Školy',
      desc: lang === 'en'
        ? 'Workshops, staff briefings, and policy starter packs for student wellbeing, AI literacy, and classroom reality.'
        : 'Workshopy, briefingy pro pedagogy a policy starter packy pro wellbeing studentů, AI gramotnost a školní realitu.',
      link: '/schools',
      linkLabel: lang === 'en' ? 'Request pilot workshop' : 'Požádat o pilotní workshop',
    },
    {
      label: lang === 'en' ? 'Organizations' : 'Organizace',
      desc: lang === 'en'
        ? 'Responsible AI use training for teams, leadership, HR, and policy owners who need healthy internal norms.'
        : 'Školení odpovědného používání AI pro týmy, vedení, HR a tvůrce interních pravidel.',
      link: '/organizations',
      linkLabel: lang === 'en' ? 'Book discovery call' : 'Domluvit discovery call',
    },
    {
      label: lang === 'en' ? 'Government' : 'Veřejný sektor',
      desc: lang === 'en'
        ? 'Briefings, memos, and roundtables for ministries, municipalities, and public institutions shaping AI response.'
        : 'Briefingy, mema a kulaté stoly pro ministerstva, města a veřejné instituce, které řeší reakci na AI.',
      link: '/government',
      linkLabel: lang === 'en' ? 'Request briefing' : 'Požádat o briefing',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 py-6 md:py-12">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-stone-900 font-serif font-black tracking-tighter whitespace-pre-line">
          {t.hero_title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
          {t.mission_desc}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/demo"
            className="w-full sm:w-auto px-12 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors text-center"
          >
            {t.start_btn}
          </Link>
          <Link
            to="/#institutions"
            className="w-full sm:w-auto px-10 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all text-center"
          >
            {t.nav_institutions}
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" tabIndex={-1} aria-label={t.newsletter_title} className="scroll-mt-8 rounded-3xl focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-4">
        <Newsletter lang={lang} />
      </section>

      {/* Stats */}
      <section>
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-serif italic text-stone-900 font-black tracking-tighter mb-8 md:mb-10">
          {t.stats_title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="border-t border-stone-300 pt-6 space-y-4">
              <div className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900">
                {stat.number}
              </div>
              <p className="text-base leading-relaxed text-stone-700">
                {stat.label}
              </p>
              <a href={`${surveyUrl}#page=${stat.page}`} className="block text-sm leading-relaxed text-stone-600 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700">
                {stat.source}
              </a>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-8 space-y-3 text-center">
          <p className="text-base text-stone-700 leading-relaxed">{t.stats_context}</p>
          <a href={`${surveyUrl}#page=11`} className="block text-sm text-stone-600 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700">{t.stats_context_source}</a>
          <p className="text-sm text-stone-600 leading-relaxed">{t.stats_limits}</p>
        </div>
        <p className="max-w-3xl mx-auto text-center text-2xl md:text-3xl font-handwritten text-red-700 mt-8">
          {t.stats_interpretation}
        </p>
      </section>

      {/* Audience cards */}
      <section id="institutions" tabIndex={-1} aria-label={t.nav_institutions} className="scroll-mt-8 space-y-8 md:space-y-10 focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-serif italic text-stone-900 font-black tracking-tighter">
          {lang === 'en' ? 'Three tracks. One trust platform.' : 'Tři cesty. Jedna důvěryhodná platforma.'}
        </h2>
        <p className="text-center max-w-3xl mx-auto text-stone-600 leading-relaxed">
          {lang === 'en'
            ? 'Unplugged now routes schools, organizations, and public institutions into dedicated offers, while keeping one shared public-interest thesis: AI should support human life without replacing human judgment or connection.'
            : 'Unplugged nově vede školy, organizace a veřejné instituce do vlastních nabídek, ale drží jednu společnou tezi ve veřejném zájmu: AI má podporovat lidský život, ne nahrazovat lidský úsudek nebo vztahy.'}
        </p>
        <div className="border-t border-stone-300">
          {audiences.map(a => (
            <article key={a.link} className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 md:gap-12 py-7 md:py-9 border-b border-stone-300">
              <h3 className="text-2xl md:text-3xl font-serif italic font-bold text-stone-900">{a.label}</h3>
              <div className="space-y-3">
                <p className="text-base leading-relaxed text-stone-600 max-w-prose">{a.desc}</p>
                <Link to={a.link} className="inline-flex items-center gap-3 min-h-11 text-sm font-bold text-red-700 underline underline-offset-4 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-4">
                  {a.linkLabel}
                  <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Problem / Mission */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 pt-12 md:pt-16 border-t border-stone-200">
        <div className="space-y-5">
          <span className="font-handwritten text-xl text-red-700">{t.problem_label}</span>
          <p className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold leading-tight">
            {t.problem_title}
          </p>
          <p className="text-stone-600 font-normal leading-relaxed text-lg">{t.problem_desc}</p>
        </div>
        <div className="space-y-5 md:border-l md:border-stone-300 md:pl-12">
          <span className="font-handwritten text-xl text-red-700">{lang === 'en' ? 'Shared public platform' : 'Společná veřejná platforma'}</span>
          <p className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold leading-tight">
            {lang === 'en' ? 'One thesis. Three institutional paths.' : 'Jedna teze. Tři institucionální cesty.'}
          </p>
          <p className="text-stone-600 font-normal leading-relaxed text-lg">
            {lang === 'en'
              ? 'We keep one shared trust platform and then guide visitors into school, organizational, and public-sector paths. That keeps the mission coherent while speaking clearly to each institution.'
              : 'Držíme jednu společnou důvěryhodnou platformu a návštěvníky pak vedeme do školní, organizační a veřejnosektorové cesty. Mise tím zůstává soudržná a zároveň srozumitelná pro každou instituci.'}
          </p>
        </div>
      </section>

      {/* Who We Are & What We Do */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 relative z-10">
          <div className="space-y-6">
            <span className="font-handwritten text-2xl text-red-400">{t.who_we_are_label}</span>
            <p className="text-3xl md:text-4xl font-serif italic font-bold leading-tight">
              {t.who_we_are_title}
            </p>
            <p className="text-stone-300 font-normal leading-relaxed text-xl">
              {t.who_we_are_desc}
            </p>
            <p className="text-sm md:text-base text-stone-400 leading-relaxed">
              {lang === 'en'
                ? 'Unplugged is an initiative under Alesvia. We are preparing the registration of Alesvia z.ú.'
                : 'Unplugged je iniciativa pod Alesvia. Registraci Alesvia z.ú. připravujeme.'}
              {' '}<a href="https://alesvia.org" className="underline underline-offset-4 hover:text-white">alesvia.org</a>
            </p>
          </div>
          <div className="space-y-6 lg:border-l border-stone-700 lg:pl-16 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="font-handwritten text-2xl text-red-400">{t.what_we_do_label}</span>
              <p className="text-2xl md:text-3xl font-serif italic font-bold leading-tight">
                {t.what_we_do_title}
              </p>
              <p className="text-stone-300 font-light leading-relaxed">
                {t.what_we_do_desc}
              </p>
            </div>
            <div className="pt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-900 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
              >
                {lang === 'en' ? 'About Unplugged' : 'O Unplugged'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-300 pt-10 text-center space-y-5">
        <h2 className="text-3xl md:text-4xl font-serif italic font-bold text-stone-900">{t.home_contact_title}</h2>
        <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">{t.home_contact_desc}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <Link to="/join" className="inline-flex items-center min-h-11 font-bold underline underline-offset-4 text-stone-900 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700">{t.nav_contact}</Link>
          <Link to="/initiative" className="inline-flex items-center min-h-11 font-bold underline underline-offset-4 text-stone-900 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700">{t.nav_get_involved}</Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
