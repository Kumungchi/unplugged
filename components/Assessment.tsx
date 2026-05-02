import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Language } from '../translations';

interface AssessmentProps {
  lang: Language;
}

type Segment = 'schools' | 'organizations' | 'government';
type AnswerKey = 'awareness' | 'usage' | 'policy' | 'literacy' | 'readiness';

const content = {
  en: {
    title: 'AI Boundary Readiness Assessment',
    subtitle:
      'A lightweight diagnostic for schools, organizations, and public institutions. This is an educational readiness tool, not a clinical or regulatory evaluation.',
    description:
      'Answer five short questions to get a practical readiness summary and the offer track that fits best.',
    scoreTitle: 'Your summary',
    scoreLow: 'Foundational stage',
    scoreMedium: 'Developing stage',
    scoreHigh: 'Active stage',
    cta: 'Request follow-up',
    save: 'Save my result',
    saved: 'Result saved.',
  },
  cs: {
    title: 'AI Boundary Readiness Assessment',
    subtitle:
      'Lehká diagnostika pro školy, organizace a veřejné instituce. Jde o vzdělávací nástroj připravenosti, ne o klinické nebo regulatorní hodnocení.',
    description:
      'Odpovězte na pět krátkých otázek a získejte praktické shrnutí připravenosti i doporučený typ spolupráce.',
    scoreTitle: 'Vaše shrnutí',
    scoreLow: 'Základní fáze',
    scoreMedium: 'Rozvíjející se fáze',
    scoreHigh: 'Aktivní fáze',
    cta: 'Požádat o navazující kontakt',
    save: 'Uložit výsledek',
    saved: 'Výsledek uložen.',
  },
};

const questions: Record<Language, { key: AnswerKey; prompt: string }[]> = {
  en: [
    { key: 'awareness', prompt: 'How clearly does your institution define emotionally significant AI risks?' },
    { key: 'usage', prompt: 'How visible is real-world conversational AI use in your setting?' },
    { key: 'policy', prompt: 'How mature are your current AI norms or policies?' },
    { key: 'literacy', prompt: 'How prepared are your people to discuss AI boundaries well?' },
    { key: 'readiness', prompt: 'How ready are you to act on this in the next 90 days?' },
  ],
  cs: [
    { key: 'awareness', prompt: 'Jak jasně vaše instituce definuje rizika emocionálně významného používání AI?' },
    { key: 'usage', prompt: 'Jak viditelné je ve vašem prostředí reálné používání konverzační AI?' },
    { key: 'policy', prompt: 'Jak vyspělé jsou vaše současné normy nebo policy pro AI?' },
    { key: 'literacy', prompt: 'Jak připravení jsou vaši lidé vést dobré rozhovory o hranicích s AI?' },
    { key: 'readiness', prompt: 'Jak připravení jste na to v příštích 90 dnech skutečně reagovat?' },
  ],
};

const segmentLabels: Record<Language, Record<Segment, string>> = {
  en: {
    schools: 'Schools',
    organizations: 'Organizations',
    government: 'Government',
  },
  cs: {
    schools: 'Školy',
    organizations: 'Organizace',
    government: 'Veřejný sektor',
  },
};

const answerOptions = [1, 2, 3, 4, 5];

const Assessment: React.FC<AssessmentProps> = ({ lang }) => {
  const c = content[lang];
  const [segment, setSegment] = useState<Segment>('schools');
  const [answers, setAnswers] = useState<Record<AnswerKey, number>>({
    awareness: 3,
    usage: 3,
    policy: 3,
    literacy: 3,
    readiness: 3,
  });
  const [saved, setSaved] = useState(false);
  const recordAssessment = useMutation(api.submissions.recordAssessment);

  const total = useMemo(() => Object.values(answers).reduce((sum, value) => sum + value, 0), [answers]);

  const stage = total <= 10 ? c.scoreLow : total <= 18 ? c.scoreMedium : c.scoreHigh;

  const recommendedOffer = useMemo(() => {
    if (segment === 'schools') {
      return lang === 'en' ? 'Pilot workshop + staff briefing' : 'Pilotní workshop + briefing pro pedagogy';
    }
    if (segment === 'organizations') {
      return lang === 'en' ? 'Discovery call + policy workshop' : 'Discovery call + policy workshop';
    }
    return lang === 'en' ? 'Expert briefing + advisory memo' : 'Expertní briefing + advisory memo';
  }, [segment, lang]);

  const summary = useMemo(() => {
    if (segment === 'schools') {
      return lang === 'en'
        ? 'Your school likely needs a shared language for student use, staff response, and parent communication.'
        : 'Vaše škola pravděpodobně potřebuje společný jazyk pro používání AI studenty, reakci pedagogů i komunikaci s rodiči.';
    }
    if (segment === 'organizations') {
      return lang === 'en'
        ? 'Your organization likely needs clearer AI norms, better employee framing, and a practical policy conversation.'
        : 'Vaše organizace pravděpodobně potřebuje jasnější normy používání AI, lepší rámování pro zaměstnance a praktický policy rozhovor.';
    }
    return lang === 'en'
      ? 'Your institution likely needs sharper public-interest framing, practical response options, and briefing-ready language.'
      : 'Vaše instituce pravděpodobně potřebuje přesnější public-interest rámování, praktické možnosti reakce a jazyk připravený pro briefing.';
  }, [segment, lang]);

  const handleSave = async () => {
    await recordAssessment({
      segment,
      answers,
      score: total,
      recommendedOffer,
    });
    setSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 space-y-10 md:space-y-16">
      <section className="text-center space-y-5">
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-stone-900 font-serif font-black tracking-tighter leading-[1.05]">
          {c.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
          {c.subtitle}
        </p>
        <p className="text-sm text-stone-500 max-w-2xl mx-auto">{c.description}</p>
      </section>

      <section className="grid lg:grid-cols-[1.4fr,0.9fr] gap-6 md:gap-8">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 md:p-10 space-y-8">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {(['schools', 'organizations', 'government'] as Segment[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSegment(value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                    segment === value
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {segmentLabels[lang][value]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {questions[lang].map((question) => (
              <div key={question.key} className="space-y-3">
                <p className="text-stone-900 font-medium leading-relaxed">{question.prompt}</p>
                <div className="flex flex-wrap gap-2">
                  {answerOptions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.key]: value }))}
                      className={`w-11 h-11 rounded-full border text-sm font-bold transition-all ${
                        answers[question.key] === value
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10 paper-texture relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{c.scoreTitle}</p>
            <h2 className="text-4xl font-serif italic font-bold">{stage}</h2>
          </div>
          <div className="relative z-10 space-y-4">
            <p className="text-stone-300 leading-relaxed">{summary}</p>
            <div className="border-t border-stone-700 pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-500">
                {lang === 'en' ? 'Recommended next step' : 'Doporučený další krok'}
              </p>
              <p className="text-white font-medium mt-2">{recommendedOffer}</p>
            </div>
          </div>
          <div className="relative z-10 space-y-3">
            <button
              type="button"
              onClick={handleSave}
              className="w-full px-6 py-3 bg-white text-stone-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              {saved ? c.saved : c.save}
            </button>
            <Link
              to={`/join?segment=${segment}`}
              className="block w-full px-6 py-3 border border-stone-700 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors text-center"
            >
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assessment;
