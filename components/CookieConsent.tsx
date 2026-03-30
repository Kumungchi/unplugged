import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';

interface CookieConsentProps {
  lang: Language;
}

const STORAGE_KEY = 'unplugged_cookie_consent';

const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const t = translations[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-stone-900 text-white rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-2 flex-grow">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-600/20 text-green-400 text-[9px] font-black uppercase tracking-widest rounded-full">
                {t.cookie_essential_label}
              </span>
            </div>
            <p className="text-sm font-light leading-relaxed text-stone-300">
              {t.cookie_message}{' '}
              <Link to="/privacy" className="underline text-stone-100 hover:text-white">
                {t.cookie_privacy}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="px-5 py-2 text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            {t.cookie_decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-white text-stone-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
          >
            {t.cookie_accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
