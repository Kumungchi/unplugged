import React from 'react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import { Language } from '../translations';
import { isClerkConfigured } from '../auth';

interface StaffAccessProps {
  lang: Language;
}

const copy = {
  en: {
    eyebrow: 'Internal access',
    title: 'Staff Access',
    subtitle:
      'This route is for facilitators and internal team members only. It is not part of the public site navigation.',
    authMissing: 'Clerk is not configured yet for this environment.',
    signIn: 'Sign in',
    signUp: 'Create staff account',
    signedIn: 'You are signed in. Use the internal routes directly if your account has access.',
  },
  cs: {
    eyebrow: 'Interní přístup',
    title: 'Týmový přístup',
    subtitle:
      'Tato cesta je určená jen pro facilitátory a interní tým. Není součástí veřejné navigace webu.',
    authMissing: 'Clerk zatím není pro toto prostředí nakonfigurovaný.',
    signIn: 'Přihlásit se',
    signUp: 'Vytvořit týmový účet',
    signedIn: 'Jste přihlášeni. Pokud má váš účet oprávnění, použijte interní cesty přímo.',
  },
} as const;

const StaffAccess: React.FC<StaffAccessProps> = ({ lang }) => {
  const t = copy[lang];

  if (!isClerkConfigured) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500">{t.authMissing}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 md:py-24">
      <section className="bg-white border border-stone-200 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center space-y-6 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">{t.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-serif italic font-bold text-stone-900">{t.title}</h1>
        <p className="text-stone-500 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>

        <Show when="signed-out">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
                {t.signIn}
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full text-xs font-bold uppercase tracking-widest hover:border-stone-900 transition-colors">
                {t.signUp}
              </button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="space-y-4">
            <p className="text-stone-500">{t.signedIn}</p>
            <div className="flex justify-center">
              <UserButton />
            </div>
          </div>
        </Show>
      </section>
    </div>
  );
};

export default StaffAccess;
