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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto bg-stone-900 text-white rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 shadow-2xl">
        <div className="flex-grow">
          <div>
            <p className="text-xs sm:text-sm font-light leading-snug text-stone-300">
              {t.cookie_message}{' '}
              <Link to="/privacy" className="underline text-stone-100 hover:text-white">
                {t.cookie_privacy}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 justify-end shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2.5 bg-white text-stone-900 rounded-full text-sm font-bold hover:bg-stone-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t.cookie_decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2.5 bg-white text-stone-900 rounded-full text-sm font-bold hover:bg-stone-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t.cookie_accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
