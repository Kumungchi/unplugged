import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Language, translations } from '../translations';

interface NewsletterProps {
  lang: Language;
}

const BEEHIIV_SUBSCRIBE_URL = 'https://magic.beehiiv.com/v1/b5370fa1-6bac-4b86-bf45-f3c12022d264';

const Newsletter: React.FC<NewsletterProps> = ({ lang }) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [prefLang, setPrefLang] = useState<Language>(lang);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const subscribe = useMutation(api.newsletter.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    // 1. Save to Convex database so you have a backup of the email
    try {
      await subscribe({ email, lang: prefLang });
    } catch {
      // Non-blocking
    }

    // 2. Redirect to Beehiiv's Magic Link to officially subscribe them and trigger the Automation Email
    window.location.href = `${BEEHIIV_SUBSCRIBE_URL}?email=${encodeURIComponent(email)}`;
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4 fade-in">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif italic text-stone-900 font-bold">{t.newsletter_success_title}</h3>
        <p className="text-stone-500 font-light">{t.newsletter_success_desc}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-stone-900 rounded-3xl md:rounded-[3rem] p-10 md:p-16 text-center space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">Newsletter</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-serif italic text-white font-bold leading-tight">
            {t.newsletter_title}
          </h3>
          <p className="text-stone-300 font-normal text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {t.newsletter_desc}
          </p>
        </div>

        {/* What you get */}
        <div className="flex flex-wrap justify-center gap-3">
          {[t.newsletter_what_1, t.newsletter_what_2, t.newsletter_what_3].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-stone-300">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {item}
            </span>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          {/* Language preference */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              {t.newsletter_lang_label}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setPrefLang('cs')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  prefLang === 'cs'
                    ? 'bg-white text-stone-900'
                    : 'bg-white/10 text-stone-400 hover:bg-white/20'
                }`}
              >
                {t.newsletter_lang_cs}
              </button>
              <button
                type="button"
                onClick={() => setPrefLang('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  prefLang === 'en'
                    ? 'bg-white text-stone-900'
                    : 'bg-white/10 text-stone-400 hover:bg-white/20'
                }`}
              >
                {t.newsletter_lang_en}
              </button>
            </div>
          </div>

          {/* Email + submit */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter_placeholder}
              required
              disabled={status === 'loading'}
              className="flex-grow bg-white/10 border border-white/10 rounded-full px-5 py-3.5 text-sm text-white placeholder-stone-500 outline-none focus:border-white/30 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500 transition-colors shrink-0 disabled:opacity-50 shadow-lg shadow-red-600/20"
            >
              {status === 'loading' ? '...' : t.newsletter_btn}
            </button>
          </div>

          <p className="text-[10px] text-stone-500 font-light tracking-wide">
            {t.newsletter_free}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
