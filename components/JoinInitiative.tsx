import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Language } from '../translations';

interface JoinInitiativeProps {
  lang: Language;
}

type Interest =
  | 'volunteer'
  | 'expert'
  | 'facilitator'
  | 'researcher'
  | 'advisor'
  | 'future_hire'
  | 'partner';

type FormState = {
  interest: Interest;
  contactName: string;
  email: string;
  organizationName: string;
  role: string;
  focus: string;
  availability: string;
  message: string;
  consent: boolean;
};

const content = {
  en: {
    title: 'Join the Initiative',
    subtitle:
      'Unplugged is not only building paid institutional work. We are also building the people, expertise, and execution capacity behind it.',
    sectionTitle: 'Where you might fit',
    submit: 'Join the initiative',
    successTitle: 'Interest received.',
    successDesc: 'We will review your background and follow up with the most relevant next step.',
    consent: 'I agree to the processing of personal data in line with the',
    privacy: 'Privacy Policy',
    fields: {
      contactName: 'Full name',
      email: 'Email address',
      organizationName: 'Organization or affiliation (optional)',
      role: 'Current role or expertise',
      focus: 'How could you contribute?',
      availability: 'Availability or preferred involvement',
      message: 'Anything else we should know?',
    },
    interests: {
      volunteer: 'Volunteer',
      expert: 'Subject-matter expert',
      facilitator: 'Workshop facilitator',
      researcher: 'Researcher or writer',
      advisor: 'Advisor',
      future_hire: 'Future employee',
      partner: 'Partner organization',
    },
    hints: {
      volunteer: 'Operations help, outreach, event support, content support, coordination',
      expert: 'Psychology, education, AI safety, digital wellbeing, policy, governance',
      facilitator: 'Workshop delivery, school sessions, team training, moderated discussion',
      researcher: 'Research synthesis, writing, source review, editorial development',
      advisor: 'Strategic advice, network access, credibility building, institutional guidance',
      future_hire: 'You want to stay close as the initiative grows into funded roles',
      partner: 'You represent an organization that wants to support, co-host, or collaborate',
    },
    needsNow: [
      'Psychologists and mental health experts',
      'Teachers, counselors, and prevention specialists',
      'Policy and governance contributors',
      'Workshop facilitators and educators',
      'Researchers, writers, and editors',
      'Future operators who can help turn the mission into a real institution',
    ],
  },
  cs: {
    title: 'Přidejte se k iniciativě',
    subtitle:
      'Unplugged nestaví jen placenou institucionální práci. Budujeme také lidi, expertizu a realizační kapacitu, která za tím musí stát.',
    sectionTitle: 'Kde se můžete zapojit',
    submit: 'Přidat se k iniciativě',
    successTitle: 'Zájem zaznamenán.',
    successDesc: 'Projdeme vaše zaměření a ozveme se s nejrelevantnějším dalším krokem.',
    consent: 'Souhlasím se zpracováním osobních údajů v souladu se',
    privacy: 'Zásadami ochrany osobních údajů',
    fields: {
      contactName: 'Celé jméno',
      email: 'Emailová adresa',
      organizationName: 'Organizace nebo afiliace (nepovinné)',
      role: 'Současná role nebo expertiza',
      focus: 'Jak byste mohli přispět?',
      availability: 'Kapacita nebo preferovaná forma zapojení',
      message: 'Ještě něco, co bychom měli vědět?',
    },
    interests: {
      volunteer: 'Dobrovolník/ce',
      expert: 'Odborník/ce',
      facilitator: 'Facilitátor/ka workshopů',
      researcher: 'Výzkumník/ce nebo writer',
      advisor: 'Advisor',
      future_hire: 'Budoucí zaměstnanec/kyně',
      partner: 'Partnerská organizace',
    },
    hints: {
      volunteer: 'Operativa, outreach, podpora akcí, obsahová výpomoc, koordinace',
      expert: 'Psychologie, vzdělávání, AI safety, digitální wellbeing, policy, governance',
      facilitator: 'Vedení workshopů, školní workshopy, tréninky týmů, moderace diskusí',
      researcher: 'Syntéza výzkumu, psaní, review zdrojů, editorial development',
      advisor: 'Strategické vedení, přístup k síti, budování credibility, institucionální guidance',
      future_hire: 'Chcete zůstat blízko, jak se iniciativa rozroste do financovaných rolí',
      partner: 'Zastupujete organizaci, která chce pomoci, spolupořádat nebo spolupracovat',
    },
    needsNow: [
      'Psychologové a odborníci na duševní zdraví',
      'Učitelé, poradci a metodici prevence',
      'Contributors z policy a governance prostředí',
      'Facilitátoři workshopů a vzdělavatelé',
      'Výzkumníci, writeři a editoři',
      'Budoucí operátoři, kteří pomohou proměnit misi ve skutečnou instituci',
    ],
  },
};

const JoinInitiative: React.FC<JoinInitiativeProps> = ({ lang }) => {
  const c = content[lang];
  const createLead = useMutation(api.submissions.create);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    interest: 'volunteer',
    contactName: '',
    email: '',
    organizationName: '',
    role: '',
    focus: '',
    availability: '',
    message: '',
    consent: false,
  });

  const hint = useMemo(() => c.hints[form.interest], [c.hints, form.interest]);

  const update = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value as never }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.contactName.trim() || !form.email.trim()) return;
    setSubmitting(true);
    try {
      await createLead({
        segment: 'initiative',
        intent: form.interest,
        organizationName: form.organizationName || undefined,
        organizationType: undefined,
        contactName: form.contactName,
        email: form.email,
        role: form.role || undefined,
        teamSizeOrInstitutionSize: undefined,
        need: form.focus || undefined,
        urgency: form.availability || undefined,
        message: form.message || undefined,
        sourcePage: '/initiative',
        consent: form.consent,
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const interests = Object.entries(c.interests) as [Interest, string][];

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
          <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10 paper-texture relative overflow-hidden space-y-5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
            <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{c.sectionTitle}</p>
            <div className="relative z-10 flex flex-wrap gap-2">
              {interests.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update('interest', value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    form.interest === value
                      ? 'bg-white text-stone-900'
                      : 'bg-white/10 text-stone-300 hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="relative z-10 text-stone-300 leading-relaxed">{hint}</p>
            <div className="relative z-10 border-t border-stone-700 pt-4 space-y-3">
              <p className="text-sm text-stone-300">{lang === 'en' ? 'Who we actively want now:' : 'Koho chceme aktivně zapojit už teď:'}</p>
              <ul className="space-y-2">
                {c.needsNow.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-300 text-sm">
                    <span className="text-red-400 font-black text-[10px] mt-0.5">01</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
            <input
              type="text"
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              placeholder={c.fields.role}
              className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
            />
            <textarea
              value={form.focus}
              onChange={(e) => update('focus', e.target.value)}
              placeholder={c.fields.focus}
              rows={3}
              className="w-full bg-white rounded-[2rem] px-6 py-4 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
            />
            <textarea
              value={form.availability}
              onChange={(e) => update('availability', e.target.value)}
              placeholder={c.fields.availability}
              rows={2}
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

export default JoinInitiative;
