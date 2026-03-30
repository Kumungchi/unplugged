import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import Landing from './components/Landing';
import Movement from './components/Movement';
import Boundaries from './components/Boundaries';
import MirrorDemo from './components/MirrorDemo';
import Psychology from './components/Psychology';
import JoinForm from './components/JoinForm';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import { Language, translations } from './translations';
import SEOHead from './components/SEOHead';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('unplugged_lang');
    if (saved === 'en' || saved === 'cs') return saved;
    
    // Force Czech default if accessed via .cz domain
    if (window.location.hostname.endsWith('.cz')) {
      return 'cs';
    }
    
    // Auto-detect from browser, default to Czech
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('en') ? 'en' : 'cs';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('unplugged_lang', lang);
  }, [lang]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const t = translations[lang];

  const navClasses = "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-stone-900 text-stone-500";

  const navLinks = (
    <>
      <Link to="/demo" className={navClasses}>{t.nav_demo}</Link>
      <Link to="/psychology" className={navClasses}>{t.nav_psychology}</Link>
      <Link to="/research" className={navClasses}>{t.nav_boundaries}</Link>
      <Link to="/approach" className={navClasses}>{t.nav_manifesto}</Link>
      <Link to="/join" className={`${navClasses} !text-red-600 hover:!text-red-700`}>{t.nav_join}</Link>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
      <header className="py-6 md:py-10 flex justify-between items-center border-b border-stone-200 mb-6 md:mb-8">
        <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter text-stone-900 uppercase font-serif">
          {t.brand}<span className="text-red-600">.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          {navLinks}
          <button
            onClick={() => setLang(lang === 'en' ? 'cs' : 'en')}
            className="ml-4 w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-[10px] font-bold hover:bg-stone-900 hover:text-white transition-all shadow-sm"
            aria-label={lang === 'en' ? 'Switch to Czech' : 'Přepnout na angličtinu'}
          >
            {t.lang_toggle}
          </button>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-stone-900 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-stone-900 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-stone-900 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#F9F7F2] flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-10 right-6 w-10 h-10 flex items-center justify-center text-2xl text-stone-900"
            aria-label="Close menu"
          >
            ✕
          </button>
          <Link to="/demo" className="text-2xl font-bold uppercase tracking-widest text-stone-700">{t.nav_demo}</Link>
          <Link to="/psychology" className="text-2xl font-bold uppercase tracking-widest text-stone-700">{t.nav_psychology}</Link>
          <Link to="/research" className="text-2xl font-bold uppercase tracking-widest text-stone-700">{t.nav_boundaries}</Link>
          <Link to="/approach" className="text-2xl font-bold uppercase tracking-widest text-stone-700">{t.nav_manifesto}</Link>
          <Link to="/join" className="text-2xl font-bold uppercase tracking-widest text-red-600">{t.nav_join}</Link>
          <button
            onClick={() => { setLang(lang === 'en' ? 'cs' : 'en'); setMenuOpen(false); }}
            className="w-14 h-14 rounded-full border-2 border-stone-300 flex items-center justify-center text-sm font-bold hover:bg-stone-900 hover:text-white transition-all"
          >
            {t.lang_toggle}
          </button>
        </div>
      )}

      <SEOHead lang={lang} />
      <main className="flex-grow pb-20 fade-in">
        <Routes>
          <Route path="/" element={<Landing lang={lang} />} />
          <Route path="/approach" element={<Movement lang={lang} />} />
          <Route path="/research" element={<Boundaries lang={lang} />} />
          <Route path="/demo" element={<MirrorDemo lang={lang} />} />
          <Route path="/psychology" element={<Psychology lang={lang} />} />
          <Route path="/join" element={<JoinForm lang={lang} />} />
          <Route path="/privacy" element={<PrivacyPolicy lang={lang} />} />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </main>

      <footer className="py-8 md:py-12 border-t border-stone-200 text-stone-500 text-[10px] font-bold uppercase tracking-[0.3em] text-center space-y-4">
        <p>{t.footer_text}</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <Link to="/research" className="hover:text-stone-900">{t.nav_boundaries}</Link>
          <Link to="/approach" className="hover:text-stone-900">{t.nav_manifesto}</Link>
          <Link to="/join" className="hover:text-stone-900">{t.nav_join}</Link>
          <Link to="/privacy" className="hover:text-stone-900">{t.nav_privacy}</Link>
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
