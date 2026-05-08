import React from 'react';
import { useConvexAuth, useQuery } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/react';
import { api } from '../convex/_generated/api';
import { isClerkConfigured } from '../auth';
import { Language } from '../translations';

interface DemoInsightsProps {
  lang: Language;
}

const labels = {
  en: {
    eyebrow: 'Internal Analytics',
    title: 'Demo Insights',
    subtitle:
      'Live reporting for the Mirror Demo. This view is intended for internal product, facilitation, and GTM decisions.',
    restricted: 'This page is restricted to signed-in staff members with facilitator or admin access.',
    authMissing: 'Clerk is not configured yet. Add the local Clerk env values first.',
    signIn: 'Sign in to open internal reporting',
    loading: 'Loading demo insights...',
    authLoading: 'Checking staff access...',
    unauthorized: 'Your account is signed in, but it does not currently have facilitator or admin access.',
    totals: 'Core Metrics',
    starts: 'Starts',
    completions: 'Completions',
    completionRate: 'Completion rate',
    ctaClicks: 'CTA clicks',
    ctaRate: 'CTA rate from completion',
    leads: 'Demo-attributed leads',
    startsByScenario: 'Starts by Scenario',
    completionsByScenario: 'Completions by Scenario',
    completionsByAudience: 'Completions by Audience',
    branchUsage: 'Branch Usage',
    ctaClicksByTarget: 'CTA Clicks by Target',
    outcomesByScenario: 'Outcomes by Scenario',
    outcomesByAudience: 'Outcomes by Audience',
    conversionsByCombo: 'Lead Conversions by Scenario / Audience / Outcome',
    recentLeads: 'Recent Demo-Attributed Leads',
    none: 'No data yet.',
    contact: 'Contact',
    segment: 'Segment',
    attribution: 'Attribution',
    created: 'Created',
  },
  cs: {
    eyebrow: 'Interní analytika',
    title: 'Demo Insights',
    subtitle:
      'Živé reportování pro Mirror Demo. Tento pohled je určený pro interní produktová, facilitační a GTM rozhodnutí.',
    restricted: 'Tato stránka je dostupná jen přihlášeným členům týmu s facilitator nebo admin přístupem.',
    authMissing: 'Clerk zatím není nakonfigurovaný. Nejdřív přidejte lokální Clerk env hodnoty.',
    signIn: 'Přihlásit se pro interní reporting',
    loading: 'Načítám demo insights...',
    authLoading: 'Ověřuji přístup týmu...',
    unauthorized: 'Tento účet je přihlášený, ale zatím nemá facilitator nebo admin přístup.',
    totals: 'Klíčové metriky',
    starts: 'Starty',
    completions: 'Dokončení',
    completionRate: 'Míra dokončení',
    ctaClicks: 'Kliky na CTA',
    ctaRate: 'CTA rate z dokončení',
    leads: 'Leady připsané demu',
    startsByScenario: 'Starty podle scénáře',
    completionsByScenario: 'Dokončení podle scénáře',
    completionsByAudience: 'Dokončení podle publika',
    branchUsage: 'Použití branchí',
    ctaClicksByTarget: 'Kliky na CTA podle cíle',
    outcomesByScenario: 'Výstupy podle scénáře',
    outcomesByAudience: 'Výstupy podle publika',
    conversionsByCombo: 'Konverze leadů podle scénáře / publika / outcome',
    recentLeads: 'Poslední leady připsané demu',
    none: 'Zatím bez dat.',
    contact: 'Kontakt',
    segment: 'Segment',
    attribution: 'Atribuce',
    created: 'Vytvořeno',
  },
};

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

const sortedEntries = (record: Record<string, number> | undefined) =>
  Object.entries(record ?? {}).sort((a, b) => b[1] - a[1]);

const MetricCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white border border-stone-200 rounded-[1.5rem] p-5 space-y-2">
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-500">{label}</p>
    <p className="text-3xl font-serif italic font-bold text-stone-900">{value}</p>
  </div>
);

