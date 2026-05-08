import React, { useMemo, useState } from 'react';
import { SignInButton, UserButton } from '@clerk/react';
import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { isClerkConfigured } from '../auth';
import { Language } from '../translations';

interface FacilitatorProps {
  lang: Language;
}

const labels = {
  en: {
    eyebrow: 'Protected Facilitator Layer',
    title: 'Facilitator Console',
    subtitle:
      'Protected workshop material for internal facilitators. This layer stays off the public product surface and is served only through authenticated Convex queries.',
    authMissing: 'Clerk is not configured yet. Add the local Clerk env values first.',
    authLoading: 'Checking facilitator access...',
    signIn: 'Sign in as staff',
    unauthorized: 'Your account is signed in, but it does not currently have facilitator access.',
    scenario: 'Scenario focus',
    audience: 'Audience focus',
    sessionArc: 'Suggested Session Arc',
    notes: 'Facilitator Notes',
    prompts: 'Audience Debrief Prompts',
    goals: 'Hidden Teaching Goals',
    access: 'Access',
  },
  cs: {
    eyebrow: 'Chráněná facilitační vrstva',
    title: 'Facilitator Console',
    subtitle:
      'Chráněné workshopové materiály pro interní facilitátory. Tato vrstva zůstává mimo veřejný produkt a je servírovaná jen přes autentizované Convex query.',
    authMissing: 'Clerk zatím není nakonfigurovaný. Nejdřív přidejte lokální Clerk env hodnoty.',
    authLoading: 'Ověřuji facilitační přístup...',
    signIn: 'Přihlásit se jako tým',
    unauthorized: 'Tento účet je přihlášený, ale zatím nemá facilitator přístup.',
    scenario: 'Scénář',
    audience: 'Publikum',
    sessionArc: 'Doporučený session arc',
    notes: 'Facilitator poznámky',
    prompts: 'Debrief otázky podle publika',
    goals: 'Skryté teaching goals',
    access: 'Přístup',
  },
};

const scenarioOptions = ['dependency', 'therapy', 'sycophancy', 'workplace', 'youth'] as const;
const audienceOptions = ['schools', 'organizations', 'government'] as const;

const Facilitator: React.FC<FacilitatorProps> = ({ lang }) => {
  const t = labels[lang];
  const [scenario, setScenario] = useState<string>('dependency');
  const [audience, setAudience] = useState<string>('schools');
  const { isAuthenticated, isLoading } = useConvexAuth();
  const viewerAccess = useQuery(api.staff.getViewerAccess, isAuthenticated ? {} : 'skip');
  const briefing = useQuery(
    api.staff.getFacilitatorBriefing,
    viewerAccess?.isFacilitator ? { scenario, audience } : 'skip',
  );

  const debriefPrompts = useMemo(() => briefing?.debriefPrompts[audience as keyof typeof briefing.debriefPrompts] ?? [], [audience, briefing]);

  if (!isClerkConfigured) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authMissing}</p>
      </div>
    );
  }

  if (isLoading || (isAuthenticated && !viewerAccess)) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authLoading}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.subtitle}</p>
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
            {t.signIn}
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!viewerAccess?.isFacilitator) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.unauthorized}</p>
        <div className="flex justify-center">
          <UserButton />
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authLoading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 space-y-8 md:space-y-10">
      <section className="text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-stone-900 font-black tracking-tighter">{t.title}</h1>
        <p className="text-stone-500 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
      </section>

      <section className="grid xl:grid-cols-[1fr,0.8fr] gap-6">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.scenario}</p>
            <div className="flex flex-wrap gap-2">
              {scenarioOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScenario(value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                    scenario === value ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.audience}</p>
            <div className="flex flex-wrap gap-2">
              {audienceOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAudience(value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                    audience === value ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-stone-100 pt-4 text-sm text-stone-500">
            {t.access}: {viewerAccess.email} / {viewerAccess.role} / {viewerAccess.source}
          </div>
        </div>

        <div className="bg-stone-900 text-white rounded-[2rem] p-6 md:p-8 paper-texture relative overflow-hidden space-y-4">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
          <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{t.goals}</p>
          <div className="relative z-10 space-y-3">
            {briefing.hiddenTeachingGoals.map((goal) => (
              <div key={goal} className="text-stone-300 leading-relaxed">
                {goal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.sessionArc}</h2>
          <div className="space-y-3">
            {briefing.sessionArc.map((item) => (
              <div key={item} className="text-sm text-stone-600 leading-relaxed border-b border-stone-100 pb-3">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.notes}</h2>
          <div className="space-y-3">
            {briefing.facilitatorNotes.map((item) => (
              <div key={item} className="text-sm text-stone-600 leading-relaxed border-b border-stone-100 pb-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.prompts}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {debriefPrompts.map((prompt) => (
            <div key={prompt} className="bg-stone-50 border border-stone-200 rounded-[1.5rem] p-4 text-sm text-stone-600 leading-relaxed">
              {prompt}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Facilitator;
