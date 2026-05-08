import React from 'react';
import { useConvexAuth, useQuery } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/react';
import { api } from '../convex/_generated/api';
import { isClerkConfigured } from '../auth';
import { Language } from '../translations';

interface SubmissionsOverviewProps {
  lang: Language;
}

const copy = {
  en: {
    eyebrow: 'Internal Reporting',
    title: 'Form Submissions',
    subtitle:
      'A protected view of institutional inquiries, initiative interest, assessment runs, newsletter signups, and direct contact messages.',
    authMissing: 'Clerk is not configured yet. Add the local Clerk env values first.',
    restricted: 'This page is restricted to signed-in staff members with facilitator or admin access.',
    signIn: 'Sign in to open form reporting',
    authLoading: 'Checking staff access...',
    loading: 'Loading submissions...',
    unauthorized: 'Your account is signed in, but it does not currently have facilitator or admin access.',
    totals: 'Snapshot',
    leads: 'Leads',
    initiativeLeads: 'Initiative leads',
    assessments: 'Assessments',
    newsletter: 'Newsletter',
    contacts: 'Contacts',
    leadsBySegment: 'Leads by Segment',
    initiativeByIntent: 'Initiative Interest by Intent',
    assessmentsBySegment: 'Assessments by Segment',
    newsletterByLang: 'Newsletter by Language',
    recentLeads: 'Recent Leads',
    recentAssessments: 'Recent Assessments',
    recentNewsletter: 'Recent Newsletter Signups',
    recentContacts: 'Recent Contact Messages',
    none: 'No data yet.',
    contact: 'Contact',
    segment: 'Segment',
    source: 'Source',
    status: 'Status',
    created: 'Created',
    score: 'Score',
    recommendation: 'Recommendation',
    message: 'Message',
    language: 'Language',
  },
  cs: {
    eyebrow: 'Interní reporting',
    title: 'Odeslané formuláře',
    subtitle:
      'Chráněný přehled institucionálních poptávek, zájmu o iniciativu, assessmentů, newsletterových registrací a přímých zpráv.',
    authMissing: 'Clerk zatím není nakonfigurovaný. Nejdřív přidejte lokální Clerk env hodnoty.',
    restricted: 'Tato stránka je dostupná jen přihlášeným členům týmu s facilitator nebo admin přístupem.',
    signIn: 'Přihlásit se pro přehled formulářů',
    authLoading: 'Ověřuji přístup týmu...',
    loading: 'Načítám formuláře...',
    unauthorized: 'Tento účet je přihlášený, ale zatím nemá facilitator nebo admin přístup.',
    totals: 'Souhrn',
    leads: 'Leady',
    initiativeLeads: 'Leady iniciativy',
    assessments: 'Assessmenty',
    newsletter: 'Newsletter',
    contacts: 'Kontakty',
    leadsBySegment: 'Leady podle segmentu',
    initiativeByIntent: 'Zájem o iniciativu podle role',
    assessmentsBySegment: 'Assessmenty podle segmentu',
    newsletterByLang: 'Newsletter podle jazyka',
    recentLeads: 'Poslední leady',
    recentAssessments: 'Poslední assessmenty',
    recentNewsletter: 'Poslední registrace do newsletteru',
    recentContacts: 'Poslední kontaktní zprávy',
    none: 'Zatím bez dat.',
    contact: 'Kontakt',
    segment: 'Segment',
    source: 'Zdroj',
    status: 'Status',
    created: 'Vytvořeno',
    score: 'Skóre',
    recommendation: 'Doporučení',
    message: 'Zpráva',
    language: 'Jazyk',
  },
} as const;

const formatTime = (value: number, lang: Language) => new Date(value).toLocaleString(lang === 'en' ? 'en-US' : 'cs-CZ');

const sortedEntries = (record: Record<string, number> | undefined) =>
  Object.entries(record ?? {}).sort((a, b) => b[1] - a[1]);

const MetricCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white border border-stone-200 rounded-[1.5rem] p-5 space-y-2">
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-500">{label}</p>
    <p className="text-3xl font-serif italic font-bold text-stone-900">{value}</p>
  </div>
);

