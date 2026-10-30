import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Language, translations } from '../translations';
import { languageSwitchHref } from '../routing.mjs';

const focus = 'focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-4';

const SiteHeader: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const desktopGroup = useRef<HTMLDetailsElement>(null);
  const mobileGroup = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const switchHref = languageSwitchHref(window.location, lang === 'en' ? 'cs' : 'en');
  const institutions = [
    ['/schools', t.nav_schools], ['/organizations', t.nav_organizations],
    ['/government', t.nav_government], ['/assessment', t.nav_assessment],
  ];

  useLayoutEffect(() => {
    // Close before App moves focus to an anchor on the destination page.
    if (dialog.current?.open) dialog.current.close();
    setMobileOpen(false);
    if (desktopGroup.current) desktopGroup.current.open = false;
    if (mobileGroup.current) mobileGroup.current.open = false;
  }, [location.key]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!mobileOpen) {
      if (element.open) element.close();
      return;
    }
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', closeOnDesktop);
      if (element.open) element.close();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (desktopGroup.current && !desktopGroup.current.contains(event.target as Node)) desktopGroup.current.open = false;
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  const closeDisclosure = (event: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === 'Escape' && event.currentTarget.open) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.open = false;
      event.currentTarget.querySelector('summary')?.focus();
    }
  };
  const disclosure = (mobile: boolean) => (
    <details ref={mobile ? mobileGroup : desktopGroup} className={mobile ? 'group' : 'group relative'}
      onKeyDown={closeDisclosure}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false;
      }}>
      <summary className={`list-none cursor-pointer flex items-center gap-2 min-h-11 ${focus} ${mobile ? 'py-3 text-2xl font-serif font-bold' : 'px-3 text-xs font-bold'}`}>
        {t.nav_institutions}
        <svg aria-hidden="true" className="w-4 h-4 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
      </summary>
      <ul className={mobile ? 'ml-4 mb-3 border-l border-stone-300 pl-4 space-y-1' : 'absolute top-full left-0 z-30 w-60 rounded-xl border border-stone-300 bg-[#F9F7F2] p-2'}>
        {institutions.map(([path, label]) => <li key={path}><Link to={path} className={`flex items-center min-h-11 rounded-lg px-3 py-2 text-base hover:bg-stone-200 ${focus}`}>{label}</Link></li>)}
      </ul>
    </details>
  );
  const languageLink = <a href={switchHref} hrefLang={lang === 'en' ? 'cs' : 'en'} aria-label={t.nav_switch_language}
    className={`flex items-center justify-center w-11 h-11 rounded-full border border-stone-300 text-xs font-bold hover:bg-stone-900 hover:text-white ${focus}`}>{t.lang_toggle}</a>;
  const desktopLink = `flex items-center min-h-11 px-3 text-xs font-bold hover:text-red-700 ${focus}`;
  const mobileLink = `block py-3 text-2xl font-serif font-bold hover:text-red-700 ${focus}`;
  const demoLink = `inline-flex items-center justify-center min-h-11 rounded-full bg-stone-900 text-white px-6 py-3 text-xs font-bold hover:bg-stone-700 ${focus}`;

  return <>
    <header className="py-6 md:py-9 xl:py-10 flex justify-between items-center gap-6 border-b border-stone-200 mb-6 md:mb-8 text-stone-900">
      <Link to="/" className={`text-[2rem] md:text-[2.35rem] xl:text-[2.6rem] font-black tracking-[-0.04em] uppercase font-serif leading-none shrink-0 ${focus}`}>
        {t.brand}<span className="text-red-600">.</span>
      </Link>
      <nav aria-label={t.nav_main_label} className="hidden xl:flex items-center gap-1">
        <Link to="/research" className={desktopLink}>{t.nav_why}</Link>
        <Link to="/#newsletter" className={desktopLink}>{t.nav_newsletter}</Link>
        {disclosure(false)}
        <Link to="/about" className={desktopLink}>{t.nav_about}</Link>
        <Link to="/demo" className={`${demoLink} ml-3 mr-3`}>{t.start_btn}</Link>
        {languageLink}
      </nav>
      <button ref={toggle} type="button" onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="mobile-navigation"
        aria-label={t.nav_open_menu} className={`xl:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 ${focus}`}>
        {[0, 1, 2].map(line => <span key={line} aria-hidden="true" className="block w-6 h-0.5 bg-stone-900" />)}
      </button>
    </header>
    <dialog ref={dialog} id="mobile-navigation" aria-label={t.nav_main_label}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-[#F9F7F2] text-stone-900 p-0 backdrop:bg-stone-900/40"
      onClose={() => setMobileOpen(false)}>
      <div className="px-6 py-6 sm:px-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif font-black uppercase text-2xl">{t.brand}<span className="text-red-600">.</span></span>
          <button type="button" onClick={() => setMobileOpen(false)} aria-label={t.nav_close_menu} className={`w-11 h-11 flex items-center justify-center ${focus}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </div>
        <nav aria-label={t.nav_main_label}>
          <Link to="/research" className={mobileLink}>{t.nav_why}</Link>
          <Link to="/#newsletter" className={mobileLink}>{t.nav_newsletter}</Link>
          {disclosure(true)}
          <Link to="/about" className={mobileLink}>{t.nav_about}</Link>
          <div className="flex items-center justify-between gap-4 pt-6 mt-4 border-t border-stone-300">
            <Link to="/demo" className={demoLink}>{t.start_btn}</Link>
            {languageLink}
          </div>
        </nav>
      </div>
    </dialog>
  </>;
};

export default SiteHeader;
