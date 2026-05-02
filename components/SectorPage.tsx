import React from 'react';
import { Link } from 'react-router';
import { Language } from '../translations';

type SectorKey = 'schools' | 'organizations' | 'government';

interface SectorPageProps {
  lang: Language;
  sector: SectorKey;
}

type SectorContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  problemTitle: string;
  problemBody: string;
  promiseTitle: string;
  promiseBody: string;
  buyersTitle: string;
  buyers: string[];
  outcomesTitle: string;
  outcomes: string[];
  formatsTitle: string;
  formats: string[];
  deliverablesTitle: string;
  deliverables: string[];
  proofTitle: string;
  proofBody: string;
  cta: string;
};

const content: Record<Language, Record<SectorKey, SectorContent>> = {
  en: {
    schools: {
      eyebrow: 'For Schools',
      title: 'Healthy AI boundaries for students, staff, and school leadership.',
      subtitle:
        'Unplugged helps schools respond to emotionally significant AI use with practical workshops, staff briefings, and policy-ready materials.',
      problemTitle: 'Why schools need this now',
      problemBody:
        'Students are already using conversational AI for learning, reflection, emotional support, and social substitution. Most schools have policies for cheating and tools, but not for psychological reliance, classroom norms, or staff readiness.',
      promiseTitle: 'What we help schools do',
      promiseBody:
        'Create age-appropriate literacy, reduce confusion around companion-style AI use, and give teachers language they can actually use with students and parents.',
      buyersTitle: 'Who this is for',
      buyers: ['School leadership', 'Prevention coordinators', 'Counselors', 'Teachers and pastoral staff'],
      outcomesTitle: 'Core outcomes',
      outcomes: [
        'Students can recognize manipulative AI patterns',
        'Staff can lead grounded conversations without panic',
        'Schools gain a policy starter pack for healthy AI boundaries',
      ],
      formatsTitle: 'Available formats',
      formats: [
        '90-minute student workshop',
        '60-minute staff briefing',
        'Half-day school package',
        'Parent communication add-on',
      ],
      deliverablesTitle: 'Sample deliverables',
      deliverables: [
        'Workshop outline and facilitator framing',
        'School-facing AI boundary checklist',
        'Parent communication template',
      ],
      proofTitle: 'Credibility stance',
      proofBody:
        'We frame this work as education and institutional guidance. We distinguish clearly between public research, our synthesis, and practical educational interpretation.',
      cta: 'Request pilot workshop',
    },
    organizations: {
      eyebrow: 'For Organizations',
      title: 'Responsible AI use training for teams, leadership, and policy owners.',
      subtitle:
        'Unplugged helps organizations address AI overtrust, misuse, emotional substitution, and blurry boundaries before those patterns become culture.',
      problemTitle: 'Why organizations need this now',
      problemBody:
        'AI adoption is outpacing workplace norms. Teams are using conversational systems for writing, planning, judgment support, and emotionally loaded conversations without shared guidance about risk, dependence, privacy, or human oversight.',
      promiseTitle: 'What we help organizations do',
      promiseBody:
        'Build healthier AI usage norms, give managers and HR a usable language for boundary-setting, and turn vague concern into concrete policy and training.',
      buyersTitle: 'Who this is for',
      buyers: ['HR and People Ops', 'L&D teams', 'AI governance leads', 'Executives and team leads'],
      outcomesTitle: 'Core outcomes',
      outcomes: [
        'Clearer internal AI usage norms',
        'Better understanding of psychosocial and judgment risks',
        'Practical policy and training next steps',
      ],
      formatsTitle: 'Available formats',
      formats: [
        'Executive briefing',
        'Employee training session',
        'AI boundary policy workshop',
        'Leadership Q&A session',
      ],
      deliverablesTitle: 'Sample deliverables',
      deliverables: [
        'Internal risk framing memo',
        'Responsible-use workshop deck',
        'Policy workshop summary and next-step recommendations',
      ],
      proofTitle: 'Credibility stance',
      proofBody:
        'We do not sell fear. We help organizations introduce practical, human-centered AI norms that can survive legal, leadership, and employee scrutiny.',
      cta: 'Book discovery call',
    },
    government: {
      eyebrow: 'For Government',
      title: 'Briefings and frameworks for public institutions responding to AI in social life.',
      subtitle:
        'Unplugged supports ministries, municipalities, and public institutions with practical, non-hysterical guidance on AI literacy, boundaries, and institutional response.',
      problemTitle: 'Why public institutions need this now',
      problemBody:
        'Conversational AI is entering emotionally and socially significant domains faster than institutional guidance is emerging. Public actors need frameworks that are psychologically realistic, operationally practical, and fit for public communication.',
      promiseTitle: 'What we help public institutions do',
      promiseBody:
        'Translate broad concern into usable briefings, roundtables, and implementation-ready recommendations for education, prevention, and governance contexts.',
      buyersTitle: 'Who this is for',
      buyers: ['Ministries and municipalities', 'Public education bodies', 'Digital policy teams', 'Regulators and public service leads'],
      outcomesTitle: 'Core outcomes',
      outcomes: [
        'Sharper public-interest framing of AI relational risk',
        'Clearer options for institutional response',
        'Briefing-ready language for cross-sector stakeholders',
      ],
      formatsTitle: 'Available formats',
      formats: [
        '60-minute expert briefing',
        'Facilitated roundtable',
        'Advisory memo',
        'Policy workshop',
      ],
      deliverablesTitle: 'Sample deliverables',
      deliverables: [
        'Briefing deck for decision-makers',
        'Policy framing memo',
        'Roundtable synthesis with actionable recommendations',
      ],
      proofTitle: 'Credibility stance',
      proofBody:
        'We position this work as an institution-in-formation: public-interest oriented, evidence-aware, and explicit about what is public research, what is synthesis, and what is implementation guidance.',
      cta: 'Request briefing',
    },
  },
  cs: {
    schools: {
      eyebrow: 'Pro školy',
      title: 'Zdravé hranice s AI pro studenty, učitele i vedení školy.',
      subtitle:
        'Unplugged pomáhá školám reagovat na emocionálně významné používání AI pomocí praktických workshopů, briefingu pro pedagogy a materiálů připravených pro školní provoz.',
      problemTitle: 'Proč to školy potřebují teď',
      problemBody:
        'Studenti už používají konverzační AI k učení, reflexi, emocionální opoře i jako náhradu sociálního kontaktu. Většina škol má pravidla pro podvádění a nástroje, ale ne pro psychologickou závislost, třídní normy nebo připravenost pedagogů.',
      promiseTitle: 'S čím školám pomáháme',
      promiseBody:
        'Budovat věkově přiměřenou AI gramotnost, snižovat zmatek kolem companion-style AI a dát učitelům jazyk, který mohou skutečně používat se studenty i rodiči.',
      buyersTitle: 'Pro koho to je',
      buyers: ['Vedení školy', 'Metodici prevence', 'Školní psychologové a poradci', 'Učitelé a třídní vedení'],
      outcomesTitle: 'Hlavní výsledky',
      outcomes: [
        'Studenti rozpoznají manipulativní vzorce AI',
        'Pedagogové zvládnou vést věcné rozhovory bez paniky',
        'Škola získá základ pro interní pravidla zdravých hranic s AI',
      ],
      formatsTitle: 'Dostupné formáty',
      formats: [
        '90minutový workshop pro studenty',
        '60minutový briefing pro pedagogy',
        'Půldenní balíček pro školu',
        'Doplněk pro komunikaci s rodiči',
      ],
      deliverablesTitle: 'Ukázkové výstupy',
      deliverables: [
        'Osnova workshopu a metodické rámování',
        'Checklist zdravých hranic s AI pro školu',
        'Šablona komunikace pro rodiče',
      ],
      proofTitle: 'Jak pracujeme s důvěryhodností',
      proofBody:
        'Tuto práci stavíme jako vzdělávání a institucionální podporu. Jasně rozlišujeme mezi veřejným výzkumem, naší syntézou a praktickou vzdělávací interpretací.',
      cta: 'Požádat o pilotní workshop',
    },
    organizations: {
      eyebrow: 'Pro organizace',
      title: 'Školení odpovědného používání AI pro týmy, vedení i tvůrce interních pravidel.',
      subtitle:
        'Unplugged pomáhá organizacím řešit přehnanou důvěru v AI, zneužití, emocionální substituci i rozostřené hranice dřív, než se tyto vzorce stanou součástí firemní kultury.',
      problemTitle: 'Proč to organizace potřebují teď',
      problemBody:
        'Adopce AI předbíhá pracovní normy. Týmy používají konverzační systémy pro psaní, plánování, úsudek i emocionálně zatížené situace bez společného rámce pro riziko, závislost, soukromí a lidský dohled.',
      promiseTitle: 'S čím organizacím pomáháme',
      promiseBody:
        'Budovat zdravější normy používání AI, dát manažerům a HR použitelný jazyk pro nastavování hranic a převést vágní obavy do konkrétní politiky a školení.',
      buyersTitle: 'Pro koho to je',
      buyers: ['HR a People Ops', 'L&D týmy', 'AI governance / innovation leads', 'Vedení a manažeři'],
      outcomesTitle: 'Hlavní výsledky',
      outcomes: [
        'Jasnější interní normy pro používání AI',
        'Lepší pochopení psychosociálních a úsudkových rizik',
        'Praktické další kroky pro politiku a školení',
      ],
      formatsTitle: 'Dostupné formáty',
      formats: [
        'Briefing pro vedení',
        'Školení pro zaměstnance',
        'Workshop k interní AI policy',
        'Q&A session pro leadership',
      ],
      deliverablesTitle: 'Ukázkové výstupy',
      deliverables: [
        'Interní memo k mapování rizik',
        'Workshop deck pro responsible use',
        'Shrnutí workshopu a doporučené další kroky',
      ],
      proofTitle: 'Jak pracujeme s důvěryhodností',
      proofBody:
        'Neprodáváme strach. Pomáháme organizacím zavádět praktické, lidsky orientované normy používání AI, které obstojí před právním, leadership i zaměstnaneckým pohledem.',
      cta: 'Domluvit discovery call',
    },
    government: {
      eyebrow: 'Pro veřejný sektor',
      title: 'Briefingy a rámce pro veřejné instituce, které reagují na AI v sociálně citlivých oblastech.',
      subtitle:
        'Unplugged podporuje ministerstva, města a veřejné instituce praktickým, nealarmistickým rámcem pro AI gramotnost, hranice a institucionální odpověď.',
      problemTitle: 'Proč to veřejné instituce potřebují teď',
      problemBody:
        'Konverzační AI vstupuje do emocionálně a sociálně významných oblastí rychleji, než vzniká institucionální metodika. Veřejní aktéři potřebují rámce, které jsou psychologicky realistické, provozně použitelné a srozumitelné pro veřejnou komunikaci.',
      promiseTitle: 'S čím pomáháme institucím',
      promiseBody:
        'Převádíme obecné obavy do použitelných briefingů, kulatých stolů a doporučení připravených pro vzdělávání, prevenci a governance kontext.',
      buyersTitle: 'Pro koho to je',
      buyers: ['Ministerstva a města', 'Veřejné vzdělávací instituce', 'Týmy digitální politiky', 'Regulátoři a vedoucí veřejných služeb'],
      outcomesTitle: 'Hlavní výsledky',
      outcomes: [
        'Přesnější public-interest rámování rizik vztahové AI',
        'Jasnější možnosti institucionální reakce',
        'Jazyk připravený pro briefing různých stakeholderů',
      ],
      formatsTitle: 'Dostupné formáty',
      formats: [
        '60minutový expertní briefing',
        'Facilitovaný kulatý stůl',
        'Advisory memo',
        'Policy workshop',
      ],
      deliverablesTitle: 'Ukázkové výstupy',
      deliverables: [
        'Briefing deck pro decision-makery',
        'Policy framing memo',
        'Syntéza kulatého stolu s doporučeními',
      ],
      proofTitle: 'Jak pracujeme s důvěryhodností',
      proofBody:
        'Tuto práci stavíme jako vznikající instituci ve veřejném zájmu: evidence-aware, transparentní a výslovně oddělující veřejný výzkum, syntézu a implementační doporučení.',
      cta: 'Požádat o briefing',
    },
  },
};

