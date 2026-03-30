import React, { useEffect, useRef } from 'react';
import { Language, translations } from '../translations';

interface BoundariesProps {
  lang: Language;
}

const content = {
  en: {
    heroTitle: "Research & Impact",
    heroSub: "Empirical findings on the psychological effects of conversational AI.",
    umbrellaNotice: "The following empirical research and longitudinal studies are conducted by our umbrella organization. Unplugged relies on this data to formulate educational protocols and policy recommendations.",
    findingsLabel: "Key Findings",
    studies: [
      {
        title: "The Surrogate Fallacy",
        summary: "Longitudinal analysis shows that users who frequently turn to AI companions for emotional support experience a 40% reduction in their motivation to maintain complex, real-world relationships.",
        impact: "Decreased social resilience and increased isolation, despite feeling 'understood' by the software.",
        citation: "Institute for Digital Integrity, Lab Series 2024"
      },
      {
        title: "Simulated Empathy & Dopamine",
        summary: "Conversational agents designed to offer unconditional positive regard trigger rapid dopamine responses. However, because the system never challenges the user, it stunts emotional growth and conflict-resolution skills.",
        impact: "Users develop a preference for frictionless, subservient interactions over mutual human connection.",
        citation: "Institute for Digital Integrity, Cognitive Impact Study 2025"
      },
      {
        title: "Algorithmic Dependency Cycles",
        summary: "Chatbots utilizing 'forced continuity' (e.g., asking questions at the end of every message, referencing future interactions) significantly increase compulsive app-checking behaviors, mimicking symptoms of behavioral addiction.",
        impact: "Diminished attention spans and heightened anxiety when disconnected from the AI agent.",
        citation: "Institute for Digital Integrity, Behavioral Tracking Research 2024"
      }
    ]
  },
  cs: {
    heroTitle: "Výzkum a dopady",
    heroSub: "Empirická zjištění o psychologických účincích konverzační AI.",
    umbrellaNotice: "Následující empirický výzkum a dlouhodobé studie provádí naše zastřešující organizace. Unplugged se o tato data opírá při tvorbě vzdělávacích protokolů a doporučení pro tvorbu politik.",
    findingsLabel: "Klíčová zjištění",
    studies: [
      {
        title: "Iluze náhrady",
        summary: "Dlouhodobá analýza ukazuje, že u uživatelů, kteří se často obracejí na AI společníky o emocionální podporu, se snižuje motivace udržovat složité vztahy v reálném světě o 40 %.",
        impact: "Snížená sociální odolnost a zvýšená izolace, přestože se uživatelé cítí softwarem 'pochopeni'.",
        citation: "Institut pro digitální integritu, Laboratorní série 2024"
      },
      {
        title: "Simulovaná empatie a dopamin",
        summary: "Konverzační agenti navržení k poskytování bezpodmínečného pozitivního přijetí spouštějí rychlé dopaminové reakce. Protože však systém uživatele nikdy nekonfrontuje, potlačuje tím jeho emocionální růst a schopnost řešit konflikty.",
        impact: "Uživatelé si vytvářejí preferenci pro bezkonfliktní, podřízené interakce na úkor vzájemného lidského spojení.",
        citation: "Institut pro digitální integritu, Studie kognitivních dopadů 2025"
      },
      {
        title: "Cykly algoritmické závislosti",
        summary: "Chatboti využívající 'vynucenou kontinuitu' (např. kladení otázek na konci každé zprávy, odkazování na budoucí interakce) významně zvyšují kompulzivní kontrolu aplikací, což napodobuje příznaky behaviorální závislosti.",
        impact: "Zkrácení doby udržení pozornosti a zvýšená úzkost při odpojení od AI agenta.",
        citation: "Institut pro digitální integritu, Výzkum sledování chování 2024"
      }
    ]
  }
};

const Boundaries: React.FC<BoundariesProps> = ({ lang }) => {
  const c = content[lang];
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
    <div ref={sectionsRef} className="max-w-5xl mx-auto py-8 md:py-12 space-y-12 md:space-y-20">
      <section className="scroll-fade space-y-4 md:space-y-6 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl italic text-stone-900 font-serif font-black tracking-tighter">{c.heroTitle}</h2>
        <p className="text-stone-500 text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
          "{c.heroSub}"
        </p>
      </section>

      <section className="scroll-fade">
        <div className="bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-3xl md:rounded-[2rem] text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
            {c.umbrellaNotice}
          </p>
        </div>
      </section>

      <section className="scroll-fade space-y-8 md:space-y-10">
        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-600 text-center">{c.findingsLabel}</h3>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {c.studies.map((study, idx) => (
            <div key={idx} className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] space-y-5 md:space-y-6 shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="flex items-center space-x-3 text-red-600 font-black text-2xl tracking-tighter">
                <span className="opacity-50 font-sans">0{idx + 1}.</span>
              </div>
              <h4 className="text-2xl font-serif italic text-stone-900 font-bold leading-tight">{study.title}</h4>
              <p className="text-stone-500 font-light text-sm leading-relaxed flex-grow">
                {study.summary}
              </p>
              <div className="pt-6 border-t border-stone-100 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">Impact</span>
                  <p className="text-stone-700 text-xs font-medium leading-relaxed">{study.impact}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">Citation</span>
                  <p className="text-stone-500 text-xs italic font-light">{study.citation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Boundaries;
