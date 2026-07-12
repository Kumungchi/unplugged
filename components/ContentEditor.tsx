import React, { useMemo, useState } from 'react';
import { SignInButton, UserButton } from '@clerk/react';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { isClerkConfigured } from '../auth';
import { Language } from '../translations';
import { defaultSectorContent } from './SectorPage';
import { defaultAboutContent } from './About';
import { contentKey } from './siteContentHelpers';

interface ContentEditorProps {
  lang: Language;
}

const ARRAY_FIELDS = new Set(['buyers', 'outcomes', 'formats', 'deliverables', 'whatItems', 'principles']);

const LANGS: Language[] = ['en', 'cs'];

type FieldGroup = {
  pageLabel: string;
  prefix: string;
  fields: { key: string; label: string; defaults: Record<Language, string> }[];
};

const toFieldDefault = (value: unknown): string =>
  Array.isArray(value) ? value.join('\n') : String(value ?? '');

const buildSectorGroup = (pageLabel: string, prefix: string, sector: 'schools' | 'organizations' | 'government'): FieldGroup => {
  const fieldNames = Object.keys(defaultSectorContent.en[sector]);
  return {
    pageLabel,
    prefix,
    fields: fieldNames.map((field) => ({
      key: field,
      label: field,
      defaults: {
        en: toFieldDefault((defaultSectorContent.en[sector] as Record<string, unknown>)[field]),
        cs: toFieldDefault((defaultSectorContent.cs[sector] as Record<string, unknown>)[field]),
      },
    })),
  };
};

const buildAboutGroup = (): FieldGroup => {
  const fieldNames = Object.keys(defaultAboutContent.en);
  return {
    pageLabel: 'About',
    prefix: 'about',
    fields: fieldNames.map((field) => ({
      key: field,
      label: field,
      defaults: {
        en: toFieldDefault((defaultAboutContent.en as Record<string, unknown>)[field]),
        cs: toFieldDefault((defaultAboutContent.cs as Record<string, unknown>)[field]),
      },
    })),
  };
};

const GROUPS: FieldGroup[] = [
  buildSectorGroup('Schools', 'sector.schools', 'schools'),
  buildSectorGroup('Organizations', 'sector.organizations', 'organizations'),
  buildSectorGroup('Government', 'sector.government', 'government'),
  buildAboutGroup(),
];

const labels = {
  en: {
    eyebrow: 'Content Editor',
    title: 'Site Content',
    subtitle:
      'Edit sector and About page copy without a code deploy. Save a draft to check it, then Publish to make it live. Array fields (lists) use one item per line.',
    authMissing: 'Clerk is not configured yet. Add the local Clerk env values first.',
    authLoading: 'Checking access...',
    signIn: 'Sign in as staff',
    unauthorized: 'Your account is signed in, but it does not currently have content-editor access.',
    saveDraft: 'Save draft',
    publish: 'Publish',
    saved: 'Draft saved',
    published: 'Published — live once the site rebuilds (~1–2 min after a deploy hook fires).',
    error: 'Something went wrong. Try again.',
  },
  cs: {
    eyebrow: 'Editor obsahu',
    title: 'Obsah webu',
    subtitle:
      'Upravujte texty sektorových stránek a About bez nasazení kódu. Uložte draft, zkontrolujte, pak publikujte. Seznamy (pole) mají jednu položku na řádek.',
    authMissing: 'Clerk zatím není nakonfigurovaný. Nejdřív přidejte lokální Clerk env hodnoty.',
    authLoading: 'Ověřuji přístup...',
    signIn: 'Přihlásit se jako tým',
    unauthorized: 'Tento účet je přihlášený, ale zatím nemá přístup k editoru obsahu.',
    saveDraft: 'Uložit draft',
    publish: 'Publikovat',
    saved: 'Draft uložen',
    published: 'Publikováno — živé po dalším buildu webu (~1–2 min po spuštění deploy hooku).',
    error: 'Něco se pokazilo. Zkuste to znovu.',
  },
};

type RowMap = Record<string, { value: string; publishedAt?: number }>;

