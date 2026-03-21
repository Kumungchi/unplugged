
import React from 'react';
import { Language, translations } from '../translations';

interface LandingProps {
  onStart: () => void;
  lang: Language;
}

const Landing: React.FC<LandingProps> = ({ onStart, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-32 py-16 scroll-smooth">
      <section className="text-center max-w-4xl mx-auto space-y-10">
        <div className="inline-block px-4 py-1 border border-stone-300 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">
          {t.established_label}
        </div>
        <h1 className="text-5xl md:text-7xl leading-tight text-stone-900 font-serif font-black tracking-tighter whitespace-pre-line">
          {t.hero_title}
        </h1>
        <p className="text-lg text-stone-500 leading-relaxed font-light max-xl mx-auto italic">
          "{t.hero_sub}"
        </p>
        <div className="pt-8">
          <button 
            onClick={onStart}
            className="px-14 py-5 bg-stone-900 text-white rounded-full text-lg font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
          >
            {t.start_btn}
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-16 pt-20 border-t border-stone-200">
        <div className="relative space-y-6 group">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">{t.problem_label}</h3>
          <p className="text-3xl font-serif italic text-stone-900 font-bold leading-tight">
            {t.problem_title}
          </p>
          <p className="text-stone-500 font-light leading-relaxed">
            {t.problem_desc}
          </p>
        </div>
        <div className="space-y-6 bg-white p-12 rounded-[2.5rem] border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100/50 -rotate-45 translate-x-16 -translate-y-16"></div>
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-stone-400">{t.mission_label}</h3>
          <p className="text-3xl font-serif italic text-stone-900 font-bold leading-tight">
            {t.mission_title}
          </p>
          <p className="text-stone-500 font-light leading-relaxed">
            {t.mission_desc}
          </p>
        </div>
      </section>

      <section className="text-center py-20 border-y border-stone-100 italic font-serif text-2xl text-stone-400 max-w-3xl mx-auto leading-relaxed">
        "{t.quote_text}"
      </section>
    </div>
  );
};

export default Landing;
