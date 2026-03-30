import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';

interface PsychologyProps {
  lang: Language;
}

const Psychology: React.FC<PsychologyProps> = ({ lang }) => {
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

  const roles = [
    {
      title: t.psych_therapist_title,
      desc: t.psych_therapist_desc,
      quote: t.psych_therapist_quote,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
      ),
      color: 'red',
    },
    {
      title: t.psych_partner_title,
      desc: t.psych_partner_desc,
      quote: t.psych_partner_quote,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
      color: 'stone',
    },
    {
      title: t.psych_friend_title,
      desc: t.psych_friend_desc,
      quote: t.psych_friend_quote,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      color: 'stone',
    },
  ];

  const brainSteps = [
    t.psych_brain_step_1,
    t.psych_brain_step_2,
    t.psych_brain_step_3,
    t.psych_brain_step_4,
    t.psych_brain_step_5,
  ];

  const research = [
    { text: t.psych_research_anthropic, tag: 'Anthropic' },
    { text: t.psych_research_mit, tag: 'MIT Media Lab' },
    { text: t.psych_research_surgeon, tag: 'US Surgeon General' },
    { text: t.psych_research_teens, tag: 'Common Sense Media' },
  ];

  return (
    <div ref={sectionsRef} className="max-w-5xl mx-auto py-8 md:py-12 space-y-16 md:space-y-24">
      {/* Hero */}
      <section className="scroll-fade text-center space-y-6 md:space-y-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-stone-900 font-black tracking-tighter">
          {t.psych_hero_title}
        </h1>
        <p className="text-xl text-stone-500 font-light italic max-w-2xl mx-auto leading-relaxed">
          "{t.psych_hero_sub}"
        </p>
      </section>

      {/* Role cards */}
      {roles.map((role, idx) => (
        <section key={idx} className="scroll-fade space-y-8">
          <div className={`p-8 md:p-12 rounded-[2.5rem] border space-y-6 ${
            idx === 0
              ? 'bg-red-50 border-red-100'
              : idx === 1
              ? 'bg-stone-900 text-white border-stone-800'
              : 'bg-white border-stone-200'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`${idx === 1 ? 'text-red-400' : 'text-red-600'}`}>
                {role.icon}
              </div>
              <h2 className={`text-3xl md:text-4xl font-serif italic font-black ${
                idx === 1 ? 'text-white' : 'text-stone-900'
              }`}>
                {role.title}
              </h2>
            </div>
            <p className={`text-base md:text-lg leading-relaxed font-light ${
              idx === 0 ? 'text-red-800/80' : idx === 1 ? 'text-stone-300' : 'text-stone-600'
            }`}>
              {role.desc}
            </p>
            <blockquote className={`border-l-4 pl-6 py-2 font-serif italic text-lg md:text-xl ${
              idx === 0
                ? 'border-red-300 text-red-900'
                : idx === 1
                ? 'border-red-500 text-stone-200'
                : 'border-stone-300 text-stone-700'
            }`}>
              {role.quote}
            </blockquote>
          </div>
        </section>
      ))}

      {/* Brain feedback loop */}
      <section className="scroll-fade space-y-8">
        <h2 className="text-4xl font-serif italic text-stone-900 font-black text-center tracking-tighter">
          {t.psych_brain_title}
        </h2>
        <p className="text-stone-500 font-light text-center max-w-2xl mx-auto leading-relaxed">
          {t.psych_brain_desc}
        </p>
        <div className="flex flex-col items-center space-y-0">
          {brainSteps.map((step, i) => (
            <div key={i} className="flex items-center space-x-4 w-full max-w-lg">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                  i < 2 ? 'bg-stone-200 text-stone-700' : i < 4 ? 'bg-red-100 text-red-700' : 'bg-red-600 text-white'
                }`}>
                  {i + 1}
                </div>
                {i < brainSteps.length - 1 && (
                  <div className="w-0.5 h-8 bg-stone-200" />
                )}
              </div>
              <p className={`text-sm md:text-base font-light py-3 ${
                i >= 3 ? 'text-red-800 font-medium' : 'text-stone-600'
              }`}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Research section */}
      <section className="scroll-fade space-y-8 md:space-y-12">
        <h3 className="text-xl md:text-2xl font-serif italic font-bold text-center text-stone-900">{t.emotional_attachment_title}</h3>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {research.map((item, i) => (
            <div key={i} className="space-y-6 bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] border border-stone-200 shadow-sm transition-shadow hover:shadow-md">
              <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-stone-100 text-stone-600 rounded-full">
                {item.tag}
              </span>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="scroll-fade text-center space-y-8 py-12 border-t border-stone-200">
        <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 font-black tracking-tighter">
          {t.psych_cta_title}
        </h2>
        <p className="text-stone-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
          {t.psych_cta_desc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/demo"
            className="px-10 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg hover:-translate-y-0.5"
          >
            {t.psych_cta_demo}
          </Link>
          <Link
            to="/approach"
            className="px-10 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all"
          >
            {t.psych_cta_approach}
          </Link>
        </div>
        <section className="scroll-fade bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-16 text-center space-y-8 shadow-xl">
          <h3 className="text-2xl md:text-4xl font-serif italic font-bold max-w-2xl mx-auto">{t.psychology_conclusion_title}</h3>
          <p className="text-stone-400 font-light leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
            {t.psychology_conclusion_desc}
          </p>
          <Link
            to="/research"
            className="inline-block px-10 py-4 border border-stone-700 hover:border-stone-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-sm"
          >
            {t.nav_boundaries}
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Psychology;
