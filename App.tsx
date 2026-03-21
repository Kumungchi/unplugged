
import React, { useState } from 'react';
import Landing from './components/Landing';
import Assessment from './components/Assessment';
import ResultView from './components/ResultView';
import Movement from './components/Movement';
import Boundaries from './components/Boundaries';
import MirrorDemo from './components/MirrorDemo';
import { AssessmentResult } from './types';
import { Language, translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<'landing' | 'assessment' | 'result' | 'movement' | 'boundaries' | 'demo'>('landing');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const t = translations[lang];

  const handleFinishAssessment = (res: AssessmentResult) => {
    setResult(res);
    setView('result');
  };

  const navClasses = "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-stone-900 text-stone-400";

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-6 lg:px-12">
      <header className="py-10 flex justify-between items-center border-b border-stone-200 mb-8">
        <button onClick={() => setView('landing')} className="text-3xl font-black tracking-tighter text-stone-900 uppercase">
          {t.brand}<span className="text-red-600">.</span>
        </button>
        
        <nav className="hidden md:flex items-center space-x-4">
          <button onClick={() => setView('demo')} className={navClasses}>{t.nav_demo}</button>
          <button onClick={() => setView('boundaries')} className={navClasses}>{t.nav_boundaries}</button>
          <button onClick={() => setView('movement')} className={navClasses}>{t.nav_manifesto}</button>
          
          <button 
            onClick={() => setLang(lang === 'en' ? 'cs' : 'en')}
            className="ml-4 w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-[10px] font-bold hover:bg-stone-900 hover:text-white transition-all shadow-sm"
          >
            {t.lang_toggle}
          </button>
        </nav>
      </header>

      <main className="flex-grow pb-20 fade-in">
        {view === 'landing' && <Landing lang={lang} onStart={() => setView('assessment')} />}
        {view === 'assessment' && <Assessment onComplete={handleFinishAssessment} onCancel={() => setView('landing')} />}
        {view === 'result' && result && <ResultView result={result} onDone={() => setView('landing')} />}
        {view === 'movement' && <Movement lang={lang} />}
        {view === 'boundaries' && <Boundaries lang={lang} />}
        {view === 'demo' && <MirrorDemo lang={lang} />}
      </main>

      <footer className="py-12 border-t border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] text-center space-y-4">
        <p>{t.footer_text}</p>
        <div className="flex justify-center space-x-8">
          <button onClick={() => setView('boundaries')} className="hover:text-stone-900">{t.nav_ethics}</button>
          <button onClick={() => setView('boundaries')} className="hover:text-stone-900">{t.nav_crisis}</button>
          <button onClick={() => setView('movement')} className="hover:text-stone-900">{t.nav_labs}</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
