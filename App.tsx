import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import Landing from './components/Landing';
import Movement from './components/Movement';
import Boundaries from './components/Boundaries';
import Psychology from './components/Psychology';
import JoinForm from './components/JoinForm';
import JoinInitiative from './components/JoinInitiative';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import SectorPage from './components/SectorPage';
import About from './components/About';
import Assessment from './components/Assessment';
import ErrorBoundary from './components/ErrorBoundary';
import { Language, translations } from './translations';
import SEOHead from './components/SEOHead';
import CrisisSupport from './components/CrisisSupport';
import { COOKIE_SETTINGS_EVENT } from './privacy';
import SiteHeader from './components/SiteHeader';
import DemoPage from './components/DemoPage';

// Staff pages pull in Clerk; keep it out of the public bundle.
const DemoInsights = lazy(() => import('./components/DemoInsights'));
const Facilitator = lazy(() => import('./components/Facilitator'));
const SubmissionsOverview = lazy(() => import('./components/SubmissionsOverview'));
const StaffAccess = lazy(() => import('./components/StaffAccess'));
const ContentEditor = lazy(() => import('./components/ContentEditor'));
const StaffManager = lazy(() => import('./components/StaffManager'));

const App: React.FC<{ lang: Language }> = ({ lang }) => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let id = location.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        target.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.key]);

  const t = translations[lang];
  const labels = {
    schools: t.nav_schools, organizations: t.nav_organizations,
    government: t.nav_government, assessment: t.nav_assessment,
    about: t.nav_about, contact: t.nav_contact, initiative: t.nav_get_involved,
  };
  const mobileLabels = labels;

  return (
    <div className="min-h-screen flex flex-col max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
      <SiteHeader lang={lang} />

      <SEOHead lang={lang} />
      <main className="flex-grow pb-20 fade-in">
        <ErrorBoundary lang={lang} key={location.pathname}>
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Landing lang={lang} />} />
            <Route path="/schools" element={<SectorPage lang={lang} sector="schools" />} />
            <Route path="/organizations" element={<SectorPage lang={lang} sector="organizations" />} />
            <Route path="/government" element={<SectorPage lang={lang} sector="government" />} />
            <Route path="/assessment" element={<Assessment lang={lang} />} />
            <Route path="/admin/demo-insights" element={<DemoInsights lang={lang} />} />
            <Route path="/admin/submissions" element={<SubmissionsOverview lang={lang} />} />
            <Route path="/admin/content" element={<ContentEditor lang={lang} />} />
            <Route path="/admin/staff" element={<StaffManager lang={lang} />} />
            <Route path="/facilitator" element={<Facilitator lang={lang} />} />
            <Route path="/staff-access" element={<StaffAccess lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/initiative" element={<JoinInitiative lang={lang} />} />
            <Route path="/approach" element={<Movement lang={lang} />} />
            <Route path="/research" element={<Boundaries lang={lang} />} />
            <Route path="/demo" element={<DemoPage lang={lang} />} />
            <Route path="/psychology" element={<Psychology lang={lang} />} />
            <Route path="/join" element={<JoinForm lang={lang} />} />
            <Route path="/privacy" element={<PrivacyPolicy lang={lang} />} />
            <Route path="*" element={<NotFound lang={lang} />} />
          </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <footer className="py-8 md:py-12 border-t border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-[0.3em] text-center space-y-4">
        <CrisisSupport lang={lang} />
        <p>{t.footer_text}</p>
        <div className="flex flex-wrap justify-center gap-x-8">
          <Link to="/schools" className="hover:text-stone-900 inline-block py-1.5">{labels.schools}</Link>
          <Link to="/organizations" className="hover:text-stone-900 inline-block py-1.5">{labels.organizations}</Link>
          <Link to="/government" className="hover:text-stone-900 inline-block py-1.5">{mobileLabels.government}</Link>
          <Link to="/assessment" className="hover:text-stone-900 inline-block py-1.5">{labels.assessment}</Link>
          <Link to="/about" className="hover:text-stone-900 inline-block py-1.5">{mobileLabels.about}</Link>
          <Link to="/join" className="hover:text-stone-900 inline-block py-1.5">{labels.contact}</Link>
          <Link to="/initiative" className="hover:text-stone-900 inline-block py-1.5">{labels.initiative}</Link>
          <Link to="/privacy" className="hover:text-stone-900 inline-block py-1.5">{t.nav_privacy}</Link>
          <button type="button" onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))} className="hover:text-stone-900 underline underline-offset-4 py-1.5">{t.cookie_settings}</button>
        </div>
      </footer>

      <CookieConsent lang={lang} />
    </div>
  );
};

const NotFound: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <div className="text-center py-32 space-y-6">
      <h2 className="text-6xl font-serif italic text-stone-900 font-black">404</h2>
      <p className="text-stone-500 text-lg font-light italic">
        {lang === 'en' ? 'This page doesn\'t exist.' : 'Tato stránka neexistuje.'}
      </p>
      <Link to="/" className="inline-block px-8 py-3 bg-stone-900 text-white rounded-full font-medium">
        {t.exit_btn}
      </Link>
    </div>
  );
};

export default App;
