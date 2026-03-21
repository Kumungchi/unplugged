
import React from 'react';
import { Language, translations } from '../translations';

interface BoundariesProps {
  lang: Language;
}

const Boundaries: React.FC<BoundariesProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-20">
      <section className="space-y-6 text-center">
        <h2 className="text-6xl italic text-stone-900 font-serif font-black tracking-tighter">{t.dangers_title}</h2>
        <p className="text-stone-500 text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
          "{t.dangers_sub}"
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div className="p-8 bg-red-50 rounded-[2.5rem] space-y-4 border border-red-100">
            <h3 className="text-red-900 font-black italic text-2xl">{t.dopamine_empathy_title}</h3>
            <p className="text-red-800/70 text-base leading-relaxed font-light">
              {t.dopamine_empathy_desc}
            </p>
          </div>
          <div className="p-8 bg-stone-50 rounded-[2.5rem] space-y-4 border border-stone-100">
            <h3 className="text-stone-900 font-black italic text-2xl">{t.surrogate_fallacy_title}</h3>
            <p className="text-stone-500 text-base leading-relaxed font-light">
              {t.surrogate_fallacy_desc}
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="p-8 bg-stone-900 text-white rounded-[2.5rem] space-y-4 shadow-xl">
            <h3 className="text-stone-100 font-black italic text-2xl">{t.examples_title}</h3>
            <ul className="space-y-3 text-stone-400 text-sm font-light">
              <li className="flex items-start space-x-3">
                <span className="text-red-600 font-black tracking-tighter">01.</span>
                <span>{t.example_1}</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-600 font-black tracking-tighter">02.</span>
                <span>{t.example_2}</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-600 font-black tracking-tighter">03.</span>
                <span>{t.example_3}</span>
              </li>
            </ul>
          </div>
          <div className="p-8 border border-stone-200 rounded-[2.5rem] space-y-4">
            <h3 className="text-stone-900 font-black italic text-2xl">{t.what_to_do}</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed">
              {t.protocol_desc}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-stone-100 rounded-xl text-[9px] font-bold uppercase tracking-widest text-center">{t.fasting_label}</div>
              <div className="p-3 bg-stone-100 rounded-xl text-[9px] font-bold uppercase tracking-widest text-center">{t.visits_label}</div>
              <div className="p-3 bg-stone-100 rounded-xl text-[9px] font-bold uppercase tracking-widest text-center">{t.analog_label}</div>
              <div className="p-3 bg-stone-100 rounded-xl text-[9px] font-bold uppercase tracking-widest text-center">{t.mirrors_label}</div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="bg-stone-100 p-16 rounded-[3rem] text-center space-y-6">
        <h2 className="text-3xl font-serif italic text-stone-900">{t.stop_talking_label}</h2>
        <div className="flex justify-center space-x-10 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
          <span className="hover:text-stone-900 cursor-pointer">Befrienders.org</span>
          <span className="hover:text-stone-900 cursor-pointer">Crisis Text Line</span>
          <span className="hover:text-stone-900 cursor-pointer">Samaritans</span>
        </div>
      </section>
    </div>
  );
};

export default Boundaries;