const RecordList: React.FC<{ title: string; data: Record<string, number> | undefined; empty: string }> = ({ title, data, empty }) => {
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

const SubmissionsOverview: React.FC<SubmissionsOverviewProps> = ({ lang }) => {
  const t = copy[lang];
  const { isAuthenticated, isLoading } = useConvexAuth();
  const viewerAccess = useQuery(api.staff.getViewerAccess, isAuthenticated ? {} : 'skip');
  const overview = useQuery(
    api.submissions.getSubmissionOverview,
    viewerAccess?.isFacilitator
      ? { leadLimit: 80, assessmentLimit: 60, newsletterLimit: 60, contactLimit: 60 }
      : 'skip',
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

  if (!overview) {
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
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <MetricCard label={t.leads} value={String(overview.totals.leads)} />
          <MetricCard label={t.initiativeLeads} value={String(overview.totals.initiativeLeads)} />
          <MetricCard label={t.assessments} value={String(overview.totals.assessments)} />
          <MetricCard label={t.newsletter} value={String(overview.totals.newsletter)} />
          <MetricCard label={t.contacts} value={String(overview.totals.contacts)} />
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <RecordList title={t.leadsBySegment} data={overview.leadsBySegment} empty={t.none} />
        <RecordList title={t.initiativeByIntent} data={overview.initiativeByIntent} empty={t.none} />
        <RecordList title={t.assessmentsBySegment} data={overview.assessmentsBySegment} empty={t.none} />
        <RecordList title={t.newsletterByLang} data={overview.newsletterByLang} empty={t.none} />
      </section>

      <section className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.recentLeads}</h2>
        {overview.recentLeads.length === 0 ? (
          <p className="text-stone-500 text-sm">{t.none}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone-500 uppercase tracking-widest text-[10px]">
                  <th className="pb-3">{t.contact}</th>
                  <th className="pb-3">{t.segment}</th>
                  <th className="pb-3">{t.source}</th>
                  <th className="pb-3">{t.status}</th>
                  <th className="pb-3">{t.created}</th>
                </tr>
              </thead>
              <tbody>
                {overview.recentLeads.map((lead) => (
                  <tr key={lead._id} className="border-t border-stone-100 align-top">
                    <td className="py-3">
                      <div className="font-medium text-stone-900">{lead.contactName}</div>
                      <div className="text-stone-500">{lead.email}</div>
                    </td>
                    <td className="py-3 text-stone-600">
                      {lead.segment}
                      <div className="text-stone-400">{lead.intent}</div>
                    </td>
                    <td className="py-3 text-stone-600 break-all">{lead.sourcePage}</td>
                    <td className="py-3 text-stone-600">{lead.status}</td>
                    <td className="py-3 text-stone-500">{formatTime(lead.createdAt, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.recentAssessments}</h2>
          {overview.recentAssessments.length === 0 ? (
            <p className="text-stone-500 text-sm">{t.none}</p>
          ) : (
            <div className="space-y-4">
              {overview.recentAssessments.map((assessment) => (
                <div key={assessment._id} className="border-b border-stone-100 pb-4 text-sm space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-stone-900">{assessment.segment}</span>
                    <span className="text-stone-500">{t.score}: {assessment.score}</span>
                  </div>
                  <p className="text-stone-600">{assessment.recommendedOffer}</p>
                  <p className="text-stone-400 text-xs">{formatTime(assessment.createdAt, lang)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.recentNewsletter}</h2>
          {overview.recentNewsletter.length === 0 ? (
            <p className="text-stone-500 text-sm">{t.none}</p>
          ) : (
            <div className="space-y-4">
              {overview.recentNewsletter.map((entry) => (
                <div key={entry._id} className="border-b border-stone-100 pb-4 text-sm space-y-1">
                  <p className="font-medium text-stone-900 break-all">{entry.email}</p>
                  <p className="text-stone-500">{t.language}: {entry.lang}</p>
                  <p className="text-stone-400 text-xs">{formatTime(entry.createdAt, lang)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{t.recentContacts}</h2>
          {overview.recentContacts.length === 0 ? (
            <p className="text-stone-500 text-sm">{t.none}</p>
          ) : (
            <div className="space-y-4">
              {overview.recentContacts.map((entry) => (
                <div key={entry._id} className="border-b border-stone-100 pb-4 text-sm space-y-1">
                  <p className="font-medium text-stone-900 break-all">{entry.email}</p>
                  <p className="text-stone-600">{entry.message || '-'}</p>
                  <p className="text-stone-400 text-xs">{formatTime(entry.createdAt, lang)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SubmissionsOverview;
