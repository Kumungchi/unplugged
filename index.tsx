import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import { languageFromPathname, localizedPath } from './routing.mjs';
import { isClerkConfigured } from './auth';
import {
  COOKIE_CONSENT_EVENT,
  hasPrivacyOptOutSignal,
  shouldEnableAnalytics,
} from './privacy';
import './styles/global.css';

const StaffProviders = React.lazy(() => import('./components/StaffProviders'));
const STAFF_PATH = /^\/(admin(\/|$)|facilitator$|staff-access$)/;

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const lang = languageFromPathname(window.location.pathname);
const basename = lang === 'en' ? '/en' : '/';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const AnalyticsGate: React.FC = () => {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const sync = () => {
      if (hasPrivacyOptOutSignal()) {
        setEnabled(false);
        return;
      }
      setEnabled(shouldEnableAnalytics());
    };

    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!enabled) return null;
  return <Analytics />;
};

const root = ReactDOM.createRoot(rootElement);
const app = (
  <BrowserRouter basename={basename}>
    <App lang={lang} />
  </BrowserRouter>
);
const staffPath = window.location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
const isStaffRoute = isClerkConfigured && STAFF_PATH.test(staffPath);

root.render(
  <React.StrictMode>
    {isStaffRoute ? (
      <React.Suspense fallback={null}>
        <StaffProviders client={convex} afterSignOutUrl={localizedPath('/', lang)}>
          {app}
        </StaffProviders>
      </React.Suspense>
    ) : (
      <ConvexProvider client={convex}>{app}</ConvexProvider>
    )}
    <AnalyticsGate />
  </React.StrictMode>
);
