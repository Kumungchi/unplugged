import React from 'react';
import { Link } from 'react-router';
import { Language } from '../translations';

interface AboutProps {
  lang: Language;
}

const content = {
  en: {
    title: 'A public-interest initiative in formation.',
    subtitle:
      'Unplugged exists to help institutions respond to emotionally significant AI use with more clarity, better language, and healthier human boundaries.',
    credibilityTitle: 'How we describe ourselves',
    credibilityBody:
      'We do not present ourselves as a mature research institute. We are building an initiative at the intersection of AI literacy, psychology, education, and implementation guidance. Our public materials distinguish between public research, our synthesis, and practical recommendations.',
    whatTitle: 'What we are building',
    whatItems: [
      'Educational workshops for schools and organizations',
      'Briefings and advisory material for public institutions',
      'Practical tools that help people assess AI boundary readiness',
    ],
    principlesTitle: 'Operating principles',
    principles: [
      'AI is a tool, not a relationship',
      'Healthy AI use is a real skill',
      'Education before panic',
      'Public-interest framing over hype',
    ],
    currentTitle: 'Current stage',
    currentBody:
      'Unplugged is in an institution-building phase. We are developing offers, educational assets, and partnership pathways while tightening our evidence standards and public positioning.',
    cta: 'Contact Unplugged',
  },
  cs: {
    title: 'Vznikající iniciativa ve veřejném zájmu.',
    subtitle:
      'Unplugged pomáhá institucím reagovat na emocionálně významné používání AI s větší srozumitelností, lepším jazykem a zdravějšími lidskými hranicemi.',
    credibilityTitle: 'Jak o sobě mluvíme',
    credibilityBody:
      'Neprezentujeme se jako hotový výzkumný institut. Budujeme iniciativu na pomezí AI gramotnosti, psychologie, vzdělávání a implementační podpory. Ve veřejných materiálech rozlišujeme mezi veřejným výzkumem, naší syntézou a praktickými doporučeními.',
    whatTitle: 'Co budujeme',
    whatItems: [
      'Vzdělávací workshopy pro školy a organizace',
      'Briefingy a advisory materiály pro veřejné instituce',
      'Praktické nástroje pro posouzení připravenosti na hranice s AI',
    ],
    principlesTitle: 'Principy, podle kterých fungujeme',
    principles: [
      'AI je nástroj, ne vztah',
      'Zdravé používání AI je skutečná dovednost',
      'Vzdělávání před panikou',
      'Veřejný zájem před hype',
    ],
    currentTitle: 'Současná fáze',
    currentBody:
      'Unplugged je ve fázi budování instituce. Rozvíjíme nabídku, vzdělávací aktiva i partnerské cesty a zároveň zpřesňujeme práci s důkazy i veřejným positioningem.',
    cta: 'Kontaktovat Unplugged',
  },
};

const About: React.FC<AboutProps> = ({ lang }) => {
  const c = content[lang];

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 space-y-12 md:space-y-20">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-stone-900 font-serif font-black tracking-tighter leading-[1.05]">
          {c.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
          {c.subtitle}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-8 md:p-10 space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.credibilityTitle}</h2>
          <p className="text-stone-600 leading-relaxed">{c.credibilityBody}</p>
        </div>
        <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10 paper-texture relative overflow-hidden space-y-4">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
          <h2 className="relative z-10 text-2xl font-serif italic font-bold text-white">{c.currentTitle}</h2>
          <p className="relative z-10 text-stone-300 leading-relaxed">{c.currentBody}</p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 space-y-5">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.whatTitle}</h2>
          <ul className="space-y-3">
            {c.whatItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600">
                <span className="text-red-600 font-black text-sm mt-0.5">01</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 space-y-5">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{c.principlesTitle}</h2>
          <ul className="space-y-3">
            {c.principles.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600">
                <span className="text-red-600 font-black text-sm mt-0.5">02</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="text-center">
        <Link
          to="/join"
          className="inline-block px-10 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg hover:-translate-y-0.5"
        >
          {c.cta}
        </Link>
      </section>
    </div>
  );
};

export default About;