const FieldEditor: React.FC<{
  fieldKey: string;
  label: string;
  lang: Language;
  defaultValue: string;
  rows: RowMap;
  t: (typeof labels)['en'];
}> = ({ fieldKey, label, lang, defaultValue, rows, t }) => {
  const row = rows[fieldKey];
  const [value, setValue] = useState(row?.value ?? defaultValue);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'publishing' | 'published' | 'error'>('idle');
  const upsertContent = useMutation(api.siteContent.upsertContent);
  const publishContent = useMutation(api.siteContent.publishContent);
  const isArrayField = ARRAY_FIELDS.has(fieldKey);

  const handleSave = async () => {
    setStatus('saving');
    try {
      await upsertContent({ key: fieldKey, lang, value });
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  };

  const handlePublish = async () => {
    setStatus('publishing');
    try {
      await upsertContent({ key: fieldKey, lang, value });
      await publishContent({ key: fieldKey, lang });
      setStatus('published');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="border border-stone-200 rounded-xl p-4 space-y-2 bg-white">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
          {label} {isArrayField && <span className="text-red-600">(one per line)</span>}
        </span>
        {row?.publishedAt && <span className="text-[10px] uppercase tracking-widest text-green-700">live</span>}
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={isArrayField ? 4 : 2}
        className="w-full border border-stone-300 rounded-lg p-2 text-sm font-mono"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === 'saving' || status === 'publishing'}
          className="px-4 py-1.5 border border-stone-300 rounded-full text-xs font-bold uppercase tracking-widest hover:border-stone-900 transition-colors disabled:opacity-50"
        >
          {t.saveDraft}
        </button>
        <button
          type="button"
          onClick={handlePublish}
          disabled={status === 'saving' || status === 'publishing'}
          className="px-4 py-1.5 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          {t.publish}
        </button>
        {status === 'saved' && <span className="text-xs text-stone-500">{t.saved}</span>}
        {status === 'published' && <span className="text-xs text-green-700">{t.published}</span>}
        {status === 'error' && <span className="text-xs text-red-600">{t.error}</span>}
      </div>
    </div>
  );
};

const ContentEditor: React.FC<ContentEditorProps> = ({ lang }) => {
  const t = labels[lang];
  const { isAuthenticated, isLoading } = useConvexAuth();
  const viewerAccess = useQuery(api.staff.getViewerAccess, isAuthenticated ? {} : 'skip');
  const allContent = useQuery(api.siteContent.getAllContentForAdmin, viewerAccess?.isFacilitator ? {} : 'skip');

  const rowsByLang = useMemo(() => {
    const map: Record<Language, RowMap> = { en: {}, cs: {} };
    for (const row of allContent ?? []) {
      map[row.lang as Language][row.key] = { value: row.value, publishedAt: row.publishedAt };
    }
    return map;
  }, [allContent]);

  if (!isClerkConfigured) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authMissing}</p>
      </div>
    );
  }

  if (isLoading || (isAuthenticated && !viewerAccess)) {
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

  if (!allContent) {
    // Wait for existing drafts/published rows to load before mounting
    // FieldEditor: its textarea state initializes once from `rows`, so
    // mounting before this resolves would show blank fields instead of
    // any existing draft value.
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authLoading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 space-y-10">
      <section className="text-center space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500 max-w-2xl mx-auto">{t.subtitle}</p>
      </section>

      {GROUPS.map((group) => (
        <section key={group.prefix} className="space-y-4">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">{group.pageLabel}</h2>
          {LANGS.map((editorLang) => (
            <div key={editorLang} className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{editorLang}</p>
              <div className="grid md:grid-cols-2 gap-3">
                {group.fields.map((field) => (
                  <FieldEditor
                    key={`${group.prefix}.${field.key}.${editorLang}`}
                    fieldKey={contentKey(group.prefix, field.key)}
                    label={field.label}
                    lang={editorLang}
                    defaultValue={field.defaults[editorLang]}
                    rows={rowsByLang[editorLang]}
                    t={t}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default ContentEditor;