const SectorPage: React.FC<SectorPageProps> = ({ lang, sector }) => {
  const c = content[lang][sector];

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 space-y-12 md:space-y-20">
      <section className="space-y-6 text-center">
        <span className="inline-flex px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-[10px] font-black uppercase tracking-[0.25em]">
          {c.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-stone-900 font-serif font-black tracking-tighter">
          {c.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed font-normal max-w-3xl mx-auto">
          {c.subtitle}
        </p>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-8 md:p-10 space-y-4">
          <span className="font-handwritten text-2xl text-red-600">{c.problemTitle}</span>
          <p className="text-stone-600 text-base leading-relaxed">{c.problemBody}</p>
        </div>
        <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10 space-y-4 paper-texture relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
          <span className="relative z-10 font-handwritten text-2xl text-red-400">{c.promiseTitle}</span>
          <p className="relative z-10 text-stone-300 text-base leading-relaxed">{c.promiseBody}</p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 space-y-5">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.buyersTitle}</h2>
          <ul className="space-y-3">
            {c.buyers.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600">
                <span className="text-red-600 font-black text-sm mt-0.5">01</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 space-y-5">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.outcomesTitle}</h2>
          <ul className="space-y-3">
            {c.outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600">
                <span className="text-red-600 font-black text-sm mt-0.5">02</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 space-y-5">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.formatsTitle}</h2>
          <ul className="space-y-3">
            {c.formats.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600">
                <span className="text-red-600 font-black text-sm mt-0.5">03</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 space-y-5">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.deliverablesTitle}</h2>
          <ul className="space-y-3">
            {c.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600">
                <span className="text-red-600 font-black text-sm mt-0.5">04</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-stone-50 border border-stone-200 rounded-[2rem] p-8 md:p-10 space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.proofTitle}</h2>
        <p className="text-stone-600 leading-relaxed">{c.proofBody}</p>
      </section>

      <section className="text-center py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/join?segment=${sector}`}
            className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg hover:-translate-y-0.5 text-center"
          >
            {c.cta}
          </Link>
          <Link
            to="/assessment"
            className="w-full sm:w-auto px-10 py-4 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-bold uppercase tracking-widest hover:border-stone-900 transition-all text-center"
          >
            {lang === 'en' ? 'Try readiness assessment' : 'Vyzkoušet assessment'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SectorPage;
