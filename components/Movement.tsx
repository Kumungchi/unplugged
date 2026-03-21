
import React from 'react';
import { Language, translations } from '../translations';

interface MovementProps { lang: Language; }

const Movement: React.FC<MovementProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-24">
      <section className="text-center space-y-10">
        <h2 className="text-5xl md:text-6xl font-serif italic text-stone-900 font-black tracking-tighter">
          {t.manifesto_title}<span className="text-red-600">.</span>
        </h2>
        <div className="space-y-8 text-xl font-light text-stone-600 leading-relaxed max-w-3xl mx-auto">
          <p className="text-stone-900 font-bold italic border-l-4 border-stone-900 pl-8 text-left relative">
            <span className="absolute -left-12 top-0 font-handwritten text-4xl text-stone-300 -rotate-12">"{t.ref_note}"</span>
            {t.manifesto_p1}
          </p>
          <p className="text-left">{t.manifesto_p2}</p>
          <p className="text-left font-serif italic text-2xl text-stone-400">{t.manifesto_p3}</p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8 bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">{t.integrity_lab_label}</h3>
          <ul className="space-y-6">
            <li className="space-y-1">
              <h4 className="text-lg font-serif italic font-bold">{t.informative_content_label}</h4>
              <p className="text-stone-500 text-sm font-light">{t.informative_content_desc}</p>
            </li>
            <li className="space-y-1">
              <h4 className="text-lg font-serif italic font-bold">{t.healthy_standards_label}</h4>
              <p className="text-stone-500 text-sm font-light">{t.healthy_standards_desc}</p>
            </li>
          </ul>
        </div>
        <div className="space-y-8 bg-stone-900 text-white p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-handwritten text-white/10 text-6xl -rotate-12">{t.join_handwritten}</div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600">{t.human_group_title}</h3>
          <p className="text-xl font-serif italic leading-tight">{t.human_group_title}</p>
          <p className="text-stone-400 text-sm font-light leading-relaxed">
            {t.human_group_desc}
          </p>
          <button className="w-full py-4 bg-white text-stone-900 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
            {t.start_btn}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Movement;
