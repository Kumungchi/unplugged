import React, { useState } from 'react';
import { Link } from 'react-router';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Language, translations } from '../translations';

interface JoinFormProps {
  lang: Language;
}

const JoinForm: React.FC<JoinFormProps> = ({ lang }) => {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const createSubmission = useMutation(api.submissions.create);
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    role: '',
    interests: [] as string[],
    message: '',
    whatCanYouDo: '',
    whyJoin: '',
    consent: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleInterest = (value: string) =>
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.name.trim() || !form.email.trim() || !form.role) return;
    setSubmitting(true);
    try {
      await createSubmission({
        name: form.name,
        email: form.email,
        org: form.org || undefined,
        role: form.role,
        interests: form.interests,
        message: form.message || undefined,
        whatCanYouDo: form.whatCanYouDo || undefined,
        whyJoin: form.whyJoin || undefined,
      });
      setSubmitted(true);
    } catch {
      // Fallback to mailto if Convex fails
      const subject = encodeURIComponent('Unplugged — Get Involved');
      const interestLabels = form.interests.join(', ') || 'N/A';
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org || 'N/A'}\nRole: ${form.role}\nInterests: ${interestLabels}\n\nWhy Join:\n${form.whyJoin || 'N/A'}\n\nWhat can you do:\n${form.whatCanYouDo || 'N/A'}\n\nMessage:\n${form.message || 'N/A'}`
      );
      window.open(`mailto:info@unplugged.cz?subject=${subject}&body=${body}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const roles = [
    { value: 'student', label: t.join_form_role_student },
    { value: 'teacher', label: t.join_form_role_teacher },
    { value: 'admin', label: t.join_form_role_admin },
    { value: 'org', label: t.join_form_role_org },
    { value: 'researcher', label: t.join_form_role_researcher },
    { value: 'volunteer', label: t.join_form_role_volunteer },
    { value: 'other', label: t.join_form_role_other },
  ];

  const interests = [
    { value: 'volunteer', label: t.join_form_interest_volunteer },
    { value: 'ideas', label: t.join_form_interest_ideas },
    { value: 'spread', label: t.join_form_interest_spread },
    { value: 'partner', label: t.join_form_interest_partner },
    { value: 'donate', label: t.join_form_interest_donate },
  ];

  const whoItems = [
    t.join_who_students,
    t.join_who_teachers,
    t.join_who_schools,
    t.join_who_orgs,
    t.join_who_ideas,
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center space-y-6 fade-in">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-serif italic text-stone-900 font-black">{t.join_form_success_title}</h2>
        <p className="text-stone-500 font-light text-lg">{t.join_form_success_desc}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 space-y-12 md:space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-stone-900 font-black tracking-tighter">
          {t.join_title}
        </h1>
        <p className="text-stone-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
          {t.join_sub}
        </p>
      </section>

      {/* How you can help */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">{t.join_who_title}</h2>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {whoItems.map((item, i) => (
            <div key={i} className={`p-4 md:p-6 bg-white rounded-2xl border border-stone-200 flex items-start space-x-3 md:space-x-4 ${
              i === whoItems.length - 1 && whoItems.length % 2 !== 0 ? 'sm:col-span-2' : ''
            }`}>
              <span className="text-red-600 font-black text-sm mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-stone-600 text-sm font-light leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder={t.join_form_name}
            aria-label={t.join_form_name}
            required
            className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={t.join_form_email}
            aria-label={t.join_form_email}
            required
            className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
          />
          <input
            type="text"
            value={form.org}
            onChange={(e) => update('org', e.target.value)}
            placeholder={t.join_form_org}
            aria-label={t.join_form_org}
            className="w-full bg-white rounded-full px-6 py-3.5 text-base md:text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
          />

          {/* Role select */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 pl-2">
              {t.join_form_role}
            </label>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => update('role', r.value)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    form.role === r.value
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interest multi-select */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 pl-2">
              {t.join_form_interest}
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleInterest(item.value)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    form.interests.includes(item.value)
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={form.whatCanYouDo}
            onChange={(e) => update('whatCanYouDo', e.target.value)}
            placeholder={t.join_form_what_can}
            aria-label={t.join_form_what_can}
            rows={3}
            className="w-full bg-white rounded-[2rem] px-6 py-4 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
          />
          <textarea
            value={form.whyJoin}
            onChange={(e) => update('whyJoin', e.target.value)}
            placeholder={t.join_form_why_join}
            aria-label={t.join_form_why_join}
            rows={3}
            className="w-full bg-white rounded-[2rem] px-6 py-4 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
          />
          <textarea
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={t.join_form_message}
            aria-label={t.join_form_message}
            rows={4}
            className="w-full bg-white rounded-[2rem] px-6 py-4 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
          />

          {/* Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              required
              className="mt-1 w-4 h-4 rounded border-stone-300 accent-stone-900"
            />
            <span className="text-xs text-stone-500 font-light leading-relaxed">
              {t.join_form_consent}{' '}
              <Link to="/privacy" className="underline hover:text-stone-900">
                {t.join_form_privacy_link}
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={!form.consent || !form.name || !form.email || !form.role || submitting}
            className="w-full py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? '...' : t.join_form_submit}
          </button>
        </form>
      </section>
    </div>
  );
};

export default JoinForm;
