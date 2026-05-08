import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Language } from '../translations';

interface JoinFormProps {
  lang: Language;
}

type Segment = 'schools' | 'organizations' | 'government' | 'partnership' | 'media';

type FormState = {
  segment: Segment;
  contactName: string;
  email: string;
  organizationName: string;
  organizationType: string;
  role: string;
  teamSizeOrInstitutionSize: string;
  need: string;
  urgency: string;
  message: string;
  consent: boolean;
};

type Attribution = {
  source?: string;
  scenario?: string;
  audience?: string;
  outcome?: string;
};

const content = {
  en: {
    title: 'Contact Unplugged',
    subtitle:
      'Choose the path that fits your institution. We use one shared trust platform and route inquiries into school, organizational, and public-sector offers.',
    segmentTitle: 'What kind of inquiry is this?',
    submit: 'Send inquiry',
    successTitle: 'Inquiry received.',
    successDesc: 'We will review your request and respond with the right next step.',
    consent: 'I agree to the processing of personal data in line with the',
    privacy: 'Privacy Policy',
    fields: {
      contactName: 'Full name',
      email: 'Email address',
      organizationName: 'Institution / organization',
      organizationType: 'Institution type',
      role: 'Your role',
      teamSizeOrInstitutionSize: 'Approximate size',
      need: 'What do you need?',
      urgency: 'Timeline / urgency',
      message: 'Context or notes',
    },
    segments: {
      schools: 'School inquiry',
      organizations: 'Organization inquiry',
      government: 'Government inquiry',
      partnership: 'Partnership',
      media: 'Media',
    },
    hints: {
      schools: 'Pilot workshop, staff briefing, policy starter pack, parent communication',
      organizations: 'Training, leadership briefing, responsible-use policy workshop',
      government: 'Briefing, advisory memo, roundtable, institutional framing',
      partnership: 'Collaboration, funding, ecosystem connection, co-hosting',
      media: 'Interview, commentary, speaker request, background context',
    },
  },
  cs: {
    title: 'Kontaktujte Unplugged',
    subtitle:
      'Vyberte cestu, která odpovídá vaší instituci. Používáme jednu důvěryhodnou platformu a poptávky vedeme do školních, organizačních a veřejnosektorových nabídek.',
    segmentTitle: 'O jaký typ poptávky jde?',
    submit: 'Odeslat poptávku',
    successTitle: 'Poptávka přijata.',
    successDesc: 'Vaši zprávu projdeme a ozveme se s vhodným dalším krokem.',
    consent: 'Souhlasím se zpracováním osobních údajů v souladu se',
    privacy: 'Zásadami ochrany osobních údajů',
    fields: {
      contactName: 'Celé jméno',
      email: 'Emailová adresa',
      organizationName: 'Instituce / organizace',
      organizationType: 'Typ instituce',
      role: 'Vaše role',
      teamSizeOrInstitutionSize: 'Přibližná velikost',
      need: 'Co potřebujete?',
      urgency: 'Časový rámec / urgence',
      message: 'Kontext nebo poznámky',
    },
    segments: {
      schools: 'Poptávka ze školy',
      organizations: 'Poptávka z organizace',
      government: 'Poptávka z veřejného sektoru',
      partnership: 'Partnerství',
      media: 'Média',
    },
    hints: {
      schools: 'Pilotní workshop, briefing pro pedagogy, policy starter pack, komunikace s rodiči',
      organizations: 'Školení, briefing pro vedení, workshop k responsible-use policy',
      government: 'Briefing, advisory memo, kulatý stůl, institucionální rámování',
      partnership: 'Spolupráce, financování, propojení ekosystému, co-hosting',
      media: 'Rozhovor, komentář, speaker request, background kontext',
    },
  },
};

const segmentFromSearch = (value: string | null): Segment => {
  if (value === 'schools' || value === 'organizations' || value === 'government' || value === 'partnership' || value === 'media') {
    return value;
  }
  return 'schools';
};

