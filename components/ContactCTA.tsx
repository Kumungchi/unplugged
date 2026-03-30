import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Language, translations } from '../translations';

interface ContactCTAProps {
  lang: Language;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ lang }) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const createContact = useMutation(api.contacts.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await createContact({
        email,
        message: message || undefined,
      });
      setSubmitted(true);
    } catch {
      // Fallback to mailto if Convex fails
      const subject = encodeURIComponent('Unplugged — School Workshop Interest');
      const body = encodeURIComponent(`Email: ${email}\n\n${message}`);
      window.open(`mailto:info@unplugged.cz?subject=${subject}&body=${body}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-4 py-12">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-stone-700 font-serif italic text-xl">{t.cta_success}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center space-y-6">
      <h3 className="text-3xl font-serif italic text-stone-900 font-bold">{t.cta_title}</h3>
      <p className="text-stone-500 font-light">{t.cta_desc}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.cta_email_placeholder}
          aria-label={t.cta_email_placeholder}
          required
          className="w-full bg-white rounded-full px-6 py-3 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.cta_message_placeholder}
          aria-label={t.cta_message_placeholder}
          rows={3}
          className="w-full bg-white rounded-2xl px-6 py-3 text-sm outline-none border border-stone-200 focus:ring-1 ring-stone-400 resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-50"
        >
          {submitting ? '...' : t.cta_btn}
        </button>
      </form>
    </div>
  );
};

export default ContactCTA;
