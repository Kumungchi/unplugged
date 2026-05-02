import React, { useEffect, useRef } from 'react';
import { Language, translations } from '../translations';

interface BoundariesProps {
  lang: Language;
}

const content = {
  en: {
    heroTitle: "Evidence & Framing",
    heroSub: "How Unplugged separates public research, synthesis, and implementation guidance.",
    umbrellaNotice: "This page is intentionally conservative. We do not present Unplugged as a mature research institute. Instead, we show the public signals we rely on, the interpretations we make, and the institutional questions we think matter most.",
    findingsLabel: "Three Evidence Layers",
    studies: [
      {
        title: "Public Research Signals",
        summary: "We draw first from public research and reporting about loneliness, AI sycophancy, youth technology use, and the design incentives that shape conversational systems.",
        impact: "This gives us directional evidence that emotionally significant AI use deserves serious educational and institutional attention.",
        citation: "Publicly available research, reporting, and technical safety material"
      },
      {
        title: "Unplugged Synthesis",
        summary: "Our synthesis is that schools, organizations, and public institutions are not prepared for AI systems that feel relational, emotionally responsive, and always available.",
        impact: "That gap is educational, cultural, and policy-related, not just technical.",
        citation: "Unplugged framing based on cross-source synthesis"
      },
      {
        title: "Implementation Guidance",
        summary: "From there, we translate concern into usable formats: workshops, briefings, policy framing, and institutional conversation tools.",
        impact: "The goal is not panic. The goal is practical response that can survive scrutiny from educators, leaders, and public institutions.",
        citation: "Educational interpretation and advisory design"
      }
    ]
  },
  cs: {
    heroTitle: "Důkazy a rámování",
    heroSub: "Jak Unplugged odděluje veřejný výzkum, syntézu a implementační doporučení.",
    umbrellaNotice: "Tato stránka je záměrně konzervativní. Neprezentujeme Unplugged jako hotový výzkumný institut. Místo toho ukazujeme veřejné signály, o které se opíráme, interpretace, které z nich vyvozujeme, a institucionální otázky, které považujeme za důležité.",
    findingsLabel: "Tři vrstvy důkazů",
    studies: [
      {
        title: "Signály z veřejného výzkumu",
        summary: "Nejprve vycházíme z veřejně dostupného výzkumu a reportingu o osamělosti, sycophancy v AI, používání technologií mladými lidmi a designových incentvách konverzačních systémů.",
        impact: "To nám dává dostatečný směr k tomu, abychom emocionálně významné používání AI brali vážně ve vzdělávání i institucích.",
        citation: "Veřejně dostupný výzkum, reporting a materiály z oblasti technické bezpečnosti"
      },
      {
        title: "Syntéza Unplugged",
        summary: "Naše syntéza je, že školy, organizace a veřejné instituce nejsou připravené na AI systémy, které působí vztahově, emocionálně responzivně a stále dostupně.",
        impact: "Tato mezera je vzdělávací, kulturní i policy-related, ne pouze technická.",
        citation: "Rámování Unplugged založené na syntéze více zdrojů"
      },
      {
        title: "Implementační doporučení",
        summary: "Z této báze převádíme obavy do použitelných formátů: workshopy, briefingy, policy rámování a nástroje pro institucionální rozhovor.",
        impact: "Cílem není panika. Cílem je praktická reakce, která obstojí před pedagogy, vedením i veřejnými institucemi.",
        citation: "Vzdělávací interpretace a advisory design"
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
