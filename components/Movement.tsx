import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';

interface MovementProps { lang: Language; }

const Movement: React.FC<MovementProps> = ({ lang }) => {
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

  return (
    <div ref={sectionsRef} className="max-w-4xl mx-auto py-8 md:py-12 space-y-16 md:space-y-24">
      <section className="scroll-fade text-center space-y-6 md:space-y-10 pb-8 border-b border-stone-200">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-stone-900 font-black tracking-tighter">
          {t.manifesto_title}<span className="text-red-600">.</span>
        </h2>
        <div className="space-y-8 text-xl md:text-2xl font-normal text-stone-700 leading-relaxed max-w-2xl mx-auto">
          <p className="text-left">{t.manifesto_p1}</p>
          <p className="text-left">{t.manifesto_p2}</p>
          <p className="text-left font-serif italic text-3xl text-stone-600">{t.manifesto_p3}</p>
        </div>
      </section>

      <section className="scroll-fade grid md:grid-cols-2 gap-6 md:gap-10">
        <div className="space-y-6 md:space-y-8 bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-stone-200 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">{t.integrity_lab_label}</h3>
          <ul className="space-y-8">
            <li className="space-y-2">
              <h4 className="text-2xl font-serif italic font-bold text-stone-900">{t.informative_content_label}</h4>
              <p className="text-stone-600 text-base font-normal leading-relaxed">{t.informative_content_desc}</p>
            </li>
            <li className="space-y-2 border-t border-stone-100 pt-6">
              <h4 className="text-2xl font-serif italic font-bold text-stone-900">{t.healthy_standards_label}</h4>
              <p className="text-stone-600 text-base font-normal leading-relaxed">{t.healthy_standards_desc}</p>
            </li>
          </ul>
        </div>

        <div className="space-y-6 md:space-y-8 bg-stone-900 text-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="space-y-6 relative z-10 text-center">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-500">{t.human_group_title}</h3>
            <p className="text-stone-200 text-xl font-normal leading-relaxed">
              {t.human_group_desc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movement;
