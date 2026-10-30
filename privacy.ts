export const COOKIE_CONSENT_STORAGE_KEY = 'unplugged_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'unplugged-cookie-consent-changed';
export const COOKIE_SETTINGS_EVENT = 'unplugged-cookie-settings-open';
export const DEMO_SESSION_STORAGE_KEY = 'unplugged_demo_session_id';

export type CookieConsentValue = 'accepted' | 'declined';

const isAffirmativeDoNotTrack = (value: unknown) => value === '1' || value === 'yes';

export const hasPrivacyOptOutSignal = (): boolean => {
  if (typeof window === 'undefined') return false;

  const nav = window.navigator as Navigator & {
    msDoNotTrack?: string;
    globalPrivacyControl?: boolean;
  };
  const browserSignals = [
    nav.doNotTrack,
    window.doNotTrack,
    nav.msDoNotTrack,
  ];

  if (browserSignals.some(isAffirmativeDoNotTrack)) {
    return true;
  }

  return nav.globalPrivacyControl === true;
};

export const getStoredCookieConsent = (): CookieConsentValue | null => {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
};

export const setStoredCookieConsent = (value: CookieConsentValue) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  if (value === 'declined') window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
};

export const shouldEnableAnalytics = (): boolean =>
  getStoredCookieConsent() === 'accepted' && !hasPrivacyOptOutSignal();
