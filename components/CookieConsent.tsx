import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Language, translations } from '../translations';
import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_SETTINGS_EVENT,
  getStoredCookieConsent,
  hasPrivacyOptOutSignal,
  setStoredCookieConsent,
} from '../privacy';

interface CookieConsentProps {
  lang: Language;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const t = translations[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasPrivacyOptOutSignal()) {
      if (!getStoredCookieConsent()) {
        setStoredCookieConsent('declined');
      }
      setVisible(false);
      return;
    }

    const consent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const openSettings = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const handleAccept = () => {
    setStoredCookieConsent('accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    setStoredCookieConsent('declined');
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
            <p className="text-sm font-light leading-relaxed text-stone-300">
              {t.cookie_message}{' '}
              <Link to="/privacy" className="underline text-stone-100 hover:text-white">
                {t.cookie_privacy}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="px-5 py-3 bg-white text-stone-900 rounded-full text-sm font-bold hover:bg-stone-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t.cookie_decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-3 bg-white text-stone-900 rounded-full text-sm font-bold hover:bg-stone-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t.cookie_accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
