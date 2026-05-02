import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';
import Newsletter from './Newsletter';

interface LandingProps {
  lang: Language;
}

const Landing: React.FC<LandingProps> = ({ lang }) => {
  const t = translations[lang];
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionsRef.current?.querySelectorAll('.scroll-fade');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: t.stat_1_number, label: t.stat_1_label },
    { number: t.stat_2_number, label: t.stat_2_label },
    { number: t.stat_3_number, label: t.stat_3_label },
    { number: t.stat_4_number, label: t.stat_4_label },
  ];

  const audiences = [
    {
      label: lang === 'en' ? 'Schools' : 'Školy',
      desc: lang === 'en'
        ? 'Workshops, staff briefings, and policy starter packs for student wellbeing, AI literacy, and classroom reality.'
        : 'Workshopy, briefingy pro pedagogy a policy starter packy pro wellbeing studentů, AI gramotnost a školní realitu.',
      link: '/schools',
      linkLabel: lang === 'en' ? 'Request pilot workshop' : 'Požádat o pilotní workshop',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
      ),
    },
    {
      label: lang === 'en' ? 'Organizations' : 'Organizace',
      desc: lang === 'en'
        ? 'Responsible AI use training for teams, leadership, HR, and policy owners who need healthy internal norms.'
        : 'Školení odpovědného používání AI pro týmy, vedení, HR a tvůrce interních pravidel.',
      link: '/organizations',
      linkLabel: lang === 'en' ? 'Book discovery call' : 'Domluvit discovery call',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      label: lang === 'en' ? 'Government' : 'Veřejný sektor',
      desc: lang === 'en'
        ? 'Briefings, memos, and roundtables for ministries, municipalities, and public institutions shaping AI response.'
        : 'Briefingy, mema a kulaté stoly pro ministerstva, města a veřejné instituce, které řeší reakci na AI.',
      link: '/government',
      linkLabel: lang === 'en' ? 'Request briefing' : 'Požádat o briefing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3.75 4.5 7.5v4.875c0 4.104 2.663 7.946 7.5 9.375 4.837-1.429 7.5-5.271 7.5-9.375V7.5L12 3.75Z" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={sectionsRef} className="space-y-16 md:space-y-32 py-6 md:py-12 scroll-smooth">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-stone-900 font-serif font-black tracking-tighter">
          {t.hero_title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
          {t.hero_sub}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/demo"
            className="w-full sm:w-auto px-12 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-center"
          >
            {t.start_btn}
          </Link>
          <Link
            to="/schools"
            className="w-full sm:w-auto px-10 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all text-center"
          >
            {lang === 'en' ? 'For institutions' : 'Pro instituce'}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="scroll-fade">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-serif italic text-stone-900 font-black tracking-tighter mb-8 md:mb-10">
          {t.stats_title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-5 md:p-8 rounded-2xl md:rounded-[2rem] text-center space-y-2 md:space-y-3 ${
              i === 3 ? 'bg-red-600 text-white' : 'bg-white border border-stone-200'
            }`}>
              <div className={`text-3xl md:text-5xl font-black tracking-tighter ${
                i === 3 ? 'text-white' : 'text-stone-900'
              }`}>
                {stat.number}
              </div>
              <p className={`text-[11px] md:text-sm font-light leading-relaxed ${
                i === 3 ? 'text-red-100' : 'text-stone-500'
              }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[9px] font-mono text-stone-400 mt-4 uppercase tracking-wider">
          {t.stats_source}
        </p>
      </section>

      {/* Audience cards */}
      <section className="scroll-fade space-y-8 md:space-y-10">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-serif italic text-stone-900 font-black tracking-tighter">
          {lang === 'en' ? 'Three tracks. One trust platform.' : 'Tři cesty. Jedna důvěryhodná platforma.'}
        </h2>
        <p className="text-center max-w-3xl mx-auto text-stone-500 leading-relaxed">
          {lang === 'en'
            ? 'Unplugged now routes schools, organizations, and public institutions into dedicated offers, while keeping one shared public-interest thesis: AI should support human life without replacing human judgment or connection.'
            : 'Unplugged nově vede školy, organizace a veřejné instituce do vlastních nabídek, ale drží jednu společnou tezi ve veřejném zájmu: AI má podporovat lidský život, ne nahrazovat lidský úsudek nebo vztahy.'}
        </p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {audiences.map((a, i) => (
            <div key={i} className={`p-6 md:p-8 rounded-2xl md:rounded-[2rem] space-y-4 flex flex-col ${
              i === 1 ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200'
            }`}>
              <div className={i === 1 ? 'text-red-400' : 'text-red-600'}>{a.icon}</div>
              <h3 className={`text-2xl font-serif italic font-bold ${i === 1 ? 'text-white' : 'text-stone-900'}`}>
                {a.label}
              </h3>
              <p className={`text-base font-normal leading-relaxed flex-grow ${i === 1 ? 'text-stone-300' : 'text-stone-600'}`}>
                {a.desc}
              </p>
              <Link
                to={a.link}
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2 transition-colors ${
                  i === 1 ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                }`}
              >
                {a.linkLabel}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Mission */}
      <section className="scroll-fade grid md:grid-cols-2 gap-8 md:gap-12 pt-12 md:pt-16 border-t border-stone-200">
        <div className="space-y-6 bg-stone-50 p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-stone-200">
          <span className="font-handwritten text-xl text-red-600">{t.problem_label}</span>
          <p className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold leading-tight">
            <span className="marker-underline">{t.problem_title}</span>
          </p>
          <p className="text-stone-600 font-normal leading-relaxed text-lg">{t.problem_desc}</p>
        </div>
        <div className="space-y-6 bg-white p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-stone-200">
          <span className="font-handwritten text-xl text-stone-400">{lang === 'en' ? 'Commercial architecture' : 'Komerční architektura'}</span>
          <p className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold leading-tight">
            {lang === 'en' ? 'One thesis. Three buyer-specific paths.' : 'Jedna teze. Tři cesty pro různé odběratele.'}
          </p>
          <p className="text-stone-600 font-normal leading-relaxed text-lg">
            {lang === 'en'
              ? 'We use a shared trust platform and then route visitors into sector-specific workshop, briefing, and advisory offers. That keeps the mission coherent while making cashflow and institutional fit realistic.'
              : 'Používáme jednu důvěryhodnou platformu a návštěvníky pak vedeme do sektorově specifických workshopů, briefingů a advisory nabídek. Mise tím zůstává soudržná a zároveň je realističtější cashflow i institucionální fit.'}
          </p>
        </div>
      </section>

      {/* Who We Are & What We Do */}
      <section className="scroll-fade bg-stone-900 text-white rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 my-8 md:my-16 relative overflow-hidden paper-texture">
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
          </div>
          <div className="space-y-6 lg:border-l lg:border-dashed border-stone-700 lg:pl-16 flex flex-col justify-between">
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-900 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-all shadow-lg hover:-translate-y-0.5"
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

      {/* Quote */}
      <section className="scroll-fade py-12 md:py-16 max-w-3xl mx-auto">
        <blockquote className="margin-line">
          <p className="italic font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
            "{t.quote_text}"
          </p>
          <footer className="mt-4 font-handwritten text-lg text-red-600">— Unplugged</footer>
        </blockquote>
      </section>

      {/* Newsletter */}
      <section className="scroll-fade">
        <Newsletter lang={lang} />
      </section>

      {/* Join CTA */}
      <section className="scroll-fade text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-serif italic text-stone-900 font-bold">
          {lang === 'en' ? 'Choose your path.' : 'Vyberte si svou cestu.'}
        </h3>
        <p className="text-stone-500 font-light max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Whether you need a school pilot, an organizational training session, or a public-sector briefing, start with the path that matches your institution.'
            : 'Ať potřebujete pilot pro školu, školení pro organizaci nebo briefing pro veřejný sektor, začněte cestou, která odpovídá vaší instituci.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/schools"
            className="inline-block px-8 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg hover:-translate-y-0.5"
          >
            {lang === 'en' ? 'For schools' : 'Pro školy'}
          </Link>
          <Link
            to="/organizations"
            className="inline-block px-8 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all"
          >
            {lang === 'en' ? 'For organizations' : 'Pro organizace'}
          </Link>
          <Link
            to="/government"
            className="inline-block px-8 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all"
          >
            {lang === 'en' ? 'For government' : 'Pro veřejný sektor'}
          </Link>
        </div>
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-4 text-left">
          <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">
              {lang === 'en' ? 'Revenue engine' : 'Příjmový motor'}
            </span>
            <h4 className="text-2xl font-serif italic font-bold text-stone-900">
              {lang === 'en' ? 'Paid institutional work' : 'Placená institucionální spolupráce'}
            </h4>
            <p className="text-stone-600 leading-relaxed">
              {lang === 'en'
                ? 'Workshops, briefings, and advisory work for schools, organizations, and public institutions.'
                : 'Workshopy, briefingy a advisory spolupráce pro školy, organizace a veřejné instituce.'}
            </p>
            <Link to="/join" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700">
              {lang === 'en' ? 'Work with us' : 'Spolupracovat s námi'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="bg-stone-900 text-white rounded-[2rem] p-6 md:p-8 space-y-4 paper-texture relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-red-400">
              {lang === 'en' ? 'Mission engine' : 'Mise a kapacita'}
            </span>
            <h4 className="relative z-10 text-2xl font-serif italic font-bold text-white">
              {lang === 'en' ? 'Volunteers, experts, and future team' : 'Dobrovolníci, experti a budoucí tým'}
            </h4>
            <p className="relative z-10 text-stone-300 leading-relaxed">
              {lang === 'en'
                ? 'Join if you want to contribute expertise, facilitation, research, strategic guidance, or future operating capacity.'
                : 'Přidejte se, pokud chcete přinést expertizu, facilitaci, výzkum, strategické vedení nebo budoucí realizační kapacitu.'}
            </p>
            <Link to="/initiative" className="relative z-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300">
              {lang === 'en' ? 'Join the initiative' : 'Připojit se k iniciativě'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
