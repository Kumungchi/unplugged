import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth } from '@clerk/react';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import { isClerkConfigured } from './auth';
import {
  COOKIE_CONSENT_EVENT,
  hasPrivacyOptOutSignal,
  shouldEnableAnalytics,
} from './privacy';
import './styles/global.css';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

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
root.render(
  <React.StrictMode>
    {isClerkConfigured ? (
      <ClerkProvider afterSignOutUrl="/">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    ) : (
      <ConvexProvider client={convex}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConvexProvider>
    )}
    <AnalyticsGate />
  </React.StrictMode>
);