const RecordList: React.FC<{ title: string; data: Record<string, number> | undefined; empty: string }> = ({
  title,
  data,
  empty,
}) => {
  const items = sortedEntries(data);

  return (
    <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
      <h2 className="text-2xl font-serif italic font-bold text-stone-900">{title}</h2>
      {items.length === 0 ? (
        <p className="text-stone-500 text-sm">{empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3 text-sm">
              <span className="text-stone-600 break-all">{key}</span>
              <span className="text-stone-900 font-bold">{value}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const DemoInsights: React.FC<DemoInsightsProps> = ({ lang }) => {
  const t = labels[lang];
  const { isAuthenticated, isLoading } = useConvexAuth();
  const viewerAccess = useQuery(api.staff.getViewerAccess, isAuthenticated ? {} : 'skip');
  const insights = useQuery(
    api.submissions.getDemoInsights,
    viewerAccess?.isFacilitator ? { eventLimit: 3000, leadLimit: 1000 } : 'skip',
  );

  if (!isClerkConfigured) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authMissing}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authLoading}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.restricted}</p>
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
            {t.signIn}
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!viewerAccess) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authLoading}</p>
      </div>
    );
  }

  if (!viewerAccess.isFacilitator) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.unauthorized}</p>
        <div className="flex justify-center">
          <UserButton />
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.loading}</p>
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

      <section className="space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.totals}</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <MetricCard label={t.starts} value={String(insights.totals.starts)} />
          <MetricCard label={t.completions} value={String(insights.totals.completions)} />
          <MetricCard label={t.completionRate} value={formatPercent(insights.totals.completionRate)} />
          <MetricCard label={t.ctaClicks} value={String(insights.totals.ctaClicks)} />
          <MetricCard label={t.ctaRate} value={formatPercent(insights.totals.ctaRateFromCompletion)} />
          <MetricCard label={t.leads} value={String(insights.totals.demoAttributedLeads)} />
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <RecordList title={t.startsByScenario} data={insights.startsByScenario} empty={t.none} />
        <RecordList title={t.completionsByScenario} data={insights.completionsByScenario} empty={t.none} />
        <RecordList title={t.completionsByAudience} data={insights.completionsByAudience} empty={t.none} />
        <RecordList title={t.branchUsage} data={insights.branchUsage} empty={t.none} />
        <RecordList title={t.ctaClicksByTarget} data={insights.ctaClicksByTarget} empty={t.none} />
        <RecordList title={t.conversionsByCombo} data={insights.conversionsByCombo} empty={t.none} />
        <RecordList title={t.outcomesByScenario} data={insights.outcomesByScenario} empty={t.none} />
        <RecordList title={t.outcomesByAudience} data={insights.outcomesByAudience} empty={t.none} />
      </section>

      <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.recentLeads}</h2>
        {insights.recentDemoLeads.length === 0 ? (
          <p className="text-stone-500 text-sm">{t.none}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone-500 uppercase tracking-widest text-[10px]">
                  <th className="pb-3">{t.contact}</th>
                  <th className="pb-3">{t.segment}</th>
                  <th className="pb-3">{t.attribution}</th>
                  <th className="pb-3">{t.created}</th>
                </tr>
              </thead>
              <tbody>
                {insights.recentDemoLeads.map((lead) => (
                  <tr key={lead._id} className="border-t border-stone-100 align-top">
                    <td className="py-3">
                      <div className="font-medium text-stone-900">{lead.contactName}</div>
                      <div className="text-stone-500">{lead.email}</div>
                    </td>
                    <td className="py-3 text-stone-600">{lead.segment}</td>
                    <td className="py-3 text-stone-600">
                      {lead.attributionScenario} / {lead.attributionAudience} / {lead.attributionOutcome}
                    </td>
                    <td className="py-3 text-stone-500">{new Date(lead.createdAt).toLocaleString(lang === 'en' ? 'en-US' : 'cs-CZ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default DemoInsights;