const JoinForm: React.FC<JoinFormProps> = ({ lang }) => {
  const [searchParams] = useSearchParams();
  const initialSegment = segmentFromSearch(searchParams.get('segment'));
  const c = content[lang];
  const createLead = useMutation(api.submissions.create);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    segment: initialSegment,
    contactName: '',
    email: '',
    organizationName: '',
    organizationType: '',
    role: '',
    teamSizeOrInstitutionSize: '',
    need: '',
    urgency: '',
    message: '',
    consent: false,
  });

  const segmentHint = useMemo(() => c.hints[form.segment], [c.hints, form.segment]);
  const attribution = useMemo<Attribution>(() => ({
    source: searchParams.get('source') ?? undefined,
    scenario: searchParams.get('scenario') ?? undefined,
    audience: searchParams.get('audience') ?? undefined,
    outcome: searchParams.get('outcome') ?? undefined,
  }), [searchParams]);
  const sourcePage = useMemo(() => {
    const params = new URLSearchParams();
    const source = searchParams.get('source');
    const scenario = searchParams.get('scenario');
    const audience = searchParams.get('audience');
    const outcome = searchParams.get('outcome');

    if (source) params.set('source', source);
    if (scenario) params.set('scenario', scenario);
    if (audience) params.set('audience', audience);
    if (outcome) params.set('outcome', outcome);

    const suffix = params.toString();
    return suffix ? `/join?${suffix}` : '/join';
  }, [searchParams]);

  const update = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value as never }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.contactName.trim() || !form.email.trim()) return;
    setSubmitting(true);
    try {
      await createLead({
        segment: form.segment,
        intent: form.segment,
        organizationName: form.organizationName || undefined,
        organizationType: form.organizationType || undefined,
        contactName: form.contactName,
        email: form.email,
        role: form.role || undefined,
        teamSizeOrInstitutionSize: form.teamSizeOrInstitutionSize || undefined,
        need: form.need || undefined,
        urgency: form.urgency || undefined,
        message: form.message || undefined,
        sourcePage,
        attributionSource: attribution.source,
        attributionScenario: attribution.scenario,
        attributionAudience: attribution.audience,
        attributionOutcome: attribution.outcome,
        consent: form.consent,
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const segments = Object.entries(c.segments) as [Segment, string][];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center space-y-6 fade-in">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-serif italic text-stone-900 font-black">{c.successTitle}</h2>
        <p className="text-stone-500 font-light text-lg">{c.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 space-y-12 md:space-y-16">
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-stone-900 font-black tracking-tighter">
          {c.title}
        </h1>
        <p className="text-stone-500 font-light text-lg max-w-3xl mx-auto leading-relaxed">
          {c.subtitle}
        </p>
      </section>

      <section className="grid lg:grid-cols-[0.95fr,1.1fr] gap-6 md:gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10 paper-texture relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
            <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{c.segmentTitle}</p>
            <div className="relative z-10 flex flex-wrap gap-2">
              {segments.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update('segment', value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    form.segment === value
                      ? 'bg-white text-stone-900'
                      : 'bg-white/10 text-stone-300 hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="relative z-10 text-stone-300 leading-relaxed">{segmentHint}</p>
            <div className="relative z-10 border-t border-stone-700 pt-4 space-y-2 text-sm text-stone-300">
              <p>{lang === 'en' ? 'Suggested next pages:' : 'Doporučené další stránky:'}</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/schools" className="underline hover:text-white">{lang === 'en' ? 'Schools' : 'Školy'}</Link>
                <Link to="/organizations" className="underline hover:text-white">{lang === 'en' ? 'Organizations' : 'Organizace'}</Link>
                <Link to="/government" className="underline hover:text-white">{lang === 'en' ? 'Government' : 'Veřejný sektor'}</Link>
                <Link to="/assessment" className="underline hover:text-white">{lang === 'en' ? 'Assessment' : 'Assessment'}</Link>
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              placeholder={c.fields.contactName}
              required
              className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder={c.fields.email}
              required
              className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
            />
            <input
              type="text"
              value={form.organizationName}
              onChange={(e) => update('organizationName', e.target.value)}
              placeholder={c.fields.organizationName}
              className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={form.organizationType}
                onChange={(e) => update('organizationType', e.target.value)}
                placeholder={c.fields.organizationType}
                className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
              />
              <input
                type="text"
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                placeholder={c.fields.role}
                className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={form.teamSizeOrInstitutionSize}
                onChange={(e) => update('teamSizeOrInstitutionSize', e.target.value)}
                placeholder={c.fields.teamSizeOrInstitutionSize}
                className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
              />
              <input
                type="text"
                value={form.urgency}
                onChange={(e) => update('urgency', e.target.value)}
                placeholder={c.fields.urgency}
                className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
              />
            </div>
            <textarea
              value={form.need}
              onChange={(e) => update('need', e.target.value)}
              placeholder={c.fields.need}
              rows={3}
              className="w-full bg-white rounded-[2rem] px-6 py-4 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
            />
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder={c.fields.message}
              rows={4}
              className="w-full bg-white rounded-[2rem] px-6 py-4 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
            />

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-stone-300 accent-stone-900"
              />
              <span className="text-xs text-stone-500 font-light leading-relaxed">
                {c.consent}{' '}
                <Link to="/privacy" className="underline hover:text-stone-900">
                  {c.privacy}
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={!form.consent || !form.contactName || !form.email || submitting}
              className="w-full py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? '...' : c.submit}
            </button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default JoinForm;
