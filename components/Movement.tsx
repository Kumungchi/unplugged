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

      <section className="scroll-fade grid md:grid-cols-5 gap-6 md:gap-8 items-start">
        <div className="md:col-span-3 bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-stone-200">
          <span className="font-handwritten text-2xl text-red-600 block mb-6">{t.integrity_lab_label}</span>
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

        <div className="md:col-span-2 bg-stone-900 text-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] relative overflow-hidden paper-texture md:mt-8">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />
          <div className="relative z-10">
            <span className="font-handwritten text-lg text-red-400 block mb-4">{t.human_group_title}</span>
            <p className="text-stone-100 text-lg md:text-xl font-serif italic leading-relaxed">
              "{t.human_group_desc}"
            </p>
            <span className="block mt-6 font-handwritten text-stone-500">— Unplugged</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movement;
